import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CategoryRow from "./CategoryRow";
import { CategoryType } from "./CategoryList";
 
interface Props {
    categories: CategoryType[]
}

const CategoryTable = ({ categories }: Props) => {



    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">SL</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category, index) => (
                    <CategoryRow key={category.id} category={category} index={index} />
                ))}
            </TableBody>
        </Table>
    );


};

export default CategoryTable;
