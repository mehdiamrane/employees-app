import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserRound } from "lucide-react";

export default function EmployeesPage() {
  return (
    <div className="p-4">
      <Alert className="bg-muted">
        <UserRound className="h-4 w-4 text-muted-foreground" />
        <AlertTitle className="text-muted-foreground">No Employee Selected</AlertTitle>
        <AlertDescription className="text-muted-foreground/80">
          Select an employee from the list to view their details.
        </AlertDescription>
      </Alert>
    </div>
  );
}
