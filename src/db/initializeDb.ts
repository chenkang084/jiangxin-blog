import * as mysql from "mysql";
import config from "../config";
import * as mongoose from "mongoose";
import { log } from "../utils/common";

const dbEnable = config.db.enable || false;

const mysqlDb: Promise<mysql.IPool> = new Promise((resolve, reject) => {
  resolve(mysql.createPool({
    ...config.db.mysql
  }));
});

const mongooseDb = mongoose.createConnection("mongodb://127.0.0.1/node_club_dev", {
  useMongoClient: true,
  poolSize: 4
});


export { mysqlDb, mongooseDb };

