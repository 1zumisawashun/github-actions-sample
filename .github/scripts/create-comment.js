/** @see https://zenn.dev/yy616/articles/433f1496f69b30 */

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
  // PR番号を取得
  const issue_number = context.issue.number;
  // リポジトリ情報を取得
  const { repo, owner } = context.repo;

  const comments = await github.rest.issues.listComments({
    issue_number,
    owner,
    repo,
  });

  const comment = comments.data.find((comment) =>
    comment.body.startsWith("👋 Thanks for reporting!")
  );

  if (comment) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: comment.id,
      body: "👋 Thanks for reporting! updated",
    });
    return;
  }

  await github.rest.issues.createComment({
    issue_number,
    owner,
    repo,
    body: "👋 Thanks for reporting!",
  });
};
