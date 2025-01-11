import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import { EmployeeListModel, EmployeeListSchema, EmployeeModel, EmployeeSchema } from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";
import { EmployeeFormData } from "@/domain/schemas/employee.schema";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees`);

      // Get the response data
      const json = await response.json();

      // Check for error responses
      if (!response.ok) {
        const errorMessage =
          json.errors?.map((error?: { message?: string }) => error?.message).join(", ") || json.message;
        throw new Error(errorMessage || "Failed to get employee list");
      }

      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      console.error("getEmployeeList exception:", exception);
      return undefined;
    }
  }

  public async createEmployee(params: EmployeeFormData): Promise<EmployeeModel> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      // Get the response data
      const json = await response.json();

      // Check for error responses
      if (!response.ok) {
        const errorMessage =
          json.errors?.map((error?: { message?: string }) => error?.message).join(", ") || json.message;
        throw new Error(errorMessage || "Failed to create employee");
      }

      // Extract data
      const data = json["data"];
      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("createEmployee exception:", exception);
      throw exception; // Re-throw the error to be caught by the mutation
    }
  }

  public async getEmployeeById(params: GetEmployeeByIdParams): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/employee/${params.id}`);

      // Get the response data
      const json = await response.json();

      // Check for error responses
      if (!response.ok) {
        const errorMessage =
          json.errors?.map((error?: { message?: string }) => error?.message).join(", ") || json.message;
        throw new Error(errorMessage || "Failed to get employee");
      }

      // Extract data
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("getEmployeeById exception:", exception);
      return undefined;
    }
  }

  public async updateEmployeeById(params: { id: number } & EmployeeFormData): Promise<EmployeeModel> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      // Get the response data
      const json = await response.json();

      // Check for error responses
      if (!response.ok) {
        const errorMessage =
          json.errors?.map((error?: { message?: string }) => error?.message).join(", ") || json.message;
        throw new Error(errorMessage || "Failed to update employee");
      }

      // Extract data
      const data = json["data"];
      return EmployeeSchema.parse(data);
    } catch (exception) {
      console.error("updateEmployeeById exception:", exception);
      throw exception; // Re-throw the error to be caught by the mutation
    }
  }

  public deleteEmployeeById(params: unknown): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }
}
