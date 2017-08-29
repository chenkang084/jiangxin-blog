import * as express from "express";
import ProfileController from "../controllers/profile.controller";
import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";

export default (app: Express, db?: Db) => {
  const profileController = new ProfileController(app, db);

  const router = express.Router();
  router.get("/test", profileController.test);

  // Apply the routes to our application with the prefix /api
  app.use("/api/profile", router);
};
