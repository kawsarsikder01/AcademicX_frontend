import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { vendorType } from "./vendor-list";
import VendorRow from "./vendor-row";

interface Props {
    vendors: vendorType[]
}

const VendorTable = ({ vendors }: Props) => {



    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">SL</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company/Institute</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vendors.map((vendor, index) => (
                    <VendorRow key={vendor.id} vendor={vendor} index={index} />
                ))}
            </TableBody>
        </Table>
    );


};

export default VendorTable;
