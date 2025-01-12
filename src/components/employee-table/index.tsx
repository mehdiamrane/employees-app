import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmployeeModel } from "@/domain/models/employee.model";
import {
  Header,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserPlus, UserX } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Link } from "../link";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { EmployeeTableError } from "./error";
import { EmployeeTableSkeleton } from "./loading";

interface EmployeeTableProps {
  data?: EmployeeModel[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function EmployeeTable({ data = [], isLoading, isError, refetch }: EmployeeTableProps) {
  const params = useParams();
  const selectedEmployeeId = params.employeeId ? parseInt(params.employeeId as string, 10) : undefined;
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

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

  const computeTableHeadClasses = (header: Header<EmployeeModel, unknown>) => {
    switch (header.id) {
      case "actions":
        return "text-center w-[90px]";
      case "id":
        return "w-[50px]";
      default:
        return undefined;
    }
  };

  return (
    <Table>
      <TableCaption>{data.length === 1 ? "1 employee" : `${data.length} employees`}</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className={computeTableHeadClasses(header)}>
                <div
                  {...{
                    className: header.column.getCanSort() ? "cursor-pointer select-none flex items-center gap-1" : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className={row.original.id === selectedEmployeeId ? "bg-muted" : undefined}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
