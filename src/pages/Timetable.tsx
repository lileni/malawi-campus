import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

type TimetableEntry = { course: string; room: string; lecturer: string };
const SCHEDULE: Record<string, Record<string, TimetableEntry>> = {
  Monday: {
    "08:00": { course: "EDU 101", room: "A1", lecturer: "Mr. Phiri" },
    "10:00": { course: "EDU 201", room: "B3", lecturer: "Dr. Banda" },
    "14:00": { course: "ICT 101", room: "Lab 1", lecturer: "Mr. Chikoti" },
  },
  Tuesday: {
    "09:00": { course: "EDU 305", room: "A2", lecturer: "Mr. Phiri" },
    "11:00": { course: "ECD 101", room: "C1", lecturer: "Ms. Mbewe" },
    "15:00": { course: "SEC 201", room: "B2", lecturer: "Mr. Gondwe" },
  },
  Wednesday: {
    "08:00": { course: "EDU 301", room: "A1", lecturer: "Mrs. Ngoma" },
    "10:00": { course: "EDU 401", room: "Hall", lecturer: "Dr. Banda" },
  },
  Thursday: {
    "09:00": { course: "EDU 101", room: "A1", lecturer: "Mr. Phiri" },
    "11:00": { course: "ICT 101", room: "Lab 1", lecturer: "Mr. Chikoti" },
    "14:00": { course: "EDU 201", room: "B3", lecturer: "Dr. Banda" },
  },
  Friday: {
    "08:00": { course: "EDU 305", room: "A2", lecturer: "Mr. Phiri" },
    "10:00": { course: "ECD 101", room: "C1", lecturer: "Ms. Mbewe" },
  },
};

export default function Timetable() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Timetable</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Semester 2, 2025/2026 Academic Year
        </p>
      </div>

      <Card className="animate-fade-up stagger-2">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-muted-foreground px-3 py-3 w-16">Time</th>
                  {DAYS.map((d) => (
                    <th key={d} className="text-left font-medium text-muted-foreground px-3 py-3">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLOTS.map((slot) => (
                  <tr key={slot} className="border-b border-border/50">
                    <td className="px-3 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{slot}</td>
                    {DAYS.map((day) => {
                      const entry = SCHEDULE[day]?.[slot];
                      return (
                        <td key={day} className="px-3 py-2">
                          {entry ? (
                            <div className="rounded-md bg-primary/10 border border-primary/20 px-2.5 py-1.5">
                              <p className="font-medium text-xs text-primary">{entry.course}</p>
                              <p className="text-[11px] text-muted-foreground">{entry.room} · {entry.lecturer}</p>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
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
