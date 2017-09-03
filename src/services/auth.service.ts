import { Db } from "../db/initializeDb";
import sqls from "../db/sqls";
import { log } from "../utils/common";
import { compareHash } from "../utils/bcrypt";

export default class AuthService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async queryUser(params: any[]): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(sqls.auth_queryUser, params, (err, data, fields) => {
        if (err) {
          log(err);
          reject(err);
        } else {
          if (data.length > 0 && data[0]) {
            // plainPwd not equals hashPwd ,return undefined
            if (!this.validatePwd(params[1], data[0].user_pwd)) {
              data = undefined;
            }
          }

          resolve(data);
        }
      });
    });
  }

  validatePwd(plainPwd: string, hashPwd: string) {
    return compareHash(plainPwd, hashPwd);
  }
}
