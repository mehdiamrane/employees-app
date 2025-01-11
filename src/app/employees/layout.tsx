"use client";

import { EmployeeTable } from "@/components/employee-table";
import { Button } from "@/components/ui/button";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import Link from "next/link";
import { ReactNode } from "react";

interface EmployeeLayoutProps {
  children: ReactNode;
}

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  const { data, isLoading, isError, refetch } = useGetEmployeeList();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="flex-1 min-w-0 overflow-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employees {data && <span>({data.length})</span>}</h1>
          <Button variant="outline" asChild>
            <Link href="/employees/create">Add Employee</Link>
          </Button>
        </div>

        <EmployeeTable data={data} isLoading={isLoading} isError={isError} refetch={refetch} />
      </main>

      <aside className="w-[400px] border-l overflow-auto">{children}</aside>
    </div>
  );
};

export default EmployeeLayout;
