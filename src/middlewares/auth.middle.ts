import { Express, Request, Response, NextFunction } from "express";
// import * as session from "express-session";
import config from "../config";
import { log } from "../utils/common";
import { delay } from "../utils/delay.util";

export default () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    log("auth middle");

    if (config.debug) {
      next();
    } else {
      const session = req.session as Express.Session;

      log(req.url);
      log("session.user", session.user);
      // sign api need not go through check sign status
      if (req.url && req.url === "/api/auth/signIn") {
        next();
      } else {
        if (!session.user) {
          await delay(1000);
          res.sendStatus(401);
        } else {
          next();
        }
      }
    }
  };
};
