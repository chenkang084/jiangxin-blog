import { Request, Response } from "express";
import { log } from "../utils/common";
import { cephSevice } from "./axios.service";

export default class TaskService {
  queryHomeAlertInfo(req: Request) {
    return cephSevice.get("dashboard/api/ceph/clusters/", {
      headers: {
        Cookie: req.headers.cookie
      }
    });
  }
}
