import * as mysql from "mysql";
import config from "../config";
import * as mongoose from "mongoose";
import { log } from "../utils/common";

const dbEnable = config.db.enable || false;

const mysqlDb: Promise<mysql.IPool> | undefined = config.db.mysql.enable ? new Promise((resolve, reject) => {
  resolve(mysql.createPool({
    ...config.db.mysql.opts
  }));
}) : undefined;

const mongooseDb: mongoose.Connection | undefined = config.db.mongoose.enable ? mongoose.createConnection(config.db.mongoose.url, config.db.mongoose.opts) : undefined;

export { mysqlDb, mongooseDb };

