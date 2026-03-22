import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Download } from "lucide-react";

const STUDENTS = [
  { id: "KTTC-2024-001", name: "Chimwemwe Mwale", program: "Primary Education", year: 3, status: "active", gpa: 3.42 },
  { id: "KTTC-2024-002", name: "Tamandani Banda", program: "Primary Education", year: 2, status: "active", gpa: 3.18 },
  { id: "KTTC-2024-003", name: "Mphatso Kamanga", program: "Secondary Education", year: 1, status: "active", gpa: 2.95 },
  { id: "KTTC-2024-004", name: "Thandiwe Nkhoma", program: "Primary Education", year: 3, status: "active", gpa: 3.67 },
  { id: "KTTC-2024-005", name: "Blessings Zuze", program: "Early Childhood", year: 2, status: "deferred", gpa: 2.80 },
  { id: "KTTC-2024-006", name: "Grace Mkandawire", program: "Primary Education", year: 1, status: "active", gpa: 3.55 },
  { id: "KTTC-2024-007", name: "Kondwani Phiri", program: "Secondary Education", year: 3, status: "active", gpa: 3.01 },
  { id: "KTTC-2024-008", name: "Mercy Chirwa", program: "Primary Education", year: 2, status: "active", gpa: 3.89 },
];

export default function Students() {
  const [search, setSearch] = useState("");

  const filtered = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title animate-fade-up">Students</h1>
          <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
            {STUDENTS.length} students enrolled
          </p>
        </div>
        <div className="flex gap-2 animate-fade-up stagger-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1.5" /> Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1.5" /> Add Student
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm animate-fade-up stagger-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card className="animate-fade-up stagger-3">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Student ID</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Name</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Program</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Year</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">GPA</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{s.id}</td>
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{s.program}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">Year {s.year}</td>
                    <td className="px-4 py-3 tabular-nums">{s.gpa.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={s.status === "active" ? "default" : "secondary"} className="capitalize text-xs">
                        {s.status}
                      </Badge>
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
