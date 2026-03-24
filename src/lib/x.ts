import { Client, OAuth1 } from '@xdevplatform/xdk';

const FALLBACK_REDIRECT_URI = 'https://fansten.com/api/x/callback';
const MAX_POST_LENGTH = 280;

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  return value ? value : null;
}

export function getXPublicStatus() {
  const apiKey = getRequiredEnv('X_API_KEY');
  const apiSecret = getRequiredEnv('X_API_SECRET');
  const accessToken = getRequiredEnv('X_ACCESS_TOKEN');
  const accessTokenSecret = getRequiredEnv('X_ACCESS_TOKEN_SECRET');
  const username = getRequiredEnv('X_USERNAME');

  return {
    configured: Boolean(apiKey && apiSecret && accessToken && accessTokenSecret),
    username
  };
}

export function isXConfigured() {
  return getXPublicStatus().configured;
}

export interface PublishToXResult {
  id: string;
  text: string;
  url: string | null;
}

export async function publishPostToX(text: string): Promise<PublishToXResult> {
  const normalizedText = text.trim();

  if (!normalizedText) {
    throw new Error('Cannot publish an empty X post.');
  }

  if (normalizedText.length > MAX_POST_LENGTH) {
    throw new Error(`X post exceeds ${MAX_POST_LENGTH} characters.`);
  }

  const apiKey = getRequiredEnv('X_API_KEY');
  const apiSecret = getRequiredEnv('X_API_SECRET');
  const accessToken = getRequiredEnv('X_ACCESS_TOKEN');
  const accessTokenSecret = getRequiredEnv('X_ACCESS_TOKEN_SECRET');
  const redirectUri = getRequiredEnv('X_REDIRECT_URI') ?? FALLBACK_REDIRECT_URI;
  const username = getRequiredEnv('X_USERNAME');

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    throw new Error('X credentials are not configured.');
  }

  const oauth1 = new OAuth1({
    apiKey,
    apiSecret,
    callback: redirectUri,
    accessToken,
    accessTokenSecret
  });

  const client = new Client({ oauth1 });
  const response = await client.posts.create({ text: normalizedText });
  const postId = response.data?.id;
  const postText = response.data?.text ?? normalizedText;

  if (!postId) {
    throw new Error('X API did not return a post id.');
  }

  return {
    id: postId,
    text: postText,
    url: username ? `https://x.com/${username.replace(/^@/, '')}/status/${postId}` : null
  };
}
