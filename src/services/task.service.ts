import { Request, Response } from "express";
import { log } from "../utils/common";
import { cephSevice } from "./axios.service";
import * as socketIo from "socket.io";
const deepEqual = require("deep-equal");

const FREQUENCE = 3000;
let timer: any;

export async function queryHomeAlertInfo(
  io: SocketIO.Server,
  agent: SocketIO.Socket
) {
  const queryResult = await cephSevice.get(
    "dashboard/api/ceph/alerts/summary?cluster_id=1",
    {
      headers: {
        Cookie: agent.request.headers.cookie
      }
    }
  );

  io.emit("home/reply", queryResult.data);

  if (timer) {
    return;
  }

  timer = setInterval(async () => {
    console.log("start...");

    const tempResult: any = await cephSevice.get(
      "dashboard/api/ceph/alerts/summary?cluster_id=1",
      {
        headers: {
          Cookie: agent.request.headers.cookie
        }
      }
    );

    const flag = deepEqual(tempResult.data, queryResult.data);

    console.log(flag);

    if (queryResult.data && !flag) {
      console.log("diff...", tempResult.data, queryResult.data);

      io.emit("home/reply", tempResult.data);
    }
  }, FREQUENCE);

  return timer;
}
