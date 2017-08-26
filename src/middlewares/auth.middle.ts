import { Express, Router, Request, Response, NextFunction } from "express";
// import * as session from "express-session";
import { Db } from "../db/initializeDb";
import config from "../config";

export default (db: Db) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("auth middle");

    // const session = req.session as Express.Session;
    // console.log(req.url);
    // if (req.url && req.url === "/api/auth/signId") {
    //   next();
    // } else {
    //   if (!session.user) {
    //     res.sendStatus(401);
    //   } else {
    //     next();
    //   }
    // }
    next();
  };
};
