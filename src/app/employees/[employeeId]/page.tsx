"use client";

import { EmployeeDetailContent } from "@/components/employee-details";
import { EmployeeDetailError } from "@/components/employee-details/error";
import { EmployeeDetailSkeleton } from "@/components/employee-details/loading";
import { useGetEmployee } from "@/domain/hooks/useGetEmployee.hook";

export default function EmployeeDetailPage({ params }: { params: { employeeId: string } }) {
  const employeeId = parseInt(params.employeeId, 10);
  const { data: employee, isError, isLoading, refetch } = useGetEmployee(employeeId);

  if (isLoading) {
    return <EmployeeDetailSkeleton />;
  }

  if (isError || !employee) {
    return <EmployeeDetailError refetch={refetch} isLoading={isLoading} />;
  }

  return <EmployeeDetailContent employee={employee} />;
}
