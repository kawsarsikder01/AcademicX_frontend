// lib/getCourses.ts
export async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`, {
    cache: "no-store",
  });

  return res.json();
}

