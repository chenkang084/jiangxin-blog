import { Express, Router, Request, Response, NextFunction } from "express";
import { log } from "../utils/common";
import { cephSevice } from "../services/axios.service";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    log("auth middle");

    const url = req.url;

    // console.log(req.headers.cookie);

    if (/\/api\/+/.exec(url)) {
      cephSevice
        .get("dashboard/api/ceph/clusters/", {
          headers: {
            // Cookie: req.headers.cookie
          }
        })
        .then(result => {
          res.send(result.data);
        })
        .catch(error => {
          console.log(error.message);
          res.send(error.message);
        });
    } else {
      next();
    }
    // next();
  };
};
