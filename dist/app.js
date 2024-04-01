"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const todoDb_1 = __importDefault(require("./todoDb"));
const router_1 = __importDefault(require("./routes/router"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const messagRouter_1 = __importDefault(require("./routes/messagRouter"));
const app = (0, express_1.default)();
const port = process.env.PORT || "3002";
const server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server);
exports.io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        exports.io.emit("chat message", msg);
    });
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./public/socket.html"));
});
app.use(express_1.default.json());
app.use("/todo", router_1.default);
app.use("/user", userRouter_1.default);
app.use("/chat", messagRouter_1.default);
(0, todoDb_1.default)()
    .then(() => {
    server.listen(port, () => {
        console.log(`Server Running At http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log("Database is not connected", error);
});
