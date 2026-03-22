import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Wallet, GraduationCap, Megaphone } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1, type: "announcement", title: "Mid-semester exams start March 24", message: "Please check the timetable for your exam schedule. All students must carry valid ID cards.", time: "1 hour ago", read: false },
  { id: 2, type: "fee", title: "Fee payment deadline extended", message: "The deadline for second semester fees has been extended to March 30, 2026. Payments via Airtel Money and TNM Mpamba accepted.", time: "5 hours ago", read: false },
  { id: 3, type: "grade", title: "EDU 305 results published", message: "Continuous assessment results for Teaching Methodologies have been posted.", time: "1 day ago", read: true },
  { id: 4, type: "schedule", title: "Teaching practice orientation", message: "Mandatory orientation for Year 3 students on March 25 at 10:00 AM in the Main Hall.", time: "2 days ago", read: true },
  { id: 5, type: "announcement", title: "Library hours extended", message: "The library will now be open until 9:00 PM on weekdays to support exam preparation.", time: "3 days ago", read: true },
];

const TYPE_CONFIG = {
  announcement: { icon: Megaphone, color: "text-info" },
  fee: { icon: Wallet, color: "text-warning" },
  grade: { icon: GraduationCap, color: "text-success" },
  schedule: { icon: Calendar, color: "text-primary" },
};

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Notifications</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          {NOTIFICATIONS.filter((n) => !n.read).length} unread notifications
        </p>
      </div>

      <div className="space-y-3">
        {NOTIFICATIONS.map((n, i) => {
          const config = TYPE_CONFIG[n.type as keyof typeof TYPE_CONFIG];
          return (
            <Card
              key={n.id}
              className={`animate-fade-up stagger-${Math.min(i + 1, 5)} transition-shadow hover:shadow-md ${!n.read ? "border-primary/30 bg-primary/[0.02]" : ""}`}
            >
              <CardContent className="flex gap-4 py-4">
                <div className={`shrink-0 mt-0.5 ${config.color}`}>
                  <config.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold">{n.title}</h3>
                    {!n.read && <Badge variant="default" className="text-[10px] shrink-0">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
