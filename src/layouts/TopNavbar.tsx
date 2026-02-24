import { Search } from "lucide-react";

interface TopNavbarProps {
  title: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showSearch?: boolean;
}

export function TopNavbar({ title, searchQuery, onSearchChange, showSearch = true }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6 lg:px-8">
      <h2 className="font-display text-lg font-bold text-foreground sm:text-xl lg:pl-0 pl-12">
        {title}
      </h2>

      {showSearch && (
        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
      )}
    </header>
  );
}
