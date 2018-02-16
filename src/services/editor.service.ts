import * as mysql from "mysql";
import BaseService from "./base.service";
import { handleFuntionError } from "../utils/error.util";
import { mysqlQuery } from "../utils/sql.util";
import sqls from "../db/sqls";

export default class EditorService extends BaseService {
  queryArticleByTitile = async (title: string) => {
    return await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.article_get, [title]);
    });
  };

  saveArticle = async (title: string, abstract: string, author: string) => {
    try {
      const { data: article } = await this.queryArticleByTitile(title);
      console.log(article);
      if (article && article.length > 0) {
        await this.updateArticleToDb(title, abstract, author, article[0].id);
      } else {
        await this.saveArticleToDb(title, abstract, author);
      }
    } catch (error) {}
  };

  saveArticleToDb = async (title: string, abstract: string, author: string) => {
    return await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.article_insert, [
        title,
        abstract,
        author
      ]);
    });
  };

  updateArticleToDb = async (
    title: string,
    abstract: string,
    author: string,
    id: string
  ) => {
    await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.article_update, [abstract, id]);
    });
  };

  queryArticleList = async () => {
    return await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.article_list);
    });
  };
}
