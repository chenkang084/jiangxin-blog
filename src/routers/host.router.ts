import * as express from "express";
import HostController from "../controllers/host.controller";
import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";

export default (app: Express, db: Db) => {
  const hostController = new HostController(app, db);

  const router = express.Router();
  router.get("/list", hostController.host);
  router.get("/authDemo", hostController.authDemo);


  // Apply the routes to our application with the prefix /api
  app.use("/api/host", router);
};
