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

    taskIo(io, agent);

    agent.on("disconnect", function() {
      console.log(`${origin} has disconnected`);
    });
  });
};
