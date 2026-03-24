import type { TelegramMessage, TelegramUpdate } from '@/types/telegram';
import { getXPublicStatus, publishPostToX } from '@/lib/x';

const MAX_POST_LENGTH = 280;
const TELEGRAM_API_BASE_URL = 'https://api.telegram.org';

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
      .filter(Boolean)
  );
}

function getTelegramRuntimeConfig(): TelegramRuntimeConfig {
  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN?.trim() ?? null,
    webhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET?.trim() ?? null,
    allowedChatIds: parseIdSet(process.env.TELEGRAM_ALLOWED_CHAT_IDS),
    allowedUserIds: parseIdSet(process.env.TELEGRAM_ALLOWED_USER_IDS)
  };
}

function normalizeDraft(input: string) {
  return input.replace(/\s+/g, ' ').trim();
}

function splitCommand(text: string) {
  const [rawCommand = ''] = text.trim().split(/\s+/, 1);
  const body = text.trim().slice(rawCommand.length).trim();

  return {
    command: rawCommand.replace(/^\//, '').split('@')[0].toLowerCase(),
    body
  };
}

function hasWriteAllowList(config: TelegramRuntimeConfig) {
  return config.allowedChatIds.size > 0 || config.allowedUserIds.size > 0;
}

function isWriteAuthorized(message: TelegramMessage, config: TelegramRuntimeConfig) {
  if (!hasWriteAllowList(config)) {
    return false;
  }

  const chatId = String(message.chat.id);
  const userId = message.from ? String(message.from.id) : null;

  return config.allowedChatIds.has(chatId) || (userId ? config.allowedUserIds.has(userId) : false);
}

function getIdentityText(message: TelegramMessage) {
  const chatId = String(message.chat.id);
  const userId = message.from ? String(message.from.id) : 'unknown';
  const username = message.from?.username ? `@${message.from.username}` : 'without username';

  return ['Текущий диалог:', `chat_id: ${chatId}`, `user_id: ${userId}`, `username: ${username}`].join('\n');
}

function getStatusText(message: TelegramMessage, config: TelegramRuntimeConfig) {
  const xStatus = getXPublicStatus();
  const canPublish = isWriteAuthorized(message, config) && xStatus.configured;

  return [
    'Fansten Blogger',
    '',
    `Telegram token: ${config.botToken ? 'подключён' : 'не настроен'}`,
    `Webhook secret: ${config.webhookSecret ? 'настроен' : 'не настроен'}`,
    `Право на публикацию: ${canPublish ? 'включено для этого диалога' : 'пока недоступно'}`,
    `Allow-list: ${hasWriteAllowList(config) ? 'настроен' : 'не настроен'}`,
    `X.com: ${xStatus.configured ? 'готов к публикации' : 'ещё не подключён'}`,
    `X account: ${xStatus.username ? `@${xStatus.username.replace(/^@/, '')}` : 'не указан'}`
  ].join('\n');
}

function getUsageText() {
  return [
    'Команды Fansten Blogger:',
    '/help — краткая справка',
    '/status — статус Telegram и X',
    '/whoami — показать chat_id и user_id',
    '/preview <текст> — предпросмотр поста',
    '/post <текст> — публикация в X',
    '',
    'Сейчас публикация в X заработает только после добавления X ключей и allow-list.'
  ].join('\n');
}

function getPreviewText(rawText: string) {
  const text = normalizeDraft(rawText);

  if (!text) {
    return 'Использование: /preview <текст поста>';
  }

  const charactersLeft = MAX_POST_LENGTH - text.length;
  const lengthStatus =
    charactersLeft >= 0
      ? `Длина: ${text.length}/${MAX_POST_LENGTH}. Осталось ${charactersLeft}.`
      : `Длина: ${text.length}/${MAX_POST_LENGTH}. Лимит превышен на ${Math.abs(charactersLeft)}.`;

  return ['Предпросмотр поста:', '', text, '', lengthStatus, 'Чтобы отправить: /post <тот же текст>'].join('\n');
}

function getUnauthorizedText(message: TelegramMessage) {
  return [
    'Публикация пока закрыта для этого диалога.',
    'Отправьте /whoami и добавьте ваш chat_id или user_id в allow-list.',
    '',
    getIdentityText(message)
  ].join('\n');
}

function getXNotReadyText() {
  return [
    'X.com ещё не подключён.',
    'Нужны server env переменные:',
    '- X_API_KEY',
    '- X_API_SECRET',
    '- X_ACCESS_TOKEN',
    '- X_ACCESS_TOKEN_SECRET',
    '- X_USERNAME'
  ].join('\n');
}

function getPlainTextHint(rawText: string) {
  const text = normalizeDraft(rawText);

  if (!text) {
    return getUsageText();
  }

  return [
    'Похоже на черновик поста.',
    '',
    text,
    '',
    `Длина: ${text.length}/${MAX_POST_LENGTH}.`,
    'Для публикации используйте: /post <текст>',
    'Для предпросмотра: /preview <текст>'
  ].join('\n');
}

async function buildReply(message: TelegramMessage, config: TelegramRuntimeConfig): Promise<TelegramReply | null> {
  const text = message.text?.trim();

  if (!text) {
    return null;
  }

  if (!text.startsWith('/')) {
    return {
      text: getPlainTextHint(text),
      replyToMessageId: message.message_id
    };
  }

  const { command, body } = splitCommand(text);

  switch (command) {
    case 'start':
    case 'help':
      return { text: getUsageText(), replyToMessageId: message.message_id };
    case 'status':
    case 'x_status':
      return { text: getStatusText(message, config), replyToMessageId: message.message_id };
    case 'whoami':
      return { text: getIdentityText(message), replyToMessageId: message.message_id };
    case 'preview':
      return { text: getPreviewText(body), replyToMessageId: message.message_id };
    case 'post': {
      const normalizedDraft = normalizeDraft(body);

      if (!normalizedDraft) {
        return { text: 'Использование: /post <текст поста>', replyToMessageId: message.message_id };
      }

      if (!isWriteAuthorized(message, config)) {
        return { text: getUnauthorizedText(message), replyToMessageId: message.message_id };
      }

      if (!getXPublicStatus().configured) {
        return { text: getXNotReadyText(), replyToMessageId: message.message_id };
      }

      try {
        const result = await publishPostToX(normalizedDraft);

        return {
          text: [
            'Пост опубликован в X.',
            '',
            result.text,
            '',
            `Post ID: ${result.id}`,
            result.url ? `Ссылка: ${result.url}` : 'Ссылка будет доступна после указания X_USERNAME.'
          ].join('\n'),
          replyToMessageId: message.message_id
        };
      } catch (error) {
        const detail = error instanceof Error ? error.message : 'Unknown error';

        return {
          text: `Не удалось опубликовать пост.\n\n${detail}`,
          replyToMessageId: message.message_id
        };
      }
    }
    default:
      return {
        text: ['Неизвестная команда.', '', getUsageText()].join('\n'),
        replyToMessageId: message.message_id
      };
  }
}

export function getTelegramPublicStatus() {
  const config = getTelegramRuntimeConfig();
  const xStatus = getXPublicStatus();

  return {
    telegramConfigured: Boolean(config.botToken),
    webhookSecretConfigured: Boolean(config.webhookSecret),
    hasAllowedChatIds: config.allowedChatIds.size > 0,
    hasAllowedUserIds: config.allowedUserIds.size > 0,
    xConfigured: xStatus.configured,
    xUsername: xStatus.username
  };
}

export async function sendTelegramMessage(
  chatId: number,
  text: string,
  config = getTelegramRuntimeConfig(),
  replyToMessageId?: number
) {
  if (!config.botToken) {
    throw new Error('Telegram bot token is not configured.');
  }

  const response = await fetch(`${TELEGRAM_API_BASE_URL}/bot${config.botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
      reply_to_message_id: replyToMessageId
    })
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
