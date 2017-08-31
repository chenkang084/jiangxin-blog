import * as express from "express";
import UserMgmtController from "../controllers/userMgmt.controller";
import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";

export default (app: Express, db: Db) => {
  const userMgmtController = new UserMgmtController(app, db);

  const router = express.Router();
  router.get("/users", userMgmtController.queryUserList);

  router.post("/user", userMgmtController.addUsers);

//   // router.modify("")
//   router.put("/signOut", authController.signOut);

  // Apply the routes to our application with the prefix /api
  app.use("/api/user", router);
};
