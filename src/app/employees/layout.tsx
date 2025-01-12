"use client";

import { EmployeeList } from "@/components/employee-list";
import { useDeviceType } from "@/hooks/use-device-type";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface EmployeeLayoutProps {
  children: ReactNode;
}

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  const { isTablet, isLoading: isDeviceTypeLoading } = useDeviceType();
  const pathname = usePathname();

  // Check if we're on a detail/edit/create route
  const isDetailRoute = pathname !== "/employees";

  if (isDeviceTypeLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className={cn("flex-1 min-w-0 overflow-auto p-4", isTablet && isDetailRoute && "hidden")}>
        <EmployeeList />
      </main>

      <aside
        className={cn(
          "w-[400px] border-l overflow-auto",
          isTablet && !isDetailRoute && "hidden",
          isTablet && "w-full border-l-0"
        )}
      >
        {children}
      </aside>
    </div>
  );
};

export default EmployeeLayout;
