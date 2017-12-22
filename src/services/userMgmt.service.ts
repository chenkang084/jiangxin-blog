import * as mysql from "mysql";
import { Db } from "../db/initializeDb";
import sqls from "../db/sqls";
import { log } from "../utils/common";
import { genHash } from "../utils/bcrypt";
import { mysqlQuery } from "../utils/sql.util";

export default class UserMgmtService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async queryAllUser(params?: any[]): Promise<any> {
    try {
      return await mysqlQuery.call(this, sqls.userMgmt_getAllUsers, params);
    } catch (error) {
      return { error };
    }
  }

  async addUser(params: any): Promise<any> {
    try {
      // convert plain pwd to hash
      const hash = genHash(params.user_pwd);
      return await mysqlQuery.call(this, sqls.userMgmt_addUser,
        [params.user_name, hash, params.type]);
    } catch (error) {
      return { error };
    }
  }

  async updateUser(params: any): Promise<any> {
    try {
      // convert plain pwd to hash
      const hash = genHash(params.user_pwd);
      return await mysqlQuery.call(this, sqls.userMgmt_updateUser, [params.user_name, hash, params.type, params.id]);
    } catch (error) {
      return { error };
    }
  }

  async delUserById(userId: string): Promise<any> {
    try {
      return await mysqlQuery.call(this, sqls.userMgmt_deleteUserById, [userId]);
    } catch (error) {

    }
  }

  async queryUserById(userId: string): Promise<any> {
    try {
      return await mysqlQuery.call(this, sqls.userMgmt_queryUserById, [userId]);
    } catch (error) {
      return { error };
    }
  }
}
