import { Express, Router, Request, Response, NextFunction } from "express";
// import * as session from "express-session";
import { Db } from "../db/initializeDb";
import config from "../config";

export default (db: Db) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("auth middle");
    console.log(req.signedCookies[""]);
    console.log(req.session);

    // if (req.session.user) {
    //   console.log("ok");
    //   res.sendStatus(200);
    //   return next();
    // } else {
    //   // res.sendStatus(403);

    //   const user_id = req.signedCookies[config.session_secret];
    //   if (user_id) {
    //     db.mysql.query(`select * from user where id=${user_id}`, function(
    //       error,
    //       results,
    //       fields
    //     ) {
    //       console.log(results);
    //     });
    //   } else {
    //     console.log(".");
    //   }

    //   // not login id
    //   if (1) {
    //     res.sendStatus(403);
    //   } else {
    //     next();
    //   }
    // }
    next();
  };
};
