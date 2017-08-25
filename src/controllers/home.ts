import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import Base from "./base";
import { BaseResult } from "../pojos/baseResult";

export default class HomeController extends Base {
  private app: Express;
  private db: Db;

  constructor(app: Express, db: Db) {
    super();
    this.app = app;
    this.db = db;
  }

  test = (req: Request, res: Response) => {
    res.send({ name: "test" });
  };

  signId = (req: Request, res: Response) => {
    console.log(req.body);
    const { username, password } = req.body;
    const result: BaseResult = {
      type: "fail"
    };

    if (username && password) {
      // this.db
      this.db.mysql.query(
        `select * from user where user_name=''${username}' and user_pwd='${password}'`,
        (err, data, fields) => {
          if (err) {
            console.log(err);
            result.msg = err.message;
          } else {
            console.log(data);
            result.items = data;
            result.type = "success";
          }
          res.send(result);
        }
      );
    } else {
      res.send(result);
    }
  };
}
