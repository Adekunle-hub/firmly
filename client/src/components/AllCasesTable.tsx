"use client";

import { useState } from "react";
import Link from "next/link";
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
  Search,
  SlidersHorizontal,
  Upload,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronRight as GoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Case } from "@/utils/types";

const ALL_CASES: Case[] = [
  {
    id: "C001",
    title: "Okon vs. State",
    client: "James Okon",
    type: "Criminal Defense",
    stage: "Trial",
    assigned: "Barr. L. Johnson",
    hearing: "May 22, 2025",
  },
  {
    id: "C002",
    title: "Bella vs. PowerGrid",
    client: "Bella Enterprises",
    type: "Contract Dispute",
    stage: "Discovery",
    assigned: "Barr. T. Anene",
    hearing: "May 27, 2025",
  },
  {
    id: "C003",
    title: "Aisha Lawal Custody",
    client: "Aisha Lawal",
    type: "Family Law",
    stage: "Mediation",
    assigned: "Barr. C. Anaya",
    hearing: "May 29, 2025",
  },
  {
    id: "C004",
    title: "Chukwu & Sons",
    client: "Chukwu & Sons",
    type: "Property Dispute",
    stage: "Pre-trial",
    assigned: "Barr. R. Bello",
    hearing: "May 29, 2025",
  },
  {
    id: "C005",
    title: "Opara Immigration",
    client: "Rachel Opara",
    type: "Immigration Law",
    stage: "Hearing Prep",
    assigned: "Barr. L. Johnson",
    hearing: "May 25, 2025",
  },
  {
    id: "C006",
    title: "Musa vs. FRSC",
    client: "Musa Adedayo",
    type: "Civil Litigation",
    stage: "Trial",
    assigned: "Barr. S. Yusuf",
    hearing: "May 23, 2025",
  },
  {
    id: "C007",
    title: "Hope vs. Unity Bank",
    client: "Hope Danjuma",
    type: "Banking / Finance",
    stage: "Pleadings",
    assigned: "Barr. I. Emeka",
    hearing: "June 1, 2025",
  },
  {
    id: "C008",
    title: "EcoFarm vs. AgroLtd",
    client: "EcoFarm Ltd.",
    type: "Commercial Litigation",
    stage: "Trial",
    assigned: "Barr. C. Ajayi",
    hearing: "May 31, 2025",
  },
  {
    id: "C009",
    title: "Lagos Port Authority",
    client: "LPA Holdings",
    type: "Maritime Law",
    stage: "Trial",
    assigned: "Barr. K. Eze",
    hearing: "June 5, 2025",
  },
  {
    id: "C010",
    title: "Adeyemi vs. NNPC",
    client: "Tunde Adeyemi",
    type: "Oil & Gas",
    stage: "Discovery",
    assigned: "Barr. F. Obi",
    hearing: "June 8, 2025",
  },
  {
    id: "C011",
    title: "Zenith Bank Fraud",
    client: "Zenith Bank PLC",
    type: "Financial Crime",
    stage: "Pre-trial",
    assigned: "Barr. A. Sule",
    hearing: "June 10, 2025",
  },
  {
    id: "C012",
    title: "Femi IP Dispute",
    client: "Femi Brands Ltd",
    type: "Intellectual Property",
    stage: "Mediation",
    assigned: "Barr. T. Amadi",
    hearing: "June 12, 2025",
  },
  {
    id: "C013",
    title: "Garba Land Dispute",
    client: "Isa Garba",
    type: "Property Dispute",
    stage: "Hearing Prep",
    assigned: "Barr. L. Johnson",
    hearing: "June 14, 2025",
  },
  {
    id: "C014",
    title: "MTN Regulatory",
    client: "MTN Nigeria",
    type: "Regulatory",
    stage: "Trial",
    assigned: "Barr. N. Kalu",
    hearing: "June 16, 2025",
  },
  {
    id: "C015",
    title: "Emeka Divorce",
    client: "Chidi Emeka",
    type: "Family Law",
    stage: "Pleadings",
    assigned: "Barr. C. Anaya",
    hearing: "June 18, 2025",
  },
  {
    id: "C016",
    title: "Sterling Bank Debt",
    client: "Sterling Bank",
    type: "Banking / Finance",
    stage: "Discovery",
    assigned: "Barr. I. Emeka",
    hearing: "June 20, 2025",
  },
];

