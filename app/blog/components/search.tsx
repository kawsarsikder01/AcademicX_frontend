'use client';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function BlogSearch({ }: {}) {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    )
}