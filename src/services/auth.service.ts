import * as mysql from "mysql";
import BaseService from "./base.service";
import { genHash, compareHash } from "../utils/bcrypt";
import { handleFuntionError } from "../utils/error.util";
import { mysqlQuery } from "../utils/sql.util";
import sqls from "../db/sqls";

export default class AuthService extends BaseService {
  queryUser = async (username: string, userpwd: string) => {
    const hashPwd = genHash(userpwd);

    const result = await handleFuntionError(() => {
      return mysqlQuery.call(this, sqls.auth_queryUser, [username]);
    });

    if (result && result.data && result.data.length > 0) {
      const user = result.data[0];
      if (compareHash(userpwd, hashPwd)) {
        return user;
      }
    }
  };
}
