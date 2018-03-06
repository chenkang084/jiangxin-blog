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
    this.unifyResult(res, async () => {
      await this.editorService.saveArticle({
        title,
        abstract,
        author,
        content,
        coverImg
      });
      await writeFile(
        path.join(__dirname, "../../static/articles"),
        title + ".html",
        content
      );
    });
  };

  articleList = (req: Request, res: Response) => {
    this.unifyResult(res, () => {
      return this.editorService.queryArticleList();
    });
  };

  articleDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.unifyResult(res, () => {
      return this.editorService.queryArtileDetailById(id);
    });
  };
}
