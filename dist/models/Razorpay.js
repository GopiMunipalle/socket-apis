"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundModel = exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    orderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
}, { versionKey: false, timestamps: true });
const refundSchema = new mongoose_1.Schema({
    paymentId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { versionKey: false, timestamps: true });
exports.orderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.refundModel = (0, mongoose_1.model)("Refund", refundSchema);
