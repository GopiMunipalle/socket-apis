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
const Razorpay_1 = require("../models/Razorpay");
const razorpay_1 = __importDefault(require("../utils/razorpay"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, currency } = req.body;
        if (!amount || !currency) {
            return res.status(400).send({ error: "currency or amount is required" });
        }
        const options = {
            amount,
            currency,
            receipt: "unique id for order",
            payment_capture: 1,
        };
        const response = yield razorpay_1.default.orders.create(options);
        yield Razorpay_1.orderModel.create({
            orderId: response.id,
            amount: response.amount,
            currency: response.currency,
        });
        return res.status(201).send({
            orderId: response.id,
            amount: response.amount,
            currency: response.currency,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "order creation failed" });
    }
});
