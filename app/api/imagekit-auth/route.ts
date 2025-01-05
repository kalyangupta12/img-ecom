import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET(){
    try{
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    }catch(err){
        console.error("ImageKit auth erro: ", err);
        return NextResponse.json(
            {
                message: "Authentication failed"
            },
            {
                status: 500 //Internal Server Error
            }
        )
    }
}