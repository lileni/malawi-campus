import { useAuth, type AppRole } from "@/lib/auth-context";
import { useLocation, Link } from "react-router-dom";
import logo from "@/assets/kasungu-ttc-logo.png";
import {
  LayoutDashboard, Users, BookOpen, Calendar, ClipboardCheck,
  GraduationCap, Wallet, Bell, FileText, BarChart3, Settings,
  LogOut, UserCheck, Briefcase,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: AppRole[]; // which roles can see this item
}

const ALL_ROLES: AppRole[] = ["admin", "registrar", "lecturer", "student", "principal", "bursar"];
const FULL_ACCESS: AppRole[] = ["admin", "principal", "bursar"];

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ALL_ROLES },
  { label: "Students", path: "/students", icon: Users, roles: [...FULL_ACCESS, "registrar", "lecturer"] },
  { label: "Courses", path: "/courses", icon: BookOpen, roles: ALL_ROLES },
  { label: "Timetable", path: "/timetable", icon: Calendar, roles: ALL_ROLES },
  { label: "Attendance", path: "/attendance", icon: ClipboardCheck, roles: [...FULL_ACCESS, "lecturer"] },
  { label: "Grades & Results", path: "/grades", icon: GraduationCap, roles: ALL_ROLES },
  { label: "Teaching Practice", path: "/teaching-practice", icon: Briefcase, roles: [...FULL_ACCESS, "lecturer", "student"] },
  { label: "Fees & Payments", path: "/fees", icon: Wallet, roles: [...FULL_ACCESS, "registrar"] },
  { label: "Admissions", path: "/admissions", icon: UserCheck, roles: [...FULL_ACCESS, "registrar"] },
  { label: "Notifications", path: "/notifications", icon: Bell, roles: ALL_ROLES },
  { label: "Reports", path: "/reports", icon: FileText, roles: [...FULL_ACCESS, "registrar"] },
  { label: "Analytics", path: "/analytics", icon: BarChart3, roles: [...FULL_ACCESS, "registrar"] },
  { label: "User Management", path: "/admin", icon: Users, roles: FULL_ACCESS },
  { label: "Settings", path: "/settings", icon: Settings, roles: FULL_ACCESS },
];

const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Administrator",
  principal: "Principal",
  bursar: "Bursar",
  registrar: "Registrar",
  lecturer: "Lecturer",
  student: "Student",
};

export default function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const userRole = user?.role || "student";
  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(userRole));

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-[width] duration-300 ${
        collapsed ? "w-[68px]" : "w-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
        <img src={logo} alt="Logo" className="w-8 h-8 shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold leading-tight truncate">Kasungu TTC</p>
            <p className="text-[11px] opacity-70 leading-tight">Management System</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {visibleItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 shrink-0">
        {!collapsed && user && (
          <div className="mb-2 px-1">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-[11px] opacity-70 truncate">{ROLE_LABELS[user.role]}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm w-full text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          title="Sign out"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
