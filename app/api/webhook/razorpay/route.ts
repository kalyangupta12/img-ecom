import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import Order from "@/models/Order"
import { connectToDatabase } from "@/lib/db";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
    try{
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");
        //checking whether 
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest("hex");

        if(signature !== expectedSignature){
            return NextResponse.json({error: "Invalid Signature"}, {status: 400});
        }
        const event = JSON.parse(body);
        await connectToDatabase();
        if(event.event == "payement.captured"){
            //payload is just a text info that we get
            const payment = event.payload.payment.activity;
            const order = await Order.findOneAndUpdate(
                {
                    razorpay_order_id: payment.order_id
                },
                {
                    razorpayPaymentId: payment.id,
                    status: "completed"
                }
            ).populate([
                {path: "productId", select: "name"},
                {path: "userId", select: "name"}
            ])
            if(order){
                const transporter = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: process.env.MAILTRAP_USER,
                      pass: process.env.MAILTRAP_PASS
                    },
                });

                await transporter.sendMail({
                    from: "",
                    to: order.userId.email,
                    subject: "Order Completed",
                    text: `Your order ${order.productId.name} has been successfully placed!`
                });
            }
            return NextResponse.json({message: "Payment Successfull!"},{status: 202})
        }

        return NextResponse.json({
            message:"success",
        },{
            status: 200
        })
    }catch(err){   
        console.error(err);
        return NextResponse.json({
            error: "Something went wrong"
        },{
            status: 500
        });
    }
}