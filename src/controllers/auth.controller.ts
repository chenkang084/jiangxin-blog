import { Request, Response } from "express";
import BaseController from "./base.controller";
import { log } from "../utils/common";
import { BaseResult } from "../pojos/baseResult";
import config from "../config";
import * as session from "express-session";
import { login, logout } from "../services/auth.service";
export default class AuthController extends BaseController {
  constructor() {
    super();
  }

  signIn = (req: Request, res: Response) => {
    const url = req.url.replace(/^\/auth\/+/, "");
    login({ url, method: "post", headers: req.headers, data: req.body }, res);
  };

  signOut = (req: Request, res: Response) => {
    const url = req.url.replace(/^\/auth\/+/, "");
    login({ url, method: "delete", headers: req.headers, data: req.body }, res);
  };
}
