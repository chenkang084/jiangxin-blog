import { Express, Router, Request, Response, NextFunction } from "express";
import { log } from "../utils/common";
import { cephSevice } from "../services/axios.service";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    log("auth middle");

    const url = req.url;

    if (/\/api\/+/.exec(url)) {
      cephSevice.get("http://10.240.217.199:9999/v1/clusters").then(result => {
        res.send(result.data);
      });
    } else {
      next();
    }
  };
};
