import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { EmployeeFormPage } from "@/pages/EmployeeFormPage";
import { EmployeeDetailPage } from "@/pages/EmployeeDetailPage";
import { Employee, initialEmployees } from "@/data/employees";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const handleSave = (employee: Employee) => {
    setEmployees((prev) => {
      const exists = prev.find((e) => e.id === employee.id);
      if (exists) {
        return prev.map((e) => (e.id === employee.id ? employee : e));
      }
      return [...prev, employee];
    });
  };

  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage employees={employees} onDelete={handleDelete} />} />
              <Route path="/add" element={<EmployeeFormPage employees={employees} onSave={handleSave} />} />
              <Route path="/edit/:id" element={<EmployeeFormPage employees={employees} onSave={handleSave} />} />
              <Route path="/employee/:id" element={<EmployeeDetailPage employees={employees} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
