import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDownIcon } from "lucide-react";

export function EmployeeTableSkeleton() {
  return (
    <Table data-testid="employee-table-skeleton">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[50px]">
            <div className="flex items-center gap-1">
              ID
              <ArrowUpDownIcon className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead className="w-full">
            <div className="flex items-center gap-1">
              Name
              <ArrowUpDownIcon className="h-3 w-3" />
            </div>
          </TableHead>
          <TableHead className="min-w-[90px] text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={`skeleton-${index}`}>
            <TableCell>
              <div className="h-4 my-1 w-8 animate-pulse rounded bg-muted" />
            </TableCell>
            <TableCell>
              <div className="h-4 my-1 w-48 animate-pulse rounded bg-muted" />
            </TableCell>
            <TableCell className="text-center">
              <div className="h-4 my-1 w-[70px] animate-pulse rounded bg-muted" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
