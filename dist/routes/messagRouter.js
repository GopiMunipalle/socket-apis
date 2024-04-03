"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageController_1 = __importDefault(require("../controller/messageController"));
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const messageRouter = (0, express_1.Router)();
messageRouter.post("/sendMessage", authMiddleware_1.default.authMiddleware, messageController_1.default.sendMesssage);
messageRouter.get("/receiveMessage/:userId", messageController_1.default.receiveMessage);
exports.default = messageRouter;
