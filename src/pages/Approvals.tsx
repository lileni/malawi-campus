import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type AppRole, type AccountStatus } from "@/lib/auth-context";
import { Navigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, Inbox, Users as UsersIcon, ShieldX } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ROLES: AppRole[] = ["admin", "principal", "bursar", "registrar", "lecturer", "student"];
const APPROVERS: AppRole[] = ["admin", "principal", "bursar", "registrar"];

interface ProfileRow {
  id: string;
  full_name: string | null;
  status: AccountStatus;
  requested_role: AppRole;
  created_at: string;
}

export default function Approvals() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<AccountStatus>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [roleOverride, setRoleOverride] = useState<Record<string, AppRole>>({});

  const canAccess = user && APPROVERS.includes(user.role);

  useEffect(() => {
    if (authLoading || !canAccess) return;
    fetchProfiles();
  }, [authLoading, canAccess]);

  async function fetchProfiles() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, status, requested_role, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setRows((data as any) ?? []);
    } catch (err: any) {
      toast.error("Failed to load applications: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function approve(row: ProfileRow) {
    setBusyId(row.id);
    try {
      const role = roleOverride[row.id] ?? row.requested_role;

      // Remove any existing role for safety, then assign approved role
      await supabase.from("user_roles").delete().eq("user_id", row.id);
      const { error: roleErr } = await supabase
        .from("user_roles")
        .insert({ user_id: row.id, role });
      if (roleErr) throw roleErr;

      const { error: profErr } = await supabase
        .from("profiles")
        .update({
          status: "active",
          reviewed_by: user!.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      if (profErr) throw profErr;

      toast.success(`Approved ${row.full_name || "user"} as ${role}`);
      fetchProfiles();
    } catch (err: any) {
      toast.error("Approval failed: " + err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function reject(row: ProfileRow) {
    setBusyId(row.id);
    try {
      await supabase.from("user_roles").delete().eq("user_id", row.id);
      const { error } = await supabase
        .from("profiles")
        .update({
          status: "rejected",
          reviewed_by: user!.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      if (error) throw error;
      toast.success("Application rejected");
      fetchProfiles();
    } catch (err: any) {
      toast.error("Rejection failed: " + err.message);
    } finally {
      setBusyId(null);
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

  const filtered = rows.filter((r) => r.status === tab);
  const counts = {
    pending: rows.filter((r) => r.status === "pending").length,
    active: rows.filter((r) => r.status === "active").length,
    rejected: rows.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Approvals</h1>
        <p className="text-muted-foreground text-sm">
          Review and approve new member and student sign-ups
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as AccountStatus)}>
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Inbox className="h-4 w-4" /> Pending
            <Badge variant="secondary" className="ml-1">{counts.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="gap-2">
            <UsersIcon className="h-4 w-4" /> Approved
            <Badge variant="secondary" className="ml-1">{counts.active}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <ShieldX className="h-4 w-4" /> Rejected
            <Badge variant="secondary" className="ml-1">{counts.rejected}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Requested Role</TableHead>
                  <TableHead>Submitted</TableHead>
                  {tab === "pending" && <TableHead className="w-[180px]">Assign Role</TableHead>}
                  <TableHead className="text-right w-[200px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      Loading…
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No {tab} applications
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">
                        {row.full_name || <span className="italic text-muted-foreground">No name</span>}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{row.requested_role}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
                      </TableCell>
                      {tab === "pending" && (
                        <TableCell>
                          <Select
                            value={roleOverride[row.id] ?? row.requested_role}
                            onValueChange={(v) =>
                              setRoleOverride((m) => ({ ...m, [row.id]: v as AppRole }))
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map((r) => (
                                <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      )}
                      <TableCell className="text-right">
                        {tab === "pending" ? (
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={busyId === row.id}
                              onClick={() => reject(row)}
                            >
                              <X className="h-3.5 w-3.5 mr-1" /> Reject
                            </Button>
                            <Button
                              size="sm"
                              disabled={busyId === row.id}
                              onClick={() => approve(row)}
                            >
                              <Check className="h-3.5 w-3.5 mr-1" /> Approve
                            </Button>
                          </div>
                        ) : tab === "rejected" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === row.id}
                            onClick={() => approve(row)}
                          >
                            <Check className="h-3.5 w-3.5 mr-1" /> Approve now
                          </Button>
                        ) : (
                          <Badge variant="outline" className="bg-chart-2/15 text-chart-2 border-chart-2/30">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
