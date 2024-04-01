"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controller/userController"));
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.post("/addUser", userController_1.default.register);
userRouter.post("/login", userController_1.default.login);
exports.default = userRouter;
