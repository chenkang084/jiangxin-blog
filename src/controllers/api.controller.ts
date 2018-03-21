import { Request, Response } from "express";
import BaseController from "./base.controller";
import { log } from "../utils/common";
import { BaseResult } from "../pojos/baseResult";
import config from "../config";
import * as session from "express-session";
import { commonApiService } from "../services/api.service";
const prefix_regex = /^\/api\//;

export default class ApiController extends BaseController {
  handleCommonApis = (req: Request, res: Response) => {
    const url = req.url.replace(prefix_regex, "");
    commonApiService(
      { url, method: req.method, headers: this.processHeaders(), data: req.body },
      res
    );
  };
}
