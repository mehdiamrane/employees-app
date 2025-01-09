import { Skeleton } from "@/components/ui/skeleton";

export function EmployeeFormSkeleton() {
  return (
    <div className="p-4 pr-0 space-y-6">
      <h2 className="text-lg font-semibold">Edit Employee</h2>
      <div className="space-y-4">
        <div className="flex justify-center">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>
    </div>
  );
}
