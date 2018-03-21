import * as express from "express";
import { Request, Response } from "express";
import ApiController from "../controllers/api.controller";
const prefix = "identity";

export default (app: express.Express) => {
  const apiController = new ApiController();

  const router = express.Router();

  // handle all others apis
  router.all("*", apiController.handleCommonApis);

  // Apply the routes to our application with the prefix /api
  app.use(`/api`, router);
};
