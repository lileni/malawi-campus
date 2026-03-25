import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, FileText, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

type AppStatus = "pending" | "accepted" | "rejected";

interface Application {
  id: string;
  name: string;
  program: string;
  msce: string;
  date: string;
  status: AppStatus;
}

const INITIAL_APPLICATIONS: Application[] = [
  { id: "APP-2026-0142", name: "Alinafe Tembo", program: "Primary Education", msce: "18 pts", date: "2026-03-10", status: "pending" },
  { id: "APP-2026-0143", name: "Dalitso Kumwenda", program: "Primary Education", msce: "22 pts", date: "2026-03-11", status: "pending" },
  { id: "APP-2026-0144", name: "Chimwemwe Banda", program: "Early Childhood", msce: "15 pts", date: "2026-03-12", status: "pending" },
  { id: "APP-2026-0139", name: "Fatsani Mwenye", program: "Early Childhood", msce: "20 pts", date: "2026-03-08", status: "accepted" },
  { id: "APP-2026-0135", name: "Lonjezo Msiska", program: "Secondary Education", msce: "16 pts", date: "2026-03-05", status: "accepted" },
  { id: "APP-2026-0130", name: "Yesaya Kalua", program: "Primary Education", msce: "32 pts", date: "2026-03-01", status: "rejected" },
];

function statusVariant(status: AppStatus) {
  if (status === "accepted") return "default" as const;
  if (status === "rejected") return "destructive" as const;
  return "secondary" as const;
}

export default function Admissions() {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  const updateStatus = (id: string, newStatus: AppStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    toast.success(
      newStatus === "accepted"
        ? `Application ${id} accepted`
        : `Application ${id} rejected`
    );
  };

  const pendingCount = applications.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title animate-fade-up">Admissions</h1>
          <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
            2026/2027 intake — {pendingCount} pending review{pendingCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" className="animate-fade-up stagger-2">
          <UserPlus className="h-4 w-4 mr-1.5" /> New Application
        </Button>
      </div>

      <Card className="animate-fade-up stagger-3">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Application ID</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Applicant</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Program</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">MSCE</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{a.id}</td>
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{a.program}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{a.msce}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(a.status)} className="capitalize text-xs">{a.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {a.status === "pending" ? (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => updateStatus(a.id, "accepted")}
                              title="Accept"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline text-xs">Accept</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => updateStatus(a.id, "rejected")}
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline text-xs">Reject</span>
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => updateStatus(a.id, "pending")}
                            title="Revert to pending"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Revert</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
