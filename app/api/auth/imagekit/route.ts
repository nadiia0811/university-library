/* import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";  */


//Next.js backend 

/* const { publicKey, urlEndpoint, privateKey } = config.env.imagekit;

const imagekit = new ImageKit({
    publicKey,
    urlEndpoint,
    privateKey,
});



export async function GET(res: NextResponse) { 
    console.log(imagekit.getAuthenticationParameters())
   return NextResponse.json(imagekit.getAuthenticationParameters());
}   */
 
/*answer is object
{
    "token": "random-token-string",
    "expire": 1700000000, 
    "signature": "hashed-signature"
}*/




import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import config from "@/lib/config";

const { publicKey, urlEndpoint, privateKey } = config.env.imagekit;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// Обрабатываем GET-запрос
export async function GET() {
  try {
    const authenticationParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParams, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error while generating authentication parameters:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Обрабатываем preflight-запросы
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}









