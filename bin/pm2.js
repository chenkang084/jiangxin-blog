const shell = require("shelljs");

shell.exec("pm2 delete all", (code, stdout, stderr) => {
  try {
    shell.exec("npm run build");

    shell.exec("cd ./dist && pm2 start index.js -i 4");
  } catch (error) {
    console.log("****************************");
    console.log(error);
    console.log("****************************");
  }
});
