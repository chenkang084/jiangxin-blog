import { Express } from "express";
import authRoute from "./auth.router";
import profileRoute from "./profile.router";
import hostRoute from "./host.router";
import { Db } from "../db/initializeDb";

export default (app: Express, db: Db) => {
  authRoute(app, db);
  profileRoute(app, db);
  hostRoute(app, db);
};
