const fs = require("fs");
const path = require("path");
const flag = fs.existsSync("/etc/mysql/mysql.conf.d/mysqld.cnf1");
let mysqlConfig;
const insertStr = function(prevStr, position, str) {
  if (prevStr) {
    return prevStr.substring(0, position) + str + prevStr.substr(position);
  } else {
    return prevStr;
  }
};

if (!flag) {
  //backup mysqld.cnf
  fs.writeFileSync(
    "/etc/mysql/mysql.conf.d/mysqld.cnf1",
    fs.readFileSync("/etc/mysql/mysql.conf.d/mysqld.cnf"),
    {
      encoding: "utf8"
    }
  );
}

mysqlConfig = fs.readFileSync("/etc/mysql/mysql.conf.d/mysqld.cnf1");

// const mysqlConfig = fs.readFileSync(path.join(__dirname, "./mysqld.cnf"));

if (mysqlConfig && mysqlConfig.length > 0) {
  //   console.log(mysqlConfig);
  let _mysqlConfig = mysqlConfig.toString();

  _mysqlConfig = insertStr(
    _mysqlConfig,
    _mysqlConfig.length,
    `default-storage-engine=INNODB\ncharacter-set-server=utf8\ncollation-server=utf8_general_ci\n\n[client]\ndefault-character-set=utf8 \n`
  );

  fs.writeFileSync("/etc/mysql/mysql.conf.d/mysqld.cnf", _mysqlConfig, {
    encoding: "utf8"
  });
  console.log("changed mysqld.cnf");
}
