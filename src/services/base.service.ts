import { IPool } from "mysql";
import { mysqlDb } from "../db/initializeDb";

export default class BaseService {
    protected mysql?: Promise<IPool>;
    constructor() {
        this.mysql = mysqlDb;
    }
}