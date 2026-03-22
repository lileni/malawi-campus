import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, User } from "lucide-react";

const PLACEMENTS = [
  { student: "Chimwemwe Mwale", school: "Kasungu LEA Primary", district: "Kasungu", startDate: "Apr 7, 2026", endDate: "Jun 27, 2026", supervisor: "Mr. Phiri", status: "upcoming" },
  { student: "Thandiwe Nkhoma", school: "Chamama Primary", district: "Kasungu", startDate: "Apr 7, 2026", endDate: "Jun 27, 2026", supervisor: "Mrs. Ngoma", status: "upcoming" },
  { student: "Kondwani Phiri", school: "Mtunthama CDSS", district: "Kasungu", startDate: "Apr 7, 2026", endDate: "Jun 27, 2026", supervisor: "Dr. Banda", status: "upcoming" },
  { student: "Mercy Chirwa", school: "Kasungu Girls Secondary", district: "Kasungu", startDate: "Sep 2025", endDate: "Nov 2025", supervisor: "Mr. Phiri", status: "completed", score: 78 },
];

export default function TeachingPractice() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Teaching Practice</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Student teacher placements and assessments
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLACEMENTS.map((p, i) => (
          <Card key={p.student + p.school} className={`animate-fade-up stagger-${Math.min(i + 1, 4)}`}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{p.student}</h3>
                <Badge variant={p.status === "completed" ? "default" : "secondary"} className="text-xs capitalize">
                  {p.status}
                </Badge>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{p.school}, {p.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>{p.startDate} — {p.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 shrink-0" />
                  <span>Supervisor: {p.supervisor}</span>
                </div>
              </div>
              {p.score !== undefined && (
                <div className="mt-3 pt-2 border-t border-border/50">
                  <span className="text-sm font-medium">Score: {p.score}%</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
