import { Db } from "../db/initializeDb";

export default class UserMgmtService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async queryUser(params?: any[]): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(
        `SELECT id, user_name AS username, DATE_FORMAT( update_time, '%Y-%m-%d %h:%i:%s' ) AS time, CASE WHEN type = 1 THEN 'admin' ELSE 'ordinary' END AS type FROM USER`,
        params,
        (err, data, fields) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(data);
            resolve(data);
          }
        }
      );
    });
  }
}
