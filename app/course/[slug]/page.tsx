import CourseDetails from "@/components/CourseDetails"
import { Providers } from "@/components/Provider"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <Providers>
    <CourseDetails slug={slug} />
  </Providers>
}