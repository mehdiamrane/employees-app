"use client";

import { EmployeeTable } from "@/components/employee-table";
import { Button } from "@/components/ui/button";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import Link from "next/link";
import { ReactNode } from "react";

interface EmployeeLayoutProps {
  children: ReactNode;
  detail: ReactNode;
}

const EmployeeLayout = ({ children, detail }: EmployeeLayoutProps) => {
  const { data, isLoading, isError, refetch } = useGetEmployeeList();

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1">
        <div className="py-4">
          <div className="flex justify-between items-center w-full mb-6">
            <h1 className="text-2xl font-bold">Employees {data && <span>({data.length})</span>}</h1>
            <Button variant="outline" asChild>
              <Link href="/employees/create">Add Employee</Link>
            </Button>
          </div>

          <EmployeeTable data={data} isLoading={isLoading} isError={isError} refetch={refetch} />
        </div>
      </div>
      <div className="w-[400px] border-l min-h-screen">{children}</div>
    </div>
  );
};

export default EmployeeLayout;
