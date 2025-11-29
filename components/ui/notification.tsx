"use client"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { notifications } from "@/lib/data"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"




export function Notification() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Bell />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-80"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="max-h-64">
                    <ul className="grid gap-2 p-2">
                        {notifications.map((item) => (
                            <li key={item.id} className="p-2 rounded hover:bg-muted cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{item.title}</span>
                                    {item.time && <span className="text-xs text-muted-foreground">{item.time}</span>}
                                </div>
                                {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
