import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RESULTS = [
  { code: "EDU 101", name: "Foundations of Education", ca: 28, exam: 52, total: 80, grade: "A" },
  { code: "EDU 201", name: "Child Psychology & Development", ca: 24, exam: 44, total: 68, grade: "B+" },
  { code: "EDU 301", name: "Curriculum Design & Assessment", ca: 30, exam: 48, total: 78, grade: "A-" },
  { code: "EDU 305", name: "Teaching Methodologies", ca: 22, exam: 40, total: 62, grade: "B" },
  { code: "ICT 101", name: "ICT in Education", ca: 26, exam: 46, total: 72, grade: "B+" },
  { code: "EDU 401", name: "Teaching Practice Preparation", ca: 32, exam: 50, total: 82, grade: "A" },
];

function gradeColor(grade: string) {
  if (grade.startsWith("A")) return "bg-success/10 text-success border-success/20";
  if (grade.startsWith("B")) return "bg-info/10 text-info border-info/20";
  if (grade.startsWith("C")) return "bg-warning/10 text-warning border-warning/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

export default function Grades() {
  const avg = (RESULTS.reduce((a, r) => a + r.total, 0) / RESULTS.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Grades & Results</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Semester 2 results · Average: {avg}%
        </p>
      </div>

      <Card className="animate-fade-up stagger-2">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Course</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Name</th>
                  <th className="text-center font-medium text-muted-foreground px-4 py-3">CA (40)</th>
                  <th className="text-center font-medium text-muted-foreground px-4 py-3">Exam (60)</th>
                  <th className="text-center font-medium text-muted-foreground px-4 py-3">Total</th>
                  <th className="text-center font-medium text-muted-foreground px-4 py-3">Grade</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.map((r) => (
                  <tr key={r.code} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{r.code}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{r.name}</td>
                    <td className="px-4 py-3 text-center tabular-nums">{r.ca}</td>
                    <td className="px-4 py-3 text-center tabular-nums">{r.exam}</td>
                    <td className="px-4 py-3 text-center tabular-nums font-medium">{r.total}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${gradeColor(r.grade)}`}>
                        {r.grade}
                      </span>
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
