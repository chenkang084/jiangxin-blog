import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import BaseController from "./base.controller";
import { BaseResult } from "../pojos/baseResult";
import AuthService from "../services/auth.service";
import config from "../config";
const Mock = require("mockjs");

const usersListData: any = Mock.mock({
  "data|50-100": [
    {
      id: /^\d{9}$/,
      key: /^\d{9}$/,
      name: "@name",
      nickName: "@last",
      phone: /^1[34578]\d{9}$/,
      "age|11-99": 1,
      address: "@county(true)",
      isMale: "@boolean",
      email: "@email",
      createTime: "@datetime",
      avatar() {
        return Mock.Random.image(
          "100x100",
          Mock.Random.color(),
          "#757575",
          "png",
          this.nickName.substr(0, 1)
        );
      }
    }
  ]
});

const database = usersListData.data;

export default class HostController extends BaseController {
  public app: Express;
  public db: Db;

  constructor(app: Express, db: Db) {
    super();
    this.app = app;
    this.db = db;
  }

  host = (req: Request, res: Response) => {
    const newData = database;

    res.status(200).json({
      data: newData,
      total: newData.length
    });
  };
}

