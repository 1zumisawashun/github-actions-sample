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
