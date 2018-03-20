import { Express, Router, Request, Response, NextFunction } from "express";
import { log } from "../utils/common";
import { openstackService } from "../services/axios.service";
import { login, logout } from "../services/auth.service";
const authPrefix_Regex = /^\/auth\/+/;
let tokenHeaders = {
  "X-auth-token": "",
  "X-subject-token": ""
};

export default () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    log("api middle");

    const url = req.url;
    console.log("req url is:", url);
    if (authPrefix_Regex.exec(url)) {
      let $url = url.replace(authPrefix_Regex, "").trim();

      if ($url === "identity/v3/auth/tokens") {
        const opts = {
          url: req.url.replace(authPrefix_Regex, ""),
          method: req.method,
          data: req.body,
          headers: tokenHeaders["X-auth-token"]
            ? { ...req.headers, ...tokenHeaders }
            : req.headers
        };

        if (req.method === "POST") {
          login(opts, tokenHeaders, res);
        } else if (req.method === "DELETE") {
          logout(opts, tokenHeaders, res);
        }
      }
    } else {
      try {
        const result = await openstackService({
          url: req.url.replace(/^\/api\//, ""),
          method: req.method,
          data: req.body,
          headers: tokenHeaders["X-auth-token"]
            ? { ...req.headers, ...tokenHeaders }
            : req.headers
        });

        res.send({ type: "success", items: result.data });
      } catch (error) {
        console.log(error);
        res.send({ type: "failed", msg: error.message || error });
      }
    }
  };
};
