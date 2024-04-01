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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeaders = req.headers["authorization"];
        if (!authHeaders) {
            return res.status(400).send({ error: "Enter Token" });
        }
        const jwtToken = authHeaders.split(" ")[1];
        if (!jwtToken) {
            return res.status(400).send({ error: "Provide token" });
        }
        jsonwebtoken_1.default.verify(jwtToken, "secret", (error, payload) => {
            if (error) {
                return res.status(400).send({ error: "Invalid token" });
            }
            req.email = jsonwebtoken_1.default.email;
            next();
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.default = authMiddleware;
