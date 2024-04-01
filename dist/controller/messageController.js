"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Messages_1 = __importDefault(require("../models/Messages"));
const User_1 = __importDefault(require("../models/User"));
const app_1 = require("../app");
const sendMesssage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, receiverId, content } = req.body;
        const sender = yield User_1.default.findById(senderId);
        const receiver = yield User_1.default.findById(receiverId);
        if (!sender || !receiver) {
            return res.status(404).json({ error: "Sender or receiver not found" });
        }
        const message = yield Messages_1.default.create({
            sender: senderId,
            receiver: receiverId,
            content,
        });
        app_1.io.to(receiver).emit("chat message", message);
        res.status(201).json(message);
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
const receiveMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const messages = yield Messages_1.default.find({
            $or: [{ sender: userId }, { receiver: userId }],
        });
        return res.status(200).json(messages);
    }
    catch (error) {
        console.error("Error receiving messages:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = { sendMesssage, receiveMessage };
