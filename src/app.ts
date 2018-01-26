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
import middleware from "./middlewares";
import routers from "./routers/";
import { log } from "./utils/common";
import sockets from "./sockets";

const compression = require("compression");

const app = express();

app.use(compression());

// enable cors request
app.use(
  cors({
    // exposedHeaders: config.corsHeaders,
    credentials: true
  })
);

// set public path
app.use(express.static(path.resolve(__dirname, "../public")));
// set views
app.set("views", path.resolve(__dirname, "../views"));
app.set("view engine", "ejs");
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

const RedisStore = require("connect-redis")(session);
app.use(
  session({
    secret: config.session_secret,
    store: new RedisStore(config.db.redis),
    resave: false,
    saveUninitialized: false
  })
);

// cookie middleware must before session middleware
app.use(cookieParser(config.session_secret));

middleware(app);

app.use("/test", (req, res) => {
  res.render("test", { test: "xxxxxxxx" });
});

routers(app);

const server = http.createServer(app);

// sockets(server);

server.listen(config.port || 9080, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
