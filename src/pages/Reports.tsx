import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BarChart3, Users, Wallet, ClipboardCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReportConfig {
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  generator: () => string;
  filename: string;
}

function generateStudentPerformanceCSV(): string {
  const headers = ["Student ID", "Full Name", "Program", "Year", "GPA", "Academic Standing", "Pass Rate (%)"];
  const rows = [
    ["STU001", "Grace Banda", "Primary Education", "2", "3.45", "Good Standing", "88"],
    ["STU002", "John Phiri", "Secondary Education", "1", "2.90", "Good Standing", "75"],
    ["STU003", "Mary Chirwa", "Early Childhood", "3", "3.80", "Dean's List", "95"],
    ["STU004", "James Mwale", "Primary Education", "2", "1.85", "Probation", "55"],
    ["STU005", "Fatima Salim", "Secondary Education", "3", "3.20", "Good Standing", "82"],
    ["STU006", "Peter Kamanga", "Primary Education", "1", "2.50", "Good Standing", "70"],
    ["STU007", "Agnes Nyirenda", "Early Childhood", "2", "3.65", "Dean's List", "92"],
    ["STU008", "Daniel Mkandawire", "Secondary Education", "2", "2.10", "Warning", "60"],
  ];
  return [headers, ...rows].map(r => r.join(",")).join("\n");
}

function generateEnrollmentCSV(): string {
  const headers = ["Program", "Year 1 Male", "Year 1 Female", "Year 2 Male", "Year 2 Female", "Year 3 Male", "Year 3 Female", "Total"];
  const rows = [
    ["Primary Education", "45", "52", "40", "48", "38", "44", "267"],
    ["Secondary Education", "38", "42", "35", "40", "30", "35", "220"],
    ["Early Childhood Dev.", "12", "35", "10", "32", "8", "28", "125"],
  ];
  return [headers, ...rows].map(r => r.join(",")).join("\n");
}

function generateFeeCollectionCSV(): string {
  const headers = ["Program", "Expected (MWK)", "Collected (MWK)", "Outstanding (MWK)", "Collection Rate (%)", "Mobile Money (MWK)", "Bank Transfer (MWK)", "Cash (MWK)"];
  const rows = [
    ["Primary Education", "26700000", "22695000", "4005000", "85", "11347500", "7942500", "3405000"],
    ["Secondary Education", "22000000", "17600000", "4400000", "80", "8800000", "6160000", "2640000"],
    ["Early Childhood Dev.", "12500000", "11250000", "1250000", "90", "5625000", "3937500", "1687500"],
  ];
  return [headers, ...rows].map(r => r.join(",")).join("\n");
}

function generateAttendanceCSV(): string {
  const headers = ["Course Code", "Course Name", "Department", "Student Avg (%)", "Lecturer Avg (%)", "Classes Held", "Total Expected"];
  const rows = [
    ["EDU101", "Foundations of Education", "Education", "87", "95", "42", "45"],
    ["MTH201", "Mathematics Methods", "Sciences", "78", "90", "38", "42"],
    ["ENG102", "English Language Skills", "Languages", "82", "92", "40", "44"],
    ["PSY301", "Child Psychology", "Education", "91", "98", "43", "45"],
    ["SCI102", "Science Teaching Methods", "Sciences", "75", "88", "36", "42"],
  ];
  return [headers, ...rows].map(r => r.join(",")).join("\n");
}

function generateTeachingPracticeCSV(): string {
  const headers = ["Student ID", "Full Name", "Placement School", "District", "Status", "Supervisor Score", "Overall Grade"];
  const rows = [
    ["STU003", "Mary Chirwa", "Kasungu LEA Primary", "Kasungu", "Completed", "85", "B+"],
    ["STU005", "Fatima Salim", "Chamama CDSS", "Kasungu", "Completed", "78", "B"],
    ["STU007", "Agnes Nyirenda", "Kasungu Model Nursery", "Kasungu", "In Progress", "N/A", "N/A"],
    ["STU001", "Grace Banda", "Mchinji LEA Primary", "Mchinji", "Completed", "90", "A-"],
    ["STU002", "John Phiri", "Lilongwe CDSS", "Lilongwe", "Not Started", "N/A", "N/A"],
  ];
  return [headers, ...rows].map(r => r.join(",")).join("\n");
}

function generateFinancialStatementCSV(): string {
  const headers = ["Category", "Description", "Budget (MWK)", "Actual (MWK)", "Variance (MWK)", "Variance (%)"];
  const rows = [
    ["Income", "Student Fees", "61200000", "51545000", "-9655000", "-15.8"],
    ["Income", "Government Grant", "25000000", "25000000", "0", "0.0"],
    ["Income", "Donations", "5000000", "3200000", "-1800000", "-36.0"],
    ["Expenditure", "Staff Salaries", "35000000", "34500000", "500000", "1.4"],
    ["Expenditure", "Teaching Materials", "8000000", "7200000", "800000", "10.0"],
    ["Expenditure", "Utilities", "4000000", "4500000", "-500000", "-12.5"],
    ["Expenditure", "Maintenance", "6000000", "5800000", "200000", "3.3"],
    ["Expenditure", "Student Welfare", "3000000", "2800000", "200000", "6.7"],
  ];
  return [headers, ...rows].map(r => r.join(",")).join("\n");
}

const REPORTS: ReportConfig[] = [
  { title: "Student Performance Summary", description: "GPA distribution, pass rates, and academic standings per program", icon: BarChart3, category: "Academic", generator: generateStudentPerformanceCSV, filename: "student_performance_report.csv" },
  { title: "Enrollment Statistics", description: "Student enrollment by program, year, gender, and district of origin", icon: Users, category: "Academic", generator: generateEnrollmentCSV, filename: "enrollment_statistics.csv" },
  { title: "Fee Collection Report", description: "Payment summary, outstanding balances, and mobile money breakdown", icon: Wallet, category: "Financial", generator: generateFeeCollectionCSV, filename: "fee_collection_report.csv" },
  { title: "Attendance Report", description: "Student and lecturer attendance rates by course and department", icon: ClipboardCheck, category: "Academic", generator: generateAttendanceCSV, filename: "attendance_report.csv" },
  { title: "Teaching Practice Assessment", description: "Placement completion rates and supervisor evaluation summaries", icon: FileText, category: "Academic", generator: generateTeachingPracticeCSV, filename: "teaching_practice_report.csv" },
  { title: "Financial Statement", description: "Income, expenditure, and budget variance for the current term", icon: Wallet, category: "Financial", generator: generateFinancialStatementCSV, filename: "financial_statement.csv" },
];

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = async (report: ReportConfig) => {
    setGenerating(report.title);
    // simulate brief processing
    await new Promise(r => setTimeout(r, 800));
    try {
      const csv = report.generator();
      downloadCSV(csv, report.filename);
      toast.success(`${report.title} downloaded successfully`);
    } catch {
      toast.error("Failed to generate report");
    }
    setGenerating(null);
  };

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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 mt-3 text-xs"
                    disabled={generating === r.title}
                    onClick={() => handleGenerate(r)}
                  >
                    {generating === r.title ? (
                      <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Generating…</>
                    ) : (
                      <><Download className="h-3 w-3 mr-1" /> Generate CSV</>
                    )}
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
