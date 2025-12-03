export const dynamic = "force-dynamic";

import CategoryList from "@/components/Admin/Category/CategoryList";
import AdminLayout from "../admin-layout";

const CategoriesPage = () => {
return (<AdminLayout>
<CategoryList />
</AdminLayout>);
};

export default CategoriesPage;
