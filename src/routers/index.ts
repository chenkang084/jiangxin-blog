import homeController from "./home.router";
import profileController from "./profile.router";
import { Db } from "../db/initializeDb";
import { Express } from "express";

export default (app: Express, db: Db) => {
  homeController(app, db);
  profileController(app, db);
};
