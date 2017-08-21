import * as mysql from "mysql";
import config from "../config";

export interface Db {
  mysql: Object;
  mongoo?: Object;
}

export default (callback: Function): void => {
  // connect to mysql db
  const _mysql = mysql.createPool({
    ...config.db.mysql
  });

  _mysql.getConnection((err, connection) => {
    if (err) console.log(err);
    console.log("mysql db connected!");
  });

  const db: Db = {
    mysql: _mysql
  };

  callback(db);
};
