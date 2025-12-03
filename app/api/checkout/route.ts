import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

     const cookieStore = await cookies();
    const userToken = cookieStore.get("user_token")?.value;

if (!userToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const externalResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/checkout`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        },
      }
    );

    const data = externalResponse.data;
 
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return new Response(error.response.data.message, { status: 500 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
