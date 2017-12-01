const shell = require("shelljs");
//start mongo db
// shell.exec(
//   "cd D:/Program Files/MongoDB/Server/3.4/bin && mongod.exe --dbpath ../db/node_club_dev/",
//   (code, stdout, stderr) => {
//     !stdout && console.log("ok");
//   }
// );
//redis
shell.exec(
  "cd D:/Program Files/Redis-x64-3.2.100 && redis-server.exe redis.windows.conf",
  (code, stdout, stderr) => {
    !stdout && console.log("ok");
  }
);
