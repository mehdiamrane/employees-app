import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import { EmployeeListModel, EmployeeListSchema, EmployeeModel, EmployeeSchema } from "@/domain/models/employee.model";
import {
  CreateEmployeeParams,
  DeleteEmployeeParams,
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "@/domain/params/employee.param";
import { BaseResponse, EmployeeListResponse, EmployeeResponse } from "@/domain/types/api.types";
import { APIError, NetworkError, ValidationError } from "@/lib/errors";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  private async handleResponse<T extends BaseResponse<unknown>>(response: Response): Promise<T["data"]> {
    try {
      const json = await response.json();

      if (!response.ok) {
        // API-specific error handling
        if (json.errors) {
          // Validation errors
          const errorDetails = json.errors.map((error: { field: string; message: string }) => error.message).join(", ");

          throw new ValidationError(`${json.message || "Validation failed"}: ${errorDetails}`, json.errors);
        }

        // General API error
        throw new APIError(json.message || "API request failed", response.status, json.code);
      }

      return json.data;
    } catch (error) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }

      // Network or parsing errors
      if (error instanceof Error) {
        throw new NetworkError(error.message);
      }

      throw new Error("An unexpected error occurred");
    }
  }

  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees`);

      const data = await this.handleResponse<EmployeeListResponse>(response);
      return EmployeeListSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("getEmployeeList error:", error);
        throw error;
      }
      throw new Error("Failed to get employee list");
    }
  }

  public async createEmployee(params: CreateEmployeeParams): Promise<EmployeeModel> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await this.handleResponse<EmployeeResponse>(response);
      return EmployeeSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("createEmployee error:", error);
        throw error;
      }
      throw new Error("Failed to create employee");
    }
  }

  public async getEmployeeById(params: GetEmployeeByIdParams): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/employee/${params.id}`);

      const data = await this.handleResponse<EmployeeResponse>(response);
      return EmployeeSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("getEmployeeById error:", error);
        throw error;
      }
      throw new Error("Failed to get employee");
    }
  }

  public async updateEmployeeById(params: UpdateEmployeeParams): Promise<EmployeeModel> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await this.handleResponse<EmployeeResponse>(response);
      return EmployeeSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("updateEmployeeById error:", error);
        throw error;
      }
      throw new Error("Failed to update employee");
    }
  }

  public async deleteEmployeeById(params: DeleteEmployeeParams): Promise<EmployeeModel> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/delete/${params.id}`, {
        method: "DELETE",
      });

      const data = await this.handleResponse<EmployeeResponse>(response);
      return EmployeeSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("deleteEmployeeById error:", error);
        throw error;
      }
      throw new Error("Failed to delete employee");
    }
  }
}
