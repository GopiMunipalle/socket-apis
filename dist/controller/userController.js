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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            const newUser = yield User_1.default.create({
                name,
                email,
                password: hashedPassword,
            });
            return res
                .status(201)
                .send({ msg: "User Created Successfully", newUser });
        }
        return res.status(400).send({ error: "User Already Exists" });
    }
    catch (error) {
        console.log({ error: "Internal Server Error" }, error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: "user not registered" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send({ error: "Incorrect Password" });
        }
        const jwtToken = yield jsonwebtoken_1.default.sign({ email: email }, "secret", {
            expiresIn: "10h",
        });
        return res.status(200).send({ jwtToken });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.default = { register, login };
