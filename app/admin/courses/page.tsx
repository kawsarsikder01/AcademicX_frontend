import { CourseTable } from "@/components/vendor/course-table";
import AdminLayout from "../admin-layout";

export default function Page(){
    return (
        <AdminLayout>
            <div className="@container/main flex flex-1 flex-col gap-2 p-4">
                <CourseTable role="admin" />
            </div>
        </AdminLayout>
    )
}