// Mark this page as fully dynamic (required because we use cookies)
export const dynamic = "force-dynamic";

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
    // Access cookies safely
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value || "";

    if (!adminToken) {
      console.warn("No admin_token found in cookies");
    }

    // Fetch categories at runtime, never during build
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/categories`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      cache: "no-store", // always fetch fresh data
    });

    if (!res.ok) {
      console.error("Failed to fetch categories", res.status, await res.text());
      throw new Error("Failed to fetch categories");
    }

    categories = await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    categories = []; // fallback to empty array
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Category List</CardTitle>
          <AddCategoryButton />
        </CardHeader>
        <CardDescription className="px-3">
          <CategoryTable categories={categories} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CategoryList;
