import { IPool } from "mysql";
import { mysqlDb, mongooseDb } from "../db/initializeDb";
import { Connection } from "mongoose";
export default class BaseService {
    protected mysql?: Promise<IPool>;
    protected mongoose?: Connection;
    constructor() {
        this.mysql = mysqlDb;
        this.mongoose = mongooseDb;
    }
}