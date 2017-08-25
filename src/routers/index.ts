import authController from "./auth.router";
import profileController from "./profile.router";
import { Db } from "../db/initializeDb";
import { Express } from "express";

export default (app: Express, db: Db) => {
  authController(app, db);
  profileController(app, db);
};
