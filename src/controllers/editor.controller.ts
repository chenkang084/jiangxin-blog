import { Request, Response } from "express";
import BaseController from "./base.controller";
import { log } from "../utils/common";
import { BaseResult } from "../pojos/baseResult";
import config from "../config";
import { writeFile } from "../services/file.service";
import * as path from "path";
import EditorService from "../services/editor.service";
export default class EditorController extends BaseController {
  private editorService: EditorService = new EditorService();

  constructor() {
    super();
  }

  saveArticle = async (req: Request, res: Response) => {
    const { title, abstract, author, content, coverImg } = req.body;
    const result: BaseResult = { type: "fail" };
    try {
      await this.editorService.saveArticle({
        title,
        abstract,
        author,
        content,
        coverImg
      });
      await writeFile(
        path.join(__dirname, "../articles"),
        title + ".html",
        content
      );
      result.type = "success";
      res.send(result);
    } catch (error) {
      result.msg = error;
      res.send(result);
    }
  };

  articleList = async (req: Request, res: Response) => {
    const result: BaseResult = { type: "fali" };
    try {
      const articleList = await this.editorService.queryArticleList();
      result.items = articleList;
      result.type = "success";
      res.send(result);
    } catch (error) {
      result.msg = error;
    }
  };

  articleDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result: BaseResult = { type: "fail" };
    try {
      const article = await this.editorService.queryArtileDetailById(id);
      result.items = article;
      result.type = "success";
      res.send(result);
    } catch (error) {
      result.msg = error;
      res.send(result);
    }
  };
}
