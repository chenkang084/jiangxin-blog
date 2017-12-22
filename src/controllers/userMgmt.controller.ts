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
   * query all users
   */
  queryUserList = (req: Request, res: Response) => {
    const result: BaseResult = {
      type: "fail"
    };

    this.userMgmtService
      .queryAllUser()
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

  addUser = (req: Request, res: Response) => {
    const result: BaseResult = {
      type: "fail"
    };

    this.userMgmtService
      .addUser(req.body)
      .then(data => {
        result.type = "success";
        res.send("ok");
      })
      .catch(({ error }) => {
        result.msg = error;
        res.send(result);
      });
  };

  updateUser = (req: Request, res: Response) => {
    const result: BaseResult = {
      type: "fail"
    };

    this.userMgmtService
      .updateUser(req.body)
      .then(data => {
        result.type = "success";
        res.send("ok");
      })
      .catch(error => {
        result.msg = error;
        res.send(result);
      });
  };

  deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result: BaseResult = {
      type: "fail"
    };

    this.userMgmtService
      .delUserById(userId)
      .then(data => {
        if (data && data.affectedRows > 0) {
          result.type = "success";
        }
        res.send(result);
      })
      .catch(error => {
        res.send(result);
      });
  };

  getUserById = (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result: BaseResult = {
      type: "fail"
    };

    this.userMgmtService
      .queryUserById(userId)
      .then(data => {
        if (data && data.length > 0) {
          result.type = "success";
          result.items = data[0];
        }
        res.send(result);
      })
      .catch(error => {
        res.send(result);
      });
  };
}
