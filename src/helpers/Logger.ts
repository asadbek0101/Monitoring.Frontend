import debug from "debug";

import { IS_DEV } from "../constants/AppConstants";

if (IS_DEV) {
  debug.enable("App:*");
}

type Printable = null | undefined | string | number;

export class Logger {
  private readonly logger?: debug.IDebugger;

  public constructor(namespace: string) {
    if (IS_DEV) {
      this.logger = debug(`App:${namespace}`);
    }
  }

  public log(message: string, ...args: Printable[]) {
    if (this.logger) {
      this.logger(message, ...args);
    }
  }

  public error(error: Error, ...args: Printable[]) {
    this.log(error.message, ...args);
  }
}
