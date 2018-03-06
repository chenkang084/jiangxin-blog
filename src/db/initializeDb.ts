import * as mysql from "mysql";
import config from "../config";
import * as mongoose from "mongoose";
import { log } from "../utils/common";

const mysqlDb: Promise<mysql.IPool> | undefined = config.db.mysql.enable
  ? new Promise((resolve, reject) => {
      try {
        const iPool = mysql.createPool({ ...config.db.mysql.opts });
        log("connected to mysql");
        resolve(iPool);
      } catch (error) {
        log("failed to mysql", error);
        reject(error);
      }
    })
  : undefined;

const mongooseDb: mongoose.Connection | undefined = config.db.mongoose.enable
  ? mongoose.createConnection(config.db.mongoose.url, config.db.mongoose.opts)
  : undefined;

export { mysqlDb, mongooseDb };

const connection: mysql.IConnection = mysql.createConnection({
  ...config.db.mysql.opts
});
connection.connect();

// connection.beginTransaction();

const pool: mysql.IPool = mysql.createPool({
  ...config.db.mysql.opts
});

// pool.getConnection((error, connection) => {
//   connection.beginTransaction();
// });
