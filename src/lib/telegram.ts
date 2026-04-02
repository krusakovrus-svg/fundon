import { canonicalSportsRegistry, getCanonicalSportById, normalizeCanonicalSportId } from '@/lib/sportsRegistry';
import { getCatalogCompetitionSnapshots, getCatalogDbEvents } from '@/server/catalog/readers';
import { catalogSourceRegistry } from '@/server/catalog/sourceRegistry';
import {
  getCatalogSyncWorkflowStatus,
  getLatestCatalogSyncRun,
  triggerCatalogSyncWorkflow,
  type CatalogSyncScope,
} from '@/server/catalog/syncWorkflow';
import type { TelegramMessage, TelegramUpdate } from '@/types/telegram';

const TELEGRAM_API_BASE_URL = 'https://api.telegram.org';
const TELEGRAM_DEFAULT_TIMEZONE = 'Europe/Moscow';
const MAX_TELEGRAM_MESSAGE_LENGTH = 4096;
const SUPPORTED_SYNC_SCOPES = ['all', 'football', 'hockey', 'basketball', 'martial-arts', 'ufc'] as const;

interface TelegramRuntimeConfig {
  botToken: string | null;
  webhookSecret: string | null;
  allowedChatIds: Set<string>;
  allowedUserIds: Set<string>;
}

interface TelegramReply {
  text: string;
  replyToMessageId?: number;
}

function parseIdSet(value?: string) {
  return new Set(
    (value ?? '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function getTelegramRuntimeConfig(): TelegramRuntimeConfig {
  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN?.trim() ?? null,
    webhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET?.trim() ?? null,
    allowedChatIds: parseIdSet(process.env.TELEGRAM_ALLOWED_CHAT_IDS),
    allowedUserIds: parseIdSet(process.env.TELEGRAM_ALLOWED_USER_IDS),
  };
}

function splitCommand(text: string) {
  const [rawCommand = ''] = text.trim().split(/\s+/, 1);
  const body = text.trim().slice(rawCommand.length).trim();

  return {
    command: rawCommand.replace(/^\//, '').split('@')[0].toLowerCase(),
    body,
  };
}

function normalizeText(input: string) {
  return input.replace(/\s+/g, ' ').trim();
}

function hasControlAllowList(config: TelegramRuntimeConfig) {
  return config.allowedChatIds.size > 0 || config.allowedUserIds.size > 0;
}

function isControlAuthorized(message: TelegramMessage, config: TelegramRuntimeConfig) {
  if (!hasControlAllowList(config)) {
    return message.chat.type === 'private';
  }

  const chatId = String(message.chat.id);
  const userId = message.from ? String(message.from.id) : null;

  return config.allowedChatIds.has(chatId) || (userId ? config.allowedUserIds.has(userId) : false);
}

function clampTelegramText(input: string) {
  if (input.length <= MAX_TELEGRAM_MESSAGE_LENGTH) {
    return input;
  }

  return `${input.slice(0, MAX_TELEGRAM_MESSAGE_LENGTH - 20).trimEnd()}\n\n...truncated`;
}

function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return 'TBD';
  }

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TELEGRAM_DEFAULT_TIMEZONE,
  }).format(date);
}

function getIdentityText(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const userId = message.from ? String(message.from.id) : 'unknown';
  const username = message.from?.username ? `@${message.from.username}` : 'without username';

  return ['Fansten Parser Bot', '', 'Current dialog:', `chat_id: ${chatId}`, `user_id: ${userId}`, `username: ${username}`].join('\n');
}

function getUsageText() {
  return [
    'Fansten Parser Bot',
    '',
    'Commands:',
    '/help - parser commands',
    '/status - bot + parser status',
    '/whoami - show chat_id and user_id',
    '/sports - sports registry overview',
    '/sources - parser source registry',
    '/upcoming [sport] - upcoming and live events',
    '/sync [scope] - trigger production catalog sync',
    '',
    `Available sync scopes: ${SUPPORTED_SYNC_SCOPES.join(', ')}`,
  ].join('\n');
}

