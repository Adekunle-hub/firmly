"use client";

import React, { useState, useEffect } from "react";
import {toast} from "sonner"
import Bounded from "@/components/Bounded";
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
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  CheckCircle2,
  CreditCard,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BillingStats from "@/components/billing/BillingStats";
import InvoiceDetailsModal from "@/components/billing/InvoiceDetailsModal";
import InvoiceCreateWizard from "@/components/billing/InvoiceCreateWizard";
import {
  Invoice,
  getInvoices,
  deleteInvoice,
  updateInvoice,
  MOCK_INVOICES,
} from "@/utils/invoiceStorage";

// Recharts components
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BillingSummaryTable from "@/components/billing/BillingSummaryTable";

const PAGE_SIZE_OPTIONS = [8, 25, 50] as const;

// Visual options for different billing statuses
const statusStyles = {
  PAID: {
    text: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-100",
    label: "Paid",
  },
  PENDING: {
    text: "text-amber-700",
    bg: "bg-amber-50 border-amber-100",
    label: "Pending",
  },
  OVERDUE: {
    text: "text-red-700",
    bg: "bg-red-50 border-red-100",
    label: "Overdue",
  },
  DRAFT: {
    text: "text-slate-500",
    bg: "bg-slate-50 border-slate-200",
    label: "Draft",
  },
};

