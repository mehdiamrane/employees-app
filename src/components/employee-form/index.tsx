import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployeeModel } from "@/domain/models/employee.model";
import { EmployeeFormData, employeeFormSchema } from "@/domain/schemas/employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface EmployeeFormProps {
  employee?: EmployeeModel;
  onSubmit: (data: EmployeeFormData) => void;
  isLoading?: boolean;
}

export function EmployeeForm({ employee, onSubmit, isLoading }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      employee_name: employee?.employee_name ?? "",
      employee_salary: employee?.employee_salary ?? undefined,
      employee_age: employee?.employee_age ?? undefined,
      profile_image: employee?.profile_image ?? "",
    },
  });

  const profileImage = watch("profile_image");
  const name = watch("employee_name");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-center mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-2">
        <label htmlFor="profileImage" className="text-sm font-medium">
          Profile Image URL
        </label>
        <Input {...register("profile_image")} id="profileImage" type="url" placeholder="Enter profile image URL" />
        {errors.profile_image && <p className="text-sm text-destructive">{errors.profile_image.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Employee Name
        </label>
        <Input {...register("employee_name")} id="name" placeholder="Enter employee name" />
        {errors.employee_name && <p className="text-sm text-destructive">{errors.employee_name.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="age" className="text-sm font-medium">
          Age
        </label>
        <Input {...register("employee_age")} id="age" type="number" placeholder="Enter age" min="18" max="100" />
        {errors.employee_age && <p className="text-sm text-destructive">{errors.employee_age.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="salary" className="text-sm font-medium">
          Annual Salary
        </label>
        <Input {...register("employee_salary")} id="salary" type="number" placeholder="Enter annual salary" />
        {errors.employee_salary && <p className="text-sm text-destructive">{errors.employee_salary.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : employee ? "Update Employee" : "Create Employee"}
      </Button>
    </form>
  );
}
