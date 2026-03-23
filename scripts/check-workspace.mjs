import { execFileSync } from 'node:child_process';
import path from 'node:path';

function fail(message) {
  console.error(message);
  process.exit(1);
}

function runGit(args) {
  return execFileSync('git', args, {
    cwd: process.cwd(),
    encoding: 'utf8'
  }).trim();
}

const cwd = path.resolve(process.cwd());
const repoRoot = path.resolve(runGit(['rev-parse', '--show-toplevel']));

if (cwd !== repoRoot) {
  fail(`Workspace guard failed: run commands from repo root "${repoRoot}", current directory is "${cwd}".`);
}

const trackedFiles = runGit(['ls-files', '--full-name'])
  .split(/\r?\n/)
  .filter(Boolean);

const nestedWorkspaceFiles = trackedFiles.filter((file) => file === 'fundon' || file.startsWith('fundon/'));

if (nestedWorkspaceFiles.length > 0) {
  fail(`Workspace guard failed: nested "fundon/" files are tracked by git: ${nestedWorkspaceFiles.slice(0, 5).join(', ')}`);
}

console.log(`Workspace guard passed at ${repoRoot}.`);
