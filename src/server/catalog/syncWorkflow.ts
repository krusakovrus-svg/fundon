import 'server-only';

const DEFAULT_GITHUB_REPO_OWNER = 'krusakovrus-svg';
const DEFAULT_GITHUB_REPO_NAME = 'fundon';
const DEFAULT_GITHUB_WORKFLOW_FILE = 'vercel-production.yml';
const DEFAULT_GITHUB_WORKFLOW_REF = 'main';

export type CatalogSyncScope = 'all' | 'football' | 'hockey' | 'basketball' | 'martial-arts' | 'ufc';

type GitHubWorkflowDispatchPayload = {
  ref: string;
  inputs: {
    catalog_sync_scope: CatalogSyncScope;
    triggered_by?: string;
  };
};

type GitHubWorkflowRunRecord = {
  id: number;
  html_url: string;
  status: 'queued' | 'in_progress' | 'completed' | string;
  conclusion: string | null;
  created_at: string;
  updated_at: string;
  display_title?: string | null;
  head_branch: string;
  event: string;
  actor?: {
    login?: string;
  } | null;
};

type GitHubWorkflowRunsResponse = {
  workflow_runs?: GitHubWorkflowRunRecord[];
};

type GitHubSyncRuntimeConfig = {
  token: string | null;
  repoOwner: string;
  repoName: string;
  workflowFile: string;
  workflowRef: string;
};

export type CatalogSyncWorkflowRunSummary = {
  id: number;
  htmlUrl: string;
  status: string;
  conclusion: string | null;
  createdAt: string;
  updatedAt: string;
  displayTitle: string;
  branch: string;
  event: string;
  actor: string | null;
};

export type CatalogSyncDispatchResult = {
  accepted: boolean;
  scope: CatalogSyncScope;
  mode: 'workflow-dispatch';
  run: CatalogSyncWorkflowRunSummary | null;
  activeRun: CatalogSyncWorkflowRunSummary | null;
};

function getGitHubSyncRuntimeConfig(): GitHubSyncRuntimeConfig {
  return {
    token: process.env.GITHUB_WORKFLOW_TOKEN?.trim() ?? null,
    repoOwner: process.env.GITHUB_WORKFLOW_REPO_OWNER?.trim() || DEFAULT_GITHUB_REPO_OWNER,
    repoName: process.env.GITHUB_WORKFLOW_REPO_NAME?.trim() || DEFAULT_GITHUB_REPO_NAME,
    workflowFile: process.env.GITHUB_SYNC_WORKFLOW_FILE?.trim() || DEFAULT_GITHUB_WORKFLOW_FILE,
    workflowRef: process.env.GITHUB_SYNC_WORKFLOW_REF?.trim() || DEFAULT_GITHUB_WORKFLOW_REF,
  };
}

function getGitHubApiBasePath(config: GitHubSyncRuntimeConfig) {
  return `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/actions/workflows/${config.workflowFile}`;
}

function toRunSummary(run: GitHubWorkflowRunRecord): CatalogSyncWorkflowRunSummary {
  return {
    id: Number(run.id),
    htmlUrl: run.html_url,
    status: run.status,
    conclusion: run.conclusion ?? null,
    createdAt: run.created_at,
    updatedAt: run.updated_at,
    displayTitle: run.display_title?.trim() || `Workflow run #${run.id}`,
    branch: run.head_branch,
    event: run.event,
    actor: run.actor?.login?.trim() ?? null,
  };
}

async function githubRequest<T>(config: GitHubSyncRuntimeConfig, pathname: string, init?: RequestInit) {
  if (!config.token) {
    throw new Error('GitHub workflow token is not configured.');
  }

  const response = await fetch(pathname, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub workflow request failed: ${response.status} ${body}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

async function sleep(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function getCatalogSyncWorkflowStatus() {
  const config = getGitHubSyncRuntimeConfig();

  return {
    configured: Boolean(config.token),
    repoOwner: config.repoOwner,
    repoName: config.repoName,
    workflowFile: config.workflowFile,
    workflowRef: config.workflowRef,
  };
}

export async function getLatestCatalogSyncRun() {
  const config = getGitHubSyncRuntimeConfig();
  if (!config.token) {
    return null;
  }

  const runs = await githubRequest<GitHubWorkflowRunsResponse>(
    config,
    `${getGitHubApiBasePath(config)}/runs?branch=${encodeURIComponent(config.workflowRef)}&per_page=5`,
  );

  const latestRun = runs.workflow_runs?.[0] ?? null;
  return latestRun ? toRunSummary(latestRun) : null;
}

export async function triggerCatalogSyncWorkflow(scope: CatalogSyncScope, triggeredBy: string | null) {
  const config = getGitHubSyncRuntimeConfig();
  if (!config.token) {
    throw new Error('GitHub workflow token is not configured.');
  }

  const latestRun = await getLatestCatalogSyncRun();
  if (latestRun && latestRun.status !== 'completed') {
    return {
      accepted: false,
      scope,
      mode: 'workflow-dispatch',
      run: null,
      activeRun: latestRun,
    } satisfies CatalogSyncDispatchResult;
  }

  const payload: GitHubWorkflowDispatchPayload = {
    ref: config.workflowRef,
    inputs: {
      catalog_sync_scope: scope,
      ...(triggeredBy ? { triggered_by: triggeredBy } : {}),
    },
  };

  await githubRequest<null>(config, `${getGitHubApiBasePath(config)}/dispatches`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  let discoveredRun: CatalogSyncWorkflowRunSummary | null = null;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await sleep(1500);
    const candidateRun = await getLatestCatalogSyncRun();
    if (candidateRun) {
      discoveredRun = candidateRun;
      break;
    }
  }

  return {
    accepted: true,
    scope,
    mode: 'workflow-dispatch',
    run: discoveredRun,
    activeRun: null,
  } satisfies CatalogSyncDispatchResult;
}
