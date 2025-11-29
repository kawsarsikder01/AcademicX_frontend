'use client'

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CategoryType } from "./CategoryList";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
    category: CategoryType;
    index: number;
}

const CategoryRow = ({ category, index }: Props) => {
    const [name, setName] = useState(category.name);
    const [status, setStatus] = useState(category.status === 1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                name: name,
                status: status ? 1 : 0, // convert boolean to number
            };

            await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/category/${category.id}`,
                data
            );
            toast.success("Category updated successfully!");
            router.refresh();
        } catch {
            toast.error("Failed to update category.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>
                {category.status === 1 ?
                    <Badge variant="secondary" className="bg-green-500 text-white dark:bg-green-600">Active</Badge> :
                    <Badge variant="destructive">Inactive</Badge>
                }
            </TableCell>
            <TableCell className="text-right">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Edit</Button>
                    </DialogTrigger>
                    <form >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                                <DialogDescription>
                                    Make changes to your category here. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor={`name-${category.id}`}>Name</Label>
                                    <Input
                                        id={`name-${category.id}`}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3">
                                        <Checkbox
                                            id={`status-${category.id}`}
                                            checked={status}
                                            onCheckedChange={(checked: boolean) => setStatus(checked)}
                                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                        />
                                        <div className="grid gap-1.5 font-normal">
                                            <p className="text-sm leading-none font-medium">Enable Category</p>
                                            <p className="text-muted-foreground text-sm">
                                                You can enable or disable category at any time.
                                            </p>
                                        </div>
                                    </Label>
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
                                        disabled={isSubmitting}
                                        onClick={(e) => {
                                            // Trigger async but don't await — dialog will close immediately
                                            handleUpdateSubmit(e);
                                        }}
                                    >
                                        {isSubmitting ? "Saving..." : "Save changes"}
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

export default CategoryRow;
