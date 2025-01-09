import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function EmployeeDetailSkeleton() {
  return (
    <div className="p-4 pr-0 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Employee Details</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" disabled>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-muted">
              <Skeleton className="h-full w-full" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-2">
          <div className="border rounded-lg p-4">
            <Skeleton className="h-4 w-16 mb-2 " />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="border rounded-lg p-4">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
