import { z } from "zod";

// Base validation rules
const BaseEmployeeSchema = {
  employee_name: z.string().min(1, "Name is required"),
  employee_salary: z.coerce
    .number()
    .min(1, "Salary must be greater than 0")
    .max(1_000_000, "Salary must be less or equal than 1 million"),
  employee_age: z.coerce.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100"),
  profile_image: z.string().url("Must be a valid URL").or(z.string().length(0)),
};

export const EmployeeFormSchema = z.object(BaseEmployeeSchema);
export const EmployeeSchema = EmployeeFormSchema.extend({
  id: z.number().positive(),
});
export const EmployeeListSchema = EmployeeSchema.array();

export type EmployeeModel = z.infer<typeof EmployeeSchema>;
export type EmployeeListModel = EmployeeModel[];
export type EmployeeFormData = z.infer<typeof EmployeeFormSchema>;
