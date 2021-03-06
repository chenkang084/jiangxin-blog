import * as express from "express";
import AuthController from "../controllers/auth.controller";

export default (app: express.Express) => {
  const authController = new AuthController();

  const router = express.Router();
  router.get("/userInfo", authController.userInfo);

  router.post("/signIn", authController.signIn);

  router.put("/signOut", authController.signOut);

  //   router.delete("/userId/:userId", userMgmtController.deleteUser);

  //   router.get("/userId/:userId", userMgmtController.getUserById);

  // Apply the routes to our application with the prefix /api
  app.use("/api/auth", router);
};
