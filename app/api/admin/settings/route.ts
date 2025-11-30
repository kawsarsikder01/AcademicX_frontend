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

    // Read frontend formData
    const incoming = await request.formData();

    // Build proper multipart/form-data to send to backend
    const formToSend = new FormData();

    // Copy all text fields directly
    for (const [key, value] of incoming.entries()) {
      // Skip files handled below
      if (value instanceof File) continue;

      formToSend.append(key, value as string);
    }

    // Handle files
    const logo = incoming.get("site_logo");
    if (logo instanceof File && logo.size > 0) {
      formToSend.append("site_logo", logo, logo.name);
    }

    const favicon = incoming.get("site_favicon");
    if (favicon instanceof File && favicon.size > 0) {
      formToSend.append("site_favicon", favicon, favicon.name);
    }

    // SEND TO BACKEND (Axios automatically sets correct multipart headers)
    const externalResponse = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update/settings`,
      formToSend,
      {
        headers: {
          Authorization: `Bearer ${admin_token}`,
           
          // in browser environment axios handles Content-Type automatically
        },
      }
    );

    return NextResponse.json({
      message: "Settings updated successfully",
      data: externalResponse.data,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error.response.data);

    return NextResponse.json(
      {
        success: false,
        error: axios.isAxiosError(error)
          ? error.response?.data
          : error instanceof Error
          ? error.message
          : "Updating settings failed",
      },
      { status: 500 }
    );
  }
}

