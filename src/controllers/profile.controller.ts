import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import Base from "./base.controller";

export default class HomeController extends Base {
  private app: Express;
  private db?: Db;

  constructor(app: Express, db?: Db) {
    super();
    this.app = app;
    this.db = db;
  }

  test = (req: Request, res: Response) => {
    res.send({ name: "test" });
  };
}
