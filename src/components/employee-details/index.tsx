import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { useDeleteEmployee } from "@/domain/hooks/useEmployeeMutations.hook";
import { EmployeeModel } from "@/domain/models/employee.model";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteEmployeeDialog } from "../delete-dialog";
import { Button } from "../ui/button";

interface EmployeeDetailContentProps {
  employee: EmployeeModel;
}

export function EmployeeDetailContent({ employee }: EmployeeDetailContentProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee(employee.id);

  const handleDelete = () => {
    deleteEmployee(undefined, {
      onSuccess: () => {
        router.push("/employees");
      },
    });
  };
  return (
    <div className="p-4 pr-0 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Employee Details</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/employees/${employee.id}/edit`}>
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={employee.profile_image} className="rounded-md" />
            <AvatarFallback className="w-full h-full rounded-md">
              {employee.employee_name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{employee.employee_name}</h3>
            <p className="text-sm text-muted-foreground">Employee ID: {employee.id}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Age</div>
            <div className="text-lg font-medium">{employee.employee_age} years old</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Annual Salary</div>
            <div className="text-lg font-medium">{EmployeeFormatter.formatSalary(employee.employee_salary)}</div>
          </div>
        </div>
      </div>

      <DeleteEmployeeDialog
        employee={employee}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
