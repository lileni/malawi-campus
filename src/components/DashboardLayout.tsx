import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { Menu, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className={`transition-[margin] duration-300 ${collapsed ? "ml-[68px]" : "ml-60"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 bg-background/80 backdrop-blur border-b border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-muted transition-colors active:scale-95"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5"
              onClick={() => navigate("/settings")}
            >
              <KeyRound className="h-3.5 w-3.5" />
              Create Password
            </Button>
            {user && (
              <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
