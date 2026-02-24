export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  role: string;
  avatar: string;
  joinDate: string;
  location: string;
}

export type Department = "Engineering" | "Design" | "Marketing" | "HR" | "Finance" | "Sales";

export const DEPARTMENTS: Department[] = [
  "Engineering",
  "Design",
  "Marketing",
  "HR",
  "Finance",
  "Sales",
];

export const DEPARTMENT_COLORS: Record<Department, string> = {
  Engineering: "bg-dept-engineering",
  Design: "bg-dept-design",
  Marketing: "bg-dept-marketing",
  HR: "bg-dept-hr",
  Finance: "bg-dept-finance",
  Sales: "bg-dept-sales",
};

export const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    role: "Senior Frontend Developer",
    avatar: "",
    joinDate: "2022-03-15",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    department: "Design",
    role: "UI/UX Lead",
    avatar: "",
    joinDate: "2021-07-20",
    location: "New York, NY",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    department: "Marketing",
    role: "Marketing Manager",
    avatar: "",
    joinDate: "2023-01-10",
    location: "Austin, TX",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@company.com",
    phone: "+1 (555) 456-7890",
    department: "HR",
    role: "HR Director",
    avatar: "",
    joinDate: "2020-11-05",
    location: "Chicago, IL",
  },
  {
    id: "5",
    name: "Priya Patel",
    email: "priya.patel@company.com",
    phone: "+1 (555) 567-8901",
    department: "Finance",
    role: "Financial Analyst",
    avatar: "",
    joinDate: "2022-08-22",
    location: "Seattle, WA",
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.kim@company.com",
    phone: "+1 (555) 678-9012",
    department: "Engineering",
    role: "Backend Developer",
    avatar: "",
    joinDate: "2023-04-18",
    location: "Denver, CO",
  },
  {
    id: "7",
    name: "Olivia Thompson",
    email: "olivia.thompson@company.com",
    phone: "+1 (555) 789-0123",
    department: "Sales",
    role: "Account Executive",
    avatar: "",
    joinDate: "2021-12-01",
    location: "Boston, MA",
  },
  {
    id: "8",
    name: "Alex Martinez",
    email: "alex.martinez@company.com",
    phone: "+1 (555) 890-1234",
    department: "Engineering",
    role: "DevOps Engineer",
    avatar: "",
    joinDate: "2022-06-14",
    location: "Portland, OR",
  },
  {
    id: "9",
    name: "Rachel Lee",
    email: "rachel.lee@company.com",
    phone: "+1 (555) 901-2345",
    department: "Design",
    role: "Product Designer",
    avatar: "",
    joinDate: "2023-02-28",
    location: "Los Angeles, CA",
  },
  {
    id: "10",
    name: "Thomas Brown",
    email: "thomas.brown@company.com",
    phone: "+1 (555) 012-3456",
    department: "Sales",
    role: "Sales Director",
    avatar: "",
    joinDate: "2020-09-10",
    location: "Miami, FL",
  },
];
