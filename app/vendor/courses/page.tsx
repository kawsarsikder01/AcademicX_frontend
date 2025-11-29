import VendorLayout from "../vendor-layout";
import { CourseTable } from "@/components/vendor/course-table";

export default function Course()
{
    return(
        <VendorLayout>
            <div className="@container/main flex flex-1 flex-col gap-2 p-4">
                <CourseTable role="vendor" />
            </div>
        </VendorLayout>
    )
}