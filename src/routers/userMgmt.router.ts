import * as express from "express";
import UserMgmtController from "../controllers/userMgmt.controller";

export default (app: express.Express) => {
  const userMgmtController = new UserMgmtController();

  const router = express.Router();
  router.get("/users", userMgmtController.queryUserList);

  router.post("/user", userMgmtController.addUser);

  router.put("/user", userMgmtController.updateUser);

  router.delete("/userId/:userId", userMgmtController.deleteUser);

  router.get("/userId/:userId", userMgmtController.getUserById);

  // Apply the routes to our application with the prefix /api
  app.use("/api/user", router);
};
