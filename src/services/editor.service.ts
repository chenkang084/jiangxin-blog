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
      const mysqlPool = (await this.mysql) as mysql.IPool;
      mysqlPool.getConnection((error, connection) => {
        if (error) {
          return Promise.reject(error);
        }

        connection.beginTransaction(transactionError => {
          if (transactionError) {
            return Promise.reject(transactionError);
          }

          connection.query(
            sqls.article_getByTitle,
            [title],
            (titleError, result, fields) => {
              if (titleError) {
                return connection.rollback(() => {
                  throw titleError;
                });
              }

              const { data: article } = result;
              if (article && article.length > 0) {
                connection.query(
                  sqls.article_update,
                  [abstract, article[0].id],
                  updateError => {
                    if (updateError) {
                      return connection.rollback(() => {
                        throw updateError;
                      });
                    }
                  }
                );
                // this.updateArticleToDb(title, abstract, author, article[0].id);
              } else {
                connection.query(
                  sqls.article_insert,
                  [title, abstract, author, coverImg],
                  insertError => {
                    if (insertError) {
                      return connection.rollback(() => {
                        throw insertError;
                      });
                    }
                  }
                );
                // this.saveArticleToDb(title, abstract, author, coverImg);
              }

              connection.commit(commitError => {
                if (commitError) {
                  return connection.rollback(() => {
                    throw commitError;
                  });
                }

                console.log("success!");
              });
            }
          );

          // const { data: article } = await this.queryArticleByTitile(title);
          // if (article && article.length > 0) {
          //   await this.updateArticleToDb(
          //     title,
          //     abstract,
          //     author,
          //     article[0].id
          //   );
          // } else {
          //   await this.saveArticleToDb(title, abstract, author, coverImg);
          // }

          // connection.commit();
        });
      });
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
          path.join(__dirname, "../../static/articles/"),
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
      } else {
        return {};
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
