const shell = require("shelljs"),
  path = require("path");

// console.log(path.resolve("./dist"));
// return;
shell.exec("pm2 delete all", (code, stdout, stderr) => {
  try {
    shell.exec("pm2 kill");
    shell.exec("npm run build");

    shell.exec(`cd ${path.resolve("./dist")} && pm2 start index.js -i 4`);
  } catch (error) {
    console.log("****************************");
    console.log(error);
    console.log("****************************");
  }
});
