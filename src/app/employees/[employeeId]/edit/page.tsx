"use client";

import { EmployeeForm } from "@/components/employee-form";
import EmployeeFormError from "@/components/employee-form/error";
import { EmployeeFormSkeleton } from "@/components/employee-form/loading";
import { Button } from "@/components/ui/button";
import { useUpdateEmployee } from "@/domain/hooks/useEmployeeMutations.hook";
import { useGetEmployee } from "@/domain/hooks/useGetEmployee.hook";
import { EmployeeFormData } from "@/domain/schemas/employee.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditEmployeePage({ params }: { params: { employeeId: string } }) {
  const router = useRouter();
  const employeeId = parseInt(params.employeeId, 10);

  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployee(employeeId);
  const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee(employeeId);

  const handleSubmit = (data: EmployeeFormData) => {
    updateEmployee(data, {
      onSuccess: () => {
        router.push(`/employees/${employeeId}`);
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
