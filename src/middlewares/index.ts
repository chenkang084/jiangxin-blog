import apiMiddle from "./api.middle";
import authMiddle from "./auth.middle";
import htmlMiddle from "./html.middle";
import { Application } from "express";

// export { apiMiddle, authMiddle, htmlMiddle };

export default (app: Application) => {
  app.use(htmlMiddle());
  app.use(apiMiddle());
  // app.use(authMiddle());

};
