"use client"

import * as React from "react"
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getIcon, icons } from "@/lib/get-icon"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: keyof typeof icons
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = getIcon(item.icon) || null;
            return(
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActiveUrl={item.url}>
                <Link href={item.url}>
                  {Icon && <Icon/>}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

 