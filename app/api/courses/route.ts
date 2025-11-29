export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`);
  const courses = await res.json();

  return Response.json(courses);
}