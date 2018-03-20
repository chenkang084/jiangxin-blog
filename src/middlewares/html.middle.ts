import { Request, Response, NextFunction } from "express";
import { log } from "../utils/common";
import * as path from "path";

const pathFilters = [/^\/auth\/+/, /^\/api\/+/];

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    log("html middle");

    console.log("html middle", req.url);
    const filters = pathFilters.filter(reg => reg.exec(req.url));

    if (req.method === "GET" && filters.length === 0) {
      if (filters && filters.length === 0) {
        res.sendFile(path.resolve(__dirname, "../../static/", "index.html"));
      }
    } else {
      next();
    }
  };
};
