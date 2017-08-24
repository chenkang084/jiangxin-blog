import * as mysql from "mysql";
import config from "../config";
import * as mongoose from "mongoose";

export interface Db {
  mysql: mysql.IPool;
  mongoo?: Object;
}

// connect to mysql db
const mysqlPoolPromise = new Promise((resolve, reject) => {
  const mysqlPool = mysql.createPool({
    ...config.db.mysql
  });
  mysqlPool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("mysql db connected!");
    resolve(mysqlPool);
  });
});

// connect to mongo db
// const mongooPromise = new Promise((resolve, reject) => {
//   mongoose.connect(
//     "mongodb://127.0.0.1/node_club_dev",
//     {
//       server: { poolSize: 4 }
//     },
//     function(err) {
//       if (err) {
//         console.log(err);
//         process.exit(1);
//       }
//       console.log("mongooDB connected!");
//       resolve(mongoose);
//     }
//   );
// });

export default (callback: Function): void => {
  const promiseArr: Array<any> = new Array();

  promiseArr.push(mysqlPoolPromise);
  // promiseArr.push(mongooPromise);

  Promise.all(promiseArr).then(result => {
    // console.log(result);

    const db: Db = {
      mysql: result[0],
      // mongoo: result[1]
    };

    callback(db);
  });
};
