"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Briefcase,
  UserPlus,
  ShieldCheck,
  TrendingUp,
  Search,
  SlidersHorizontal,
  Upload,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Client,
  ConflictStatus,
  StatCardProps,
  DetailedClient,
} from "@/utils/types";
import Bounded from "./Bounded";
import { useRouter } from "next/navigation";
import { getClients } from "@/utils/clientStorage";
import Link from "next/link";
import { useEffect } from "react";

// ALL_CLIENTS imported from mockData.ts

const conflictStyles: Record<
  ConflictStatus,
  { icon: React.ReactNode; text: string; bg: string }
> = {
  "No Conflict": {
    icon: <CheckCircle2 size={12} className="shrink-0" />,
    text: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  "Potential Conflict": {
    icon: <AlertTriangle size={12} className="shrink-0" />,
    text: "text-amber-500",
    bg: "bg-amber-50",
  },
  "Confirmed Conflict": {
    icon: <XCircle size={12} className="shrink-0" />,
    text: "text-red-500",
    bg: "bg-red-50",
  },
};

function StatCard({ label, value, sub, subPositive, icon }: StatCardProps) {
  return (
    <div className="flex-1 min-w-0 rounded-2xl border border-slate-200 bg-white px-3 md:px-5 py-2 md:py-4 flex flex-col gap-2 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-slate-500">
          {label}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          {icon}
        </div>
      </div>
      <p className="text-[28px] font-bold tracking-tight text-slate-900 leading-none">
        {value}
      </p>
      <p
        className={cn(
          "flex items-center gap-1 text-[11.5px] font-medium",
          subPositive === true
            ? "text-[#059669]"
            : subPositive === false
              ? "text-slate-400"
              : "text-[#059669]",
        )}
      >
        {subPositive !== false && <TrendingUp size={11} className="shrink-0" />}
        {subPositive === false && (
          <ShieldCheck size={11} className="shrink-0 text-emerald-500" />
        )}
        {sub}
      </p>
    </div>
  );
}

const PAGE_SIZE_OPTIONS = [8, 25, 50] as const;

function buildPills(current: number, total: number): (number | "…")[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function ClientManagement() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [goInput, setGoInput] = useState("");
  const [clients, setClients] = useState<DetailedClient[]>([]);

  useEffect(() => {
    setClients(getClients());
  }, []);

  const filtered = clients.filter((c) =>
    [c.name, c.clientId, c.caseType, c.email, c.phone]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const pageIds = paginated.map((c) => c.id);
  const allOnPage =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const someOnPage = pageIds.some((id) => selected.has(id)) && !allOnPage;

  function toggleAll() {
    const next = new Set(selected);
    allOnPage
      ? pageIds.forEach((id) => next.delete(id))
      : pageIds.forEach((id) => next.add(id));
    setSelected(next);
  }

  function toggleRow(id: string) {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  }

  function goTo(n: number) {
    setPage(Math.max(1, Math.min(n, totalPages)));
  }

  function handleGo() {
    const n = parseInt(goInput, 10);
    if (!isNaN(n)) goTo(n);
    setGoInput("");
  }

  const pills = buildPills(safePage, totalPages);
  const start = (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, filtered.length);

  return (
    <Bounded>
      <div className="flex flex-col gap-2 md:gap-6 w-full">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#181D1A] ">
              Client Management
            </h1>
            <p className="sr-only">Client Management page</p>
            <p className="md:mt-1  mt-0 text-[13.5px] text-slate-400">
              Manage and oversee firm-wide client relationships and data.
            </p>
          </div>
          <Link className="w-full" href="/clients/new">
            <Button className="h-9 gap-2 w-full rounded-md bg-[#055939] px-5 text-[13.5px] font-semibold text-white hover:bg-[#155e38] shadow-sm shrink-0 cursor-pointer">
              <UserPlus size={15} />
              Add New Client
            </Button>
          </Link>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4  gap-2 md:gap-4 sm:flex-row">
          <StatCard
            label="Total Clients"
            value="1,284"
            sub="12% vs last month"
            subPositive={true}
            icon={<Users size={16} />}
          />
          <StatCard
            label="Active Case"
            value="342"
            sub="Across 156 clients"
            subPositive={false}
            icon={<Briefcase size={16} />}
          />
          <StatCard
            label="New Clients (30d)"
            value="48"
            sub="+5 more than prev."
            subPositive={true}
            icon={<UserPlus size={16} />}
          />
          <StatCard
            label="Retention Rate"
            value="94.2%"
            sub="High stability"
            subPositive={true}
            icon={<ShieldCheck size={16} />}
          />
        </div>

        <main className="rounded-2xl border border-slate-200 bg-white p-2 md:p-5 flex flex-col gap-4">
          <div className="flex  flex-col gap-2 ">
            <h2 className="text-[16px] font-semibold text-slate-900">
              All Client
            </h2>
            <div className="flex w-full flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="relative w-full flex items-center justify-center sm:items-start sm:justify-start ">
                <Search
                  size={13}
                  className="absolute  text-[8px] left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <Input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by name, case ID or phone number"
                  className="h-9 w-full md:w-64 placeholder:text-sm rounded-lg border-slate-200 bg-slate-50 pl-8  placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#1a7a4a] shadow-none"
                />
              </div>
              <div className="flex gap-2 md:gap-4 items-start justify-start sm:items-center sm:justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 cursor-pointer gap-1.5 rounded-lg border-slate-200 text-[13px] font-medium text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none"
                >
                  <SlidersHorizontal size={13} /> Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 cursor-pointer gap-1.5 rounded-lg border-slate-200 text-[13px] font-medium text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none"
                >
                  Export <Upload size={13} />
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-slate-100 bg-slate-50/70">
                  <TableHead className="w-10 pl-4">
                    <input
                      type="checkbox"
                      checked={allOnPage}
                      ref={(el) => {
                        if (el) el.indeterminate = someOnPage;
                      }}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-slate-300 accent-[#1a7a4a] cursor-pointer"
                    />
                  </TableHead>
                  {[
                    "Client ID",
                    "Client Name",
                    "Case Type",
                    "Email",
                    "Conflict Status",
                    "Phone",
                    "Action",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="h-10 text-[11.5px] font-semibold text-slate-400 whitespace-nowrap tracking-wide"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-16 text-center text-sm text-slate-400"
                    >
                      No clients match your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((row) => {
                    const isSelected = selected.has(row.id);
                    const cs = conflictStyles[row.conflict];
                    return (
                      <TableRow
                        key={row.id}
                        className={cn(
                          "border-b border-slate-100 transition-colors duration-100 group cursor-pointer",
                          isSelected
                            ? "bg-emerald-50/50"
                            : "hover:bg-slate-50/70",
                        )}
                      >
                        {/* Checkbox */}
                        <TableCell className="w-10 pl-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleRow(row.id)}
                            className="h-4 w-4 rounded border-slate-300 accent-[#1a7a4a] cursor-pointer"
                          />
                        </TableCell>

                        {/* Client ID */}
                        <TableCell className="py-4 text-[13px] font-mono text-slate-500 whitespace-nowrap">
                          <Link
                            href={`/clients/${row.id}`}
                            className="hover:underline hover:text-[#1a7a4a] transition-colors"
                          >
                            {row.clientId}
                          </Link>
                        </TableCell>

                        {/* Client name */}
                        <TableCell className="py-4 text-[13.5px] font-semibold text-slate-900 whitespace-nowrap">
                          <Link
                            href={`/clients/${row.id}`}
                            className="hover:underline hover:text-[#1a7a4a] transition-colors"
                          >
                            {row.name}
                          </Link>
                        </TableCell>

                        {/* Case type */}
                        <TableCell className="py-4 text-[13px] text-slate-600 max-w-40">
                          <span className="block leading-snug">
                            {row.caseType}
                          </span>
                        </TableCell>

                        {/* Email */}
                        <TableCell className="py-4 text-[13px] text-slate-500 max-w-45">
                          <span className="block leading-snug break-all">
                            {row.email}
                          </span>
                        </TableCell>

                        {/* Conflict status */}
                        <TableCell className="py-4">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap",
                              cs.bg,
                              cs.text,
                            )}
                          >
                            {cs.icon}
                            {row.conflict}
                          </span>
                        </TableCell>

                        {/* Phone */}
                        <TableCell className="py-4 text-[13px] text-slate-600 whitespace-nowrap">
                          {row.phone}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="py-4 pr-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:opacity-0 opacity-100 md:group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical size={15} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-36 rounded-xl shadow-lg"
                            >
                              <DropdownMenuItem
                                className="gap-2 text-[13px] rounded-lg cursor-pointer"
                                onClick={() =>
                                  router.push(`/clients/${row.id}`)
                                }
                              >
                                <Eye size={13} className="text-slate-500" />{" "}
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-[13px] rounded-lg cursor-pointer">
                                <Pencil size={13} className="text-slate-500" />{" "}
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 text-[13px] rounded-lg cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                                <Trash2 size={13} /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* ── Pagination ── */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
            {/* Rows per page */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[13px] text-slate-500 whitespace-nowrap">
                Rows per Page
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => {
                  setPageSize(Number(v));
                  setPage(1);
                }}
              >
                <SelectTrigger className=" max-h-8 max-w-17 rounded-lg border-slate-200 text-[13px] focus:ring-[#1a7a4a] shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {PAGE_SIZE_OPTIONS.map((s) => (
                    <SelectItem
                      key={s}
                      value={String(s)}
                      className="text-[13px]"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prev · pills · Next */}
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="outline"
                size="sm"
                disabled={safePage === 1}
                onClick={() => goTo(safePage - 1)}
                className="h-8 gap-0.5 rounded-lg border-slate-200 px-2.5 text-[13px] text-slate-600 disabled:opacity-35 shadow-none hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
              >
                <ChevronLeft size={13} /> Prev
              </Button>

              {pills.map((p, i) =>
                p === "…" ? (
                  <span
                    key={`e${i}`}
                    className="w-7 text-center text-[13px] text-slate-400 select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goTo(p as number)}
                    className={cn(
                      "h-8 w-8 rounded-lg text-[13px] font-medium transition-all border",
                      p === safePage
                        ? "bg-[#1a7a4a] text-white border-[#1a7a4a] shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a]",
                    )}
                  >
                    {p}
                  </button>
                ),
              )}

              <Button
                variant="outline"
                size="sm"
                disabled={safePage === totalPages}
                onClick={() => goTo(safePage + 1)}
                className="h-8 gap-0.5 rounded-lg border-slate-200 px-2.5 text-[13px] text-slate-600 disabled:opacity-35 shadow-none hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
              >
                Next <ChevronRight size={13} />
              </Button>
            </div>

            {/* Divider */}
            <span className="text-slate-300 select-none hidden sm:inline">
              /
            </span>

            {/* Go to page */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[13px] text-slate-500 whitespace-nowrap">
                Go to Page
              </span>
              <Input
                value={goInput}
                onChange={(e) => setGoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGo()}
                placeholder={String(safePage)}
                className="h-8 w-12 rounded-lg border-slate-200 text-center text-[13px] focus-visible:ring-1 focus-visible:ring-[#1a7a4a] shadow-none"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleGo}
                className="h-8 gap-0.5 rounded-lg border-slate-200 px-2.5 text-[13px] text-slate-600 shadow-none hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
              >
                Go <ChevronRight size={12} />
              </Button>
            </div>

            {/* Showing X–Y of Z */}
            <span className="ml-auto text-[13px] text-slate-400 whitespace-nowrap shrink-0">
              Showing {start}–{end} of {filtered.length}
            </span>
          </div>
        </main>
      </div>
    </Bounded>
  );
}
