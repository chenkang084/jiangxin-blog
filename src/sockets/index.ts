import * as socketIo from "socket.io";
import * as http from "http";
import taskIo from "./task.socket";

export default (server: http.Server) => {
  const io: SocketIO.Server = require("socket.io")(server);

  io.on("connection", function(agent: SocketIO.Socket) {
    const origin =
      agent &&
      agent.client &&
      agent.client.request &&
      agent.client.request.headers &&
      agent.client.request.headers.origin;

    console.log(`${origin} has connected`);

    const timers: any = taskIo(io, agent);

    agent.on("disconnect", function() {
      console.log(`${origin} has disconnected`);
      console.log(`timers is ${timers}`);
      timers && timers.length > 0 && timers.forEach((timer: any) => {
          timer.clear();
        });
    });
  });
};
