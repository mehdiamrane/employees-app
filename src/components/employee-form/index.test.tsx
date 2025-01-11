import { render, screen, waitFor } from "@/test/test-utils";
import { EmployeeForm } from "./index";

describe("EmployeeForm", () => {
  const mockOnSubmit = jest.fn();
  const mockEmployee = {
    id: 1,
    employee_name: "John Doe",
    employee_salary: 50000,
    employee_age: 30,
    profile_image: "https://example.com/image.jpg",
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders form fields with default values", () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} employee={mockEmployee} />);

    expect(screen.getByLabelText(/profile image url/i)).toHaveValue(mockEmployee.profile_image);
    expect(screen.getByLabelText(/employee name/i)).toHaveValue(mockEmployee.employee_name);
    expect(screen.getByLabelText(/annual salary/i)).toHaveValue(mockEmployee.employee_salary);
    expect(screen.getByLabelText("Age")).toHaveValue(mockEmployee.employee_age);
  });

  it("validates required fields", async () => {
    const { user } = render(<EmployeeForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole("button", { name: /create employee/i }));

    await waitFor(() => {
      expect(screen.getByText(/name.*required/i)).toBeInTheDocument();
      expect(screen.getByText(/salary.*greater than 0/i)).toBeInTheDocument();
      expect(screen.getByText(/age.*at least 18/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    const { user } = render(<EmployeeForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/employee name/i), "John Doe");
    await user.type(screen.getByLabelText(/annual salary/i), "50000");
    await user.type(screen.getByLabelText("Age"), "30");

    await user.click(screen.getByRole("button", { name: /create employee/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      const [formData, event] = mockOnSubmit.mock.calls[0];

      // Check form data
      expect(formData).toEqual({
        employee_name: "John Doe",
        employee_salary: 50000,
        employee_age: 30,
        profile_image: "",
      });

      // Verify it's a submit event
      expect(event.type).toBe("submit");
      expect(event.preventDefault).toBeDefined();
    });
  });
});
