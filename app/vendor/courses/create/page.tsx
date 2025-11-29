import CourseForm from "@/components/vendor/course-form";
import VendorLayout from "./../../vendor-layout"; 

export default function CreateCoursePage() {
    return(
        <VendorLayout>
            <div className="@container/main flex flex-1 flex-col gap-2 p-4">
                <CourseForm/>
            </div>
        </VendorLayout>
    )
}