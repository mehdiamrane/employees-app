"use client";

import { usePathname } from "next/navigation";

export function useBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  // Always start with home
  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/",
    },
  ];

  // Build up breadcrumb paths
  let currentPath = "";
  paths.forEach((path) => {
    currentPath += `/${path}`;

    // Format the title (capitalize first letter, replace hyphens with spaces)
    const title = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      title,
      href: currentPath,
    });
  });

  return breadcrumbs;
}
