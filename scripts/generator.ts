/// <reference types="node" />
import * as fs from "fs";
import {
  generatorRouterTemplate,
  generatorServiceTemplate,
  generatorControllerTemplate
} from "./templates/autoRouter";

const chalk = require("chalk"),
  // fs = require("fs"),
  commander = require("commander"),
  log = console.log.bind(console),
  stdin = process.openStdin(),
  path = require("path"),
  rootPath = path.resolve(),
  stdout = process.stdout;

let inputCnt = 0;

const tipMsgs = [
  `Please input file name:`,
  `If you want to explicit the file path,please input file path:`
];

const inputTextArr: string[] = [];

log(
  chalk.green(
    `The script will generator controller,router,service file under the root path/src`
  )
);

stdout.write(chalk.red(tipMsgs[0]));

stdin.addListener("data", function(d) {
  // note:  d is an object, and when converted to a string it will
  // end with a linefeed.  so we (rather crudely) account for that
  // with toString() and then trim()

  const input = d.toString().trim();

  inputTextArr[inputCnt] = input;

  inputCnt + 1 < tipMsgs.length &&
    stdout.write(chalk.red(tipMsgs[inputCnt + 1]));

  inputCnt++;

  if (inputCnt > tipMsgs.length - 1) {
    log("xxxxxx");
    process.stdin.emit("end");
  }
});

stdin.addListener("end", () => {
  console.log(`end`);
  log(inputTextArr);

  const [filename, folderPath] = inputTextArr;

  if (filename) {
    fs.writeFileSync(
      path.join(rootPath, `/src/routers/${filename}.router.ts`),
      generatorRouterTemplate(filename)
    );

    fs.writeFileSync(
      path.join(rootPath, `/src/controllers/${filename}.controller.ts`),
      generatorControllerTemplate(filename)
    );

    fs.writeFileSync(
      path.join(rootPath, `/src/services/${filename}.service.ts`),
      generatorServiceTemplate(filename)
    );
  }
});
