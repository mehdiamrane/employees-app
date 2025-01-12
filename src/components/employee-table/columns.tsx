import { EmployeeModel } from "@/domain/models/employee.model";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon, ArrowUpDownIcon } from "lucide-react";
import { Link } from "../link";
import { Button } from "../ui/button";

export const columns: ColumnDef<EmployeeModel>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="flex items-center gap-1">
        ID
        <ArrowUpDownIcon className="h-3 w-3" />
      </div>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "employee_name",
    header: () => (
      <div className="flex items-center gap-1">
        Name
        <ArrowUpDownIcon className="h-3 w-3" />
      </div>
    ),
    cell: ({ row }) => (
      <Link href={`/employees/${row.original.id}`} className="hover:underline">
        {row.getValue("employee_name")}
      </Link>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="text-center">
        <Button variant="outline" size="xs" asChild>
          <Link href={`/employees/${row.original.id}`}>
            View
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    ),
  },
];
