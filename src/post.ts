import * as core from "@actions/core";
import * as cache from "@actions/cache";
import { exec } from "@actions/exec";

export const showStat = async () => {
  await exec(`${process.env["RUNNER_TEMP"]}/sccache/sccache -s`);
};

export const saveCache = async () => {
  try {
    const cacheKey = core.getInput("cache-key");
    await cache.saveCache(
      [`${process.env.HOME}/.cache/sccache`],
      `${cacheKey}-${new Date().toISOString()}`
    );
  } catch (err: any) {
    core.setFailed(err?.message);
  }
};

export const run = async () => {
  try {
    await showStat();
    await saveCache();
  } catch (err: any) {
    core.setFailed(err?.message);
  }
};

run();