// Analytics mock data representing invoicing vs collections over months in 2026
const collectionsAnalyticsData = [
  { month: "Jan", Billed: 5.5, Collected: 4.8 },
  { month: "Feb", Billed: 12.5, Collected: 12.5 },
  { month: "Mar", Billed: 9.5, Collected: 8.0 },
  { month: "Apr", Billed: 6.8, Collected: 3.5 },
  { month: "May", Billed: 11.2, Collected: 3.0 },
];

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusTab, setActiveStatusTab] = useState<
    "ALL" | "PAID" | "PENDING" | "OVERDUE" | "DRAFT"
  >("ALL");

  // Sorting state
  const [sortBy, setSortBy] = useState<"id" | "client" | "date" | "amount">(
    "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [goInput, setGoInput] = useState("");

  // Modal triggers
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // Load invoices on mount
  useEffect(() => {
    refreshInvoices();
  }, [MOCK_INVOICES]);

  const refreshInvoices = () => {
    
    setInvoices(getInvoices());
  };

  

  // Filter logic
  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      [inv.clientName, inv.id, inv.caseTitle, inv.suitNumber]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      activeStatusTab === "ALL" ? true : inv.status === activeStatusTab;

    return matchesSearch && matchesStatus;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    let fieldA: any = a.issuedDate;
    let fieldB: any = b.issuedDate;

    if (sortBy === "id") {
      fieldA = a.id;
      fieldB = b.id;
    } else if (sortBy === "client") {
      fieldA = a.clientName.toLowerCase();
      fieldB = b.clientName.toLowerCase();
    } else if (sortBy === "amount") {
      fieldA = a.totalAmount;
      fieldB = b.totalAmount;
    }

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination helper calculations
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const startIdx = (safePage - 1) * pageSize + 1;
  const endIdx = Math.min(safePage * pageSize, sorted.length);

  const buildPills = (current: number, total: number): (number | "…")[] => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, "…", total];
    if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
    return [1, "…", current - 1, current, current + 1, "…", total];
  };

  const pills = buildPills(safePage, totalPages);

  const handleGoPage = () => {
    const pNum = parseInt(goInput, 10);
    if (!isNaN(pNum) && pNum >= 1 && pNum <= totalPages) {
      setPage(pNum);
    }
    setGoInput("");
  };

  // Row Action Handlers
  const handleViewInvoice = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setIsDetailsOpen(true);
  };

  const handleEditInvoice = (inv: Invoice) => {
    setEditingInvoice(inv);
    setIsCreateOpen(true);
  };

  const handleMarkAsPaid = (inv: Invoice) => {
    const updated = { ...inv, status: "PAID" as const };
    updateInvoice(updated);
    refreshInvoices();
  };

  const handleMarkAsOverdue = (inv: Invoice) => {
    const updated = { ...inv, status: "OVERDUE" as const };
    updateInvoice(updated);
    refreshInvoices();
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(id);
      refreshInvoices();
    }
  };

  const handleSecurePay = (id: string) => {
    const target = invoices.find((inv) => inv.id === id);
    if (target) {
      handleMarkAsPaid(target);
      setIsDetailsOpen(false);
      alert(`Invoice ${id} has been settled successfully! Billed amount has been recorded.`);
    }
  };

  const toggleSort = (col: "id" | "client" | "date" | "amount") => {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const formatNaira = (val: number) =>
    `₦${val.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      if (parts.length !== 3) return dateStr;
      const date = new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        parseInt(parts[2])
      );
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (isCreateOpen) {
    return (
      <Bounded>
        <InvoiceCreateWizard
          editingInvoice={editingInvoice}
          onClose={() => {
            setIsCreateOpen(false);
            setEditingInvoice(null);
          }}
          onSuccess={() => {
            toast.success("Email Sent Successfully");
            refreshInvoices();
            setIsCreateOpen(false);
            setEditingInvoice(null);
          }}
        />
      </Bounded>
    );
  }

  return (
    <Bounded>
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#181D1A]">
            Billing Dashboard
          </h1>
          <p className="text-[13px] text-[#404942] mt-0.5">
            Administer clients invoicing schedules, milestones, and settlements.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingInvoice(null);
            setIsCreateOpen(true);
          }}
          className="bg-[#1A4331] text-white hover:bg-[#133224] h-10 px-4 text-sm font-semibold rounded-lg shrink-0 cursor-pointer shadow-sm flex items-center gap-1.5"
        >
          <Plus size={14} /> Create Invoice
        </Button>
      </div>

 
    
    <BillingStats invoices={MOCK_INVOICES}/>

      {/* Analytics Visualizations */}
      <main className="flex flex-1 w-full">
        {/* Collections Chart Card */}
        <div className="flex-1 rounded-2xl border border-slate-200  p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Monthly Collections Analysis
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                Comparative overview of total invoiced vs. actual recovery (Millions ₦)
              </p>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              <TrendingUp size={12} /> +18.4%
            </span>
          </div>

          <div className="h-56 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={collectionsAnalyticsData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A4331" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1A4331" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5c542" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f5c542" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₦${v}M`}
                  tick={{ fontSize: 9, fill: "#94a3b8" }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 shadow-xl text-[10px] space-y-1">
                          <p className="font-bold border-b border-slate-800 pb-1 text-slate-400">
                            2026 {payload[0].payload.month}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1A4331]" />
                            Billed:{" "}
                            <span className="font-bold">
                              ₦{payload[0].value}M
                            </span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#f5c542]" />
                            Collected:{" "}
                            <span className="font-bold">
                              ₦{payload[1].value}M
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Billed"
                  stroke="#1A4331"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBilled)"
                />
                <Area
                  type="monotone"
                  dataKey="Collected"
                  stroke="#f5c542"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCollected)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-1 text-[11px] border-t border-slate-50 pt-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-sm bg-[#1A4331]" />
              <span className="text-slate-500 font-semibold">Total Invoiced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-sm bg-[#f5c542]" />
              <span className="text-slate-500 font-semibold">Total Collections</span>
            </div>
          </div>
        </div>

      </main>

      <BillingSummaryTable/>

      {/* Main Administrative Control Grid */}
      <main className="rounded-2xl border border-slate-200 bg-white p-3 md:p-5 flex flex-col gap-4">
        {/* Table Controls (Search, Status Pills tabs, filters) */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row items-start space-y-2 md:items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-[15px] font-bold text-slate-800">
              All Billing Invoices
            </h2>
            {/* Status Pills */}
            <div className="flex w-full items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
              {(["ALL", "PAID", "PENDING", "OVERDUE", "DRAFT"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveStatusTab(tab);
                      setPage(1);
                    }}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-bold rounded-md transition-all select-none uppercase tracking-wide cursor-pointer",
                      activeStatusTab === tab
                        ? "bg-[#1A4331] text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Search Input */}
            <div className="relative w-full ">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none"
              />
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by client, invoice ID or suit number"
                className="h-9 w-full md:w-64 placeholder:text-[10px] rounded-lg border-slate-200 bg-slate-50 pl-8 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#1a7a4a] shadow-none"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 cursor-pointer gap-1.5 rounded-lg border-slate-200 text-sm font-semibold text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none"
              >
                <SlidersHorizontal size={13} /> Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  alert("Exporting invoicing ledger sheet in CSV format...");
                }}
                className="h-9 cursor-pointer gap-1.5 rounded-lg border-slate-200 text-sm font-semibold text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none"
              >
                Export Ledger
              </Button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-slate-100 bg-slate-50/70">
                <TableHead
                  onClick={() => toggleSort("id")}
                  className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase cursor-pointer hover:text-slate-700 whitespace-nowrap pl-4"
                >
                  Invoice ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("client")}
                  className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase cursor-pointer hover:text-slate-700 whitespace-nowrap"
                >
                  Client {sortBy === "client" && (sortOrder === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">
                  Case Title & Suit
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("date")}
                  className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase cursor-pointer hover:text-slate-700 whitespace-nowrap"
                >
                  Issue Date {sortBy === "date" && (sortOrder === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">
                  Due Date
                </TableHead>
                <TableHead
                  onClick={() => toggleSort("amount")}
                  className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase cursor-pointer hover:text-slate-700 whitespace-nowrap text-right"
                >
                  Total Due {sortBy === "amount" && (sortOrder === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap text-center">
                  Status
                </TableHead>
                <TableHead className="h-10 text-[11px] font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap pr-4 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-16 text-center text-sm text-slate-400"
                  >
                    No invoices match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((row) => {
                  const style = statusStyles[row.status];
                  return (
                    <TableRow
                      key={row.id}
                      className="border-b border-slate-100 transition-colors duration-100 hover:bg-slate-50/70 group"
                    >
                      {/* Invoice ID */}
                      <TableCell className="py-4 pl-4 text-[12.5px] font-bold font-mono text-slate-800 whitespace-nowrap">
                        <button
                          onClick={() => handleViewInvoice(row)}
                          className="hover:underline hover:text-[#1a7a4a] text-left cursor-pointer"
                        >
                          {row.id}
                        </button>
                      </TableCell>

                      {/* Client */}
                      <TableCell className="py-4 text-[13px] font-bold text-slate-800 whitespace-nowrap">
                        <div>
                          <p>{row.clientName}</p>
                          <span className="text-[10px] text-slate-400 font-semibold block leading-none mt-0.5">
                            {row.clientEmail}
                          </span>
                        </div>
                      </TableCell>

                      {/* Case Title & Suit */}
                      <TableCell className="py-4 text-[12.5px] text-slate-600 max-w-44">
                        <div>
                          <span className="font-semibold block truncate">
                            {row.caseTitle === "johnson-v-techcorp"
                              ? "Johnson vs. TechCorp Inc."
                              : row.caseTitle === "ojo-v-lagos"
                              ? "Ojo vs. Lagos State Gov."
                              : row.caseTitle === "firs-tax"
                              ? "Okonkwo vs. FIRS Tax"
                              : row.caseTitle || "General Legal Matter"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block leading-none mt-0.5">
                            {row.suitNumber || "N/A"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Issue Date */}
                      <TableCell className="py-4 text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">
                        {formatDate(row.issuedDate)}
                      </TableCell>

                      {/* Due Date */}
                      <TableCell className="py-4 text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">
                        {formatDate(row.dueDate)}
                      </TableCell>

                      {/* Total Due */}
                      <TableCell className="py-4 text-[13px] font-extrabold text-slate-800 whitespace-nowrap text-right">
                        {formatNaira(row.totalAmount)}
                      </TableCell>

                      {/* Status badge */}
                      <TableCell className="py-4 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold uppercase whitespace-nowrap",
                            style.bg,
                            style.text
                          )}
                        >
                          {style.label}
                        </span>
                      </TableCell>

                      {/* Row Action Dropdown */}
                      <TableCell className="py-4 pr-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:opacity-0 opacity-100 md:group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-40 rounded-xl shadow-lg border border-slate-200 bg-white"
                          >
                            <DropdownMenuItem
                              onClick={() => handleViewInvoice(row)}
                              className="gap-2 text-[12.5px] font-medium rounded-lg cursor-pointer text-slate-700 focus:bg-slate-50"
                            >
                              <Eye size={13} className="text-slate-500" /> View
                              Invoice
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleEditInvoice(row)}
                              className="gap-2 text-[12.5px] font-medium rounded-lg cursor-pointer text-slate-700 focus:bg-slate-50"
                            >
                              <Pencil size={13} className="text-slate-500" /> Edit
                              Invoice
                            </DropdownMenuItem>

                            {row.status !== "PAID" && (
                              <DropdownMenuItem
                                onClick={() => handleMarkAsPaid(row)}
                                className="gap-2 text-[12.5px] font-medium rounded-lg cursor-pointer text-slate-700 focus:bg-slate-50"
                              >
                                <CheckCircle2
                                  size={13}
                                  className="text-emerald-600"
                                />{" "}
                                Mark as Paid
                              </DropdownMenuItem>
                            )}

                            {row.status === "PENDING" && (
                              <DropdownMenuItem
                                onClick={() => handleMarkAsOverdue(row)}
                                className="gap-2 text-[12.5px] font-medium rounded-lg cursor-pointer text-slate-700 focus:bg-slate-50"
                              >
                                <AlertTriangle
                                  size={13}
                                  className="text-red-500"
                                />{" "}
                                Mark as Overdue
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuSeparator className="border-slate-100" />

                            <DropdownMenuItem
                              onClick={() => handleDeleteInvoice(row.id)}
                              className="gap-2 text-[12.5px] font-medium rounded-lg cursor-pointer text-red-650 focus:text-red-650 focus:bg-red-50 focus:border-red-100"
                            >
                              <Trash2 size={13} /> Delete Invoice
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

        {/* Dynamic Pagination Controls */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          {/* Rows per page */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[12.5px] text-slate-500 whitespace-nowrap font-medium">
              Rows per Page
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-17 rounded-lg border-slate-200 text-sm focus:ring-[#1a7a4a] shadow-none font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {PAGE_SIZE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={String(s)} className="text-sm">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prev / Pills / Next */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="outline"
              size="sm"
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
              className="h-8 gap-0.5 rounded-lg border-slate-200 px-2.5 text-sm text-slate-600 disabled:opacity-35 shadow-none hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
            >
              <ChevronLeft size={13} /> Prev
            </Button>

            {pills.map((p, i) =>
              p === "…" ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-7 text-center text-sm text-slate-400 select-none font-bold"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={cn(
                    "h-8 w-8 rounded-lg text-sm font-bold transition-all border",
                    p === safePage
                      ? "bg-[#1a7a4a] text-white border-[#1a7a4a] shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
                  )}
                >
                  {p}
                </button>
              )
            )}

            <Button
              variant="outline"
              size="sm"
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
              className="h-8 gap-0.5 rounded-lg border-slate-200 px-2.5 text-sm text-slate-600 disabled:opacity-35 shadow-none hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
            >
              Next <ChevronRight size={13} />
            </Button>
          </div>

          <span className="text-slate-350 select-none hidden sm:inline">/</span>

          {/* Page Jumper */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-slate-500 whitespace-nowrap font-medium">
              Go to Page
            </span>
            <Input
              value={goInput}
              onChange={(e) => setGoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGoPage()}
              placeholder={String(safePage)}
              className="h-8 w-12 rounded-lg border-slate-200 text-center text-sm focus-visible:ring-1 focus-visible:ring-[#1a7a4a] shadow-none font-semibold"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleGoPage}
              className="h-8 gap-0.5 rounded-lg border-slate-200 px-2.5 text-sm text-slate-650 shadow-none hover:border-[#1a7a4a] hover:text-[#1a7a4a]"
            >
              Go <ChevronRight size={12} />
            </Button>
          </div>

          {/* Range label */}
          <span className="ml-auto text-sm text-slate-450 font-bold whitespace-nowrap shrink-0">
            Showing {startIdx}–{endIdx} of {sorted.length}
          </span>
        </div>
      </main>

      {/* Slide-over View Modal */}
      <InvoiceDetailsModal
        invoice={selectedInvoice}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedInvoice(null);
        }}
        onPay={handleSecurePay}
      />
    </Bounded>
  );
}