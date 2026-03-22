import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className={`transition-[margin] duration-300 ${collapsed ? "ml-[68px]" : "ml-60"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center h-14 px-4 bg-background/80 backdrop-blur border-b border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-muted transition-colors active:scale-95"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
