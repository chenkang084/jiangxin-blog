import * as fs from "fs";
import { Express } from "express";
// import profileRoute from "./profile.router";
// import hostRoute from "./host.router";
import userMgmtRoute from "./userMgmt.router";
// import { Db } from "../db/initializeDb";
import { walkSync } from "../utils/file.util";

export default (app: Express) => {
  // auto load routes folder's *.router.ts file
  const fileList: { name: string; path: string }[] = [];
  walkSync(__dirname, fileList);

  fileList.forEach(file => {
    if (file.name.match(/^.*\.router.(t|j)s$/gim)) {
      require(file.path).default(app);
    }
  });
};
