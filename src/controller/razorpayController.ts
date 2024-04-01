import { orderModel, refundModel } from "../models/Razorpay";
import { Request, Response } from "express";
import razorpay from "../utils/razorpay";

const createOrder = async (req: Request, res: Response) => {
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
    const response = await razorpay.orders.create(options);
    await orderModel.create({
      orderId: response.id,
      amount: response.amount,
      currency: response.currency,
    });
    return res.status(201).send({
      orderId: response.id,
      amount: response.amount,
      currency: response.currency,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "order creation failed" });
  }
};
