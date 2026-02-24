import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Employee, Department, DEPARTMENTS } from "@/data/employees";
import { TopNavbar } from "@/layouts/TopNavbar";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EmployeeFormPageProps {
  employees: Employee[];
  onSave: (employee: Employee) => void;
}

export function EmployeeFormPage({ employees, onSave }: EmployeeFormPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existing = isEdit ? employees.find((e) => e.id === id) : null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Engineering" as Department,
    role: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name,
        email: existing.email,
        phone: existing.phone,
        department: existing.department,
        role: existing.role,
      });
    }
  }, [existing]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email format";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.role.trim()) errs.role = "Role is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const employee: Employee = {
      id: existing?.id || String(Date.now()),
      ...form,
      avatar: existing?.avatar || "",
      joinDate: existing?.joinDate || new Date().toISOString().split("T")[0],
      location: existing?.location || "Remote",
    };

    onSave(employee);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 1500);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="flex flex-col">
      <TopNavbar title={isEdit ? "Edit Employee" : "Add Employee"} searchQuery="" onSearchChange={() => {}} showSearch={false} />

      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="rounded-xl border border-border bg-card p-6 card-shadow sm:p-8">
          <h3 className="mb-6 font-display text-xl font-bold text-card-foreground">
            {isEdit ? "Update Employee Details" : "New Employee Information"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. John Doe"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="e.g. john@company.com"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="e.g. +1 (555) 123-4567"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Department</label>
              <select
                value={form.department}
                onChange={(e) => updateField("department", e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Role / Position</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                placeholder="e.g. Senior Developer"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              {errors.role && <p className="mt-1 text-xs text-destructive">{errors.role}</p>}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="h-10 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {isEdit ? "Update Employee" : "Add Employee"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="h-10 rounded-lg border border-border bg-card px-6 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Alert */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-success px-5 py-3 text-sm font-medium text-success-foreground card-shadow-lg"
          >
            <CheckCircle2 size={18} />
            {isEdit ? "Employee updated successfully!" : "Employee added successfully!"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
