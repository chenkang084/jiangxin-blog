import { Db } from "../db/initializeDb";
import sqls from "../db/sqls";
import { log } from "../utils/common";

export default class UserMgmtService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async queryUser(params?: any[]): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(
        sqls.userMgmt_getAllUsers,
        params,
        (err, data, fields) => {
          if (err) {
            log(err);
            reject(err);
          } else {
            log(data);
            resolve(data);
          }
        }
      );
    });
  }
}
