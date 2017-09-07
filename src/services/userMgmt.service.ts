import * as mysql from "mysql";
import { Db } from "../db/initializeDb";
import sqls from "../db/sqls";
import { log } from "../utils/common";
import { genHash } from "../utils/bcrypt";

export default class UserMgmtService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async queryAllUser(params?: any[]): Promise<any> {
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

  async addUser(params: any): Promise<any> {
    // convert plain pwd to hash
    const hash = genHash(params.user_pwd);
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(
        sqls.userMgmt_addUser,
        [params.user_name, hash, params.type],
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

  async updateUser(params: any): Promise<any> {
    // convert plain pwd to hash
    const hash = genHash(params.user_pwd);
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(
        sqls.userMgmt_updateUser,
        [params.user_name, hash, params.type, params.id],
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

  async delUserById(userId: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(
        sqls.userMgmt_deleteUserById,
        [userId],
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

  async queryUserById(userId: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.db.mysql.query(
        sqls.userMgmt_queryUserById,
        [userId],
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
