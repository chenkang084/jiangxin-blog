import { Express, Router, Request, Response, NextFunction } from "express";

export default (res: Request, req: Response, next: NextFunction) => {
  console.log("middle");
  return next();
};
