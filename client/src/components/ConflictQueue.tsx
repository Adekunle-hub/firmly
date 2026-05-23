import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const conflicts = [
  {
    potential: "TechCorp Global",
    opposing: "Innovate Systems LLC",
    requestedBy: "B. Williams",
    status: "Attributions",
    statusVariant: "warning" as const,
  },
  {
    potential: "Marcus Johnson",
    opposing: "City of Chicago",
    requestedBy: "B. Dike",
    status: "At Risk",
    statusVariant: "danger" as const,
  },
];

const statusStyles = {
  warning: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  danger: "bg-red-100 text-red-600 border-red-200 hover:bg-red-100",
};

export default function ConflictQueue() {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
        <div className="flex items-center gap-2.5">
          <CardTitle className="text-[15px] font-semibold text-[#181D1A]">
            Conflict of Interest Queue
          </CardTitle>
          <Badge className="rounded-md cursor-auto bg-[#AC5E63] text-white border border-[#8E464C33] text-[9px] font-bold tracking-wider  px-2">
            2 PENDING
          </Badge>
        </div>
        <Link
          href="/dashboard/conflicts"
          className="text-xs font-medium text-[#1a7a4a] hover:underline"
        >
          View All
        </Link>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase h-8">
                Potential Party
              </TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase h-8">
                Opposing Party
              </TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase h-8">
                Requested By
              </TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase h-8">
                Status
              </TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase h-8">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conflicts.map((row, i) => (
              <TableRow key={i} className="border-slate-100 hover:bg-slate-50/60">
                <TableCell className="py-3 text-[13px] font-medium text-slate-800">
                  {row.potential}
                </TableCell>
                <TableCell className="py-3 text-[13px] text-slate-600">
                  {row.opposing}
                </TableCell>
                <TableCell className="py-3 text-[13px] text-slate-600">
                  {row.requestedBy}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 text-[11px] font-semibold ${statusStyles[row.statusVariant]}`}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-md border-slate-200 px-3 text-xs text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
                  >
                    Resolve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}