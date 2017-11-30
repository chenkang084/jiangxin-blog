import { upCaseInitial } from "../utils/stringUtil";

export const generatorRouterTemplate = function(fileName: string) {
  const upperCase = upCaseInitial(fileName);

  return `import * as express from "express";
import ${upperCase}Controller from "../controllers/${fileName}.controller";
import { Db } from "../db/initializeDb";
import { Express } from "express";
export default (app: Express, db: Db) => {
  const ${fileName}Controller = new ${upperCase}Controller(app, db);
  const router = express.Router();
  router.get("/test", ${fileName}Controller.test);

  // Apply the routes to our application with the prefix /api
  app.use("/api/${fileName}", router);
};`;
};

export const generatorServiceTemplate = function(fileName: string) {
  const upperCase = upCaseInitial(fileName);
  return `export default class ${upperCase}Service {
  test() {
    return "test ${fileName} service api";
  }
}`;
};

export const generatorControllerTemplate = function(fileName: string) {
  const upperCase = upCaseInitial(fileName);
  return `import { Db } from "../db/initializeDb";
import { Express, Request, Response } from "express";
import ${upperCase}Service from "../services/${fileName}.service";

export default class ${upperCase}Controller {
  public app: Express;
  public db: Db;
  private ${fileName}Service: ${upperCase}Service = new ${upperCase}Service();

  constructor(app: Express, db: Db) {
    this.app = app;
    this.db = db;
  }

  test = (req: Request, res: Response) => {
    res.send(this.${fileName}Service.test());
  };
}
`;
};
