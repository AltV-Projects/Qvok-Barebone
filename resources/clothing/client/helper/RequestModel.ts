import { setInterval, clearInterval, log } from "alt-client";
import { isModelValid, hasModelLoaded, requestModel } from "natives";

export const RequestModel = async (modelHash, timeoutMs = 1000) => {
  return new Promise((resolve, reject) => {
    if (!isModelValid(modelHash)) {
      reject(new Error(`Model does not exist: ${modelHash}`));
      return;
    }

    if (hasModelLoaded(modelHash)) {
      resolve(true);
      return;
    }

    requestModel(modelHash);

    const deadline = new Date().getTime() + timeoutMs;

    const inter = setInterval(() => {
      if (hasModelLoaded(modelHash)) {
        clearInterval(inter);
        resolve(true);
      } else if (deadline < new Date().getTime()) {
        clearInterval(inter);
        const error = `Error: Async loading failed for model: ${modelHash}`;
        log(error);
        reject(new Error(error)); // probably better resolve(false)
      }
    }, 10);
  });
};
