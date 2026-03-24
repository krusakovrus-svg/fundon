import { getRequiredEnvValue, loadLocalEnv, telegramApiRequest } from './telegram-env.mjs';

const env = loadLocalEnv();
const token = getRequiredEnvValue(env, 'TELEGRAM_BOT_TOKEN');

const me = await telegramApiRequest(token, 'getMe', {});
const webhookInfo = await telegramApiRequest(token, 'getWebhookInfo', {});

console.log(
  JSON.stringify(
    {
      ok: true,
      bot: {
        id: me.id,
        username: me.username,
        firstName: me.first_name
      },
      webhook: {
        url: webhookInfo.url,
        hasCustomCertificate: webhookInfo.has_custom_certificate,
        pendingUpdateCount: webhookInfo.pending_update_count,
        maxConnections: webhookInfo.max_connections,
        lastErrorDate: webhookInfo.last_error_date ?? null,
        lastErrorMessage: webhookInfo.last_error_message ?? null
      }
    },
    null,
    2
  )
);
