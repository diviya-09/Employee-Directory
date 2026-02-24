import { Department, DEPARTMENTS } from "@/data/employees";
import { Filter } from "lucide-react";

interface DepartmentFilterProps {
  selected: Department | "All";
  onChange: (dept: Department | "All") => void;
}

export function DepartmentFilter({ selected, onChange }: DepartmentFilterProps) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <Filter size={16} className="text-muted-foreground" />
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value as Department | "All")}
        className="h-10 rounded-lg border border-input bg-card px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer"
      >
        <option value="All">All Departments</option>
        {DEPARTMENTS.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
