import fs from 'node:fs';
import path from 'node:path';

function stripQuotes(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
}

export function loadLocalEnv(cwd = process.cwd()) {
  const envPath = path.join(cwd, '.env.local');
  const merged = { ...process.env };

  if (!fs.existsSync(envPath)) {
    return merged;
  }

  const contents = fs.readFileSync(envPath, 'utf8');

  for (const line of contents.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = stripQuotes(trimmedLine.slice(separatorIndex + 1).trim());

    if (key) {
      merged[key] = value;
    }
  }

  return merged;
}

export function getRequiredEnvValue(env, name) {
  const value = env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }

  return value;
}

export function getTelegramWebhookUrl(env) {
  const baseUrl = (env.TELEGRAM_WEBHOOK_BASE_URL || 'https://fundon.vercel.app').trim().replace(/\/+$/, '');
  return `${baseUrl}/api/telegram/webhook`;
}

export async function telegramApiRequest(token, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const body = await response.json();

  if (!response.ok || !body.ok) {
    throw new Error(`Telegram API ${method} failed: ${JSON.stringify(body)}`);
  }

  return body.result;
}
