"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoDb_1 = __importDefault(require("./todoDb"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
const port = process.env.PORT || '3002';
app.use(express_1.default.json());
app.use('/todo', router_1.default);
(0, todoDb_1.default)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server Running At http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log("Database is not connected", error);
});
