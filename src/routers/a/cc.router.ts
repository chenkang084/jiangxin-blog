import * as express from "express";
import CcController from "../../controllers/a/cc.controller";
import { Db } from "../../db/initializeDb";
import { Express } from "express";
export default (app: Express, db: Db) => {
  const ccController = new CcController(app, db);
  const router = express.Router();
  router.get("/test", ccController.test);

  // Apply the routes to our application with the prefix /api
  app.use("/api/cc", router);
};