import { Request, Response, NextFunction } from "express";
import { log } from "../utils/common";
import * as path from "path";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    log("html middle");

    if (req.method === "GET") {
      res.sendFile(path.resolve(__dirname, "../../public", "index.html"));
    } else {
      next();
    }
  };
};
