let config: any;

switch (process.env.NODE_ENV) {
  case "dev":
    config = require("./config.dev").config;
  case "qa":
    config = require("./config.qa").config;
  case "prod":
    config = require("./config.prod").config;
  default:
    config = require("./config.dev").config;
}

export default config;
