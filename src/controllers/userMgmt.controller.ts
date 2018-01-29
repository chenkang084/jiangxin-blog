import { Request, Response } from "express";
import BaseController from "./base.controller";
import UserMgmtService from "../services/userMgmt.service";
import { log } from "../utils/common";
import { successResult, failResult } from "../utils/error.util";
import { BaseResult } from "../pojos/baseResult";

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
        res.send(successResult.call(this, data));
      })
      .catch(error => {
        failResult.call(this, error, res);
      });
  };

  addUser = (req: Request, res: Response) => {
    this.userMgmtService
      .addUser(req.body)
      .then(data => {
        res.send(successResult.call(this, "ok"));
      })
      .catch(error => {
        failResult.call(this, error, res);
      });
  };

  updateUser = (req: Request, res: Response) => {
    this.userMgmtService
      .updateUser(req.body)
      .then(data => {
        res.send(successResult.call(this, "ok"));
      })
      .catch(error => {
        failResult.call(this, error, res);
      });
  };

  deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    this.userMgmtService
      .delUserById(userId)
      .then(data => {
        res.send(successResult.call(this, "ok"));
      })
      .catch(error => {
        failResult.call(this, error, res);
      });
  };

  getUserById = (req: Request, res: Response) => {
    const userId = req.params.userId;
    this.userMgmtService
      .queryUserById(userId)
      .then(data => {
        let result: BaseResult | undefined;
        if (data && data.data.length > 0) {
          result = successResult.call(this, data.data[0]);
        }
        res.send(result);
      })
      .catch(error => {
        failResult.call(this, error, res);
      });
  };
}
