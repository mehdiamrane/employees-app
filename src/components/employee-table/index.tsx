import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmployeeModel } from "@/domain/models/employee.model";
import { ArrowRightIcon, UserPlus, UserX } from "lucide-react";
import { useParams } from "next/navigation";
import { Link } from "../link";
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
  const params = useParams();
  const selectedEmployeeId = params.employeeId ? parseInt(params.employeeId as string, 10) : undefined;

  if (isLoading) {
    return <EmployeeTableSkeleton />;
  }

  if (isError) {
    return <EmployeeTableError refetch={refetch} isLoading={isLoading} />;
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-4 text-muted-foreground bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25">
        <div className="flex flex-col items-center gap-2 text-center">
          <UserX className="w-10 h-10 opacity-50" />
          <span className="text-md font-semibold">No employees found</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/employees/create" className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Employee
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>{data.length === 1 ? "1 employee" : `${data.length} employees`}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[50px]">ID</TableHead>
          <TableHead className="w-full">Name</TableHead>
          <TableHead className="min-w-[90px] text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((employee) => (
          <TableRow key={employee.id} className={employee.id === selectedEmployeeId ? "bg-muted" : undefined}>
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
