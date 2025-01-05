"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({children}: {children: React.ReactNode}){
    const authenticator = async()=>{
        try{
            const res = await fetch("/api/imagekit-auth");
            if(!res.ok){
                throw new Error("Failed to authenticate");
            }
            return res.json();
        }catch(err){    
            console.error("Failed to fetch the data", err);
            throw err;
        }
    };

    return (
        <SessionProvider refetchInterval={5*60}>
        <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
            {children}
        </ImageKitProvider>
            {/* ...other SDK components added previously */}     
        </SessionProvider>
    );
}