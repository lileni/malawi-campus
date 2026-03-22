import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock } from "lucide-react";

const COURSES = [
  { code: "EDU 101", name: "Foundations of Education", lecturer: "Mr. James Phiri", students: 48, credits: 3, semester: "1", program: "Primary Education" },
  { code: "EDU 201", name: "Child Psychology & Development", lecturer: "Dr. Grace Banda", students: 42, credits: 3, semester: "2", program: "Primary Education" },
  { code: "EDU 301", name: "Curriculum Design & Assessment", lecturer: "Mrs. Esther Ngoma", students: 36, credits: 4, semester: "1", program: "Primary Education" },
  { code: "EDU 305", name: "Teaching Methodologies", lecturer: "Mr. James Phiri", students: 38, credits: 3, semester: "2", program: "Primary Education" },
  { code: "ECD 101", name: "Early Childhood Education Theory", lecturer: "Ms. Faith Mbewe", students: 28, credits: 3, semester: "1", program: "Early Childhood" },
  { code: "SEC 201", name: "Subject-Specific Pedagogy", lecturer: "Mr. Patrick Gondwe", students: 34, credits: 4, semester: "2", program: "Secondary Education" },
  { code: "EDU 401", name: "Teaching Practice Preparation", lecturer: "Dr. Grace Banda", students: 64, credits: 6, semester: "1", program: "All Programs" },
  { code: "ICT 101", name: "ICT in Education", lecturer: "Mr. Steven Chikoti", students: 52, credits: 2, semester: "2", program: "All Programs" },
];

export default function Courses() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Courses</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          {COURSES.length} courses offered this academic year
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course, i) => (
          <Card
            key={course.code}
            className={`animate-fade-up stagger-${Math.min(i + 1, 6)} hover:shadow-md transition-shadow cursor-pointer group`}
          >
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="text-xs font-mono">{course.code}</Badge>
                <Badge variant="outline" className="text-xs">{course.program}</Badge>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {course.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{course.lecturer}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {course.students}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {course.credits} credits
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" /> Sem {course.semester}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
