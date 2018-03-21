import { Express } from "express";
import { walkSync } from "../utils/file.util";

export default (app: Express) => {
  // auto load routes folder's *.router.ts file
  const fileList: { name: string; path: string }[] = [];
  walkSync(__dirname, fileList);

  // auto load all files named *.router.ts/js
  fileList.forEach(file => {
    if (file.name.match(/^.*\.router.(t|j)s$/gim)) {
      require(file.path).default(app);
    }
  });

  // manual load special router file
  require("./api.$router").default(app);
};
