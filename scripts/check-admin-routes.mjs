const baseUrl = (process.argv[2] ?? 'https://fundon.vercel.app').replace(/\/$/, '');

const adminRoutes = [
  '/admin',
  '/admin/events',
  '/admin/users',
  '/admin/ratings',
  '/admin/donations',
  '/admin/athletes',
  '/admin/rooms',
  '/admin/notifications',
  '/admin/moderation',
  '/admin/settings',
  '/admin/analytics'
];

const requiredMarkers = ['FUNDON', 'Admin Console'];
const forbiddenMarkers = ['FightPulse v2', 'This page could not be found'];
const maxAttempts = 6;
const retryDelayMs = 5000;

function stripScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function checkRoute(path) {
  const url = `${baseUrl}${path}`;
  let response;

  try {
    response = await fetch(url, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000)
    });
  } catch (error) {
    return {
      ok: false,
      path,
      status: 'ERR',
      reason: error instanceof Error ? error.message : String(error)
    };
  }

  const body = await response.text();
  const visibleHtml = stripScripts(body);
  const missingMarkers = requiredMarkers.filter((marker) => !visibleHtml.includes(marker));
  const presentForbiddenMarkers = forbiddenMarkers.filter((marker) => visibleHtml.includes(marker));

  if (!response.ok) {
    return {
      ok: false,
      path,
      status: response.status,
      reason: `unexpected status ${response.status}`
    };
  }

  if (missingMarkers.length > 0) {
    return {
      ok: false,
      path,
      status: response.status,
      reason: `missing markers: ${missingMarkers.join(', ')}`
    };
  }

  if (presentForbiddenMarkers.length > 0) {
    return {
      ok: false,
      path,
      status: response.status,
      reason: `forbidden markers found: ${presentForbiddenMarkers.join(', ')}`
    };
  }

  return {
    ok: true,
    path,
    status: response.status
  };
}

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const results = [];

  for (const path of adminRoutes) {
    results.push(await checkRoute(path));
  }

  const failures = results.filter((result) => !result.ok);

  for (const result of results) {
    if (result.ok) {
      console.log(`[ok] ${result.path} (${result.status})`);
    } else {
      console.error(`[fail] ${result.path} (${result.status}): ${result.reason}`);
    }
  }

  if (failures.length === 0) {
    console.log(`Admin routes are healthy on ${baseUrl}.`);
    process.exit(0);
  }

  if (attempt < maxAttempts) {
    console.log(`Attempt ${attempt}/${maxAttempts} failed. Retrying in ${retryDelayMs / 1000}s...`);
    await sleep(retryDelayMs);
  }
}

console.error(`Admin route smoke check failed for ${baseUrl}.`);
process.exit(1);
