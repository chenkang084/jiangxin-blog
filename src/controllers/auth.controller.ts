import { Request, Response } from "express";
import BaseController from "./base.controller";
import { log } from "../utils/common";
import { BaseResult } from "../pojos/baseResult";
import AuthService from "../services/auth.service";
import config from "../config";
import * as session from "express-session";
export default class AuthController extends BaseController {
  private authService: AuthService = new AuthService();
  constructor() {
    super();
  }

  /**
   * check user sign status
   */
  userInfo = (req: Request, res: Response) => {
    const session = req.session as Express.Session;
    res.send(session.user);
  };

  /**
   * signId
   */
  signIn = async (req: Request, res: Response) => {
    const { user_name, user_pwd } = req.body;
    this.unifyResult(res, async () => {
      const data = await this.authService.queryUser(user_name, user_pwd);
      if (data) {
        const session = req.session as Express.Session;
        session.user = data;
        // session, session cookie expires 30mins
        session.cookie.maxAge = 1000 * 60 * 30;
        session.cookie.expires = new Date(Date.now() + 1000 * 60 * 30);

        const auth_token = session.user.id + "$$$$"; // 以后可能会存储更多信息，用 $$$$ 来分隔
        const opts = {
          path: "/",
          maxAge: 1000 * 60 * 30, // milliseconds
          signed: true,
          httpOnly: true
        };
        res.cookie(config.session_secret, auth_token, opts);
        log("save user to session", session);
      } else {
        return Promise.reject("用户名密码不正确！");
      }
    });
  };

  /**
   * signOut
   */
  signOut = (req: Request, res: Response) => {
    const session = req.session as Express.Session;
    session.destroy(error => log(error));
    res.clearCookie(config.session_secret, { path: "/" });
    res.sendStatus(200);
  };
}
