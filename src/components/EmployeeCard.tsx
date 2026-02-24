import { Employee, DEPARTMENT_COLORS } from "@/data/employees";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface EmployeeCardProps {
  employee: Employee;
  onDelete: (id: string) => void;
  index: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function EmployeeCard({ employee, onDelete, index }: EmployeeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group rounded-xl border border-border bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {getInitials(employee.name)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-base font-semibold text-card-foreground">
            {employee.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{employee.role}</p>

          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground ${
              DEPARTMENT_COLORS[employee.department]
            }`}
          >
            {employee.department}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
        <Link
          to={`/employee/${employee.id}`}
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary/10 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Eye size={14} />
          View
        </Link>
        <Link
          to={`/edit/${employee.id}`}
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Pencil size={14} />
          Edit
        </Link>
        <button
          onClick={() => onDelete(employee.id)}
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-destructive/10 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </motion.div>
  );
}
