import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const vendor_token = cookieStore.get("vendor_token")?.value;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/vendor/categories`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vendor_token}`,
        },
      }
    );

    return NextResponse.json({
      message: "Category fetched successfully",
      data: response.data,
    });
  } catch (error: unknown) {

    // Axios errors have a 'response' object with status and data
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const errorMessage =
        error.response?.data?.message || "An unknown server error occurred.";

      return NextResponse.json(
        {
          message: errorMessage,
          details: error.response?.data || null,
        },
        { status }
      );
    }

    // Fallback for unexpected errors
    return NextResponse.json(
      { message: "Failed to fetch courses due to an unexpected error." },
      { status: 500 }
    );
  }
}
