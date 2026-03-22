import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, FileText } from "lucide-react";

const APPLICATIONS = [
  { id: "APP-2026-0142", name: "Alinafe Tembo", program: "Primary Education", msce: "18 pts", date: "2026-03-10", status: "pending" },
  { id: "APP-2026-0143", name: "Dalitso Kumwenda", program: "Primary Education", msce: "22 pts", date: "2026-03-11", status: "pending" },
  { id: "APP-2026-0139", name: "Fatsani Mwenye", program: "Early Childhood", msce: "20 pts", date: "2026-03-08", status: "accepted" },
  { id: "APP-2026-0135", name: "Lonjezo Msiska", program: "Secondary Education", msce: "16 pts", date: "2026-03-05", status: "accepted" },
  { id: "APP-2026-0130", name: "Yesaya Kalua", program: "Primary Education", msce: "32 pts", date: "2026-03-01", status: "rejected" },
];

function statusVariant(status: string) {
  if (status === "accepted") return "default" as const;
  if (status === "rejected") return "destructive" as const;
  return "secondary" as const;
}

export default function Admissions() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title animate-fade-up">Admissions</h1>
          <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
            2026/2027 intake — {APPLICATIONS.filter((a) => a.status === "pending").length} pending reviews
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
                  <th className="text-left font-medium text-muted-foreground px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {APPLICATIONS.map((a) => (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{a.id}</td>
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{a.program}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{a.msce}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(a.status)} className="capitalize text-xs">{a.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <FileText className="h-3.5 w-3.5" />
                      </Button>
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
