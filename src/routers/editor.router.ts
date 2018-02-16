import * as express from "express";
import EditorController from "../controllers/editor.controller";

export default (app: express.Express) => {
  const editorController = new EditorController();

  const router = express.Router();

  router.post("/article", editorController.saveArticle);

  router.get("/articles", editorController.articleList);

  app.use("/api/editor", router);
};
