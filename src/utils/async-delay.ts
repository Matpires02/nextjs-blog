import { logColor } from "./log-color";

export async function asyncDelay(milliseconds: number = 0, verbose = false) {
  if (milliseconds <= 0) return;

  if (verbose) {
    logColor(`Deleyaing for ${milliseconds / 1000}s`);
  }

  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
