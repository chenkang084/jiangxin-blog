import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import Base from "./base.controller";
import { BaseResult } from "../pojos/baseResult";
import AuthService from "../services/auth.service";
import config from "../config";

export default class HomeController extends Base {
  private app: Express;
  private db: Db;

  constructor(app: Express, db: Db) {
    super();
    this.app = app;
    this.db = db;
  }

  auth = (req: Request, res: Response) => {
    res.send({ status: "ok" });
  };

  /**
   * check user sign status
   */
  signId = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result: BaseResult = {
      type: "fail"
    };

    if (username && password) {
      const authService = new AuthService(this.db);
      authService
        .queryUser([username, password])
        .then(data => {
          if (data && data.length > 0) {
            result.items = data;
            result.type = "success";
            const session = req.session as Express.Session;
            session.user = data[0];

            const auth_token = session.user.id + "$$$$"; // 以后可能会存储更多信息，用 $$$$ 来分隔
            const opts = {
              path: "/",
              maxAge: 1000 * 60 * 60 * 24 * 30,
              signed: true,
              httpOnly: true
            };
            res.cookie(config.session_secret, auth_token, opts); // cookie 有效期30天

            console.log("save user to session", session);
          } else {
            result.type = "fail";
          }
          res.send(result);
        })
        .catch(err => {
          result.msg = err;
          result.type = "fail";
          res.send(result);
        });
    } else {
      res.send(result);
    }
  };

  signOut = (req: Request, res: Response) => {
    const session = req.session as Express.Session;
    session.destroy(err => console.log(err));
    res.clearCookie(config.session_secret, { path: "/" });
    res.sendStatus(200);
  };
}
