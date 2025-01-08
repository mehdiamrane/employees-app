import { Building } from "lucide-react";

import { FileText, FolderKanban, Settings, Users } from "lucide-react";

// This is sample data.
export const USER_DATA = {
  name: "Admin User",
  email: "admin@example.com",
  avatar: "/avatars/user.jpg",
};

export const TEAMS_DATA = [
  {
    name: "ACME Corp",
    logo: Building,
    plan: "Enterprise",
  },
];

export const NAVIGATION_DATA = [
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
    description: "Manage and track ongoing projects",
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
    description: "View and manage employee information",
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
    description: "Access and organize important documents",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Configure system preferences and options",
  },
];
