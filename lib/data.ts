 
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
    { title: "Vendors", url: "/admin/vendors", icon: "chart-bar" },
    { title: "Courses", url: "/admin/courses", icon: "folder" },
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

export  const curriculum = [
    {
      id: "section-1",
      title: "Introduction to Web Development",
      lessons: [
        {
          id: "lesson-1-1",
          title: "What is Web Development?",
          duration: "10:30",
          description: "Learn about the fundamentals of web development and what you'll build in this course.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          quiz: {
            question: "What are the three core technologies of web development?",
            options: [
              { id: "a", text: "HTML, CSS, JavaScript" },
              { id: "b", text: "Python, Java, C++" },
              { id: "c", text: "React, Angular, Vue" },
              { id: "d", text: "MySQL, MongoDB, PostgreSQL" }
            ],
            correctAnswer: "a"
          }
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Your Development Environment",
          duration: "15:45",
          description: "Install and configure the necessary tools for web development including VS Code, Node.js, and browser dev tools.",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          quiz: null
        }
      ]
    },
    {
      id: "section-2",
      title: "HTML5 Fundamentals",
      lessons: [
        {
          id: "lesson-2-1",
          title: "HTML Document Structure",
          duration: "12:20",
          description: "Understand the basic structure of an HTML document and essential tags.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          quiz: {
            question: "Which tag is used for the largest heading?",
            options: [
              { id: "a", text: "<head>" },
              { id: "b", text: "<h6>" },
              { id: "c", text: "<h1>" },
              { id: "d", text: "<header>" }
            ],
            correctAnswer: "c"
          }
        },
        {
          id: "lesson-2-2",
          title: "Working with Forms",
          duration: "18:30",
          description: "Create interactive forms with various input types and validation.",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          quiz: null
        }
      ]
    },
    {
      id: "section-3",
      title: "CSS3 & Responsive Design",
      lessons: [
        {
          id: "lesson-3-1",
          title: "CSS Selectors and Properties",
          duration: "14:15",
          description: "Master CSS selectors, properties, and values to style your web pages.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          quiz: null
        }
      ]
    }
  ];