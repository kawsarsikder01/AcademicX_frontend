import CategoryTable from "./CategoryTable";
import AddCategoryButton from "./AddCategoryButton";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cookies } from "next/headers";

export interface CategoryType {
    id: string;
    name: string;
    status: string | number;
}

// Server Component
const CategoryList = async () => {
    let categories: CategoryType[] = [];

    try {
        const cookieStore = await cookies();
        const adminToken = cookieStore.get("admin_token")?.value;


        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/categories`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
            cache: "no-store", // ensure fresh data on every request
        });


        if (!res.ok) throw new Error("Failed to fetch categories");

        categories = await res.json();
    } catch (error) {


        console.error(error);
    }

    return (
        <div className="@container/main flex flex-1 flex-col gap-2 p-4">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Category List</CardTitle>
                    <AddCategoryButton />
                </CardHeader>
                <CardDescription className="px-3">
                    <CategoryTable categories={categories}  />
                </CardDescription>
            </Card>
        </div>
    );
};

export default CategoryList;
