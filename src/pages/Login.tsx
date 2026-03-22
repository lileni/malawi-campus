import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import logo from "@/assets/kasungu-ttc-logo.png";
import { BookOpen, GraduationCap, Shield, UserCheck } from "lucide-react";

const DEMO_ACCOUNTS = [
  { label: "Administrator", email: "admin@kasunguttc.ac.mw", icon: Shield },
  { label: "Lecturer", email: "lecturer@kasunguttc.ac.mw", icon: BookOpen },
  { label: "Student", email: "student@kasunguttc.ac.mw", icon: GraduationCap },
  { label: "Registrar", email: "registrar@kasunguttc.ac.mw", icon: UserCheck },
];

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password. Try a demo account below.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setError("");
    setLoading(true);
    try {
      await login(demoEmail, "demo");
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <img src={logo} alt="Kasungu TTC Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Kasungu Teachers' Training College
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            School Management System
          </p>
        </div>

        <Card className="shadow-lg border-border/60">
          <CardHeader className="pb-4">
            <h2 className="section-title text-center">Sign in to your account</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@kasunguttc.ac.mw"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleDemoLogin(acc.email)}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.97]"
                >
                  <acc.icon className="h-4 w-4 text-primary" />
                  {acc.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 Kasungu TTC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
