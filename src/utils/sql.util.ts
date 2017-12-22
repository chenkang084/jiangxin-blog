import { IError } from "mysql";
/**
 * change mysql callback function to promise
 * @param sql
 * @param params
 */
export function mysqlQuery(sql: string, params: any) {
  return new Promise((resolve, reject) => {
    this.db.mysql.query(sql, params, (error: IError, data: any, fields: any) => {
      if (error) reject({ error, sql, params });
      resolve({ data, fields });
    });
  });
}

// export function mysqlUpdate(sql: string, params: string[]) {
//   return new Promise((resolve, reject) => {
//     this.db.mysql.query(sql, params, (err: IError, data: any, fields: any) => {
//       if (err) reject({ err, sql, params });
//       resolve({ data, fields });
//     });
//   });
// }