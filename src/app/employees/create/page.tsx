"use client";

import { EmployeeForm } from "@/components/employee-form";
import { useCreateEmployee } from "@/domain/hooks/useEmployeeMutations.hook";
import { EmployeeFormData } from "@/domain/models/employee.model";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useRouter } from "next/navigation";

export default function CreateEmployeePage() {
  const router = useRouter();
  const { mutate: createEmployee, isPending } = useCreateEmployee();

  usePageMeta({
    title: "Create Employee",
    description: "Create a new employee for your organization",
  });

  const handleSubmit = (data: EmployeeFormData) => {
    createEmployee(data, {
      onSuccess: (employee) => {
        router.push(employee?.id ? `/employees/${employee.id}` : "/employees");
      },
    });
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold">Create Employee</h2>
      <EmployeeForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}
