import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
export async function GET() {
    try{
        const session = await getServerSession(authOptions); 
        if(!session){
            return NextResponse.json(
                {
                    error: "Unauthorized"
                },
                {
                    status: 401
                }
            )
        }
        await connectToDatabase();
        const orders = await Order.find({userId: session.user.id})
        .populate({
            path: "productId",
            select: "name imageUrl",
            options: {strictPoulate: false},
        })
        .sort({createdAy: -1})
        .lean()
        if(!orders){
            return NextResponse.json({
                message: "No orders found!"
            },{
                status: 404
            })
        }
        return NextResponse.json({orders},{status: 200});
    }catch(err){
        console.error(err);
        return NextResponse.json({
            error: "Something went wrong!"
        },{
            status: 500
        })
    }
}