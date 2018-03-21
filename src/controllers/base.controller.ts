import { Express, Router, Request, Response } from "express";
import { BaseResult } from "../pojos/baseResult";

// shared headers for all controller 
let headers = Object.create(null);

export default abstract class BaseController {
  protected async unifyResult(res: Response, cb: () => Promise<any>) {
    const result: BaseResult = { type: "fail" };
    try {
      const items = await cb();
      result.type = "success";
      if (items) {
        result.items = items;
      }
    } catch (error) {
      result.msg = error.message || error;
    }
    res.send(result);
  }

  // add or delete token headers
  protected processHeaders = (tokenHeaders?: object, req?: Request): object => {
    headers = { ...headers, ...tokenHeaders };
    return headers;
  };
}
