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
  await core.summary
    .addHeading("This is the lead in sentence for the list")
    .addList([
      "Lets add a bullet point",
      "Lets add a second bullet point",
      "How about a third one?",
    ])
    .write();
};
