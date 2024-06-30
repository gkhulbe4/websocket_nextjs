import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  // console.log("Id", socket.id);

  // socket.on("myEvent", (data) => {
  //   console.log(data);
  //   socket.emit("responseEvent", "Hello from server");
  // });

  socket.on("myEvent", (a, b, callback) => {
    callback({ msg: "Hello from server" });
  });
});

// socket.removeAllListener("myEvent")

//broadcast -> send message to all the clients at the same time
httpServer.listen(4000, () => {
  console.log("Websocket server listening at port 4000");
});
