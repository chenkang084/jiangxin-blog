import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import BaseController from "./base.controller";
import { BaseResult } from "../pojos/baseResult";
import AuthService from "../services/auth.service";
import config from "../config";
const Mock = require("mockjs");

export default class HostController extends BaseController {
  public app: Express;
  public db: Db;

  constructor(app: Express, db: Db) {
    super();
    this.app = app;
    this.db = db;
  }

  host = (req: Request, res: Response) => {
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

    res.status(200).json({
      items: database,
      total: database.length
    });
  };

  authDemo = (req: Request, res: Response) => {
    const usersListData: any = Mock.mock({
      "data|3": [
        {
          "name|1": ["cluster", "host", "rbd"],
          "nameCn|1": ["集群", "主机", "卷"],
          subActions: [
            {
              name: "add host",
              nameCn: "添加主机",
              enable: true
            }
          ]
        }
      ]
    });

    res.status(200).json({
      items: usersListData.data,
      total: usersListData.data.length
    });
  };
}
