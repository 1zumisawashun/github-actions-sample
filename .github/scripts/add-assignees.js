/**
 * @see https://blog.kinto-technologies.com/posts/2023-12-03-AutoReviewersGitHubActions/
 * @see https://zenn.dev/takasp/articles/f46eab95453ed0
 */

/**
 * @typedef {import("@actions/github").context } Context
 * @typedef {import("@actions/core")} Core
 * @typedef {ReturnType<import("@actions/github")["getOctokit"]>} GitHub
 */

/**
 * @param {Object} options - The options object.
 * @param {GitHub} options.github - The GitHub object.
 * @param {Context} options.context - The context object.
 * @param {Core} options.core - The core object.
 */
module.exports = async ({ github, context, core }) => {
  // PR作成者を取得
  const user = context.payload.sender.login;
  // PR番号を取得
  const issue_number = context.issue.number;
  // リポジトリ情報を取得
  const { repo, owner } = context.repo;

  await github.rest.issues.addAssignees({
    owner,
    repo,
    issue_number,
    assignees: [user],
  });
};
