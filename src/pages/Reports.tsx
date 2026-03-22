import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BarChart3, Users, Wallet, ClipboardCheck } from "lucide-react";

const REPORTS = [
  { title: "Student Performance Summary", description: "GPA distribution, pass rates, and academic standings per program", icon: BarChart3, category: "Academic" },
  { title: "Enrollment Statistics", description: "Student enrollment by program, year, gender, and district of origin", icon: Users, category: "Academic" },
  { title: "Fee Collection Report", description: "Payment summary, outstanding balances, and mobile money breakdown", icon: Wallet, category: "Financial" },
  { title: "Attendance Report", description: "Student and lecturer attendance rates by course and department", icon: ClipboardCheck, category: "Academic" },
  { title: "Teaching Practice Assessment", description: "Placement completion rates and supervisor evaluation summaries", icon: FileText, category: "Academic" },
  { title: "Financial Statement", description: "Income, expenditure, and budget variance for the current term", icon: Wallet, category: "Financial" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Reports</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Generate and download institutional reports
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r, i) => (
          <Card key={r.title} className={`animate-fade-up stagger-${Math.min(i + 1, 6)} group hover:shadow-md transition-shadow`}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{r.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                  <Button variant="ghost" size="sm" className="h-7 px-2 mt-3 text-xs">
                    <Download className="h-3 w-3 mr-1" /> Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