function getControlUnauthorizedText(message: TelegramMessage) {
  return [
    'Sync control is locked for this dialog.',
    'Use a private chat or add this chat_id / user_id to TELEGRAM_ALLOWED_CHAT_IDS / TELEGRAM_ALLOWED_USER_IDS.',
    '',
    getIdentityText(message),
  ].join('\n');
}

function formatSyncRunSummaryLine(run: Awaited<ReturnType<typeof getLatestCatalogSyncRun>>) {
  if (!run) {
    return 'Latest sync run: none';
  }

  const conclusion = run.conclusion ? ` / ${run.conclusion}` : '';
  return `Latest sync run: ${run.status}${conclusion} | ${run.displayTitle}`;
}

function getSportDisplayLabel(sportCode: string) {
  const sport = getCanonicalSportById(sportCode);
  return sport?.label ?? sportCode;
}

async function getStatusText(config: TelegramRuntimeConfig) {
  const competitions = await getCatalogCompetitionSnapshots();
  const events = await getCatalogDbEvents();
  const syncWorkflowStatus = getCatalogSyncWorkflowStatus();
  const latestSyncRun = await getLatestCatalogSyncRun();
  const readySports = canonicalSportsRegistry.filter((sport) => sport.availability === 'ready');
  const plannedSports = canonicalSportsRegistry.filter((sport) => sport.availability === 'planned');
  const activeSources = catalogSourceRegistry.filter((source) => source.status === 'active');
  const plannedSources = catalogSourceRegistry.filter((source) => source.status === 'planned');
  const liveEvents = events.filter((event) => event.status === 'live');
  const upcomingEvents = events.filter((event) => event.status !== 'live');
  const nextEvent = [...events].sort((left, right) => new Date(left.startAt).getTime() - new Date(right.startAt).getTime())[0] ?? null;

  return [
    'Fansten Parser Bot',
    '',
    `Telegram token: ${config.botToken ? 'connected' : 'missing'}`,
    `Webhook secret: ${config.webhookSecret ? 'configured' : 'missing'}`,
    `Control allow-list: ${hasControlAllowList(config) ? 'enabled' : 'private-chat fallback'}`,
    `Sync workflow: ${syncWorkflowStatus.configured ? 'configured' : 'missing'}`,
    formatSyncRunSummaryLine(latestSyncRun),
    '',
    `Sports registry: ${canonicalSportsRegistry.length}`,
    `Ready sports: ${readySports.length}`,
    `Planned sports: ${plannedSports.length}`,
    '',
    `Sources: ${catalogSourceRegistry.length}`,
    `Active sources: ${activeSources.length}`,
    `Planned sources: ${plannedSources.length}`,
    `Competition snapshots: ${competitions.length}`,
    `Upcoming/live events in catalog: ${events.length}`,
    `Live now: ${liveEvents.length}`,
    `Upcoming: ${upcomingEvents.length}`,
    nextEvent
      ? `Next event: ${nextEvent.title} | ${formatDateTime(nextEvent.startAt)} | ${getSportDisplayLabel(nextEvent.sportCode)}`
      : 'Next event: none',
  ].join('\n');
}

function getSportsText() {
  const sourceCounts = new Map<string, number>();

  for (const source of catalogSourceRegistry) {
    const normalized = normalizeCanonicalSportId(source.sportCode) ?? normalizeCanonicalSportId(source.segmentCode);
    if (!normalized) {
      continue;
    }
    sourceCounts.set(normalized, (sourceCounts.get(normalized) ?? 0) + 1);
  }

  const lines = canonicalSportsRegistry.map((sport) => {
    const sourceCount = sourceCounts.get(sport.id) ?? 0;
    const featured = sport.featured ? 'featured' : 'catalog';
    return `- ${sport.label} | ${sport.availability} | sources: ${sourceCount} | ${featured}`;
  });

  return ['Fansten sports registry', '', ...lines].join('\n');
}

