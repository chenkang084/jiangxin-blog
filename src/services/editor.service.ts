import * as mysql from "mysql";
import BaseService from "./base.service";
import { handleFuntionError } from "../utils/error.util";
import { mysqlQuery } from "../utils/sql.util";
import sqls from "../db/sqls";
import * as path from "path";
import { readFile } from "./file.service";
import * as moment from "moment";
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
      return mysqlQuery.call(this, sqls.article_getByTitle, [title]);
    });
  };

  queryArticleById = async (id: string) => {
    return await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.article_getById, [id]);
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
    return await handleFuntionError(async () => {
      const { data: articleList } = await mysqlQuery.call(
        this,
        sqls.article_list
      );
      if (articleList && articleList.length > 0) {
        return articleList.map((article: any) => {
          article.create_time = moment(article.create_time).format(
            "YYYY-MM-DD HH:mm"
          );
          article.update_time = moment(article.update_time).format(
            "YYYY-MM-DD HH:mm"
          );
          return article;
        });
      } else {
        return {};
      }
    });
  };

  /**
   * 通过id查询文章
   */
  queryArtileDetailById = async (id: string) => {
    try {
      const { data: articleList } = await this.queryArticleById(id);
      if (articleList && articleList.length > 0) {
        const article = articleList[0];
        const content = await readFile(
          path.join(__dirname, "../../articles/"),
          article.title + ".html"
        );
        article.content = content;
        article.create_time = moment(article.create_time).format(
          "YYYY-MM-DD HH:mm"
        );
        article.update_time = moment(article.update_time).format(
          "YYYY-MM-DD HH:mm"
        );
        return article;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
