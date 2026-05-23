"use client";

import React, { useRef } from "react";
import { X, Printer, Download, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Invoice } from "@/utils/invoiceStorage";

interface InvoiceDetailsModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onPay?: (id: string) => void;
}

export default function InvoiceDetailsModal({
  invoice,
  isOpen,
  onClose,
  onPay,
}: InvoiceDetailsModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !invoice) return null;

  const formatCurrency = (val: number) =>
    `₦${val.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  const calculateItemTotal = (item: { unitPrice: string; quantity: string }) => {
    const price = parseFloat(item.unitPrice) || 0;
    const qty = parseFloat(item.quantity) || 0;
    return price * qty;
  };

  const handlePrint = () => {
    // Elegant printing of the invoice content area
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;
    
    if (printContent) {
      // Open a temporary printing frame/style or print the element directly
      window.print();
    }
  };

  const installmentAmount =
    invoice.paymentStructure === "installment" && parseInt(invoice.installmentCount) > 0
      ? invoice.totalAmount / parseInt(invoice.installmentCount)
      : invoice.totalAmount;

  const mappedCaseTitle =
    invoice.caseTitle === "johnson-v-techcorp"
      ? "Johnson vs. TechCorp Inc."
      : invoice.caseTitle === "ojo-v-lagos"
      ? "Ojo vs. Lagos State Gov."
      : invoice.caseTitle === "firs-tax"
      ? "Okonkwo vs. FIRS Tax"
      : invoice.caseTitle || "General Legal Counsel";

  let displayBillingType = "";
  if (invoice.billingTrigger === "retainer") {
    displayBillingType = "Retainer";
  } else if (invoice.billingTrigger === "contingency") {
    displayBillingType = `Contingency - ${mappedCaseTitle}`;
  } else if (invoice.billingTrigger === "statutory") {
    displayBillingType = `Statutory - ${mappedCaseTitle}`;
  } else if (invoice.billingTrigger === "mixed") {
    const activeTypes = [];
    if (invoice.mixedSubtypes) {
      if (invoice.mixedSubtypes.includes("retainer")) activeTypes.push("Retainer");
      if (invoice.mixedSubtypes.includes("statutory")) activeTypes.push("Statutory");
      if (invoice.mixedSubtypes.includes("contingency")) activeTypes.push("Contingency");
    }
    displayBillingType = `Mixed - ${activeTypes.length > 0 ? activeTypes.join(" & ") : "Retainer & Statutory"}`;
  } else {
    displayBillingType = invoice.billingTrigger ? invoice.billingTrigger.charAt(0).toUpperCase() + invoice.billingTrigger.slice(1) : "Retainer";
  }

  const statusColors = {
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    OVERDUE: "bg-red-50 text-red-700 border-red-200",
    DRAFT: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200">
      <div className="bg-slate-50 w-[95vw] max-w-2xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-200">
        
        {/* Top Control Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Invoice Inspector
            </span>
            <span className={cn(
              "text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase leading-none",
              statusColors[invoice.status]
            )}>
              {invoice.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="h-8 gap-1.5 rounded-lg border-slate-200 text-xs font-semibold text-slate-600 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none cursor-pointer"
            >
              <Printer size={13} /> Print
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                alert("Simulating PDF download... The file has been formatted successfully.");
              }}
              className="h-8 gap-1.5 rounded-lg border-slate-200 text-xs font-semibold text-slate-650 hover:border-[#1a7a4a] hover:text-[#1a7a4a] shadow-none cursor-pointer"
            >
              <Download size={13} /> Export PDF
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X size={15} />
            </Button>
          </div>
        </div>

        {/* Printable/Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-slate-100/50 print:bg-white print:p-0">
          <div 
            ref={printAreaRef}
            className="bg-white shadow-md rounded-2xl p-6 md:p-8 border border-slate-200/60 text-slate-700 max-w-xl mx-auto min-h-[750px] flex flex-col justify-between print:shadow-none print:border-0 print:rounded-none"
          >
            <div>
              {/* Letterhead Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 bg-[#1A4331] rounded-lg flex items-center justify-center text-white text-lg font-bold">
                    ⚖️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A4331] leading-none">Adebayo & Associates</h4>
                    <span className="text-[8px] text-slate-400 font-semibold block mt-0.5">Legal Practitioners & Consultants</span>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-wider">INVOICE</h3>
                  <span className="text-[9px] font-semibold text-slate-450 block mt-1">Invoice ID: {invoice.id}</span>
                </div>
              </div>

              {/* Contact Information & Dates */}
              <div className="grid grid-cols-2 gap-4 mt-5 border-b border-slate-100 pb-4 text-[9.5px]">
                <div className="space-y-1 font-semibold text-slate-450">
                  <p className="text-slate-600">15 Broad Street, Marina, Lagos</p>
                  <p>Phone: +234 803 456 7890</p>
                  <p>Email: billing@adebayolegal.com</p>
                </div>
                <div className="text-right space-y-1 font-semibold text-slate-450">
                  <p><span className="text-slate-400">Date Issued:</span> {invoice.issuedDate}</p>
                  <p><span className="text-slate-400">Due Date:</span> {invoice.dueDate}</p>
                  <p>
                    <span className="text-slate-400">Status:</span> 
                    <span className={cn(
                      "text-[8px] rounded px-1.5 py-0.5 ml-1 font-bold border",
                      invoice.status === "PAID" && "text-emerald-700 bg-emerald-50 border-emerald-100",
                      invoice.status === "PENDING" && "text-amber-700 bg-amber-50 border-amber-100",
                      invoice.status === "OVERDUE" && "text-red-700 bg-red-50 border-red-100",
                      invoice.status === "DRAFT" && "text-slate-500 bg-slate-50 border-slate-100"
                    )}>
                      {invoice.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Bill To / Matter Cards */}
              <div className="grid grid-cols-2 gap-4 mt-5 text-[9.5px]">
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[7.5px] block">BILL TO:</span>
                  <p className="font-bold text-slate-800">{invoice.clientName}</p>
                  <p className="text-slate-500 font-semibold leading-tight">{invoice.clientAddress || "Client Address details unspecified"}</p>
                  <p className="text-slate-500 font-medium">Email: {invoice.clientEmail}</p>
                  <p className="text-slate-500 font-medium">Phone: {invoice.clientPhone}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[7.5px] block">CASE DETAILS:</span>
                  <p className="font-semibold text-slate-500">
                    <span className="text-slate-400 font-bold block text-[7.5px] uppercase">Case Title</span>
                    {invoice.caseTitle === "johnson-v-techcorp" ? "Johnson vs. TechCorp Inc." : invoice.caseTitle === "ojo-v-lagos" ? "Ojo vs. Lagos State Gov." : invoice.caseTitle === "firs-tax" ? "Okonkwo vs. FIRS Tax" : invoice.caseTitle || "General Legal Counsel"}
                  </p>
                  <p className="font-semibold text-slate-500">
                    <span className="text-slate-400 font-bold block text-[7.5px] uppercase mt-1">Suit No</span> 
                    {invoice.suitNumber || "N/A"}
                  </p>
                  <p className="font-semibold text-slate-500">
                    <span className="text-slate-400 font-bold block text-[7.5px] uppercase mt-1">Billing Trigger</span> 
                    {displayBillingType}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mt-6">
                <table className="w-full text-left text-[9.5px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-center w-12">Qty</th>
                      <th className="py-2 text-right w-20">Unit Rate</th>
                      <th className="py-2 text-right w-24">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items && invoice.items.length > 0 ? (
                      invoice.items.map((item, idx) => {
                        const amount = calculateItemTotal(item);
                        return (
                          <tr key={idx} className="border-b border-slate-100 text-slate-650 font-semibold">
                            <td className="py-2.5 max-w-[200px] truncate">{item.item || "Legal Representation Services"}</td>
                            <td className="py-2.5 text-center">{item.quantity || "1"}</td>
                            <td className="py-2.5 text-right">{formatCurrency(parseFloat(item.unitPrice) || 0)}</td>
                            <td className="py-2.5 text-right text-slate-800 font-bold">{formatCurrency(amount)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="border-b border-slate-100 text-slate-650 font-semibold">
                        <td className="py-2.5">Legal Consultation / General Services</td>
                        <td className="py-2.5 text-center">1</td>
                        <td className="py-2.5 text-right">{formatCurrency(invoice.subtotal)}</td>
                        <td className="py-2.5 text-right text-slate-800 font-bold">{formatCurrency(invoice.subtotal)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Installment Milestones schedule */}
              {invoice.paymentStructure === "installment" && (
                <div className="mt-5 bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[7.5px] block">Payment Milestones Schedule</span>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: Math.max(2, parseInt(invoice.installmentCount) || 2) }).map((_, i) => (
                      <div key={i} className="bg-white border border-slate-150 rounded-lg p-2 text-[8.5px] space-y-1">
                        <span className="font-bold text-slate-400 block">Milestone {i + 1}</span>
                        <p className="font-bold text-slate-800">{formatCurrency(installmentAmount)}</p>
                        <span className={cn(
                          "inline-block text-[7.5px] font-bold px-1 rounded-xs uppercase leading-none mt-0.5 border",
                          i === 0 && invoice.status !== "PAID"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : i === 0 && invoice.status === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        )}>
                          {invoice.status === "PAID" ? "Settled" : i === 0 ? "Pending" : "Upcoming"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calculations & Instructions */}
            <div className="mt-5 space-y-4">
              <div className="border-t border-slate-150 pt-3.5 flex flex-col items-end text-[9.5px] font-bold space-y-1.5 text-slate-500">
                <div className="flex justify-between w-48 font-medium">
                  <span>Subtotal:</span>
                  <span className="text-slate-800 font-semibold">{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.includeVat && (
                  <div className="flex justify-between w-48 font-medium">
                    <span>VAT (7.5%):</span>
                    <span className="text-slate-800 font-semibold">{formatCurrency(invoice.vatAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between w-48 border-t border-slate-100 pt-1.5 text-[10.5px] font-extrabold text-slate-800">
                  <span>TOTAL AMOUNT:</span>
                  <span className="text-slate-900">{formatCurrency(invoice.totalAmount)}</span>
                </div>
                {invoice.paymentStructure === "installment" && invoice.status !== "PAID" && (
                  <div className="flex justify-between w-48 text-[9px] text-[#1A4331] font-bold mt-1 bg-emerald-50/50 p-1.5 rounded border border-emerald-100">
                    <span>First Payment Due:</span>
                    <span>{formatCurrency(installmentAmount)}</span>
                  </div>
                )}
              </div>

              {/* Secure pay button (only show for unpaid invoices) */}
              {(invoice.status === "PENDING" || invoice.status === "OVERDUE") && (
                <div className="border border-slate-150 rounded-xl p-3.5 flex items-center justify-between bg-slate-50/20 text-[9.5px] print:hidden">
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-800 flex items-center gap-1">
                      <ShieldCheck size={11} className="text-emerald-600 animate-pulse" /> Pay Online (Secure Gateway)
                    </span>
                    <p className="text-slate-400 font-semibold">Pay instantly via Paystack or Flutterwave</p>
                  </div>
                  {onPay && (
                    <Button 
                      onClick={() => onPay(invoice.id)}
                      className="bg-[#1A4331] hover:bg-[#133224] text-white h-7.5 px-3 rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5 text-[9px]"
                    >
                      <CreditCard size={11} /> Pay {invoice.paymentStructure === "installment" ? formatCurrency(installmentAmount) : formatCurrency(invoice.totalAmount)}
                    </Button>
                  )}
                </div>
              )}

              {/* Terms and conditions */}
              <div className="text-[7.5px] text-slate-400 space-y-0.5 border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Terms & Conditions</span>
                <p>&bull; Payment is due within 30 days of invoice date. Late payments attract 2% monthly interest.</p>
                <p>&bull; All payment transfers must reference the Invoice ID: {invoice.id}.</p>
                <p>&bull; Services billed are bound strictly by Adebayo & Associates client engagement agreements.</p>
              </div>

              <p className="text-center text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mt-4">Thank you for your business!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
