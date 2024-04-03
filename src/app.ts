import express from "express";
import connectDb from "./todoDb";
import router from "./routes/router";
import userRouter from "./routes/userRouter";
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import messageRouter from "./routes/messagRouter";
import groupRouter from "./routes/groupRouter";
const app = express();

const port = process.env.PORT || "3002";
const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat message", ({ receiverId, content }) => {
    console.log("received message", receiverId);
    io.emit("chat message", content);
  });

  socket.on("joinRoom", (data) => {
    console.log("data", data);
    socket.join(data);
  });

  socket.on("send Message", (data) => {
    console.log("sendmdaa", data);
    socket.to(data.roomId).emit("receivemessage", data.content);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/socket.html"));
});

app.use(express.json());

app.use("/todo", router);
app.use("/user", userRouter);
app.use("/chat", messageRouter);
app.use("/group", groupRouter);

connectDb()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server Running At http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Database is not connected", error);
  });
