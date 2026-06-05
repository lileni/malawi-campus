import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, ShieldX } from "lucide-react";
import logo from "@/assets/kasungu-ttc-logo.png";

export default function AccountPending() {
  const { user, logout } = useAuth();
  const rejected = user?.status === "rejected";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <img src={logo} alt="Kasungu TTC Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Kasungu Teachers' Training College
          </h1>
        </div>

        <Card className="shadow-lg border-border/60">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center text-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                rejected ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"
              }`}>
                {rejected ? <ShieldX className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
              </div>
              <h2 className="text-lg font-semibold">
                {rejected ? "Account not approved" : "Account pending approval"}
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              {rejected ? (
                <>Your account application was not approved. Please contact the administration office for more information.</>
              ) : (
                <>Thanks for signing up, <span className="font-medium text-foreground">{user?.name}</span>. An administrator must approve your account before you can access the system. You'll be able to sign in as soon as approval is granted.</>
              )}
            </p>
            <Button variant="outline" className="w-full" onClick={logout}>
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
