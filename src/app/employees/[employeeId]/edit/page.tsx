"use client";

import { EmployeeForm } from "@/components/employee-form";
import EmployeeFormError from "@/components/employee-form/error";
import { EmployeeFormSkeleton } from "@/components/employee-form/loading";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { useUpdateEmployee } from "@/domain/hooks/useEmployeeMutations.hook";
import { useGetEmployee } from "@/domain/hooks/useGetEmployee.hook";
import { EmployeeFormData } from "@/domain/models/employee.model";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditEmployeePage({ params }: { params: { employeeId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = parseInt(params.employeeId, 10);

  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployee(employeeId);
  const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee(employeeId);

  usePageMeta({
    title: `Edit Employee #${employeeId}`,
    description: `Edit the details for employee #${employeeId}`,
  });

  const handleSubmit = (data: EmployeeFormData) => {
    updateEmployee(data, {
      onSuccess: () => {
        const params = new URLSearchParams(searchParams.toString());
        router.push(`/employees/${employeeId}?${params.toString()}`);
      },
    });
  };

  if (isLoadingEmployee) {
    return <EmployeeFormSkeleton />;
  }

  if (!employee) {
    return <EmployeeFormError />;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Edit Employee #{employee.id}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/employees/${employee.id}`}>Cancel</Link>
          </Button>
        </div>
      </div>
      <EmployeeForm employee={employee} onSubmit={handleSubmit} isLoading={isUpdating} />
    </div>
  );
}
