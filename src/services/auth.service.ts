import { Db } from "../db/initializeDb";

export default class AuthService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async queryUser(params: any[]): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(
        `select * from user where user_name=? and user_pwd=?`,
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
