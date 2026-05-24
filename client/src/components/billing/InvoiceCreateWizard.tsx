"use client";

import React, { useState, useEffect } from "react";
import {toast} from "sonner"
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Eye,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getClients } from "@/utils/clientStorage";
import { DetailedClient, CaseDetail } from "@/utils/types";
import { Invoice, addInvoice, updateInvoice } from "@/utils/invoiceStorage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceCreateWizardProps {
  editingInvoice: Invoice | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface WizardItem {
  item: string;
  unitPrice: string;
  quantity: string;
  isTaxable: boolean;
}

export default function InvoiceCreateWizard({
  editingInvoice,
  onClose,
  onSuccess,
}: InvoiceCreateWizardProps) {
  const [step, setStep] = useState(1);

  // Load clients database
  const [clients, setClients] = useState<DetailedClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<DetailedClient | null>(null);
  const [clientMatters, setClientMatters] = useState<CaseDetail[]>([]);

  // Step 1 States: Create Invoice Draft
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [suitNumber, setSuitNumber] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [billingTrigger, setBillingTrigger] = useState("retainer");

  // Step 2 States: Set Billing Type & Rates
  const [retainerAmount, setRetainerAmount] = useState("1500000");
  const [contingencyPercentage, setContingencyPercentage] = useState("30");
  const [expectedRecovery, setExpectedRecovery] = useState("10000000");
  const [statutoryFee, setStatutoryFee] = useState("1500000");
  const [mixedBillingFee, setMixedBillingFee] = useState("2500000");
  const [mixedRetainer, setMixedRetainer] = useState(true);
  const [mixedStatutory, setMixedStatutory] = useState(true);
  const [mixedContingency, setMixedContingency] = useState(false);
  
  const [items, setItems] = useState<WizardItem[]>([
    {
      item: "Legal Consultation & Case Analysis",
      unitPrice: "350000",
      quantity: "1",
      isTaxable: true,
    },
    {
      item: "Drafting of Legal Contracts & Instruments",
      unitPrice: "850000",
      quantity: "1",
      isTaxable: true,
    },
  ]);
  const [payInInstallments, setPayInInstallments] = useState(false);
  const [installmentCount, setInstallmentCount] = useState("3");
  const [paymentGateway, setPaymentGateway] = useState<"paystack" | "flutterwave">("paystack");
  const [applyVat, setApplyVat] = useState(true);

  // Load data & edit details if present
  useEffect(() => {
    const allClients = getClients();
    setClients(allClients);

    if (editingInvoice) {
      setInvoiceNumber(editingInvoice.id);
      setInvoiceDate(editingInvoice.issuedDate || "");
      setClientName(editingInvoice.clientName || "");
      setClientEmail(editingInvoice.clientEmail || "");
      setClientPhone(editingInvoice.clientPhone || "");
      setClientAddress(editingInvoice.clientAddress || "");
      setCaseTitle(editingInvoice.caseTitle || "");
      setSuitNumber(editingInvoice.suitNumber || "");
      setIssuedDate(editingInvoice.issuedDate || "");
      setDueDate(editingInvoice.dueDate || "");
      setBillingTrigger(editingInvoice.billingTrigger || "retainer");

      setRetainerAmount(editingInvoice.retainerAmount || "1500000");
      setContingencyPercentage(editingInvoice.contingencyPercentage || "30");
      setExpectedRecovery(editingInvoice.expectedRecovery || "10000000");
      setStatutoryFee(editingInvoice.statutoryFee || "1500000");
      setMixedBillingFee(editingInvoice.mixedBillingFee || "2500000");
      if (editingInvoice.mixedSubtypes) {
        setMixedRetainer(editingInvoice.mixedSubtypes.includes("retainer"));
        setMixedStatutory(editingInvoice.mixedSubtypes.includes("statutory"));
        setMixedContingency(editingInvoice.mixedSubtypes.includes("contingency"));
      } else {
        setMixedRetainer(true);
        setMixedStatutory(true);
        setMixedContingency(false);
      }

      const targetClient = allClients.find((c) => c.name === editingInvoice.clientName);
      if (targetClient) {
        setSelectedClient(targetClient);
        setClientMatters(targetClient.linkedCases || []);
      }

      if (editingInvoice.items && editingInvoice.items.length > 0) {
        setItems(
          editingInvoice.items.map((i: any) => ({
            item: i.item,
            unitPrice: i.unitPrice?.toString() || "0",
            quantity: i.quantity?.toString() || "1",
            isTaxable: i.isTaxable ?? true,
          }))
        );
      }

      setPayInInstallments(editingInvoice.paymentStructure === "installment");
      setInstallmentCount(editingInvoice.installmentCount || "3");
      setApplyVat(editingInvoice.includeVat ?? true);
    } else {
      const randomId = `INV-2026-0${Math.floor(100 + Math.random() * 900)}`;
      setInvoiceNumber(randomId);

      const today = new Date().toISOString().split("T")[0];
      const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      setInvoiceDate(today);
      setIssuedDate(today);
      setDueDate(thirtyDays);

      setBillingTrigger("retainer");
      setRetainerAmount("1500000");
      setContingencyPercentage("30");
      setExpectedRecovery("10000000");
      setStatutoryFee("1500000");
      setMixedBillingFee("2500000");
      setMixedRetainer(true);
      setMixedStatutory(true);
      setMixedContingency(false);

      setItems([
        {
          item: "Legal Consultation & Case Analysis",
          unitPrice: "350000",
          quantity: "1",
          isTaxable: true,
        },
        {
          item: "Drafting of Legal Contracts & Instruments",
          unitPrice: "850000",
          quantity: "1",
          isTaxable: true,
        },
      ]);
    }
  }, [editingInvoice]);

  // Auto-sync rates configuration with items[0] in real time
  useEffect(() => {
    let desc = "";
    let price = "0";

    if (billingTrigger === "retainer") {
      desc = "Retainer - Upfront Legal Fees";
      price = retainerAmount;
    } else if (billingTrigger === "contingency") {
      const pct = parseFloat(contingencyPercentage) || 0;
      const rec = parseFloat(expectedRecovery) || 0;
      const fee = Math.round(rec * (pct / 100));
      desc = `Contingency Fee (${pct}% of ₦${rec.toLocaleString("en-NG", { minimumFractionDigits: 0 })} expected recovery)`;
      price = fee.toString();
    } else if (billingTrigger === "statutory") {
      desc = "Statutory Professional Fees";
      price = statutoryFee;
    } else if (billingTrigger === "mixed") {
      const activeTypes = [];
      if (mixedRetainer) activeTypes.push("Retainer");
      if (mixedStatutory) activeTypes.push("Statutory");
      if (mixedContingency) activeTypes.push("Contingency");
      const subTypeStr = activeTypes.length > 0 ? activeTypes.join(" & ") : "None";
      desc = `Mixed Fee - ${subTypeStr}`;
      price = mixedBillingFee;
    }

    setItems((prev) => {
      if (prev.length === 0) {
        return [{ item: desc, unitPrice: price, quantity: "1", isTaxable: true }];
      }
      const copy = [...prev];
      if (copy[0].item !== desc || copy[0].unitPrice !== price || copy[0].quantity !== "1") {
        copy[0] = { ...copy[0], item: desc, unitPrice: price, quantity: "1" };
        return copy;
      }
      return prev;
    });
  }, [
    billingTrigger,
    retainerAmount,
    contingencyPercentage,
    expectedRecovery,
    statutoryFee,
    mixedBillingFee,
    mixedRetainer,
    mixedStatutory,
    mixedContingency,
  ]);

  const handleClientChange = (cName: string) => {
    setClientName(cName);
    const target = clients.find((c) => c.name === cName);
    if (target) {
      setSelectedClient(target);
      setClientEmail(target.email);
      setClientPhone(target.phone);
      setClientAddress(target.address);
      setClientMatters(target.linkedCases || []);

      if (target.linkedCases && target.linkedCases.length > 0) {
        setCaseTitle(target.linkedCases[0].title);
        setSuitNumber(target.linkedCases[0].caseNumber);
      } else {
        setCaseTitle("");
        setSuitNumber("");
      }
    }
  };

  const handleCaseChange = (cTitle: string) => {
    setCaseTitle(cTitle);
    const targetCase = clientMatters.find((m) => m.title === cTitle);
    if (targetCase) {
      setSuitNumber(targetCase.caseNumber);
    }
  };

  const addLineItem = () => {
    setItems((prev) => [...prev, { item: "", unitPrice: "", quantity: "", isTaxable: true }]);
  };

  const updateLineItem = (index: number, key: keyof WizardItem, value: any) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const removeLineItem = (index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, i) => {
      const price = parseFloat(i.unitPrice) || 0;
      const qty = parseFloat(i.quantity) || 0;
      return acc + price * qty;
    }, 0);
  };

  const getTaxableServicesSum = () => {
    return items.reduce((acc, i) => {
      if (i.isTaxable) {
        const price = parseFloat(i.unitPrice) || 0;
        const qty = parseFloat(i.quantity) || 0;
        return acc + price * qty;
      }
      return acc;
    }, 0);
  };

  const calculateVat = () => {
    if (!applyVat) return 0;
    return getTaxableServicesSum() * 0.075;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVat();
  };

  const getInstallmentMilestones = () => {
    const total = calculateTotal();
    const count = parseInt(installmentCount) || 3;
    const baseAmount = Math.floor(total / count);
    const milestones = [];

    for (let i = 0; i < count; i++) {
      const amount = i === count - 1 ? total - baseAmount * (count - 1) : baseAmount;
      milestones.push({
        name: `Installment ${i + 1}`,
        amount,
        status: i === 0 ? "Pending" : "Upcoming",
      });
    }
    return milestones;
  };

  const formatNaira = (val: number) => {
    return `₦${val.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
  };

  const handleSaveInvoice = () => {
    const totalAmount = calculateTotal();
    const subtotal = calculateSubtotal();
    const vatAmount = calculateVat();

    const invoiceData: Invoice = {
      id: invoiceNumber,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      caseTitle,
      suitNumber,
      billingTrigger,
      issuedDate,
      dueDate,
      items: items.map((i) => ({
        item: i.item,
        unitPrice: parseFloat(i.unitPrice) || 0,
        quantity: parseFloat(i.quantity) || 1,
        isTaxable: i.isTaxable,
      })) as any,
      paymentStructure: payInInstallments ? "installment" : "full",
      installmentCount: payInInstallments ? installmentCount : "1",
      includeVat: applyVat,
      status: editingInvoice ? editingInvoice.status : "PENDING",
      subtotal,
      vatAmount,
      totalAmount,
      contingencyPercentage,
      expectedRecovery,
      statutoryFee,
      mixedBillingFee,
      mixedSubtypes: [
        ...(mixedRetainer ? ["retainer"] : []),
        ...(mixedStatutory ? ["statutory"] : []),
        ...(mixedContingency ? ["contingency"] : []),
      ],
      retainerAmount,
    };

    if (editingInvoice) {
      updateInvoice(invoiceData);
    } else {
      addInvoice(invoiceData);
    }

    toast.success("Invoice saved Successfully")
    setStep(4);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!clientName.trim() || !caseTitle.trim() || !suitNumber.trim()) {
        alert("Please ensure Client, Case/Matter and Suit Number are selected.");
        return;
      }
      if (billingTrigger === "mixed" && !mixedRetainer && !mixedStatutory && !mixedContingency) {
        alert("Please select at least one sub-type for mixed billing.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (items.length === 0 || items.some((i) => !i.item.trim() || !i.unitPrice || !i.quantity)) {
        alert("Please enter details for all line items.");
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      onClose();
    }
  };

  let displayBillingType = "";
  if (billingTrigger === "retainer") displayBillingType = "Retainer";
  else if (billingTrigger === "contingency") displayBillingType = `Contingency - ${caseTitle}`;
  else if (billingTrigger === "statutory") displayBillingType = `Statutory - ${caseTitle}`;
  else if (billingTrigger === "mixed") {
    const activeTypes = [];
    if (mixedRetainer) activeTypes.push("Retainer");
    if (mixedStatutory) activeTypes.push("Statutory");
    if (mixedContingency) activeTypes.push("Contingency");
    displayBillingType = `Mixed - ${activeTypes.join(" & ")}`;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full min-h-screen bg-[#F8FAF9] p-2 md:p-6 rounded-2xl border border-slate-200/60 animate-in fade-in duration-200">
      {/* Header Block */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 md:pb-4 bg-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevStep}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} className="text-slate-650" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {editingInvoice ? "Edit Invoice" : "Create New Invoice"}
            </h1>
            <p className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase">
              Step {step} of 4
            </p>
          </div>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      {step < 4 && (
        <div className="max-w-4xl mx-auto w-full py-2 md:py-4 border-b border-slate-100/50 mb-2 md:mb-4">
          <div className="flex items-center justify-between relative w-full">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-[#1A4331] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            {[
              { num: 1, label: "Create Draft" },
              { num: 2, label: "Billing & Rates" },
              { num: 3, label: "Review & Approve" },
              { num: 4, label: "Send to Client" },
            ].map((s) => {
              const isCompleted = step > s.num;
              const isActive = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center gap-2 relative z-10">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border duration-350",
                      isCompleted
                        ? "bg-[#1A4331] border-[#1A4331] text-white shadow-sm"
                        : isActive
                          ? "bg-white border-[#1A4331] text-[#1A4331] ring-2 ring-[#1A4331]/10 font-extrabold"
                          : "bg-white border-slate-200 text-slate-400"
                    )}
                  >
                    {isCompleted ? <Check size={14} /> : s.num}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] md:text-[11px] font-bold tracking-wide transition-colors",
                      isActive ? "text-[#1A4331]" : isCompleted ? "text-slate-700" : "text-slate-400"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Wizard Content Layout */}
      <div className="flex-1 max-w-6xl mx-auto w-full">
        
        {/* STEP 1: CREATE INVOICE DRAFT */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-6 md:p-8 space-y-2 md:space-y-6 shadow-sm">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Create Invoice Draft</h2>
              <p className="text-sm text-slate-400 font-semibold mt-1">
                Link the invoice to a client and matter, then select the billing type.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Invoice Number</label>
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="e.g. INV-2025-0143"
                  className="h-10 text-sm border-slate-200 rounded-lg bg-slate-50 font-semibold font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Invoice Date</label>
                <Input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="h-10 text-sm border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#1A4331] uppercase tracking-wider block mb-1.5 ">Select Client *</label>
                <Select value={clientName} onValueChange={handleClientChange}>
                  <SelectTrigger className="h-10 text-sm border-slate-200 rounded-lg bg-white">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-56">
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.name} className="text-sm font-semibold">
                        {c.name} ({c.clientId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#1A4331] uppercase tracking-wider block mb-1.5 ">Select Matter/Case *</label>
                <Select value={caseTitle} onValueChange={handleCaseChange} disabled={!clientName}>
                  <SelectTrigger className="h-10 text-sm border-slate-200 rounded-lg bg-white disabled:opacity-50">
                    <SelectValue placeholder={clientName ? "Select case/matter" : "Choose a client first"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {clientMatters.length > 0 ? (
                      clientMatters.map((m) => (
                        <SelectItem key={m.id} value={m.title} className="text-sm font-semibold">
                          {m.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled className="text-sm">No linked cases found</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Suit Number</label>
                <Input
                  value={suitNumber}
                  onChange={(e) => setSuitNumber(e.target.value)}
                  placeholder="e.g. FHC/L/CS/4521/2025"
                  className="h-10 text-sm border-slate-200 rounded-lg bg-white font-mono"
                />
              </div>

              <div className="hidden md:block" />

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Issue Date</label>
                <Input
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  className="h-10 text-sm border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Due Date</label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-10 text-sm border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Billing Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "retainer", label: "Retainer" },
                  { value: "contingency", label: "Contingency" },
                  { value: "statutory", label: "Statutory" },
                  { value: "mixed", label: "Mixed" },
                ].map((type) => {
                  const isSelected = billingTrigger === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setBillingTrigger(type.value)}
                      className={cn(
                        "py-3.5 px-4 rounded-xl border text-sm font-bold transition-all text-center select-none cursor-pointer",
                        isSelected
                          ? "bg-[#F0FDF4] border-[#1A4331] text-[#1A4331] ring-1 ring-[#1A4331]"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-slate-50/50"
                      )}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {billingTrigger === "mixed" && (
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2.5 animate-in slide-in-from-top-1.5 duration-200">
                <label className="text-[12px] font-bold text-[#1A4331] uppercase tracking-wider block">Select Mixed Sub-Types *</label>
                <div className="flex flex-wrap gap-6 pt-1">
                  <label className="flex items-center gap-2.5 text-sm font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={mixedRetainer}
                      onChange={(e) => setMixedRetainer(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-[#1A4331] accent-[#1A4331] cursor-pointer"
                    />
                    Retainer
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={mixedStatutory}
                      onChange={(e) => setMixedStatutory(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-[#1A4331] accent-[#1A4331] cursor-pointer"
                    />
                    Statutory
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={mixedContingency}
                      onChange={(e) => setMixedContingency(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-[#1A4331] accent-[#1A4331] cursor-pointer"
                    />
                    Contingency
                  </label>
                </div>
                <p className="text-[12px] text-slate-400 font-semibold italic leading-snug">
                  Select all the billing components that make up this mixed invoice.
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={onClose} className="h-10 px-6 text-sm font-semibold rounded-lg border-slate-200 text-slate-500 shadow-none">
                Cancel
              </Button>
              <Button onClick={handleNextStep} className="h-10 px-6 text-sm font-semibold rounded-lg bg-[#1A4331] hover:bg-[#133224] text-white shadow-sm">
                Continue to Next Step
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: SET BILLING TYPE & RATES */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6 items-start">
            <div className="lg:col-span-2 space-y-2 md:space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 md:p-6 space-y-6 shadow-sm">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Set Billing Type & Rates</h2>
                  <p className="text-sm text-slate-400 font-semibold mt-1">
                    Configure fee arrangement options below.
                  </p>
                </div>

                {billingTrigger === "retainer" && (
                  <div className="animate-in fade-in duration-200">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Retainer Amount (₦)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₦</span>
                      <Input
                        type="number"
                        value={retainerAmount}
                        onChange={(e) => setRetainerAmount(e.target.value)}
                        placeholder="e.g. 1500000"
                        className="h-10 pl-8 text-sm border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {billingTrigger === "contingency" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Contingency Percentage (%)</label>
                        <Input
                          type="number"
                          value={contingencyPercentage}
                          onChange={(e) => setContingencyPercentage(e.target.value)}
                          placeholder="e.g. 30"
                          className="h-10 text-sm border-slate-200 rounded-lg"
                        />
                        <p className="text-[10.5px] text-amber-600 font-semibold mt-1">
                          Standard scale runs between 10% to 40% depending on risk analysis.
                        </p>
                      </div>
                      <div>
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Expected Claim Recovery Value (₦)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₦</span>
                          <Input
                            type="number"
                            value={expectedRecovery}
                            onChange={(e) => setExpectedRecovery(e.target.value)}
                            placeholder="e.g. 10000000"
                            className="h-10 pl-8 text-sm border-slate-200 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {billingTrigger === "statutory" && (
                  <div className="animate-in fade-in duration-200">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Statutory Fee Allocation (₦)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₦</span>
                      <Input
                        type="number"
                        value={statutoryFee}
                        onChange={(e) => setStatutoryFee(e.target.value)}
                        placeholder="e.g. 1500000"
                        className="h-10 pl-8 text-sm border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {billingTrigger === "mixed" && (
                  <div className="animate-in fade-in duration-200">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Blended Mixed Invoice Value (₦)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₦</span>
                      <Input
                        type="number"
                        value={mixedBillingFee}
                        onChange={(e) => setMixedBillingFee(e.target.value)}
                        placeholder="e.g. 2500000"
                        className="h-10 pl-8 text-sm border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Line Items Modifier section */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center flex-wrap space-y-2 justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Line Items Allocation Breakdown</h3>
                    <Button type="button" onClick={addLineItem} variant="outline" className="h-8 text-[11px] font-bold text-[#1A4331] border-[#1A4331]/30 hover:bg-[#F0FDF4] rounded-lg">
                      <Plus size={12} className="mr-1" /> Add Disbursement/Fee Line
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {items.map((row, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-slate-50/50 p-2.5 border border-slate-100 rounded-xl relative">
                        <div className="md:col-span-6">
                          <Input
                            value={row.item}
                            disabled={index === 0}
                            onChange={(e) => updateLineItem(index, "item", e.target.value)}
                            placeholder="Description of work or filing fee item"
                            className="h-9 text-sm border-slate-200 bg-white"
                          />
                        </div>
                        <div className="md:col-span-3 relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400">₦</span>
                          <Input
                            type="number"
                            value={row.unitPrice}
                            disabled={index === 0}
                            onChange={(e) => updateLineItem(index, "unitPrice", e.target.value)}
                            placeholder="Price"
                            className="h-9 pl-6 text-sm border-slate-200 bg-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            type="number"
                            value={row.quantity}
                            disabled={index === 0}
                            onChange={(e) => updateLineItem(index, "quantity", e.target.value)}
                            placeholder="Qty"
                            className="h-9 text-sm border-slate-200 bg-white"
                          />
                        </div>
                        <div className="md:col-span-1 flex justify-center">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => removeLineItem(index)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white disabled:opacity-30 cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="md:col-span-12 flex items-center gap-2 mt-1 px-1">
                          <input
                            type="checkbox"
                            id={`vat-${index}`}
                            checked={row.isTaxable}
                            onChange={(e) => updateLineItem(index, "isTaxable", e.target.checked)}
                            className="h-3.5 w-3.5 text-[#1A4331] border-slate-300 rounded"
                          />
                          <label htmlFor={`vat-${index}`} className="text-[11px] font-semibold text-slate-500 cursor-pointer">
                            Apply 7.5% VAT to this item (Professional Fee)
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side summary panel */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Invoice Financial Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between font-semibold text-slate-600">
                    <span>Subtotal Fees:</span>
                    <span>{formatNaira(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={applyVat}
                        onChange={(e) => setApplyVat(e.target.checked)}
                        className="h-3.5 w-3.5 text-[#1A4331] border-slate-300 rounded"
                      />
                      Add 7.5% VAT
                    </span>
                    <span className="font-bold">{formatNaira(calculateVat())}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
                    <span>Grand Total:</span>
                    <span className="text-[#1A4331]">{formatNaira(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Installments Management Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
                <label className="flex items-center gap-2 text-sm font-extrabold text-slate-900 uppercase tracking-wider cursor-pointer">
                  <input
                    type="checkbox"
                    checked={payInInstallments}
                    onChange={(e) => setPayInInstallments(e.target.checked)}
                    className="h-4 w-4 text-[#1A4331] border-slate-300 rounded"
                  />
                  Enable Installment Milestone Plan
                </label>
                
                {payInInstallments && (
                  <div className="space-y-2.5 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                    <label className="text-[12px] font-bold text-slate-500 uppercase block">Number of Installments</label>
                    <Select value={installmentCount} onValueChange={setInstallmentCount}>
                      <SelectTrigger className="h-9 text-sm border-slate-200 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {["2", "3", "4", "6"].map((num) => (
                          <SelectItem key={num} value={num} className="text-sm">{num} Installments</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">Expected Milestones Schedule</p>
                      {getInstallmentMilestones().map((m, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px]">
                          <span className="font-bold text-slate-700">{m.name}</span>
                          <span className="font-mono font-extrabold text-slate-900">{formatNaira(m.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2 Control Footer actions */}
            <div className="lg:col-span-3 flex flex-wrap space-y-2 gap-2 justify-between items-center pt-4 border-t border-slate-200 mt-2">
              <Button variant="outline" onClick={handlePrevStep} className="h-10 px-6 text-sm font-semibold rounded-lg border-slate-200 text-slate-500">
                Back to Draft Details
              </Button>
              <Button onClick={handleNextStep} className="h-10 px-6 text-sm font-semibold rounded-lg bg-[#1A4331] hover:bg-[#133224] text-white">
                Proceed to Review Screen
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & APPROVE INVOICE */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Review & Approve Legal Fee Invoice</h2>
                <p className="text-sm text-slate-400 font-semibold mt-0.5">Please recheck totals, tax status metrics and milestones configurations before saving.</p>
              </div>
              <div className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                Draft Status
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-[12px] font-bold text-slate-400 uppercase block mb-1">Law Firm Reference</span>
                <p className="font-mono font-bold text-slate-900">{invoiceNumber}</p>
                <p className="text-slate-500 mt-1 font-medium">Issue Date: {issuedDate}</p>
                <p className="text-slate-500 font-medium">Due Date: {dueDate}</p>
              </div>
              <div>
                <span className="text-[12px] font-bold text-slate-400 uppercase block mb-1">Debtor / Client Details</span>
                <p className="font-extrabold text-slate-900">{clientName}</p>
                <p className="text-slate-500 mt-0.5 font-medium">{clientEmail}</p>
                <p className="text-slate-500 font-medium">{clientPhone}</p>
              </div>
              <div>
                <span className="text-[12px] font-bold text-slate-400 uppercase block mb-1">Assigned Case / Matter</span>
                <p className="font-extrabold text-slate-800">{caseTitle}</p>
                <p className="font-mono text-slate-500 text-[11px] mt-0.5">{suitNumber}</p>
                <p className="text-slate-500 font-semibold mt-1">Arrangement: <span className="text-[#1A4331]">{displayBillingType}</span></p>
              </div>
            </div>

            {/* Line Items Table Breakdown View */}
            <div className="border border-slate-150 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="text-sm font-bold text-slate-700">Billing Description / Services Schedule</TableHead>
                    <TableHead className="text-sm font-bold text-slate-700 text-center w-24">Taxable</TableHead>
                    <TableHead className="text-sm font-bold text-slate-700 text-center w-24">Quantity</TableHead>
                    <TableHead className="text-sm font-bold text-slate-700 text-right w-36">Unit Price</TableHead>
                    <TableHead className="text-sm font-bold text-slate-700 text-right w-40">Total Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((row, idx) => {
                    const price = parseFloat(row.unitPrice) || 0;
                    const qty = parseFloat(row.quantity) || 0;
                    return (
                      <TableRow key={idx} className="hover:bg-transparent">
                        <TableCell className="font-medium text-slate-800 text-sm py-3">{row.item}</TableCell>
                        <TableCell className="text-center py-3">
                          {row.isTaxable ? (
                            <span className="text-[12px] font-extrabold px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md">7.5% VAT</span>
                          ) : (
                            <span className="text-[12px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">Exempt</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-slate-700 text-sm py-3">{qty}</TableCell>
                        <TableCell className="text-right font-mono font-medium text-slate-700 text-sm py-3">{formatNaira(price)}</TableCell>
                        <TableCell className="text-right font-mono font-extrabold text-slate-900 text-sm py-3">{formatNaira(price * qty)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Final Ledger Row Calculations blocks */}
            <div className="flex flex-col items-start md:items-end gap-2 text-sm border-b border-slate-100 pb-4 pr-0 md:pr-2">
              <div className="w-72 flex justify-between font-semibold text-slate-500">
                <span>Subtotal Fees Base:</span>
                <span className="font-mono font-bold text-slate-800">{formatNaira(calculateSubtotal())}</span>
              </div>
              {applyVat && (
                <div className="w-72 flex justify-between font-semibold text-slate-500">
                  <span>Aggregated 7.5% VAT Levy:</span>
                  <span className="font-mono font-bold text-slate-800">{formatNaira(calculateVat())}</span>
                </div>
              )}
              <div className="w-72 flex justify-between font-extrabold text-sm text-slate-900 pt-1 border-t border-slate-100">
                <span>Total Amount Due:</span>
                <span className="font-mono text-[#1A4331]">{formatNaira(calculateTotal())}</span>
              </div>
            </div>

            {/* Milestone Breakdown preview inside step 3 */}
            {payInInstallments && (
              <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-4 space-y-3">
                <h4 className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#1A4331]" /> Authorized Installment Structure Breakdowns
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {getInstallmentMilestones().map((m, idx) => (
                    <div key={idx} className="bg-white p-3 border border-slate-150 rounded-xl flex flex-col gap-1 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{m.name}</span>
                      <span className="text-sm font-mono font-extrabold text-slate-900">{formatNaira(m.amount)}</span>
                      <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1.5 w-max mt-1">{m.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Final Submission controls */}
            <div className="flex justify-between flex-wrap space-y-2 items-center pt-4 border-t border-slate-200">
              <Button variant="outline" onClick={handlePrevStep} className="h-10 px-8 text-sm font-semibold cursor-pointer rounded-lg border-slate-200 text-slate-500">
                Modify Financial Items
              </Button>
              <Button onClick={handleSaveInvoice} className="h-10 px-8 text-sm font-bold rounded-lg bg-[#1A4331] hover:bg-[#133224] cursor-poinetr text-white shadow-md flex items-center gap-1.5">
                <CheckCircle2 size={15} /> Approve and Save Invoice
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS / SEND DISPATCH SCREEN */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-12 text-center max-w-xl mx-auto space-y-6 shadow-md my-8 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900">Invoice Saved Successfully!</h2>
              <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                Law firm invoice referencing <span className="font-mono font-bold text-slate-900">{invoiceNumber}</span> has been written into records and is ready for dispatching.
              </p>
            </div>

            <div className="border-t border-b border-slate-100 py-4 px-2 space-y-2 text-sm text-left bg-slate-50/50 rounded-xl">
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Billed Client Account:</span> <span className="font-bold text-slate-800">{clientName}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Linked Matter Suite:</span> <span className="font-semibold text-slate-700">{caseTitle}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Gross Statement Total:</span> <span className="font-mono font-extrabold text-[#1A4331]">{formatNaira(calculateTotal())}</span></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="outline" onClick={onSuccess} className="h-10 text-sm font-semibold rounded-lg border-slate-200 text-slate-600">
                Go to Invoices Ledger
              </Button>
              <Button onClick={onSuccess} className="h-10 text-sm font-bold rounded-lg bg-[#1A4331] hover:bg-[#133224] text-white shadow-sm px-6">
                Send Notification Email
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
