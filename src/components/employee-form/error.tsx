import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EmployeeFormError() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold">Edit Employee</h2>
      <Alert variant="destructive">
        <AlertDescription>Employee not found or error loading data</AlertDescription>
      </Alert>
    </div>
  );
}
