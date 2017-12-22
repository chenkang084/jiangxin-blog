import * as mysql from "mysql";
import { Db } from "../db/initializeDb";
import sqls from "../db/sqls";
import { log } from "../utils/common";
import { genHash } from "../utils/bcrypt";
import { mysqlQuery } from "../utils/sql.util";
import { handleFuntionError } from "../utils/error.util";

export default class UserMgmtService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async queryAllUser(params?: any[]): Promise<any> {
    handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.userMgmt_getAllUsers, params);
    });
  }

  addUser(params: any): Promise<any> {
    return handleFuntionError(() => {
      const hash = genHash(params.user_pwd);
      return mysqlQuery.call(this, sqls.userMgmt_addUser,
        [params.user_name, hash, params.type]);
    });
  }

  async updateUser(params: any): Promise<any> {
    return handleFuntionError(() => {
      // convert plain pwd to hash
      const hash = genHash(params.user_pwd);
      return mysqlQuery.call(this, sqls.userMgmt_updateUser, [params.user_name, hash, params.type, params.id]);
    });
  }

  async delUserById(userId: string): Promise<any> {
    return handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.userMgmt_deleteUserById, [userId]);
    });
  }

  async queryUserById(userId: string): Promise<any> {
    return handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.userMgmt_queryUserById, [userId]);
    });
  }
}
