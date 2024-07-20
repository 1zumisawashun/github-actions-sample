module.exports = async ({ github, context, core }) => {
  const res = github.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: process.env.MESSAGE,
  });
};
