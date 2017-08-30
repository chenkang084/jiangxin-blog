import { Express, Router, Request, Response, NextFunction } from "express";
// import * as session from "express-session";
import { Db } from "../db/initializeDb";
import config from "../config";
import { log } from "../utils/common";

export default (db: Db) => {
  return (req: Request, res: Response, next: NextFunction) => {
    log("auth middle");

    if (config.debug) {
      next();
    } else {
      setTimeout(() => {
        const session = req.session as Express.Session;
        log(req.url);
        log(session.user);
        if (req.url && req.url === "/api/auth/signId") {
          next();
        } else {
          if (!session.user) {
            res.sendStatus(401);
          } else {
            next();
          }
        }
      }, 2000);
    }
  };
};
