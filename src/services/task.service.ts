import { Request, Response } from "express";
import { log } from "../utils/common";
import { openstackService } from "./axios.service";
import * as socketIo from "socket.io";
const deepEqual = require("deep-equal");

const FREQUENCE = 5000;
const taskTimers: {
  [key: string]: NodeJS.Timer;
} = {};

export async function queryHomeAlertInfo(
  io: SocketIO.Server,
  agent: SocketIO.Socket,
  data: any
) {
  // autoTasks(
  //   () => {
  //     return openstackService.get(
  //       `dashboard/api/ceph/clusters/${data.clusterId}/statistics/`,
  //       {
  //         headers: {
  //           Cookie: agent.request.headers.cookie
  //         }
  //       }
  //     );
  //   },
  //   newData => {
  //     agent.emit("homePage/clusterInfo", newData);
  //   },
  //   newData => {
  //     io.emit("homePage/clusterInfo", newData);
  //   }
  // );
}

/**
 * auto run task
 * @param task async get data from backend
 * @param socketCb if next async get data is changed , send new data to frontend via socket
 */
async function autoTasks(
  task: () => Promise<any>,
  initSocketCb: (newData: any) => void,
  socketCb: (newData: any) => void
) {
  let { data: firstData } = await task();

  if (initSocketCb) {
    console.log("first data send...");
    initSocketCb(firstData);
  }

  if (taskTimers[autoTasks.name]) {
    return;
  }

  taskTimers[autoTasks.name] = setInterval(async () => {
    console.log("start...");

    const { data: loopQueryData } = await task();

    const flag = deepEqual(firstData, loopQueryData);

    console.log(flag);

    if (firstData && !flag) {
      console.log("====================diff...", firstData, loopQueryData);
      firstData = loopQueryData;

      if (socketCb) {
        socketCb(loopQueryData);
      }
    }
  }, FREQUENCE);
}
