'use client'

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { sidebarData } from "@/lib/data"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@/components/ui/dialog"
import { getIcon } from "@/lib/get-icon"

export function SearchMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  // Flatten all searchable sidebar items
  const allItems = useMemo(() => {
    const cloudsItems = sidebarData.navClouds.flatMap(cloud =>
      cloud.items?.map(sub => ({
        title: sub.title,
        url: sub.url,
        icon: cloud.icon
      })) ?? []
    )

    const mainItems = sidebarData.navMain.map(item => ({
      title: item.title,
      url: item.url,
      icon: item.icon
    }))

    const secondaryItems = sidebarData.navSecondary.map(item => ({
      title: item.title,
      url: item.url,
      icon: item.icon
    }))

    const documentItems = sidebarData.documents.map(item => ({
      title: item.name,
      url: item.url,
      icon: item.icon
    }))

    return [...mainItems, ...cloudsItems, ...secondaryItems, ...documentItems]
  }, [])

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query) return allItems
    return allItems.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [allItems, query])

  // Listen for Ctrl+K / ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle>
          <VisuallyHidden>My Dialog Title</VisuallyHidden>
        </DialogTitle>
      {/* Button Trigger that looks like input */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md text-sm transition-all
             px-3 py-2 justify-center h-8  w-auto
             hover:bg-secondary/80 text-foreground bg-surface dark:bg-card"
        >
          {/* Always show search icon */}
          <Search className="w-4 h-4" />

          {/* Show text only on sm+ screens */}
          <span className="hidden sm:inline truncate">Search menus...</span>

          {/* Show shortcut only on md+ screens */}
          <KbdGroup className="ml-2 hidden md:flex">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>

      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
        <div className="grid gap-4">
          {/* Search Input */}
          <Input
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {/* Search Results */}
          <ScrollArea className="max-h-80">
            <ul className="grid gap-2">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {

                  const Icon = getIcon(item.icon);
                  return(
                  <li key={idx}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 cursor-pointer"
                      onClick={() => {
                        if (item.url) window.location.href = item.url
                        setOpen(false)
                      }}
                    >
                      {item.icon && <Icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                    </Button>
                  </li>
                )
                })
              ) : (
                <li className="text-sm text-muted-foreground px-2 py-1">
                  No results found.
                </li>
              )}
            </ul>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
