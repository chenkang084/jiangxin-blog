import * as socketIo from "socket.io";
import { queryHomeAlertInfo } from "../services/task.service";

export default function(io: SocketIO.Server, agent: SocketIO.Socket) {
  agent.on("name", function(data: any) {
    console.log("name", data);

    agent.emit("home/reply", { hehe: "cccc" });

    io.emit("home/reply", "hello everyone");

    queryHomeAlertInfo(io, agent);
  });
}
