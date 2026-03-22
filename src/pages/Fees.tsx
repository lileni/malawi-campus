import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Smartphone } from "lucide-react";

const FEE_STRUCTURE = [
  { item: "Tuition Fee", amount: 150000 },
  { item: "Registration Fee", amount: 15000 },
  { item: "Library Fee", amount: 8000 },
  { item: "ICT Fee", amount: 12000 },
  { item: "Student Union Fee", amount: 5000 },
];

const PAYMENTS = [
  { date: "2026-01-15", method: "Airtel Money", reference: "ATM-2026-001842", amount: 100000, status: "confirmed" },
  { date: "2025-11-20", method: "TNM Mpamba", reference: "TNM-2025-009341", amount: 45000, status: "confirmed" },
];

function formatMWK(amount: number) {
  return `MWK ${amount.toLocaleString()}`;
}

export default function Fees() {
  const total = FEE_STRUCTURE.reduce((a, f) => a + f.amount, 0);
  const paid = PAYMENTS.reduce((a, p) => a + p.amount, 0);
  const balance = total - paid;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title animate-fade-up">Fees & Payments</h1>
        <p className="text-muted-foreground text-sm mt-1 animate-fade-up stagger-1">
          Academic Year 2025/2026
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Fees", value: formatMWK(total), color: "text-foreground" },
          { label: "Amount Paid", value: formatMWK(paid), color: "text-success" },
          { label: "Balance Due", value: formatMWK(balance), color: "text-destructive" },
        ].map((s, i) => (
          <Card key={s.label} className={`animate-fade-up stagger-${i + 1}`}>
            <CardContent className="pt-5 pb-4">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`stat-value mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fee structure */}
      <Card className="animate-fade-up stagger-4">
        <CardHeader className="pb-3">
          <CardTitle className="section-title flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" /> Fee Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {FEE_STRUCTURE.map((f) => (
              <div key={f.item} className="flex justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                <span>{f.item}</span>
                <span className="tabular-nums font-medium">{formatMWK(f.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm py-2 font-bold border-t border-border">
              <span>Total</span>
              <span className="tabular-nums">{formatMWK(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card className="animate-fade-up stagger-5">
        <CardHeader className="pb-3">
          <CardTitle className="section-title flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-primary" /> Payment History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Method</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Reference</th>
                  <th className="text-right font-medium text-muted-foreground px-4 py-3">Amount</th>
                  <th className="text-center font-medium text-muted-foreground px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENTS.map((p) => (
                  <tr key={p.reference} className="border-b border-border/50">
                    <td className="px-4 py-3">{p.date}</td>
                    <td className="px-4 py-3">{p.method}</td>
                    <td className="px-4 py-3 hidden sm:table-cell font-mono text-xs">{p.reference}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium">{formatMWK(p.amount)}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="default" className="text-xs capitalize">{p.status}</Badge>
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
