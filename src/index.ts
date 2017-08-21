import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as cors from "cors";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as redis from "connect-redis";
import config from "./config";
import initializeDb, { Db } from "./db/initializeDb";
import HomeController from "./controllers/home";
// import * as initializeDb from './db';
// import * as middleware from './middleware';
// import * as api from './api';
// import * as config from './config.json';
// console.log(config);

import routers from "./routers/";

const app = express();

const RedisStore = require("connect-redis")(session);

// set public path
app.use(express.static(path.resolve(__dirname, "public")));
// set views
app.set("views", path.resolve(__dirname, "public"));
// logger
app.use(morgan("dev"));
// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.use(
  session({
    secret: "test",
    store: new RedisStore({
      port: 6379,
      host: "127.0.0.1",
      db: 0,
      pass: "",
      ttl: 30
    }),
    resave: false,
    saveUninitialized: false
  })
);

app.get("/", function(req: any, res: any) {
  res.send("Hello World!!");
});

app.get("/test", (req: any, res: any) => {
  res.send({ test: "hello world" });
});

initializeDb((db: Db) => {
  console.log("callback");
  routers(app, db);
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
