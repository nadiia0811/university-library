import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server"; 


//Next.js backend 

const { publicKey, urlEndpoint, privateKey } = config.env.imagekit;

const imagekit = new ImageKit({
    publicKey,
    urlEndpoint,
    privateKey,
});



export async function GET() { 
   return NextResponse.json(imagekit.getAuthenticationParameters());
}  
 
/*answer is object
{
    "token": "random-token-string",
    "expire": 1700000000, 
    "signature": "hashed-signature"
}*/







