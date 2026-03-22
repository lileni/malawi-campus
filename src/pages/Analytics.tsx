import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ENROLLMENT_DATA = [
  { program: "Primary Ed", students: 680 },
  { program: "Secondary Ed", students: 320 },
  { program: "Early Child", students: 147 },
  { program: "Special Ed", students: 100 },
];

const GENDER_DATA = [
  { name: "Female", value: 712 },
  { name: "Male", value: 535 },
];

const GRADE_DIST = [
  { grade: "A", count: 145 },
  { grade: "B+", count: 234 },
  { grade: "B", count: 312 },
  { grade: "C+", count: 287 },
  { grade: "C", count: 178 },
  { grade: "D", count: 67 },
  { grade: "F", count: 24 },
];

const PIE_COLORS = ["hsl(152, 45%, 28%)", "hsl(42, 70%, 55%)"];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Institutional performance overview
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-fade-up stagger-2">
          <CardHeader className="pb-2">
            <CardTitle className="section-title">Enrollment by Program</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ENROLLMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(100, 12%, 88%)" />
                <XAxis dataKey="program" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="students" fill="hsl(152, 45%, 28%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="animate-fade-up stagger-3">
          <CardHeader className="pb-2">
            <CardTitle className="section-title">Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={GENDER_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {GENDER_DATA.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-fade-up stagger-4">
          <CardHeader className="pb-2">
            <CardTitle className="section-title">Grade Distribution (All Courses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={GRADE_DIST}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(100, 12%, 88%)" />
                <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(42, 70%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
