/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    const cookieStore = await cookies();
    const vendor_token = cookieStore.get("vendor_token")?.value;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/vendor/courses`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vendor_token}`,
        },
      }
    );

    return NextResponse.json({
      message: "Courses fetched successfully",
      data: response.data,
    });
  } catch (error: unknown) {
    console.error("Error fetching courses:", error);

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const payload = JSON.parse(formData.get("payload") as string);
    const thumbnail = formData.get("thumbnail") as File | null;

    const lessonsWithVideos = payload.lessons.map((lesson: any, index: number) => ({
      ...lesson,
      videoFile: formData.get(`lessonVideo_${index}`) as File | null,
    }));

    const cookieStore = await cookies();
    const vendorToken = cookieStore.get("vendor_token")?.value;

    if (!vendorToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Construct FormData for Axios
    const formToSend = new FormData();
    formToSend.append("payload", JSON.stringify(payload));
    
    if (thumbnail) formToSend.append("thumbnail", thumbnail);
    lessonsWithVideos.forEach((lesson: { videoFile: string | Blob; }, index: any) => {
      if (lesson.videoFile) formToSend.append(`lessonVideo_${index}`, lesson.videoFile);
    });

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/vendor/create/course`;
    const response = await axios.post(url, formToSend, {
      headers: {
        Authorization: `Bearer ${vendorToken}`,
      },
    });

    console.log(response)

    return NextResponse.json({
      message: "Course created successfully",
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
