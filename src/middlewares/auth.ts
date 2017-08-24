import { Express, Router, Request, Response, NextFunction } from "express";
// import * as session from "express-session";
import { Db } from "../db/initializeDb";

export default (db: Db) => {
  return (req: any, res: Response, next: NextFunction) => {
    console.log("auth middle");
    console.log(req.cookies);

    // if (req.session.user) {
    //   console.log("ok");

    // } else {
    //   db.mysql.query("select * from user", function(error, results, fields) {
    //     console.log(results);
    //   });
    // }

    return next();
  };
};
