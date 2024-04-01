import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID as string,
  key_secret: process.env.KEY_SECRET,
});

export default razorpay;
