import type { NextRequest } from "next/server";

export  async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/courses/[slug]">
) {
  const { slug } = await ctx.params;


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${slug}`
  );
  const course = await res.json();

  return Response.json(course);
}