function getSourcesText() {
  const active = catalogSourceRegistry.filter((source) => source.status === 'active');
  const planned = catalogSourceRegistry.filter((source) => source.status !== 'active');
  const lines = [
    'Fansten parser sources',
    '',
    `Active: ${active.length}`,
    ...active.map(
      (source) => `- ${source.provider} | ${source.competitionShortName} | ${getSportDisplayLabel(source.sportCode)} | ${source.parserKind}`,
    ),
    '',
    `Planned: ${planned.length}`,
    ...planned.map(
      (source) => `- ${source.provider} | ${source.competitionShortName} | ${getSportDisplayLabel(source.sportCode)} | ${source.parserKind}`,
    ),
  ];

  return lines.join('\n');
}

async function getUpcomingText(rawFilter: string) {
  const events = await getCatalogDbEvents();
  const normalizedFilter = normalizeCanonicalSportId(rawFilter);
  const filteredEvents = normalizedFilter
    ? events.filter((event) => normalizeCanonicalSportId(event.sportCode) === normalizedFilter)
    : events;

  const sortedEvents = [...filteredEvents].sort((left, right) => new Date(left.startAt).getTime() - new Date(right.startAt).getTime());
  const visibleEvents = sortedEvents.slice(0, 10);

  if (visibleEvents.length === 0) {
    return normalizedFilter
      ? `No upcoming events found for ${getSportDisplayLabel(normalizedFilter)}.`
      : 'No upcoming events found in the current catalog.';
  }

  const title = normalizedFilter ? `Upcoming: ${getSportDisplayLabel(normalizedFilter)}` : 'Upcoming and live events';

  return [
    title,
    '',
    ...visibleEvents.map(
      (event, index) =>
        `${index + 1}. ${event.title}\n${formatDateTime(event.startAt)} | ${event.competitionShortName} | ${event.city}\nstatus: ${event.status} | source: ${event.sourceLabel}`,
    ),
  ].join('\n\n');
}

function resolveSyncScope(body: string): CatalogSyncScope | null {
  const normalized = body.trim().toLowerCase();

  if (!normalized) {
    return 'all';
  }

  if ((SUPPORTED_SYNC_SCOPES as readonly string[]).includes(normalized)) {
    return normalized as CatalogSyncScope;
  }

  const canonical = normalizeCanonicalSportId(normalized);

  if (!canonical) {
    return null;
  }

  if (canonical === 'martial-arts') {
    return 'martial-arts';
  }

  if (canonical === 'football' || canonical === 'hockey' || canonical === 'basketball') {
    return canonical;
  }

  return null;
}

