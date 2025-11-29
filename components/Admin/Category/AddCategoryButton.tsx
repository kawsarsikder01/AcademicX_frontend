'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddCategoryButton = () => {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                name: name // convert boolean to number
            };
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/category`,
                data
            );
            toast.success("Category updated successfully!");
            setOpen(false)
            router.refresh();
        } catch {
            toast.error("Failed to update category.");
        }finally{
            setIsSubmitting(false);
        }
    }


    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Add New Category</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Add a new category by entering its name below. Click Save when you’re done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="CategoryName">Category Name</Label>
                    <Input id="CategoryName" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        variant="default"
                        type="button"
                        onClick={handleSubmit}

                    >
                        {isSubmitting ? "Saving..." : "Save changes"}
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};

export default AddCategoryButton;
