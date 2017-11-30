export const generatorRouterTemplate = function(fileName: string) {
  return `import * as express from "express";
import { Db } from "../db/initializeDb";
import testController from "../controllers/test.controller";
import { Express } from "express";
export default (app: Express, db: Db) => {
  const taskController = new TaskController(app);

  const router = express.Router();
  router.get("/test", taskController.test);

  app.use("/api/test", router);
};`;
};





