import { getRequiredEnvValue, getTelegramWebhookUrl, loadLocalEnv, telegramApiRequest } from './telegram-env.mjs';

const env = loadLocalEnv();
const token = getRequiredEnvValue(env, 'TELEGRAM_BOT_TOKEN');
const webhookSecret = getRequiredEnvValue(env, 'TELEGRAM_WEBHOOK_SECRET');
const webhookUrl = getTelegramWebhookUrl(env);

const commands = [
  { command: 'help', description: 'Справка по командам бота' },
  { command: 'status', description: 'Статус Telegram и X' },
  { command: 'whoami', description: 'Показать chat_id и user_id' },
  { command: 'preview', description: 'Предпросмотр поста в X' },
  { command: 'post', description: 'Публикация поста в X' }
];

const me = await telegramApiRequest(token, 'getMe', {});

await telegramApiRequest(token, 'setMyCommands', {
  commands
});

await telegramApiRequest(token, 'setWebhook', {
  url: webhookUrl,
  secret_token: webhookSecret,
  allowed_updates: ['message', 'edited_message'],
  drop_pending_updates: false
});

const webhookInfo = await telegramApiRequest(token, 'getWebhookInfo', {});

console.log(
  JSON.stringify(
    {
      ok: true,
      bot: {
        id: me.id,
        username: me.username,
        canJoinGroups: me.can_join_groups
      },
      webhook: {
        url: webhookInfo.url,
        pendingUpdateCount: webhookInfo.pending_update_count,
        lastErrorMessage: webhookInfo.last_error_message ?? null
      }
    },
    null,
    2
  )
);
