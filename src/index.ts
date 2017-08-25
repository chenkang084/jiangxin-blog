import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as cors from "cors";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as redis from "connect-redis";
import * as cookieParser from "cookie-parser";
import config from "./config";
import initializeDb, { Db } from "./db/initializeDb";
import HomeController from "./controllers/home";
import auth from "./middlewares/auth";
import routers from "./routers/";
// import * as initializeDb from './db';
// import * as middleware from './middleware';
// import * as api from './api';
// import * as config from './config.json';
// console.log(process.cwd());
// console.log(__dirname);

const app = express();

const RedisStore = require("connect-redis")(session);

// enable cors request
app.use(
  cors({
    // exposedHeaders: config.corsHeaders,
    credentials: true
  })
);

// set public path
app.use(express.static(path.resolve(__dirname, "public")));
// set views
app.set("views", path.resolve(__dirname, "public"));
// logger
app.use(morgan("dev"));
// 3rd party middleware

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
// cookie middleware must before session middleware
app.use(cookieParser(config.session_secret));

app.use(
  session({
    secret: config.session_secret,
    store: new RedisStore(config.redis),
    resave: false,
    saveUninitialized: false
  })
);

initializeDb((db: Db) => {
  // check user login status
  app.use(auth(db));

  app.get("/", function(req: any, res: any) {
    res.send("Hello World!!");
  });

  app.get("/api/auth", function(req, res) {
    // res.cookie("test", "hh", {
    //   path: "/",
    //   maxAge: 1000 * 60 * 60 * 24 * 30,
    //   signed: true,
    //   httpOnly: true
    // });

    // console.log(req.session);
    // console.log(req.cookies);

    res.send("Hello World!!");
    // res.sendStatus(403);
  });

  routers(app, db);
});

const server = app.listen(8888, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
