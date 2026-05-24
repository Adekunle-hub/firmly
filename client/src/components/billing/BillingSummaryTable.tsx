import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type BillingRow = {
  type: string;
  count: number;
  revenue: string;
  percentage: number;
};

const billingData: BillingRow[] = [
  { type: "Retainer",    count: 48, revenue: "₦12.4M", percentage: 50   },
  { type: "Contingency", count: 18, revenue: "₦8.6M",  percentage: 34.7 },
  { type: "Statutory",   count: 12, revenue: "₦2.2M",  percentage: 8.9  },
  { type: "Mixed",       count: 8,  revenue: "₦1.6M",  percentage: 6.4  },
];

const TOTAL = {
  count: 86,
  revenue: "₦24.8M",
  percentage: 100,
};

/** Maps a percentage to a pill colour variant */
function getVariant(pct: number): "default" | "secondary" | "outline" {
  if (pct >= 40) return "default";
  if (pct >= 20) return "secondary";
  return "outline";
}

export default function BillingSummaryTable() {
  return (

    <Card className="w-full flex flex-1 shadow-sm border border-border">
      {/* ── Header ───────────────────────────────────────────── */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold tracking-tight">
          Billing Summary by Revenue Type
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Revenue breakdown across billing categories
        </CardDescription>
      </CardHeader>

      {/* ── Table ────────────────────────────────────────────── */}
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-sm font-medium text-muted-foreground pl-6 w-[40%]">
                Billing Type
              </TableHead>
              <TableHead className="text-sm font-medium text-muted-foreground text-right">
                Count
              </TableHead>
              <TableHead className="text-sm font-medium text-muted-foreground text-right">
                Revenue
              </TableHead>
              <TableHead className="text-sm font-medium text-muted-foreground text-right pr-6">
                %
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {billingData.map((row) => (
              <TableRow
                key={row.type}
                className="group border-b border-border/60 last:border-0 transition-colors hover:bg-muted/30"
              >
                {/* Billing Type */}
                <TableCell className="pl-6 py-4 font-medium text-sm text-foreground">
                  {row.type}
                </TableCell>

                {/* Count */}
                <TableCell className="text-right py-4 text-sm text-muted-foreground">
                  {row.count}
                </TableCell>

                {/* Revenue */}
                <TableCell className="text-right py-4 text-sm font-semibold text-foreground">
                  {row.revenue}
                </TableCell>

                {/* Percentage with progress bar + badge */}
                <TableCell className="text-right pr-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                 
                   
                    <Badge
                      variant={getVariant(row.percentage)}
                      className="text-sm font-medium min-w-11.5 justify-center"
                    >
                      {row.percentage}%
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {/* ── Totals Row ─────────────────────────────────── */}
            <TableRow className="bg-muted/40 border-t-2 border-border hover:bg-muted/40">
              <TableCell className="pl-6 py-4 text-sm font-bold text-foreground">
                Total
              </TableCell>
              <TableCell className="text-right py-4 text-sm font-bold text-foreground">
                {TOTAL.count}
              </TableCell>
              <TableCell className="text-right py-4 text-sm font-bold text-foreground">
                {TOTAL.revenue}
              </TableCell>
              <TableCell className="text-right pr-6 py-4">
                <Badge className="text-sm font-bold min-w-11.5 justify-center">
                  {TOTAL.percentage}%
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}