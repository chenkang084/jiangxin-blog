import * as socketIo from "socket.io";
import { queryHomeAlertInfo } from "../services/task.service";

export default function(io: SocketIO.Server, agent: SocketIO.Socket) {
  agent.on("homePage/clusterInfo", data => {
    console.log(data);

    queryHomeAlertInfo(io, agent, data);
  });
}
