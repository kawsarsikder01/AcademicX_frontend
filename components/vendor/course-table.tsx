"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation";


type Category = {
    id: number;
    name: string;
    slug: string;
    status: number;
    created_at: string;
}

export type Course = {
    id: number
    thumbnail: string
    title: string
    category: Category
    price: string | number
    discount: string | number
    course_type: string
    start_date: string
    end_date: string
    streaming_server: string
    enrollment_close_date: string
    status: "pending" | "processing" | "success" | "failed"
}


export function CourseTable({ role }: { role: "admin" | "vendor" }) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [data, setData] = React.useState<Course[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({}) 


    const handleStatusUpdate = async (status: string, courseId: number) => {
        try {
            const res = await fetch(`/api/admin/course`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, id: courseId }),
            });

            const responseData = await res.json();

            if (!res.ok) throw new Error(responseData.error || "Update failed");

            toast.success("Status updated successfully");

            // Update local data state
            setData(prevData =>
                prevData.map(course =>
                    course.id === courseId
                        ? { ...course, status: status as Course["status"] }
                        : course
                )
            );

        } catch (err) {
            toast.error("Failed to update status");
            console.error(err);
        }
    };



    const columns: ColumnDef<Course>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: "Course",
            cell: ({ row }) => {
                const title = row.getValue("title") as string;

                const truncate = (str: string, n: number) =>
                    str.length > n ? str.substring(0, n) + "..." : str;

                return (
                    <div className="capitalize">
                        {truncate(title, 35)}   {/* change 35 as needed */}
                    </div>
                );
            },
        },
        {
            accessorKey: "category",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => {
                const category = row.getValue("category") as Category;
                return <div className="capitalize">{category.name}</div>;
            },
        }
        ,
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))

                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "BDT",
                }).format(amount)

                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "discount",
            header: () => <div className="text-right">Discount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("discount"))

                // Format the amount as a dollar amount
                const formatted = amount + '%'

                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "course_type",
            header: () => <div className="text-right">Course Type</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">{capitalizeFirst(row.getValue("course_type"))}</div>
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="text-right">Status</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">{capitalizeFirst(row.getValue("status"))}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const course = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {role === 'admin' && course.status === 'pending' && (
                                <>
                                    <DropdownMenuItem
                                        onClick={() => handleStatusUpdate('published', course.id)}
                                    >
                                        Publish
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() => handleStatusUpdate('rejected', course.id)}
                                    >
                                        Reject
                                    </DropdownMenuItem>
                                </>
                            )}

                            <DropdownMenuSeparator />
                            {role === 'vendor' && (
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            )}

                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]



    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/${role}/course`) // replace with your real API URL
                const json = await res.json()
                setData(json.data) // assuming API returns array of Course objects
            } catch (error) {
                console.error("Failed to fetch courses:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [role])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter course..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                {role === 'vendor' && (
                    <Link href="/vendor/courses/create" className="ml-2 cursor-pointer">
                        <Button className="cursor-pointer"><Plus /> Add Course</Button>
                    </Link>
                )}
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}



function capitalizeFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}