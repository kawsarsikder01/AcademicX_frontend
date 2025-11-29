import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // params can be awaited
    const params = await context.params;
    const id = params.id;

    const { name, status } = await req.json();

    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;

    if (!adminToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update/category/${id}`;

    const response = await axios.put(
      url,
      { name, status: Number(status) },
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
