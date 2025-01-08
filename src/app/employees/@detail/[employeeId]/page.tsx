"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { EmployeeModel } from "@/domain/models/employee.model";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EmployeeDetailPage() {
  // TODO: Replace with real data fetch
  const employee: EmployeeModel = {
    id: 2,
    employee_name: "Mock Employee",
    employee_salary: 10_000_000,
    employee_age: 20,
    profile_image: "https://avatars.githubusercontent.com/u/57904184?v=4",
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete employee:", employee.id);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Employee Details</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/employees/${employee.id}/edit`}>
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={employee.profile_image} />
            <AvatarFallback>{employee.employee_name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{employee.employee_name}</h3>
            <p className="text-sm text-muted-foreground">Employee ID: {employee.id}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Age</div>
            <div className="text-lg font-medium">{employee.employee_age} years</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Annual Salary</div>
            <div className="text-lg font-medium">{EmployeeFormatter.formatSalary(employee.employee_salary)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
