import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // params can be awaited

    const { name } = await req.json();

    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;

    if (!adminToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/create/category`;

    const response = await axios.post(
      url,
      { name},
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      message: "Category updated",
      data: response.data,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}
