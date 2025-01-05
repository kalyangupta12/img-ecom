import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
export async function GET(
    request: NextRequest,
    props:{ params: Promise<{id: string}> }
) {
    try{
        const {id} = await props.params;
        await connectToDatabase();
        const product = await Product.findById(id).lean();
        if(!product){
            return NextResponse.json(
                {
                    error: "No product found!"
                },
                {
                    status: 404
                }
            )
        }
        return NextResponse.json(
            {
                product
            },
            {
                status: 200
            }
        )
    } catch(err){
        console.error(err);
        return NextResponse.json(
            {
                error: "Failed to fetch product"
            },
            {
                status: 500
            }
        )
    }
} 