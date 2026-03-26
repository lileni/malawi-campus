import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { Menu, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSetPassword = async () => {
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { toast.error(error.message); }
    else {
      toast.success("Password created! You can now sign in with email and password.");
      setNewPassword(""); setConfirmPassword(""); setOpen(false);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className={`transition-[margin] duration-300 ${collapsed ? "ml-[68px]" : "ml-60"}`}>
        <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 bg-background/80 backdrop-blur border-b border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-muted transition-colors active:scale-95"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs gap-1.5">
                  <KeyRound className="h-3.5 w-3.5" />
                  Create Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Email Login Password</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  {user?.email ? `Set a password for ${user.email} so you can sign in with email & password.` : "Create a password for email login."}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="dlg-new-pw">New Password</Label>
                    <Input id="dlg-new-pw" type="password" placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} minLength={6} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dlg-confirm-pw">Confirm Password</Label>
                    <Input id="dlg-confirm-pw" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={6} />
                  </div>
                  <Button onClick={handleSetPassword} disabled={saving} className="w-full">
                    {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Setting…</> : "Set Password"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
