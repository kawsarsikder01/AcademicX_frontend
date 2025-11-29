'use client';
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs"; 
import { Course } from "./sections/CourseSection";

export default function Overview({ course }: { course: Course | null }) {
    return (
        <TabsContent value="overview" className="mt-8">
            <Card>
                <CardContent className="p-6">
                    <div
                        dangerouslySetInnerHTML={{ __html: course?.course_overview??"" }}
                    />
                </CardContent>
            </Card>
        </TabsContent>
    )
}