import express from "express";
import connectDb from "./todoDb";
import router from "./routes/router";
import userRouter from "./routes/userRouter";
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import messageRouter from "./routes/messagRouter";
const app = express();

const port = process.env.PORT || "3002";
const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/socket.html"));
});

app.use(express.json());

app.use("/todo", router);
app.use("/user", userRouter);
app.use("/chat", messageRouter);

connectDb()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server Running At http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Database is not connected", error);
  });