async function getSyncText(message: TelegramMessage, config: TelegramRuntimeConfig, rawScope: string) {
  const scope = resolveSyncScope(rawScope);

  if (!scope) {
    return [
      'Unknown sync scope.',
      '',
      `Available scopes: ${SUPPORTED_SYNC_SCOPES.join(', ')}`,
      'Examples:',
      '/sync all',
      '/sync football',
      '/sync hockey',
      '/sync basketball',
      '/sync ufc',
    ].join('\n');
  }

  if (!isControlAuthorized(message, config)) {
    return getControlUnauthorizedText(message);
  }

  const matchedSources = catalogSourceRegistry.filter((source) => {
    if (scope === 'all') {
      return source.status === 'active';
    }

    if (scope === 'ufc' || scope === 'martial-arts') {
      return normalizeCanonicalSportId(source.sportCode) === 'martial-arts' && source.status === 'active';
    }

    return normalizeCanonicalSportId(source.sportCode) === scope && source.status === 'active';
  });

  const dispatchResult = await triggerCatalogSyncWorkflow(
    scope,
    message.from?.username ? `@${message.from.username}` : String(message.from?.id ?? message.chat.id),
  );

  if (!dispatchResult.accepted) {
    return [
      'Sync is already running.',
      '',
      `Requested scope: ${scope}`,
      dispatchResult.activeRun ? formatSyncRunSummaryLine(dispatchResult.activeRun) : 'Latest sync run is already active.',
      dispatchResult.activeRun?.htmlUrl ? `Open run: ${dispatchResult.activeRun.htmlUrl}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  return [
    'Production catalog sync started.',
    '',
    `Scope: ${scope}`,
    `Matched active sources: ${matchedSources.length}`,
    ...matchedSources.map((source) => `- ${source.provider} | ${source.competitionShortName} | ${source.parserKind}`),
    '',
    'Mode: GitHub Actions -> Vercel production deploy',
    'Current implementation rebuilds the production catalog as one shared deployment.',
    dispatchResult.run ? formatSyncRunSummaryLine(dispatchResult.run) : 'Workflow run was accepted. GitHub may need a few seconds before the run becomes visible.',
    dispatchResult.run?.htmlUrl ? `Open run: ${dispatchResult.run.htmlUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

async function buildReply(message: TelegramMessage, config: TelegramRuntimeConfig): Promise<TelegramReply | null> {
  const text = message.text?.trim();

  if (!text) {
    return null;
  }

  if (!text.startsWith('/')) {
    return {
      text: clampTelegramText(['Fansten Parser Bot', '', 'Use one of the commands below:', getUsageText()].join('\n')),
      replyToMessageId: message.message_id,
    };
  }

  const { command, body } = splitCommand(text);

  switch (command) {
    case 'start':
    case 'help':
      return { text: clampTelegramText(getUsageText()), replyToMessageId: message.message_id };
    case 'status':
      return { text: clampTelegramText(await getStatusText(config)), replyToMessageId: message.message_id };
    case 'whoami':
      return { text: clampTelegramText(getIdentityText(message)), replyToMessageId: message.message_id };
    case 'sports':
      return { text: clampTelegramText(getSportsText()), replyToMessageId: message.message_id };
    case 'sources':
      return { text: clampTelegramText(getSourcesText()), replyToMessageId: message.message_id };
    case 'upcoming':
      return { text: clampTelegramText(await getUpcomingText(body)), replyToMessageId: message.message_id };
    case 'sync':
      return { text: clampTelegramText(await getSyncText(message, config, body)), replyToMessageId: message.message_id };
    default:
      return {
        text: clampTelegramText(['Unknown command.', '', getUsageText()].join('\n')),
        replyToMessageId: message.message_id,
      };
  }
}

export function getTelegramPublicStatus() {
  const config = getTelegramRuntimeConfig();

  return {
    telegramConfigured: Boolean(config.botToken),
    webhookSecretConfigured: Boolean(config.webhookSecret),
    hasAllowedChatIds: config.allowedChatIds.size > 0,
    hasAllowedUserIds: config.allowedUserIds.size > 0,
    parserMode: true,
    sportsRegistryCount: canonicalSportsRegistry.length,
    sourceRegistryCount: catalogSourceRegistry.length,
    syncWorkflowConfigured: getCatalogSyncWorkflowStatus().configured,
  };
}

export async function sendTelegramMessage(
  chatId: number,
  text: string,
  config = getTelegramRuntimeConfig(),
  replyToMessageId?: number,
) {
  if (!config.botToken) {
    throw new Error('Telegram bot token is not configured.');
  }

  const response = await fetch(`${TELEGRAM_API_BASE_URL}/bot${config.botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
      reply_to_message_id: replyToMessageId,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
}

export async function handleTelegramUpdate(update: TelegramUpdate) {
  const config = getTelegramRuntimeConfig();
  const message = update.message ?? update.edited_message;

  if (!message || !config.botToken) {
    return;
  }

  const reply = await buildReply(message, config);

  if (!reply) {
    return;
  }

  await sendTelegramMessage(message.chat.id, reply.text, config, reply.replyToMessageId);
}

export function isTelegramWebhookAuthorized(requestSecret: string | null) {
  const config = getTelegramRuntimeConfig();

  if (!config.webhookSecret) {
    return true;
  }

  return requestSecret === config.webhookSecret;
}
