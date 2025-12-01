export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageUrl = searchParams.get("page_url");

  const backendUrl = pageUrl
    ? pageUrl
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`;

  const res = await fetch(backendUrl);
  const courses = await res.json();

  return Response.json(courses);
}
