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
