import { Request, Response, NextFunction } from "express";
import { log } from "../utils/common";
import * as path from "path";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    log("html middle");

    console.log("html middle", req.url);

    if (req.method === "GET" && req.url.indexOf("api") < 0) {
      res.sendFile(path.resolve(__dirname, "../../ui", "index.html"));
    } else {
      next();
    }
  };
};
