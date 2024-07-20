module.exports = async ({ github, context, core }) => {
  const commit = await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: "👋 Thanks for reporting!",
  });
  core.exportVariable("author", commit.data.commit.author.email);
};
