import { Db } from "../db/initializeDb";
import { Express, Request, Response } from "express";
import TestService from "../services/test.service";

export default class TestController {
  public app: Express;
  public db: Db;
  private testService: TestService = new TestService();

  constructor(app: Express, db: Db) {
    this.app = app;
    this.db = db;
  }

  test = (req: Request, res: Response) => {
    res.send(this.testService.test());
  };
}
