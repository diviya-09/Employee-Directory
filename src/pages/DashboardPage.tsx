import { useState } from "react";
import { Employee, Department } from "@/data/employees";
import { TopNavbar } from "@/layouts/TopNavbar";
import { EmployeeCard } from "@/components/EmployeeCard";
import { DepartmentFilter } from "@/components/DepartmentFilter";
import { Users, Building2, Briefcase } from "lucide-react";

interface DashboardPageProps {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export function DashboardPage({ employees, onDelete }: DashboardPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState<Department | "All">("All");

  const filtered = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "All" || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const uniqueDepts = new Set(employees.map((e) => e.department)).size;

  const stats = [
    { label: "Total Employees", value: employees.length, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Departments", value: uniqueDepts, icon: Building2, color: "bg-accent/10 text-accent" },
    { label: "Active Roles", value: new Set(employees.map((e) => e.role)).size, icon: Briefcase, color: "bg-success/10 text-success" },
  ];

  return (
    <div className="flex flex-col">
      <TopNavbar title="Dashboard" searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 card-shadow animate-fade-in"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Employees ({filtered.length})
          </h3>
          <DepartmentFilter selected={deptFilter} onChange={setDeptFilter} />
        </div>

        {/* Employee Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
            <Users size={40} className="mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No employees found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((emp, i) => (
              <EmployeeCard key={emp.id} employee={emp} onDelete={onDelete} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
