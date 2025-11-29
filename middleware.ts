import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const admin_token = request.cookies.get("admin_token")?.value;
  const vendor_token = request.cookies.get("vendor_token")?.value;
  const user_token = request.cookies.get("user_token")?.value;

  const { pathname } = request.nextUrl;
  if (!admin_token) {
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  if (admin_token) {
    if (pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (!vendor_token) {
    if (pathname.startsWith("/vendor") && pathname !== "/vendor/login") {
      return NextResponse.redirect(new URL("/vendor/login", request.url));
    }
  }

  if (vendor_token) {
    if (pathname === "/vendor/login") {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }
  }

  if (!user_token) {
    if (pathname.startsWith("/checkout") || pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user_token) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/student/portal", request.url));
    }
  }
  return NextResponse.next();
}
