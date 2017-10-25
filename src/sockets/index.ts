import * as socketIo from "socket.io";
import * as http from "http";

export default (server: http.Server) => {
  const io = require("socket.io")(server) as SocketIO.Server;

  io.on("connection", function(agent: SocketIO.Socket) {
    const origin =
      agent &&
      agent.client &&
      agent.client.request &&
      agent.client.request.headers &&
      agent.client.request.headers.origin;

    console.log(`${origin} has connected`);

    agent.on("name", function(data: any) {
      console.log("name", data);

      agent.emit("reply", { hehe: "cccc" });

      io.emit("reply", "hello everyone");
    });
    agent.on("disconnect", function() {
      console.log("disconnect");
    });
  });
};
