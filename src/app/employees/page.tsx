"use client";

import { EmployeeTable } from "@/components/employee-table";
import { Button } from "@/components/ui/button";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import Link from "next/link";

export default function EmployeesPage() {
  const { data, isLoading, isError, refetch } = useGetEmployeeList();

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-6 gap-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Employees {data && <span>({data.length})</span>}</h1>
        <Button variant="outline" asChild>
          <Link href="/employees/create">Add Employee</Link>
        </Button>
      </div>

      <EmployeeTable data={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </main>
  );
}
