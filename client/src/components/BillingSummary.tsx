"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "Jan", Paid: 75, Outstanding: 50, Overdue: 30 },
  { month: "Feb", Paid: 60, Outstanding: 40, Overdue: 20 },
  { month: "Mar", Paid: 85, Outstanding: 60, Overdue: 40 },
  { month: "Apr", Paid: 70, Outstanding: 35, Overdue: 25 },
  { month: "May", Paid: 90, Outstanding: 55, Overdue: 35 },
  { month: "Jun", Paid: 65, Outstanding: 45, Overdue: 15 },
  { month: "Jul", Paid: 80, Outstanding: 50, Overdue: 30 },
  { month: "Aug", Paid: 95, Outstanding: 65, Overdue: 45 },
  { month: "Sep", Paid: 72, Outstanding: 38, Overdue: 22 },
  { month: "Oct", Paid: 88, Outstanding: 52, Overdue: 32 },
  { month: "Nov", Paid: 78, Outstanding: 48, Overdue: 28 },
  { month: "Dec", Paid: 82, Outstanding: 55, Overdue: 35 },
];

const chartConfig: ChartConfig = {
  Paid: { label: "Paid", color: "#1a7a4a" },
  Outstanding: { label: "Outstanding", color: "#f5c542" },
  Overdue: { label: "Overdue", color: "#ef4444" },
} satisfies ChartConfig;

export default function BillingSummary() {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-3 md:px-6">
        <CardTitle className="text-[15px] font-semibold text-slate-900">
          Billing Summary
        </CardTitle>
        <div className="text-xs text-slate-500">Month</div>
      </CardHeader>

      <CardContent className=" px-3 md:px-6 pb-6">
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <BarChart
            data={data}
            accessibilityLayer
            barCategoryGap={42}     // Increased spacing
            barGap={-1}
            barSize={5}            // ← This now controls width globally
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11, fill: "#64748b" }}
            />

            <YAxis
              domain={[0, 100]}
              tickCount={6}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 10, fill: "#64748b" }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-40" />}
            />

            <Bar
              dataKey="Paid"
              stackId="a"
              fill="var(--color-Paid)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Outstanding"
              stackId="a"
              fill="var(--color-Outstanding)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Overdue"
              stackId="a"
              fill="var(--color-Overdue)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        
        <div className="flex justify-center gap-3 md:gap-6 mt-6">
          {[
            { label: "Paid", color: "bg-[#1a7a4a]" },
            { label: "Outstanding", color: "bg-[#f5c542]" },
            { label: "Overdue", color: "bg-red-500" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-sm ${item.color}`} />
              <span className="text-xs text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}