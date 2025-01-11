import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { render, screen } from "@/test/test-utils";
import { EmployeeDetailContent } from "./index";

describe("EmployeeDetailContent", () => {
  const mockEmployee = {
    id: 1,
    employee_name: "John Doe",
    employee_salary: 50000,
    employee_age: 30,
    profile_image: "https://example.com/image.jpg",
  };

  it("renders employee details correctly", () => {
    render(<EmployeeDetailContent employee={mockEmployee} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Employee ID: 1")).toBeInTheDocument();
    expect(screen.getByText("30 years old")).toBeInTheDocument();
    expect(screen.getByText(EmployeeFormatter.formatSalary(mockEmployee.employee_salary))).toBeInTheDocument();
  });

  it("shows delete confirmation dialog when delete button is clicked", async () => {
    const { user } = render(<EmployeeDetailContent employee={mockEmployee} />);

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });
});
