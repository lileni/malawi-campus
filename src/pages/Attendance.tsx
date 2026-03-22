import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ATTENDANCE_DATA = [
  { course: "EDU 101", total: 24, attended: 21, percentage: 87.5 },
  { course: "EDU 201", total: 22, attended: 20, percentage: 90.9 },
  { course: "EDU 301", total: 20, attended: 16, percentage: 80.0 },
  { course: "EDU 305", total: 24, attended: 22, percentage: 91.7 },
  { course: "ICT 101", total: 18, attended: 17, percentage: 94.4 },
  { course: "EDU 401", total: 12, attended: 10, percentage: 83.3 },
];

function statusBadge(pct: number) {
  if (pct >= 90) return <Badge variant="default" className="text-xs">Excellent</Badge>;
  if (pct >= 80) return <Badge variant="secondary" className="text-xs">Good</Badge>;
  return <Badge variant="destructive" className="text-xs">At Risk</Badge>;
}

export default function Attendance() {
  const overall = (ATTENDANCE_DATA.reduce((a, d) => a + d.percentage, 0) / ATTENDANCE_DATA.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Attendance</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Overall attendance: {overall}%
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ATTENDANCE_DATA.map((d, i) => (
          <Card key={d.course} className={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-medium">{d.course}</span>
                {statusBadge(d.percentage)}
              </div>
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-700"
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{d.attended}/{d.total} classes</span>
                <span className="tabular-nums font-medium">{d.percentage.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
