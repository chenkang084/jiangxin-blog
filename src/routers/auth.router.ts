import * as express from "express";
import AuthController from "../controllers/auth.controller";
import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";
export default (app: Express, db: Db) => {
  const authController = new AuthController(app, db);

  const router = express.Router();
  router.get("/auth", authController.auth);

  router.post("/signId", authController.signId);

  // router.modify("")
  router.put("/signOut", authController.signOut);

  // Apply the routes to our application with the prefix /api
  app.use("/api/auth", router);
};

