let config: any;
const env: string = process.env.NODE_ENV || "";
switch (env.trim()) {
  case "dev":
    config = require("./config.dev").config;
    break;
  case "qa":
    config = require("./config.qa").config;
    break;
  case "prod":
    config = require("./config.prod").config;
    break;
  default:
    config = require("./config.dev").config;
}

export default config;
