import * as express from "express";
import TestController from "../controllers/test.controller";
import { Db } from "../db/initializeDb";
import { Express } from "express";
export default (app: Express, db: Db) => {
  const testController = new TestController(app, db);

  const router = express.Router();
  router.get("/test", testController.test);

  // Apply the routes to our application with the prefix /api
  app.use("/api/test", router);
};
