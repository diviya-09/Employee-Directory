// Service layer structured for future API integration via Axios
// Currently uses local state passed from parent components

import { Employee } from "@/data/employees";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    await delay(100);
    // In production, this would be: return axios.get('/api/employees')
    return [];
  },

  async getById(id: string, employees: Employee[]): Promise<Employee | undefined> {
    await delay(50);
    return employees.find((e) => e.id === id);
  },

  async create(employee: Omit<Employee, "id">, employees: Employee[]): Promise<Employee> {
    await delay(100);
    const newEmployee: Employee = {
      ...employee,
      id: String(Date.now()),
    };
    return newEmployee;
  },

  async update(id: string, data: Partial<Employee>): Promise<Employee> {
    await delay(100);
    return { id, ...data } as Employee;
  },

  async delete(id: string): Promise<void> {
    await delay(100);
  },
};
