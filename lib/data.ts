 
import { IconType } from "./get-icon";


export const sidebarData: {
  user: { name: string; email: string; avatar: string };
  navMain: { title: string; url: string; icon: IconType }[];
  navClouds: {
    title: string;
    icon: IconType;
    isActive?: boolean;
    url: string;
    items: { title: string; url: string }[];
  }[];
  navSecondary: { title: string; url: string; icon: IconType }[];
  documents: { name: string; url: string; icon: IconType }[];
} = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/vendor/dashboard", icon: "dashboard" },
    { title: "Course", url: "/vendor/courses", icon: "list-details" },
    { title: "Analytics", url: "#", icon: "chart-bar" },
    { title: "Projects", url: "#", icon: "folder" },
    { title: "Team", url: "#", icon: "users" },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: "camera",
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Proposal",
      icon: "file-description",
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Prompts",
      icon: "file-ai",
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: "settings" },
    { title: "Get Help", url: "#", icon: "help" },
    { title: "Search", url: "#", icon: "search" },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: "database" },
    { name: "Reports", url: "#", icon: "report" },
    { name: "Word Assistant", url: "#", icon: "file-word" },
  ],
};


export const AdminsidebarData: {
  user: { name: string; email: string; avatar: string };
  navMain: { title: string; url: string; icon: IconType }[];
  navClouds: {
    title: string;
    icon: IconType;
    isActive?: boolean;
    url: string;
    items: { title: string; url: string }[];
  }[];
  navSecondary: { title: string; url: string; icon: IconType }[];
  documents: { name: string; url: string; icon: IconType }[];
} = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/admin/dashboard", icon: "dashboard" },
    { title: "Categories", url: "/admin/categories", icon: "list-details" },
    { title: "Vendors", url: "/admin/vendors", icon: "users" },
    { title: "Courses", url: "/admin/courses", icon: "folder" },
    { title: "Settings", url: "/admin/settings", icon: "settings" },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: "camera",
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Proposal",
      icon: "file-description",
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Prompts",
      icon: "file-ai",
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: "settings" },
    { title: "Get Help", url: "#", icon: "help" },
    { title: "Search", url: "#", icon: "search" },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: "database" },
    { name: "Reports", url: "#", icon: "report" },
    { name: "Word Assistant", url: "#", icon: "file-word" },
  ],
};


interface NotificationItem {
  id: number
  title: string
  description?: string
  time?: string
}

export const notifications: NotificationItem[] = [
  { id: 1, title: "New user registered", description: "John Doe just signed up.", time: "2m ago" },
  { id: 2, title: "Server down", description: "Server #12 is not responding.", time: "10m ago" },
  { id: 3, title: "New comment", description: "You have a new comment on your post.", time: "1h ago" },
  { id: 4, title: "Update available", description: "Version 2.3.0 is now available.", time: "Yesterday" },
]

 