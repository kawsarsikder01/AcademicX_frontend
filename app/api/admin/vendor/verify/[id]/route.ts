import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();
 

    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;

    if (!adminToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${baseUrl}/admin/vendor/update/status/${id}` ;

    const response = await axios.put(
      url,
      { status: status }, // body
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      message: "Vendor status updated successfully",
      data: response.data,
    });
  } catch {
    // console.error("Error verifying vendor:", error);
    return NextResponse.json(
      { message: "Failed to update vendor status" },
      { status: 500 }
    );
  }
}
