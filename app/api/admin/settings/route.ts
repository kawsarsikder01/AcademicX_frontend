import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const admin_token = cookieStore.get("admin_token")?.value;

    if (!admin_token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/settings`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin_token}`,
        },
      }
    );

    return NextResponse.json({
      message: "Settings fetched successfully",
      data: response.data,
    });
  } catch (error: unknown) {
    const errorPayload = axios.isAxiosError(error)
      ? error.response?.data
      : error instanceof Error
      ? error.message
      : "Fetching settings failed";

    return NextResponse.json(
      { success: false, error: errorPayload },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const admin_token = cookieStore.get("admin_token")?.value;
    if (!admin_token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();

    const data = JSON.parse(formData.get("body") as string);

    const externalResponse = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update/settings`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin_token}`,
        },
      }
    );

    console.log(externalResponse.data);
    return NextResponse.json({
      message: "Settings updated successfully",
      data: externalResponse.data,
    });
  } catch (error: unknown) {
    console.log(error);
    const errorPayload = axios.isAxiosError(error)
      ? error.response?.data
      : error instanceof Error
      ? error.message
      : "Updating settings failed";

    return NextResponse.json(
      { success: false, error: errorPayload },
      { status: 500 }
    );
  }
}
