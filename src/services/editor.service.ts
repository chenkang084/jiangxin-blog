import * as mysql from "mysql";
import BaseService from "./base.service";
import { handleFuntionError } from "../utils/error.util";
import { mysqlQuery } from "../utils/sql.util";
import sqls from "../db/sqls";

interface Article {
  title: string;
  abstract: string;
  author: string;
  content: string;
  coverImg: string;
}

export default class EditorService extends BaseService {
  queryArticleByTitile = async (title: string) => {
    return await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.article_get, [title]);
    });
  };

  saveArticle = async ({
    title,
    abstract,
    author,
    content,
    coverImg
  }: Article) => {
    try {
      const { data: article } = await this.queryArticleByTitile(title);
      console.log(article);
      if (article && article.length > 0) {
        await this.updateArticleToDb(title, abstract, author, article[0].id);
      } else {
        await this.saveArticleToDb(title, abstract, author, coverImg);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  saveArticleToDb = async (
    title: string,
    abstract: string,
    author: string,
    coverImg: string
  ) => {
    return await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.article_insert, [
        title,
        abstract,
        author,
        coverImg
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
