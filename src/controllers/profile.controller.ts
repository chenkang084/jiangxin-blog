import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
import * as express from "express";
import BaseController from "./base.controller";

export default class HomeController extends BaseController {
  public app: Express;
  public db: Db;

  constructor(app: Express, db: Db) {
    super();
    this.app = app;
    this.db = db;
  }

  test = (req: Request, res: Response) => {
    res.send({ name: "test" });
  };
}
