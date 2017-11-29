import { Request, Response } from "express";
import { log } from "../utils/common";
import { cephSevice } from "./axios.service";
import * as socketIo from "socket.io";
const deepEqual = require("deep-equal");

const FREQUENCE = 5000;
let timer: NodeJS.Timer;

export async function queryHomeAlertInfo(
  io: SocketIO.Server,
  agent: SocketIO.Socket
) {
  let queryResult = await cephSevice.get("dashboard/api/ceph/clusters/", {
    headers: {
      Cookie: agent.request.headers.cookie
    }
  });

  io.emit("home/reply", queryResult.data);

  if (timer) {
    return;
  }

  timer = setInterval(async () => {
    console.log("start...");

    const tempResult = await cephSevice.get("dashboard/api/ceph/clusters/", {
      headers: {
        Cookie: agent.request.headers.cookie
      }
    });

    const flag = deepEqual(tempResult.data, queryResult.data);

    console.log(flag);

    if (queryResult.data && !flag) {
      console.log(
        "====================diff...",
        tempResult.data,
        queryResult.data
      );
      queryResult = tempResult;

      io.emit("home/reply", tempResult.data);
    }
  }, FREQUENCE);
}

const autoRunTasks: any[] = [];

function autoTasks(task: object) {
  autoRunTasks.push(task);
}


