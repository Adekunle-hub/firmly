"use client";

import React, { useState } from "react";
import { Plus, Trash2, X, Download, ShieldCheck, CreditCard, ArrowLeft, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvoiceItem {
  item: string;
  unitPrice: string;
  quantity: string;
}

interface InvoiceFormProps {
  invoiceClientName: string;
  setInvoiceClientName: (val: string) => void;
  invoiceClientEmail: string;
  setInvoiceClientEmail: (val: string) => void;
  invoiceSuitNumber: string;
  setInvoiceSuitNumber: (val: string) => void;
  invoiceClientPhone: string;
  setInvoiceClientPhone: (val: string) => void;
  invoiceClientAddress: string;
  setInvoiceClientAddress: (val: string) => void;
  invoiceCaseTitle: string;
  setInvoiceCaseTitle: (val: string) => void;
  billingTrigger: string;
  setBillingTrigger: (val: string) => void;
  invoiceIssuedDate: string;
  setInvoiceIssuedDate: (val: string) => void;
  invoiceDueDate: string;
  setInvoiceDueDate: (val: string) => void;
  contingencyFee: string;
  setContingencyFee: (val: string) => void;
  invoiceItems: InvoiceItem[];
  setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
  paymentStructure: "full" | "installment";
  setPaymentStructure: (val: "full" | "installment") => void;
  installmentCount: string;
  setInstallmentCount: (val: string) => void;
  includeVat: boolean;
  setIncludeVat: (val: boolean) => void;
  onCreate: () => void;
  onCancel: () => void;
}

export default function InvoiceForm({
  invoiceClientName,
  setInvoiceClientName,
  invoiceClientEmail,
  setInvoiceClientEmail,
  invoiceSuitNumber,
  setInvoiceSuitNumber,
  invoiceClientPhone,
  setInvoiceClientPhone,
  invoiceClientAddress,
  setInvoiceClientAddress,
  invoiceCaseTitle,
  setInvoiceCaseTitle,
  billingTrigger,
  setBillingTrigger,
  invoiceIssuedDate,
  setInvoiceIssuedDate,
  invoiceDueDate,
  setInvoiceDueDate,
  contingencyFee,
  setContingencyFee,
  invoiceItems,
  setInvoiceItems,
  paymentStructure,
  setPaymentStructure,
  installmentCount,
  setInstallmentCount,
  includeVat,
  setIncludeVat,
  onCreate,
  onCancel,
}: InvoiceFormProps) {
  // Mobile step: "form" | "preview"
  const [mobileStep, setMobileStep] = useState<"form" | "preview">("form");

  const addInvoiceItem = () => {
    setInvoiceItems((prev) => [...prev, { item: "", unitPrice: "", quantity: "" }]);
  };

  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: string) => {
    setInvoiceItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const removeInvoiceItem = (index: number) => {
    setInvoiceItems((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateItemTotal = (item: InvoiceItem) => {
    const price = parseFloat(item.unitPrice) || 0;
    const qty = parseFloat(item.quantity) || 0;
    return price * qty;
  };

  const subtotal = invoiceItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const vatAmount = includeVat ? subtotal * 0.075 : 0;
  const totalInvoice = subtotal + vatAmount;

  const formatCurrency = (val: number) =>
    val > 0 ? `₦${val.toLocaleString("en-NG", { minimumFractionDigits: 0 })}` : "₦0";

  const installmentAmount =
    paymentStructure === "installment" && parseInt(installmentCount) > 0
      ? subtotal / parseInt(installmentCount)
      : subtotal;

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
      {children}
    </label>
  );

  // ─── Shared invoice preview JSX (used in both mobile preview step & desktop right panel) ───
  const InvoicePreview = () => (
    <div className="bg-white  shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/65 space-y-6 text-slate-700 max-w-xl mx-auto min-h-150 md:min-h-200 flex flex-col justify-between">
      <div>
        
        <div className="flex  md:items-start items-center flex-col md:flex-row  md:justify-between justify-center">
          <div className="flex items-center   gap-2">
            <div className="h-9 w-9 bg-[#1A4331] rounded-lg flex items-center justify-center text-white text-lg font-bold">
              ⚖️
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1A4331] leading-none">Adebayo & Associates</h4>
              <span className="text-[8px] text-slate-400 font-semibold block mt-0.5">Legal Practitioners & Consultants</span>
            </div>
          </div>
          <div className=" text-center md:text-right">
            <h3 className="text-base font-extrabold text-slate-900 tracking-wider">INVOICE</h3>
            <span className="text-[9px] font-semibold text-slate-450 block mt-1">Invoice Number: INV-2025-0143</span>
          </div>
        </div>

        {/* Company contact and dates */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-[10px] border-b border-slate-100 pb-4">
          <div className="space-y-1 font-semibold text-slate-500">
            <p>15 Broad Street, Marina, Lagos</p>
            <p>Phone: +234 803 456 7890</p>
            <p>Email: info@adebayolegal.com</p>
          </div>
          <div className="text-right space-y-1 font-semibold text-slate-500">
            <p><span className="text-slate-400">Date Issued:</span> {invoiceIssuedDate || "April 28, 2025"}</p>
            <p><span className="text-slate-400">Date Due:</span> {invoiceDueDate || "June 15, 2025"}</p>
            <p>
              <span className="text-slate-400">Status:</span>
              <span className="text-amber-700 bg-amber-50 border border-amber-200 text-[8px] rounded px-1.5 py-0.5 ml-1 font-bold">
                PENDING
              </span>
            </p>
          </div>
        </div>

        {/* Bill To & Case details cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-[10px]">
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">BILL TO:</span>
            <p className="font-bold text-slate-800">{invoiceClientName || "Chief Emeka Okonkwo"}</p>
            <p className="text-slate-500 font-semibold leading-tight">{invoiceClientAddress || "Okonkwo Industries Ltd, Plot 245, Adeola Odeku Street, Victoria Island, Lagos"}</p>
            <p className="text-slate-500 font-medium">Email: {invoiceClientEmail || "emeka@okonkwo.com"}</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">CASE DETAILS:</span>
            <p className="text-slate-500 font-semibold">
              <span className="text-slate-400 font-bold block text-[8px] uppercase mt-0.5">Case Title</span>
              {invoiceCaseTitle === "johnson-v-techcorp"
                ? "Johnson vs. TechCorp Inc."
                : invoiceCaseTitle === "ojo-v-lagos"
                ? "Ojo vs. Lagos State Gov."
                : "Okonkwo vs. FIRS Tax"}
            </p>
            <p className="text-slate-500 font-semibold">
              <span className="text-slate-400 font-bold block text-[8px] uppercase mt-0.5">Suit No</span>
              {invoiceSuitNumber || "FHC/L/CS/4521/2025"}
            </p>
            <p className="text-slate-500 font-semibold">
              <span className="text-slate-400 font-bold block text-[8px] uppercase mt-0.5">Billing Type</span>
              Retainer - Tax Litigation
            </p>
          </div>
        </div>

        {/* Description table */}
        <div className="mt-6">
          <table className="w-full text-left text-[10px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2">Description</th>
                <th className="py-2 text-center w-12">Qty</th>
                <th className="py-2 text-right w-24">Unit Price</th>
                <th className="py-2 text-right w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, idx) => {
                const amount = calculateItemTotal(item);
                return (
                  <tr key={idx} className="border-b border-slate-100 text-slate-650 font-semibold">
                    <td className="py-2.5 max-w-[120px] truncate">{item.item || "Legal representation / Drafting"}</td>
                    <td className="py-2.5 text-center">{item.quantity || "1"}</td>
                    <td className="py-2.5 text-right">{formatCurrency(parseFloat(item.unitPrice) || 0)}</td>
                    <td className="py-2.5 text-right text-slate-800">{formatCurrency(amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Installment Milestones */}
        {paymentStructure === "installment" && (
          <div className="mt-5 bg-slate-50/50 border border-slate-100 p-4 rounded-xl space-y-2">
            <span className="font-bold text-slate-450 uppercase tracking-wider text-[8px] block">Payment Milestones - Installment Plan</span>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: Math.max(2, parseInt(installmentCount) || 2) }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-150 rounded-lg p-2 text-[9px] space-y-1">
                  <span className="font-bold text-slate-400 block">Milestone {i + 1}</span>
                  <p className="font-bold text-slate-800">{formatCurrency(installmentAmount)}</p>
                  <span className={cn(
                    "inline-block text-[8px] font-bold px-1 rounded-xs uppercase leading-none mt-0.5",
                    i === 0 ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-slate-50 text-slate-400 border border-slate-100"
                  )}>
                    {i === 0 ? "Pending" : "Upcoming"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        {/* Totals */}
        <div className="border-t border-slate-150 pt-4 flex flex-col items-center md:items-end text-[10px] font-bold space-y-1.5 text-slate-500">
          <div className="flex justify-between w-48 font-medium">
            <span>Subtotal:</span>
            <span className="text-slate-800 font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          {includeVat && (
            <div className="flex justify-between w-48 font-medium">
              <span>VAT (7.5%):</span>
              <span className="text-slate-800 font-semibold">{formatCurrency(vatAmount)}</span>
            </div>
          )}
          <div className="flex justify-between w-48 border-t border-slate-100 pt-1.5 text-[11px] font-extrabold text-slate-800">
            <span>TOTAL AMOUNT DUE:</span>
            <span className="text-slate-900">{formatCurrency(totalInvoice)}</span>
          </div>
          {paymentStructure === "installment" && (
            <div className="flex justify-between w-48 text-[10px] text-[#1A4331] font-bold mt-1 bg-emerald-50/50 p-1.5 rounded border border-emerald-100">
              <span>First Payment Due:</span>
              <span>{formatCurrency(installmentAmount)}</span>
            </div>
          )}
        </div>

        {/* Pay instructions */}
        <div className="mt-5 border border-slate-150 rounded-xl p-4 flex items-center justify-between bg-slate-50/20 text-[10px]">
          <div className="space-y-1">
            <span className="font-extrabold text-slate-800 flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-600" /> Pay Online (Secure)
            </span>
            <p className="text-slate-400 font-semibold">Pay securely using Paystack or Flutterwave</p>
          </div>
          <Button className="bg-[#1A4331] hover:bg-[#133224] text-white h-7.5 px-3 rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5 text-[9.5px]">
            <CreditCard size={11} /> Pay {paymentStructure === "installment" ? formatCurrency(installmentAmount) : formatCurrency(totalInvoice)}
          </Button>
        </div>

        {/* T&C */}
        <div className="mt-5 text-[8px] text-slate-400 space-y-1 border-t border-slate-100 pt-3">
          <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Terms & Conditions</span>
          <p>&bull; Payment is due within 30 days of invoice date. Late payments will attract 2% interest per month.</p>
          <p>&bull; All payments must reference the invoice number: INV-2025-0143.</p>
          <p>&bull; Fees are exclusive of court-awarded costs, which will be billed separately if applicable.</p>
        </div>

        <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-6">Thank you for your business!</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200">
      <div className="bg-slate-50 w-[95vw] max-w-6xl h-[92vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-200">

        {/* ── MOBILE: Step indicator bar ── */}
        <div className="md:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className={cn(
              "flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold",
              mobileStep === "form" ? "bg-[#1A4331] text-white" : "bg-slate-100 text-slate-400"
            )}>1</span>
            <span className={mobileStep === "form" ? "text-slate-800" : "text-slate-400"}>Details</span>
            <span className="text-slate-200 mx-1">›</span>
            <span className={cn(
              "flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold",
              mobileStep === "preview" ? "bg-[#1A4331] text-white" : "bg-slate-100 text-slate-400"
            )}>2</span>
            <span className={mobileStep === "preview" ? "text-slate-800" : "text-slate-400"}>Preview</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-7 w-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            <X size={14} />
          </Button>
        </div>

        {/* ── LEFT / FORM PANEL ──
            Mobile: visible only on "form" step
            Desktop: always visible, fixed half-width
        ── */}
        <div className={cn(
          "w-full md:w-1/2 h-full overflow-y-auto p-5 md:p-6 space-y-5 bg-white border-r border-slate-200 flex flex-col no-scrollbar",
          // mobile visibility
          mobileStep === "form" ? "flex" : "hidden",
          // desktop: always show
          "md:flex"
        )}>
          {/* Desktop-only header (mobile has the step bar above) */}
          <div className="hidden md:flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Create Invoice</h3>
              <p className="text-[11px] text-slate-400 font-semibold">Create invoice to be sent to client</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="h-8 w-8 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X size={15} />
            </Button>
          </div>

          {/* Mobile-only title */}
          <div className="md:hidden">
            <h3 className="text-base font-bold text-slate-900">Create Invoice</h3>
            <p className="text-[11px] text-slate-400 font-semibold">Fill in the details below</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
            <h4 className="text-sm font-bold text-slate-800">Contingency Billing</h4>
            <p className="text-[10px] text-slate-500 font-semibold">Charge a one-time fee for legal services</p>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-850 border-b border-slate-100 pb-1 uppercase tracking-wider text-[10px]">Details</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel>Client&apos;s Name *</FieldLabel>
                <Input
                  value={invoiceClientName}
                  onChange={(e) => setInvoiceClientName(e.target.value)}
                  placeholder="Enter name"
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>
              <div>
                <FieldLabel>Client&apos;s Email *</FieldLabel>
                <Input
                  type="email"
                  value={invoiceClientEmail}
                  onChange={(e) => setInvoiceClientEmail(e.target.value)}
                  placeholder="Enter email"
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel>Suit number *</FieldLabel>
                <Input
                  value={invoiceSuitNumber}
                  onChange={(e) => setInvoiceSuitNumber(e.target.value)}
                  placeholder="Enter suit number"
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>
              <div>
                <FieldLabel>Client&apos;s Phone Number *</FieldLabel>
                <Input
                  value={invoiceClientPhone}
                  onChange={(e) => setInvoiceClientPhone(e.target.value)}
                  placeholder="Mobile number"
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Client&apos;s Address</FieldLabel>
              <Input
                value={invoiceClientAddress}
                onChange={(e) => setInvoiceClientAddress(e.target.value)}
                placeholder="Address"
                className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel>Case Title</FieldLabel>
                <Select value={invoiceCaseTitle} onValueChange={setInvoiceCaseTitle}>
                  <SelectTrigger className="w-full h-9 text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                    <SelectValue placeholder="Case title" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="johnson-v-techcorp" className="text-sm">Johnson vs. TechCorp Inc.</SelectItem>
                    <SelectItem value="ojo-v-lagos" className="text-sm">Ojo vs. Lagos State Gov.</SelectItem>
                    <SelectItem value="firs-tax" className="text-sm">Okonkwo vs. FIRS Tax</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FieldLabel>Billing Trigger</FieldLabel>
                <Select value={billingTrigger} onValueChange={setBillingTrigger}>
                  <SelectTrigger className="w-full h-9 text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                    <SelectValue placeholder="Billing trigger" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="retainer" className="text-sm">Retainer</SelectItem>
                    <SelectItem value="milestone" className="text-sm">Milestone</SelectItem>
                    <SelectItem value="completion" className="text-sm">Upon Completion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel>Issued On</FieldLabel>
                <Input
                  type="date"
                  value={invoiceIssuedDate}
                  onChange={(e) => setInvoiceIssuedDate(e.target.value)}
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-500"
                />
              </div>
              <div>
                <FieldLabel>Due Date</FieldLabel>
                <Input
                  type="date"
                  value={invoiceDueDate}
                  onChange={(e) => setInvoiceDueDate(e.target.value)}
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-500"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Total Contingency Fee (Optional)</FieldLabel>
              <Input
                value={contingencyFee}
                onChange={(e) => setContingencyFee(e.target.value)}
                placeholder="₦"
                className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div className="space-y-3 border-t border-slate-100 pt-2 md:pt-4">
            <h4 className="text-sm font-bold text-slate-805 uppercase tracking-wider text-[10px]">Invoice Items</h4>

            <div className="space-y-3 max-h-52 overflow-y-auto no-scrollbar">
              {invoiceItems.map((item, idx) => (
                <div key={idx} className="space-y-2 pb-3 border-b border-slate-50 last:border-0 relative">
                  <div className="grid grid-cols-2 md:grid-cols-12 gap-2 pr-6">
                    <div className="col-span-6">
                      <FieldLabel>Item</FieldLabel>
                      <Input
                        value={item.item}
                        onChange={(e) => updateInvoiceItem(idx, "item", e.target.value)}
                        placeholder="Title of product/service"
                        className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                      />
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="col-span-3">
                      <FieldLabel>Unit Price (₦)</FieldLabel>
                      <Input
                        value={item.unitPrice}
                        onChange={(e) => updateInvoiceItem(idx, "unitPrice", e.target.value)}
                        placeholder="Price"
                        className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                      />
                    </div>
                    <div className="col-span-3">
                      <FieldLabel>Qty</FieldLabel>
                      <Input
                        value={item.quantity}
                        onChange={(e) => updateInvoiceItem(idx, "quantity", e.target.value)}
                        placeholder="Qty"
                        className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                      />
                    </div>


                    </div>

                  
                  </div>
                  {invoiceItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInvoiceItem(idx)}
                      className="absolute right-0 top-7 text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addInvoiceItem}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#1A4331] transition-colors cursor-pointer"
            >
              <Plus size={13} /> Add Item
            </button>
          </div>

          {/* Payment Structure */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h4 className="text-sm font-bold text-slate-805 uppercase tracking-wider text-[10px]">Payment Structure</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="radio"
                  name="paymentStructure"
                  checked={paymentStructure === "full"}
                  onChange={() => setPaymentStructure("full")}
                  className="h-4 w-4 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331]"
                />
                <span className="font-semibold text-slate-700">100% Upfront</span>
                <span className="ml-auto font-bold text-slate-800">{formatCurrency(subtotal)}</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="radio"
                  name="paymentStructure"
                  checked={paymentStructure === "installment"}
                  onChange={() => setPaymentStructure("installment")}
                  className="h-4 w-4 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331]"
                />
                <span className="font-semibold text-slate-700">Installments</span>
              </label>
              {paymentStructure === "installment" && (
                <div className="pl-6 flex items-center gap-2 animate-in fade-in slide-in-from-left-1 duration-150">
                  <Input
                    type="number"
                    value={installmentCount}
                    onChange={(e) => setInstallmentCount(e.target.value)}
                    min={2}
                    className="h-8 w-16 text-sm border-slate-200 rounded-lg shadow-none text-center focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                  />
                  <span className="text-[11px] text-slate-500 font-semibold">
                    &times; {formatCurrency(installmentAmount)} each
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* VAT */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <h4 className="text-sm font-bold text-slate-805 uppercase tracking-wider text-[10px]">VAT (Optional)</h4>
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeVat}
                onChange={(e) => setIncludeVat(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331]"
              />
              <span className="font-semibold text-slate-700">Include 7.5% VAT</span>
              {includeVat && (
                <span className="ml-auto font-bold text-slate-500 text-[11px]">
                  + {formatCurrency(vatAmount)}
                </span>
              )}
            </label>
          </div>

          {/* Total */}
          <div className="border-t border-slate-250 pt-4 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">Total Invoice</span>
            <span className="text-base font-extrabold text-slate-900">{formatCurrency(totalInvoice)}</span>
          </div>

          {/* Submit — different CTAs per breakpoint */}
          <div className="pt-2 flex gap-3">
            {/* Mobile: "Preview Invoice" advances to step 2 */}
            <Button
              onClick={() => setMobileStep("preview")}
              className="flex-1 md:hidden bg-[#1A4331] hover:bg-[#133224] text-white h-11 text-sm font-bold rounded-lg cursor-pointer border border-[#1A4331] flex items-center justify-center gap-2"
            >
              <Eye size={14} /> Preview Invoice
            </Button>

            {/* Desktop: direct create */}
            <Button
              onClick={onCreate}
              className="hidden md:flex flex-1 bg-[#1A4331] hover:bg-[#133224] text-white h-11 text-sm font-bold rounded-lg cursor-pointer border border-[#1A4331] items-center justify-center"
            >
              Create Invoice
            </Button>
          </div>
        </div>

        {/* ── RIGHT / PREVIEW PANEL ──
            Mobile: visible only on "preview" step, full width
            Desktop: always visible, fixed half-width
        ── */}
        <div className={cn(
          "w-full md:w-1/2 h-full overflow-y-auto bg-slate-100/60 no-scrollbar flex flex-col",
          mobileStep === "preview" ? "flex" : "hidden",
          "md:flex"
        )}>
          {/* Mobile preview header */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shrink-0">
            <button
              type="button"
              onClick={() => setMobileStep("form")}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#1A4331] transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Form
            </button>
            <Button
              onClick={onCreate}
              className="bg-[#1A4331] hover:bg-[#133224] text-white h-8 px-4 text-sm font-bold rounded-lg cursor-pointer"
            >
              Create Invoice
            </Button>
          </div>

          {/* Scrollable preview content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
            <InvoicePreview />
          </div>
        </div>

      </div>
    </div>
  );
}