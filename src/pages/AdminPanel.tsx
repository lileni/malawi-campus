import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type AppRole } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, ShieldCheck } from "lucide-react";

const ROLES: AppRole[] = ["admin", "principal", "bursar", "registrar", "lecturer", "student"];
const FULL_ACCESS: AppRole[] = ["admin", "principal", "bursar"];

const ROLE_COLORS: Record<AppRole, string> = {
  admin: "bg-destructive/15 text-destructive border-destructive/30",
  principal: "bg-primary/15 text-primary border-primary/30",
  bursar: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  registrar: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  lecturer: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  student: "bg-muted text-muted-foreground border-border",
};

interface UserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
}

export default function AdminPanel() {
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const canAccess = user && FULL_ACCESS.includes(user.role);

  useEffect(() => {
    if (authLoading) return;
    if (!canAccess) return;
    fetchUsers();
  }, [canAccess, authLoading]);

  async function fetchUsers() {
    setLoading(true);
    try {
      // Fetch roles
      const { data: roles, error: rolesErr } = await supabase
        .from("user_roles")
        .select("user_id, role");
      if (rolesErr) throw rolesErr;

      // Fetch profiles
      const { data: profiles, error: profErr } = await supabase
        .from("profiles")
        .select("id, full_name");
      if (profErr) throw profErr;

      const profileMap = new Map(profiles?.map((p) => [p.id, p.full_name]) ?? []);

      const merged: UserRow[] = (roles ?? []).map((r) => ({
        id: r.user_id,
        email: "",
        full_name: profileMap.get(r.user_id) || null,
        role: r.role as AppRole,
      }));

      setUsers(merged);
    } catch (err: any) {
      console.error("AdminPanel fetchUsers error:", err);
      toast.error("Failed to load users: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(userId: string, newRole: AppRole) {
    setUpdatingId(userId);
    try {
      const { error } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("user_id", userId);
      if (error) throw error;
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      toast.success("Role updated successfully");
    } catch (err: any) {
      toast.error("Failed to update role: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!canAccess) return <Navigate to="/dashboard" replace />;

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.full_name?.toLowerCase() || "").includes(q) ||
      u.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground text-sm">View all users and manage their roles</p>
        </div>
        <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          {users.length} users
        </Badge>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead className="w-[200px]">Change Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  Loading users…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">
                    {u.full_name || <span className="text-muted-foreground italic">No name</span>}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {u.id.slice(0, 8)}…
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={ROLE_COLORS[u.role]}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={u.role}
                      onValueChange={(val) => changeRole(u.id, val as AppRole)}
                      disabled={updatingId === u.id || u.id === user?.id}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
