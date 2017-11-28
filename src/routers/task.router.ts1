import * as express from "express";
import TaskController from "../controllers/task.controller";
import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
export default (app: Express, db: Db) => {
  const taskController = new TaskController(app);

  const router = express.Router();
  router.get("/test", taskController.test);

  app.use("/api/test", router);
};
