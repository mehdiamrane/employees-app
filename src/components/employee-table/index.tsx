import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmployeeModel } from "@/domain/models/employee.model";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { EmployeeTableError } from "./error";
import { EmployeeTableSkeleton } from "./loading";

interface EmployeeTableProps {
  data?: EmployeeModel[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function EmployeeTable({ data, isLoading, isError, refetch }: EmployeeTableProps) {
  if (isLoading) {
    return <EmployeeTableSkeleton />;
  }

  if (isError) {
    return <EmployeeTableError refetch={refetch} />;
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
        <p>No employees found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>{data.length} employees</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[50px]">ID</TableHead>
          <TableHead className="w-full">Name</TableHead>
          <TableHead className="min-w-[90px] text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.id}</TableCell>
            <TableCell>
              <Link href={`/employees/${employee.id}`} className="hover:underline">
                {employee.employee_name}
              </Link>
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" size="xs" asChild>
                <Link href={`/employees/${employee.id}`}>
                  View
                  <ArrowRightIcon />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
