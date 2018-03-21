import { Express, Router, Request, Response } from "express";
import { BaseResult } from "../pojos/baseResult";

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
}
