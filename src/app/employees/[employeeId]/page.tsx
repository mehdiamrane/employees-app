"use client";

import { EmployeeDetailContent } from "@/components/employee-details";
import { EmployeeDetailError } from "@/components/employee-details/error";
import { EmployeeDetailSkeleton } from "@/components/employee-details/loading";
import { useGetEmployee } from "@/domain/hooks/useGetEmployee.hook";
import { usePageMeta } from "@/hooks/use-page-meta";
import { APIError } from "@/lib/errors";

export default function EmployeeDetailPage({ params }: { params: { employeeId: string } }) {
  const employeeId = parseInt(params.employeeId, 10);
  const { data: employee, isError, isLoading, refetch, error } = useGetEmployee(employeeId);

  usePageMeta({
    title: `Employee #${employeeId}`,
    description: `View and manage details for employee #${employeeId}`,
  });

  if (isLoading) {
    return <EmployeeDetailSkeleton />;
  }

  if (isError || !employee) {
    const errorStatus = error instanceof APIError ? error.status : undefined;
    return <EmployeeDetailError refetch={refetch} isLoading={isLoading} errorStatus={errorStatus} />;
  }

  return <EmployeeDetailContent employee={employee} />;
}
