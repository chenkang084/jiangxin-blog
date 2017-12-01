import { Db } from "../../db/initializeDb";
import { Express, Request, Response } from "express";
import CcService from "../../services/a/cc.service";

export default class CcController {
  public app: Express;
  public db: Db;
  private ccService: CcService = new CcService();

  constructor(app: Express, db: Db) {
    this.app = app;
    this.db = db;
  }

  test = (req: Request, res: Response) => {
    res.send(this.ccService.test());
  };
}
