'use client'
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { vendorType } from "./vendor-list";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Props {
    vendor: vendorType;
    index: number;
}

const VendorRow = ({ vendor, index }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleUpdateStatus = async (id: number | string, status: string) => {
        setIsSubmitting(true);

        try {
            const data = {
                status: status
            }
            await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/vendor/verify/${id}`,
                data
            );
            toast.success("Vendor status updated successfully!");
            router.refresh();
        } catch {
            toast.error("Failed to update status.");
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <TableRow>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{vendor.ownername}</TableCell>
            <TableCell>{vendor.company_name}</TableCell>
            <TableCell>{vendor.address}</TableCell>
            <TableCell>
                {vendor.verification_status === 'approved' ?
                    <Badge variant="secondary" className="bg-green-500 text-white dark:bg-green-600">Verified</Badge> :
                    vendor.verification_status === 'rejected' ? <Badge variant="destructive">Rejected</Badge> :
                    vendor.verification_status === 'blocked' ? <Badge variant="destructive">Blocked</Badge> :
                        <Badge variant="default">Pending</Badge>
                }
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {vendor.verification_status === 'pending' && (
                            <>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(vendor.id, 'approved')}>Verify</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(vendor.id, 'rejected')}>Reject</DropdownMenuItem>
                            </>
                        )}
                        { vendor.verification_status === 'approved' && (
                            <DropdownMenuItem onClick={() => handleUpdateStatus(vendor.id, 'blocked')}>Blocked</DropdownMenuItem>
                        )}
                        { vendor.verification_status === 'blocked' && (
                            <DropdownMenuItem onClick={() => handleUpdateStatus(vendor.id, 'approved')}>Unblock</DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default VendorRow;
