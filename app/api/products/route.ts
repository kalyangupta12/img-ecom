
import { connectToDatabase } from "@/lib/db";
import Product, { IProduct } from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try{
        await connectToDatabase();
        const products = await Product.find({}).lean();

        if(!products || products.length === 0){
            return NextResponse.json({ message: "No products found" }, { status: 404 });
        }
        return NextResponse.json(
            {
                products
            },
            {
                status: 200
            }
        );

    }catch(err){
        console.log(err);
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}

export async function POST(request: Request){
    try{
        const session = await getServerSession(authOptions);
        if(!session || session.user?.role !== "admin"){
            return NextResponse.json({error: "You are not authorized"}, {status: 401})
        }
        await connectToDatabase();
        const body: IProduct = await request.json();
        if(!body.name || !body.description || !body.imageUrl || !body.variants){
            return NextResponse.json(
            {
                error: "Please fill in all fields",
            },
            {
                status: 400
            }
        );
        }
        
        const newProduct = await Product.create(body);
        return NextResponse.json({ newProduct }, { status: 201 });

    }catch(err){
        console.error(err);
        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 500
            }
        );
    }
}