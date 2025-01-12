"use client";

import { EmployeeTable } from "@/components/employee-table";
import { Button } from "@/components/ui/button";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import { useDeviceType } from "@/hooks/use-device-type";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface EmployeeLayoutProps {
  children: ReactNode;
}

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  const { data, isLoading, isError, refetch } = useGetEmployeeList();
  const pathname = usePathname();
  const { isTablet, isLoading: isDeviceTypeLoading } = useDeviceType();

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employees {data && <span>({data.length})</span>}</h1>
          <Button variant="outline" asChild>
            <Link href="/employees/create">Add Employee</Link>
          </Button>
        </div>

        <EmployeeTable data={data} isLoading={isLoading} isError={isError} refetch={refetch} />
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
