import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";

export default abstract class BaseController {

  public abstract db: Db;
  public abstract app: Express;

}
