// components/BackgroundLoader.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function BackgroundLoader() {
  const mainNavCount = 7;
  const settingsNavCount = 1;

  return (
    <div className="flex min-h-screen w-full bg-[#F8F9FA] overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r bg-white h-screen sticky top-0">

        {/* Logo */}
        <div className="flex items-center justify-center py-6 px-4">
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>

        {/* Main Menu */}
        <div className="flex flex-col gap-1 px-3 flex-1">
          <Skeleton className="h-3 w-20 mb-2 ml-1" />
          {Array.from({ length: mainNavCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 h-10 px-3 rounded-sm">
              <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />
              <Skeleton className="h-3.5 w-full" />
            </div>
          ))}

          {/* Settings group */}
          <Skeleton className="h-3 w-16 mt-4 mb-2 ml-1" />
          {Array.from({ length: settingsNavCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 h-10 px-3 rounded-sm">
              <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />
              <Skeleton className="h-3.5 w-full" />
            </div>
          ))}
        </div>

        {/* Footer — Pro Plan */}
        <div className="mx-3 mb-4 rounded-sm bg-[#1A4331]/10 px-3 py-4 flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-20" />
          </div>
          <Skeleton className="h-6 w-14 rounded-sm shrink-0" />
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b h-16 flex items-center justify-between px-4 md:px-6 shrink-0">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>

        {/* Page content */}
        <div className="flex flex-col gap-6 p-4 md:p-8">

          {/* Page header row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 flex flex-col gap-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>

          {/* Chart + Hearings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-xl border bg-white p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-28 rounded-lg" />
              </div>
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>

            <div className="lg:col-span-1 rounded-xl border bg-white p-5 flex flex-col gap-4">
              <Skeleton className="h-5 w-36" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cases table */}
          <div className="rounded-xl border bg-white p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
            <div className="grid grid-cols-5 gap-4 pb-2 border-b">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-3.5 w-full" />
              ))}
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 py-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className={`h-4 ${j === 0 ? "w-3/4" : "w-full"}`} />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}