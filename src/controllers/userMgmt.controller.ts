import { Express, Router, Request, Response } from "express";
import * as express from "express";
import BaseController from "./base.controller";
import { BaseResult } from "../pojos/baseResult";
import UserMgmtService from "../services/userMgmt.service";
import config from "../config";
import { log } from "../utils/common";
import { successResult, failResult } from "../utils/error.util";

export default class UserMgmtController extends BaseController {
  private userMgmtService: UserMgmtService = new UserMgmtService();

  constructor() {
    super();
  }

  /**
   * query all users
   */
  queryUserList = (req: Request, res: Response) => {
    this.userMgmtService
      .queryAllUser()
      .then(data => {
        successResult.call(this, data);
        res.send(this.result);
      })
      .catch(error => {
        failResult.call(this, error);
      });
  };

  addUser = (req: Request, res: Response) => {
    this.userMgmtService
      .addUser(req.body)
      .then(data => {
        successResult.call(this, "ok");
        res.send(this.result);
      })
      .catch((error) => {
        failResult.call(this, error);
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
