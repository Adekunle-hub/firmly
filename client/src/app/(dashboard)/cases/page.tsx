"use client";

import { useState } from "react";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import CaseStats from "@/components/CaseStats";
import StrategicGrowthCard from "@/components/StrategicGrowthCard";
import UpcomingHearings from "@/components/UpcomingHearings";
import AllCasesTable from "@/components/AllCasesTable";
import PerformanceSheet from "@/components/PerformanceSheet";

export default function CasesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Bounded>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#181D1A]">
            Case Management
          </h1>
          <p className="text-[13px] text-[#404942] mt-0.5">
            Oversee and manage active legal portfolios across the firm.
          </p>
        </div>
        <Button asChild className="bg-[#1A4331] text-white hover:bg-[#133224]! h-10 px-4 text-xs font-semibold rounded-lg shrink-0 cursor-pointer shadow-sm">
          <Link href="/cases/new">+ Add New Case</Link>
        </Button>
      </div>

      <CaseStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-2">
          <StrategicGrowthCard onViewMetrics={() => setIsSheetOpen(true)} />
        </div>
        <div className="lg:col-span-1">
          <UpcomingHearings />
        </div>
      </div>

      <div className="pt-2">
        <AllCasesTable />
      </div>

      <PerformanceSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </Bounded>
  );
}