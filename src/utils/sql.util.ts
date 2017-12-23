import { IError } from "mysql";
/**
 * change mysql callback function to promise
 * @param sql
 * @param params
 */
export async function mysqlQuery(sql: string, params: any): Promise<any> {
  const mysqlPool = await this.mysql;
  return await new Promise((resolve, reject) => {
    mysqlPool.query(sql, params, (error: IError, data: any, fields: any) => {
      if (error) {
        reject({ error, params });
      } else {
        resolve({ data, fields });
      }
    });
  });
}
