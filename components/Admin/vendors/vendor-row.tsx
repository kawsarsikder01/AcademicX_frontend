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

interface Props {
    vendor: vendorType;
    index: number;
}

const VendorRow = ({ vendor, index }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const verify = async (id: number | string, status: string) => {
        setIsSubmitting(true);

        try{
            const data = {
            status : status
        }
        await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/vendor/verify/${id}`,
                data
            );
            toast.success("Vendor status updated successfully!");
            router.refresh();
        }catch{
            toast.error("Failed to update status.");
        }finally{
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
                        <Badge variant="secondary">Pending</Badge>
                }
            </TableCell>
            <TableCell className="text-right">
                {vendor.verification_status === 'pending' && (
                    <>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="me-2">Verifiy</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Verify Vendor</DialogTitle>
                                    <DialogDescription>Please review and verify the vendor’s details below. Confirm the information is accurate before approving.</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                    <Button disabled={isSubmitting} onClick={()=>verify(vendor.id,'approved')}>
                                        {isSubmitting ? "Verifying..." : "Verify"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive">Reject</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Vendor Rejection</DialogTitle>
                                    <DialogDescription>Please review the vendor’s details below. If the information does not meet the required criteria, provide a reason and confirm the rejection.</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                    <Button disabled={isSubmitting} onClick={()=>verify(vendor.id,'rejected')}>
                                        {isSubmitting ? "Rejecting..." : "Reject"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        
                    </>
                )}
                <Button className="ms-2">View</Button>
            </TableCell>
        </TableRow>
    );
};

export default VendorRow;
