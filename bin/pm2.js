const shell = require("shelljs");

shell.exec("pm2 delete all", (code, stdout, stderr) => {
  stderr && console.log("==========",stderr);

  shell.exec("cd ./dist && pm2 start index.js -i 4", (code, stdout, stderr) => {
    stderr && console.log(stderr);

  });
});
