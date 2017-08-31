import config from "../config";

export const log = (...args: any[]) => {
  if (config.console) {
    console.log.apply(console, args);
  }
};
