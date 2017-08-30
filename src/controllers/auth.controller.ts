import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import BaseController from "./base.controller";
import { BaseResult } from "../pojos/baseResult";
import AuthService from "../services/auth.service";
import config from "../config";
import { log } from "../utils/common";

export default class HomeController extends BaseController {
  public app: Express;
  public db: Db;
  private authService: AuthService;

  constructor(app: Express, db: Db) {
    super();
    this.app = app;
    this.db = db;
    this.authService = new AuthService(this.db);
  }

  /**
   * check user sign status
   */
  auth = (req: Request, res: Response) => {
    setTimeout(() => res.send({ status: "ok" }), 2000);
  };

  /**
   * signId
   */
  signId = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result: BaseResult = {
      type: "fail"
    };

    if (username && password) {
      this.authService
        .queryUser([username, password])
        .then(data => {
          if (data && data.length > 0) {
            result.items = data;
            result.type = "success";
            const session = req.session as Express.Session;
            session.user = data[0];
            // session, session cookie expires 30mins
            session.cookie.maxAge = 1000 * 60 * 30;
            session.cookie.expires = new Date(Date.now() + 1000 * 60 * 30);

            const auth_token = session.user.id + "$$$$"; // 以后可能会存储更多信息，用 $$$$ 来分隔
            const opts = {
              path: "/",
              maxAge: 1000 * 30,
              signed: true,
              httpOnly: true
            };
            res.cookie(config.session_secret, auth_token, opts); // cookie 有效期30天

            log("save user to session", session);
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

  /**
   * signOut
   */
  signOut = (req: Request, res: Response) => {
    const session = req.session as Express.Session;
    session.destroy(err => log(err));
    res.clearCookie(config.session_secret, { path: "/" });
    res.sendStatus(200);
  };
}
