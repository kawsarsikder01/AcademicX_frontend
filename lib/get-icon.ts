// lib/get-icon.ts
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconCamera,
  IconFileDescription,
  IconFileAi,
  IconSettings,
  IconHelp,
  IconSearch,
  IconDatabase,
  IconReport,
  IconFileWord,
} from "@tabler/icons-react";


export type IconType =
  | "dashboard"
  | "list-details"
  | "chart-bar"
  | "folder"
  | "users"
  | "camera"
  | "file-description"
  | "file-ai"
  | "settings"
  | "help"
  | "search"
  | "database"
  | "report"
  | "file-word";

export const icons = {
  dashboard: IconDashboard,
  "list-details": IconListDetails,
  "chart-bar": IconChartBar,
  folder: IconFolder,
  users: IconUsers,
  camera: IconCamera,
  "file-description": IconFileDescription,
  "file-ai": IconFileAi,
  settings: IconSettings,
  help: IconHelp,
  search: IconSearch,
  database: IconDatabase,
  report: IconReport,
  "file-word": IconFileWord,
};

export function getIcon(name: keyof typeof icons) {
  return icons[name] || null;
}
