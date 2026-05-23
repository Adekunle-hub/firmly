"use client";

import React from "react";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Invoice } from "@/utils/invoiceStorage";

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  subPositive?: boolean;
  statusType?: "paid" | "pending" | "overdue" | "all";
  icon: React.ReactNode;
}

function StatCard({ label, value, sub, subPositive, statusType = "all", icon }: StatCardProps) {
  const iconBgs = {
    all: "bg-slate-100 text-slate-650",
    paid: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    pending: "bg-amber-50 text-amber-600 border border-amber-100",
    overdue: "bg-red-50 text-red-650 border border-red-100",
  };

  return (
    <div className="flex-1 min-w-55 rounded-2xl border border-slate-200 bg-white px-5 py-4 flex flex-col gap-2 transition-all duration-300 hover:shadow-md hover:border-slate-350 group">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
          {label}
        </span>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105", iconBgs[statusType])}>
          {icon}
        </div>
      </div>
      <p className="text-[26px] font-bold tracking-tight text-[#055939] leading-none mt-1">
        {value}
      </p>
      <p
        className={cn(
          "flex items-center gap-1 text-[11.5px] font-medium mt-1",
          subPositive === true
            ? "text-emerald-600"
            : subPositive === false
            ? "text-red-500"
            : "text-slate-400"
        )}
      >
        {subPositive === true && <TrendingUp size={11} className="shrink-0" />}
        {subPositive === false && <TrendingDown size={11} className="shrink-0" />}
        {subPositive === undefined && <ShieldCheck size={11} className="shrink-0 text-emerald-500" />}
        {sub}
      </p>
    </div>
  );
}





interface BillingStatsProps {
  invoices:any[]
}

export default function BillingStats({ invoices }: BillingStatsProps) {
  
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1, 
    }).format(val).toLowerCase(); 
  };


  const processMetrics = () => {
    const now = new Date();
    const CURRENT_MONTH = now.getMonth(); 
    const CURRENT_YEAR = now.getFullYear();

    const LAST_MONTH = CURRENT_MONTH === 0 ? 11 : CURRENT_MONTH - 1;
    const LAST_MONTH_YEAR = CURRENT_MONTH === 0 ? CURRENT_YEAR - 1 : CURRENT_YEAR;

    let totalBilledAllTime = 0;
    let totalCollectedAllTime = 0;
    let totalOutstandingAllTime = 0;
    let totalOverdueAllTime = 0;

    let pendingCount = 0;
    let overdueCount = 0;

    let revenueThisMonth = 0;
    let revenueLastMonth = 0;

    invoices.forEach((invoice) => {
      if (invoice.status === "DRAFT") return;

      const amount = invoice.totalAmount || 0;
      totalBilledAllTime += amount;

      
      if (invoice.status === "PAID") {
        totalCollectedAllTime += amount;
      } else if (invoice.status === "PENDING") {
        totalOutstandingAllTime += amount;
        pendingCount++;
      } else if (invoice.status === "OVERDUE") {
        totalOverdueAllTime += amount;
        overdueCount++;
      }

      
      if (invoice.issuedDate && invoice.status === "PAID") {
        const [year, monthStr] = invoice.issuedDate.split("-");
        const invoiceYear = parseInt(year, 10);
        const invoiceMonth = parseInt(monthStr, 10) - 1;

        if (invoiceMonth === CURRENT_MONTH && invoiceYear === CURRENT_YEAR) {
          revenueThisMonth += amount;
        } else if (invoiceMonth === LAST_MONTH && invoiceYear === LAST_MONTH_YEAR) {
          revenueLastMonth += amount;
        }
      }
    });

    
    const collectionRateRaw = totalBilledAllTime > 0 
      ? (totalCollectedAllTime / totalBilledAllTime) * 100 
      : 0;

   
    let growthPercentage = 0;
    if (revenueLastMonth > 0) {
      growthPercentage = ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;
    } else if (revenueThisMonth > 0) {
      growthPercentage = 100; 
    }

    return {
      totalRevenue: totalCollectedAllTime,
      outstanding: totalOutstandingAllTime,
      overdue: totalOverdueAllTime,
      collectionRate: `${collectionRateRaw.toFixed(1)}%`,
      pendingCount,
      overdueCount,
      trendText: `${growthPercentage >= 0 ? "+" : ""}${growthPercentage.toFixed(1)}% from last month`,
      isTrendPositive: growthPercentage >= 0,
      isCollectionHealthy: collectionRateRaw >= 70
    };
  };

  const metrics = processMetrics();

  
  return (
    <div className="flex flex-col gap-2 md:gap-4 sm:flex-row w-full">
    
      <StatCard
        label="Total Revenue"
        value={formatCurrency(metrics.totalRevenue)}
        sub={metrics.trendText}
        subPositive={metrics.isTrendPositive}
        statusType="all"
        icon={<CreditCard size={15} />}
      />

      {/* Outstanding: Unpaid pending invoices balance */}
      <StatCard
        label="Outstanding"
        value={formatCurrency(metrics.outstanding)}
        sub={`${metrics.pendingCount} pending invoices`}
        subPositive={true} 
        statusType="pending"
        icon={<ShieldCheck size={15} />}
      />

      {/* Overdue Amount: Invoices past their due date limits */}
      <StatCard
        label="Overdue Amount"
        value={formatCurrency(metrics.overdue)}
        sub={`${metrics.overdueCount} overdue invoices`}
        subPositive={false} // Overdue balance growth is negative financial health
        statusType="overdue"
        icon={<Clock size={15} />}
      />

      {/* Collection Rate: Collected cash divided by total billing lifecycle */}
      <StatCard
        label="Collection Rate"
        value={metrics.collectionRate}
        sub={metrics.isCollectionHealthy ? "Healthy collection target" : "Needs attention"}
        subPositive={metrics.isCollectionHealthy}
        statusType="all"
        icon={<AlertTriangle size={15} />}
      />
    </div>
  );
}