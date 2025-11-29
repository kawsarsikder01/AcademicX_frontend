import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Call external API with Axios
    const externalResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token } = externalResponse.data;

     const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set("user_token", token, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_API_NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;

  } catch (error: unknown) {
    const errorPayload = axios.isAxiosError(error)
      ? error.response?.data
      : error instanceof Error
      ? error.message
      : "Registration failed";

    return NextResponse.json(
      { success: false, error: errorPayload },
      { status: 500 }
    );
  }
}
