import { useAuth, type AppRole } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, Wallet, ClipboardCheck, TrendingUp, AlertCircle, Calendar } from "lucide-react";

const ADMIN_STATS = [
  { label: "Total Students", value: "1,247", icon: Users, change: "+38 this term" },
  { label: "Active Courses", value: "42", icon: BookOpen, change: "6 programs" },
  { label: "Lecturers", value: "56", icon: GraduationCap, change: "4 on leave" },
  { label: "Fee Collection", value: "MWK 18.4M", icon: Wallet, change: "72% collected" },
];

const LECTURER_STATS = [
  { label: "My Courses", value: "4", icon: BookOpen, change: "This semester" },
  { label: "Students Taught", value: "186", icon: Users, change: "Across courses" },
  { label: "Pending Grades", value: "23", icon: AlertCircle, change: "Due this week" },
  { label: "Next Class", value: "10:00 AM", icon: Calendar, change: "EDU 201 — Room B3" },
];

const STUDENT_STATS = [
  { label: "My Courses", value: "6", icon: BookOpen, change: "Semester 2" },
  { label: "Attendance", value: "87%", icon: ClipboardCheck, change: "Last 30 days" },
  { label: "GPA", value: "3.42", icon: TrendingUp, change: "Cumulative" },
  { label: "Fee Balance", value: "MWK 45,000", icon: Wallet, change: "Due Mar 30" },
];

const REGISTRAR_STATS = [
  { label: "Total Students", value: "1,247", icon: Users, change: "+38 this term" },
  { label: "Pending Admissions", value: "84", icon: ClipboardCheck, change: "Awaiting review" },
  { label: "Active Courses", value: "42", icon: BookOpen, change: "6 programs" },
  { label: "Fee Collection", value: "MWK 18.4M", icon: Wallet, change: "72% collected" },
];

const STATS_BY_ROLE: Record<AppRole, typeof ADMIN_STATS> = {
  admin: ADMIN_STATS,
  registrar: REGISTRAR_STATS,
  lecturer: LECTURER_STATS,
  student: STUDENT_STATS,
};

const RECENT_ACTIVITIES = [
  { text: "New student batch enrolled — 64 first-year students", time: "2 hours ago" },
  { text: "Mid-semester exam timetable published", time: "5 hours ago" },
  { text: "Fee payment deadline extended to March 30", time: "1 day ago" },
  { text: "Teaching practice assignments released for Year 3", time: "2 days ago" },
  { text: "EDU 305 assignment submissions closed", time: "3 days ago" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || "student";
  const stats = STATS_BY_ROLE[role];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Here's what's happening at Kasungu TTC
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={stat.label} className={`animate-fade-up stagger-${i + 1} hover:shadow-md transition-shadow`}>
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="stat-value mt-1 text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <Card className="animate-fade-up stagger-5">
        <CardHeader className="pb-3">
          <CardTitle className="section-title">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {RECENT_ACTIVITIES.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
