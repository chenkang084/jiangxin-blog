import * as express from "express";
import UserMgmtController from "../controllers/userMgmt.controller";
// import { Db } from "../db/initializeDb";
import { Express, Router, Request, Response } from "express";

export default (app: Express) => {
  const userMgmtController = new UserMgmtController(app);

  const router = express.Router();
  router.get("/users", userMgmtController.queryUserList);

  router.post("/user", userMgmtController.addUser);

  router.put("/user", userMgmtController.updateUser);

  router.delete("/userId/:userId", userMgmtController.deleteUser);

  router.get("/userId/:userId", userMgmtController.getUserById);

  // Apply the routes to our application with the prefix /api
  app.use("/api/user", router);
};
