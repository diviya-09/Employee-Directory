import { useParams, useNavigate } from "react-router-dom";
import { Employee, DEPARTMENT_COLORS } from "@/data/employees";
import { TopNavbar } from "@/layouts/TopNavbar";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

interface EmployeeDetailPageProps {
  employees: Employee[];
}

export function EmployeeDetailPage({ employees }: EmployeeDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="flex flex-col">
        <TopNavbar title="Employee Details" searchQuery="" onSearchChange={() => {}} showSearch={false} />
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-muted-foreground">Employee not found.</p>
        </div>
      </div>
    );
  }

  const details = [
    { icon: Mail, label: "Email", value: employee.email },
    { icon: Phone, label: "Phone", value: employee.phone },
    { icon: Briefcase, label: "Department", value: employee.department },
    { icon: Briefcase, label: "Role", value: employee.role },
    { icon: MapPin, label: "Location", value: employee.location },
    { icon: Calendar, label: "Joined", value: new Date(employee.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
  ];

  return (
    <div className="flex flex-col">
      <TopNavbar title="Employee Details" searchQuery="" onSearchChange={() => {}} showSearch={false} />

      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card card-shadow overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary/5 px-6 py-8 text-center sm:px-8">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {getInitials(employee.name)}
            </div>
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              {employee.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{employee.role}</p>
            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground ${
                DEPARTMENT_COLORS[employee.department]
              }`}
            >
              {employee.department}
            </span>
          </div>

          {/* Details */}
          <div className="divide-y divide-border px-6 sm:px-8">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-center gap-4 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <detail.icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{detail.label}</p>
                  <p className="text-sm font-medium text-card-foreground">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-6 sm:px-8">
            <button
              onClick={() => navigate(`/edit/${employee.id}`)}
              className="h-10 flex-1 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Edit Employee
            </button>
            <button
              onClick={() => navigate("/")}
              className="h-10 flex-1 rounded-lg border border-border bg-card text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
            >
              Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
