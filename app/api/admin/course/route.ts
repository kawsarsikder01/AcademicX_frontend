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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/courses`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin_token}`,
        },
      }
    );

    return NextResponse.json({
      message: "Courses fetched successfully",
      data: response.data,
    });
  } catch (error: unknown) {
    const errorPayload = axios.isAxiosError(error)
      ? error.response?.data
      : error instanceof Error
      ? error.message
      : "Fetching courses failed";

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

    const body = await request.json();

    // Call external API with Axios
    const externalResponse = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update/course/status`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin_token}`,
        },
      }
    );

    return NextResponse.json(
      { message: "Course status updated successfully", data: JSON.stringify(externalResponse.data) },
      { status: 200 }
    );

  } catch (error: unknown) {
    const errorPayload = axios.isAxiosError(error)
      ? error.response?.data
      : error instanceof Error
      ? error.message
      : "Updating course status failed";

    console.error("Updating course status error:", errorPayload);

    return NextResponse.json(
      { success: false, error: JSON.stringify(errorPayload) },
      { status: 500 }
    );
  }
}
