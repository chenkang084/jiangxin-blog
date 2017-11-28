import * as socketIo from "socket.io";
import { queryHomeAlertInfo } from "../services/task.service";
const taksTimers: any = [];

export default function(io: SocketIO.Server, agent: SocketIO.Socket) {
  agent.on("name", function(data: any) {
    console.log("name", data);

    agent.emit("home/reply", { hehe: "cccc" });

    io.emit("home/reply", "hello everyone");

    const timer = queryHomeAlertInfo(io, agent);

    taksTimers.push(timer);

    console.log("========", timer);

    return taksTimers;
  });
}
