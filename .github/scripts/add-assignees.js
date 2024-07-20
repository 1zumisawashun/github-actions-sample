/** @see https://blog.kinto-technologies.com/posts/2023-12-03-AutoReviewersGitHubActions/ */
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