const stageStyles: Record<string, { dot: string; text: string; bg: string }> = {
  Trial: {
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  Discovery: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  Mediation: { dot: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
  "Pre-trial": {
    dot: "bg-violet-500",
    text: "text-violet-700",
    bg: "bg-violet-50",
  },
  "Hearing Prep": {
    dot: "bg-orange-500",
    text: "text-orange-700",
    bg: "bg-orange-50",
  },
  Pleadings: { dot: "bg-rose-500", text: "text-rose-700", bg: "bg-rose-50" },
};

const PAGE_SIZE_OPTIONS = [8, 25, 50] as const;

export default function AllCasesTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [goInput, setGoInput] = useState("");

  const filtered = ALL_CASES.filter((c) =>
    [c.title, c.client, c.type, c.stage, c.id]
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

  function handleGoInput() {
    const n = parseInt(goInput, 10);
    if (!isNaN(n)) goTo(n);
    setGoInput("");
  }

  function buildPagePills(): (number | "…")[] {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3) return [1, 2, 3, "…", totalPages];
    if (safePage >= totalPages - 2)
      return [1, "…", totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", safePage - 1, safePage, safePage + 1, "…", totalPages];
  }

  const pills = buildPagePills();

  const start = (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, filtered.length);

  return (
    <div className="flex flex-col gap-5 mt-4 w-full">
      <div className="flex flex-col gap-3 items-start sm:justify-between ">
        <h1 className="md:text-[22px] font-bold tracking-tight text-slate-900">
          All Cases
        </h1>

        <div className="flex w-full justify-between gap-2 flex-col  md:flex-row">
          <div className="relative w-full ">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, case ID or phone number"
              className="h-9 w-full md:w-88 max-w-full rounded-lg border-slate-200 bg-white pl-8 text-[12px] placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#1a7a4a] shadow-none"
            />
          </div>

          <div className="flex w-full md:w-fit  gap-2 md:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-[45%] max-w-48 gap-1.5 cursor-pointer rounded-lg border-slate-200 text-[13px] font-medium text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none"
            >
              <SlidersHorizontal size={13} />
              Filter
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 w-[45%] max-w-48 cursor-pointer rounded-lg border-slate-200 text-[13px] font-medium text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none"
            >
              Export
              <Upload size={13} />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-slate-100">
              <TableHead className="w-12 pl-5 pr-2">
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
                "Case Title",
                "Client Name",
                "Case Type",
                "Stage",
                "Assigned to",
                "Next Hearing",
                "Actions",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="h-11 text-[11.5px] font-semibold text-slate-400 whitespace-nowrap tracking-wide"
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
                  No cases match your search.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row) => {
                const isSelected = selected.has(row.id);
                const style = stageStyles[row.stage] ?? {
                  dot: "bg-slate-400",
                  text: "text-slate-600",
                  bg: "bg-slate-50",
                };

                return (
                  <TableRow
                    key={row.id}
                    className={cn(
                      "border-b border-slate-100 transition-colors duration-100 group",
                      isSelected ? "bg-emerald-50/60" : "hover:bg-slate-50/70",
                    )}
                  >
                    <TableCell className="w-12 pl-5 pr-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 rounded border-slate-300 accent-[#1a7a4a] cursor-pointer"
                      />
                    </TableCell>

                    <TableCell className="py-4 text-[13.5px] font-semibold text-slate-900 whitespace-nowrap">
                      <Link href={`/cases/${row.id}`}>{row.title}</Link>
                    </TableCell>

                    <TableCell className="py-4 text-[13px] text-slate-600 whitespace-nowrap">
                      {row.client}
                    </TableCell>

                    <TableCell className="py-4 text-[13px] text-slate-600 text-center max-w-32.5">
                      <span className="block leading-snug">{row.type}</span>
                    </TableCell>

                    <TableCell className="py-4 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-semibold whitespace-nowrap",
                          style.bg,
                          style.text,
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full shrink-0",
                            style.dot,
                          )}
                        />
                        {row.stage}
                      </span>
                    </TableCell>

                    <TableCell className="py-4 text-[13px] text-slate-600 whitespace-nowrap">
                      {row.assigned}
                    </TableCell>

                    <TableCell className="py-4 text-[13px] text-slate-600 whitespace-nowrap">
                      {row.hearing}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal size={15} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-36 rounded-xl shadow-lg"
                        >
                          <DropdownMenuItem
                            asChild
                            className="gap-2 text-[13px] rounded-lg cursor-pointer"
                          >
                            <Link href={`/cases/${row.id}`}>
                              <Eye size={13} className="text-slate-500" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-[13px] rounded-lg cursor-pointer">
                            <Pencil size={13} className="text-slate-500" /> Edit
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

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
            <SelectTrigger className="h-8 w-17 rounded-lg border-slate-200 text-[13px] focus:ring-[#1a7a4a] shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {PAGE_SIZE_OPTIONS.map((s) => (
                <SelectItem key={s} value={String(s)} className="text-[13px]">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Prev · page pills · Next */}
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
                key={`ellipsis-${i}`}
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
                    : "border-slate-200 text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] bg-white",
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
        <span className="text-slate-300 select-none hidden sm:inline">/</span>

        {/* Go to page */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[13px] text-slate-500 whitespace-nowrap">
            Go to Page
          </span>
          <Input
            value={goInput}
            onChange={(e) => setGoInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGoInput()}
            placeholder={String(safePage)}
            className="h-8 w-12 rounded-lg border-slate-200 text-center text-[13px] focus-visible:ring-1 focus-visible:ring-[#1a7a4a] shadow-none"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoInput}
            className="h-8 gap-0.5 rounded-lg border-slate-200 px-2.5 text-[13px] text-slate-600 shadow-none hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
          >
            Go <GoIcon size={12} />
          </Button>
        </div>

        {/* Showing X–Y of Z */}
        <span className="ml-auto text-[13px] text-slate-400 whitespace-nowrap shrink-0">
          Showing {start}–{end} of {filtered.length}
        </span>
      </div>
    </div>
  );
}
