import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function EmployeeTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[50px]">ID</TableHead>
          <TableHead className="w-full">Name</TableHead>
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
