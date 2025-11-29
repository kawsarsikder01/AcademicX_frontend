import { IconCirclePlusFilled } from "@tabler/icons-react"
import { getIcon, icons } from "@/lib/get-icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: keyof typeof icons,
  }[]
}) {



  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const Icon = getIcon(item.icon) || null;
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton className="cursor-pointer" tooltip={item.title} isActiveUrl={item.url}>
                    {Icon && <Icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
