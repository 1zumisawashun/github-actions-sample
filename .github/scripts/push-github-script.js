// @ts-check
/** @param {import('@types/github-script').AsyncFunctionArguments} AsyncFunctionArguments */
export default async ({ core, context }) => {
  core.debug("Running something at the moment");
  return context.actor;
};
