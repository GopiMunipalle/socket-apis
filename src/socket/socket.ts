const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // You can listen to events from the client
  // For example:
  // socket.on('chat message', (msg) => {
  //   console.log('Received message:', msg);
  // });

  // You can also emit events to the client
  // For example:
  // socket.emit('message', 'Hello client');

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
