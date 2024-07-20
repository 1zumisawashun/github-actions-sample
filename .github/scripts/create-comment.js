module.exports = async ({ github, context, core }) => {
  // PR番号を取得
  const issue_number = context.issue.number;
  // リポジトリ情報を取得
  const { repo, owner } = context.repo;

  await github.rest.issues.createComment({
    issue_number,
    owner,
    repo,
    body: "👋 Thanks for reporting!",
  });
};
