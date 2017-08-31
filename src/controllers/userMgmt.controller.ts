import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import BaseController from "./base.controller";
import { BaseResult } from "../pojos/baseResult";
import UserMgmtService from "../services/userMgmt.service";
import config from "../config";
import { log } from "../utils/common";

export default class UserMgmtController extends BaseController {
  public app: Express;
  public db: Db;
  private userMgmtService: UserMgmtService;

  constructor(app: Express, db: Db) {
    super();
    this.app = app;
    this.db = db;
    this.userMgmtService = new UserMgmtService(this.db);
  }

  /**
   * check user sign status
   */
  queryUserList = (req: Request, res: Response) => {
    const result: BaseResult = {
      type: "fail"
    };
    this.userMgmtService
      .queryUser()
      .then(data => {
        result.type = "success";
        result.items = data;
        res.send(result);
      })
      .catch(error => {
        result.msg = error;
        res.send(result);
      });
  };

  addUsers = (req: Request, res: Response) => {
    const result: BaseResult = {
      type: "fail"
    };

    this.userMgmtService
      .addUser(req.body)
      .then(data => {
        result.type = "success";
        res.send("ok");
      })
      .catch(error => {
        result.msg = error;
        res.send(result);
      });
  };
}
