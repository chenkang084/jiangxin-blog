import * as express from "express";
import AuthController from "../controllers/auth.controller";

export default (app: express.Express) => {
  const authController = new AuthController();

  const router = express.Router();
  //   router.get("/users", userMgmtController.queryUserList);

  router.post("/signIn", authController.signIn);

  //   router.put("/user", userMgmtController.updateUser);

  //   router.delete("/userId/:userId", userMgmtController.deleteUser);

  //   router.get("/userId/:userId", userMgmtController.getUserById);

  // Apply the routes to our application with the prefix /api
  app.use("/api/auth", router);
};
