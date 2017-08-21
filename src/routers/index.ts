import homeController from "./home.router";
import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
export default (app: Express, db: Db) => {
  homeController(app, db);
};
