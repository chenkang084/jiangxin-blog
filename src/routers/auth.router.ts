import * as express from "express";
import AuthController from "../controllers/auth.controller";
const prefix = "identity";

export default (app: express.Express) => {
  const authController = new AuthController();

  const router = express.Router();

  router.post(`/${prefix}/v3/auth/tokens`, authController.signIn);

  router.delete(`/${prefix}/v3/auth/tokens`, authController.signOut);

  // Apply the routes to our application with the prefix /api
  app.use(`/api`, router);
};
