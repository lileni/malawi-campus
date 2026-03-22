import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Database, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          System configuration and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-fade-up stagger-2">
          <CardHeader className="pb-3">
            <CardTitle className="section-title flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" /> Institution Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>College Name</Label>
              <Input defaultValue="Kasungu Teachers' Training College" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input defaultValue="Kasungu, Malawi" />
            </div>
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <Input defaultValue="2025/2026" />
            </div>
            <Button size="sm">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="animate-fade-up stagger-3">
          <CardHeader className="pb-3">
            <CardTitle className="section-title flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span>Two-factor authentication</span>
              <Badge variant="secondary">Disabled</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span>Password policy</span>
              <span className="text-muted-foreground">Minimum 8 characters</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Session timeout</span>
              <span className="text-muted-foreground">30 minutes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-up stagger-4">
          <CardHeader className="pb-3">
            <CardTitle className="section-title flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span>SMS alerts (Airtel/TNM)</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span>Email notifications</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Fee reminders</span>
              <Badge variant="default">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-up stagger-5">
          <CardHeader className="pb-3">
            <CardTitle className="section-title flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" /> Data & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span>Last backup</span>
              <span className="text-muted-foreground">Today, 02:00 AM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span>Backup frequency</span>
              <span className="text-muted-foreground">Daily</span>
            </div>
            <Button variant="outline" size="sm" className="mt-2">Manual Backup</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Badge({ variant, children, className }: { variant: "default" | "secondary"; children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
      variant === "default" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
    } ${className}`}>
      {children}
    </span>
  );
}
