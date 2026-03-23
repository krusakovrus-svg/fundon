import { execFileSync } from 'node:child_process';
import path from 'node:path';

const baseUrl = process.argv[2] ?? process.env.BASE_URL ?? 'https://fundon.vercel.app';
const playwrightCli = path.resolve(process.cwd(), 'node_modules', '@playwright', 'test', 'cli.js');

function run(command, args, env) {
  try {
    execFileSync(command, args, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes('Executable doesn\'t exist') || message.includes('playwright install')) {
      console.error('Playwright browser is missing. Run "npm run browser:install" first.');
    } else {
      console.error(`Admin review step failed: ${message}`);
    }

    process.exit(1);
  }
}

const env = {
  ...process.env,
  BASE_URL: baseUrl
};

run(process.execPath, [playwrightCli, 'test', 'tests/admin-smoke.spec.ts'], env);
run(process.execPath, ['scripts/capture-admin-screenshots.mjs', baseUrl], env);

console.log(`Admin review finished for ${baseUrl}`);
