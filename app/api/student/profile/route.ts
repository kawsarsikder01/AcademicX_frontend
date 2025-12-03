import { cookies } from "next/headers";
import axios from "axios";
import { NextResponse } from "next/server";

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
}

interface UserResponse {
    success: boolean;
    user?: User;
    error?: string;
}

export const GET = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("user_token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = cookieStore.get("user")?.value;

    if (user) {
        return NextResponse.json({ success: true, user: JSON.parse(user) });
    }

    try {
        const response = await axios.get<User>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const returnResponse = NextResponse.json({ success: true, user: response.data });
        returnResponse.cookies.set("user", JSON.stringify(response.data), {
            httpOnly: true,
            secure: process.env.NEXT_PUBLIC_API_NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 15, // 15 days
        });
        return returnResponse;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Optional: delete cookie if token expired
            if (error.response.status === 401) {
                const res = NextResponse.json({ success: false, error: "Token expired" }, { status: 401 });
                res.cookies.delete("user_token");
                return res;
            }

            return NextResponse.json(
                { success: false, error: error.response.data },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Server error" },
            { status: 500 }
        );
    }
};
