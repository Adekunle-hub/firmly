"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar,
  Layers,
  FileText
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

interface InvoiceCreateWizardProps {
  editingInvoice: Invoice | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface WizardItem {
  item: string;
  unitPrice: string;
  quantity: string;
  isTaxable: boolean; // Custom per-item VAT selection from design
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
  const [billingTrigger, setBillingTrigger] = useState("retainer"); // billing type

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
    { item: "Legal Consultation & Case Analysis", unitPrice: "350000", quantity: "1", isTaxable: true },
    { item: "Drafting of Legal Contracts & Instruments", unitPrice: "850000", quantity: "1", isTaxable: true }
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
      
      // Load specific billing type states from saved invoice
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

      // Load selected client logic if exists
      const targetClient = allClients.find(c => c.name === editingInvoice.clientName);
      if (targetClient) {
        setSelectedClient(targetClient);
        setClientMatters(targetClient.linkedCases || []);
      }

      // Map items
      if (editingInvoice.items && editingInvoice.items.length > 0) {
        setItems(
          editingInvoice.items.map((i: any) => ({
            item: i.item,
            unitPrice: i.unitPrice,
            quantity: i.quantity,
            isTaxable: i.isTaxable ?? true
          }))
        );
      }

      setPayInInstallments(editingInvoice.paymentStructure === "installment");
      setInstallmentCount(editingInvoice.installmentCount || "3");
      setApplyVat(editingInvoice.includeVat ?? true);
    } else {
      // Default initial states
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
        { item: "Legal Consultation & Case Analysis", unitPrice: "350000", quantity: "1", isTaxable: true },
        { item: "Drafting of Legal Contracts & Instruments", unitPrice: "850000", quantity: "1", isTaxable: true }
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

    setItems(prev => {
      if (prev.length === 0) {
        return [{ item: desc, unitPrice: price, quantity: "1", isTaxable: true }];
      }
      
      const copy = [...prev];
      if (copy[0].item !== desc || copy[0].unitPrice !== price || copy[0].quantity !== "1") {
        copy[0] = {
          ...copy[0],
          item: desc,
          unitPrice: price,
          quantity: "1"
        };
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
    mixedContingency
  ]);

  // Client dropdown change handler
  const handleClientChange = (cName: string) => {
    setClientName(cName);
    const target = clients.find(c => c.name === cName);
    if (target) {
      setSelectedClient(target);
      setClientEmail(target.email);
      setClientPhone(target.phone);
      setClientAddress(target.address);
      setClientMatters(target.linkedCases || []);
      
      // Auto select first case if exists
      if (target.linkedCases && target.linkedCases.length > 0) {
        setCaseTitle(target.linkedCases[0].title);
        setSuitNumber(target.linkedCases[0].caseNumber);
      } else {
        setCaseTitle("");
        setSuitNumber("");
      }
    }
  };

  // Case dropdown change handler
  const handleCaseChange = (cTitle: string) => {
    setCaseTitle(cTitle);
    const targetCase = clientMatters.find(m => m.title === cTitle);
    if (targetCase) {
      setSuitNumber(targetCase.caseNumber);
    }
  };

  // Line items actions
  const addLineItem = () => {
    setItems(prev => [...prev, { item: "", unitPrice: "", quantity: "", isTaxable: true }]);
  };

  const updateLineItem = (index: number, key: keyof WizardItem, value: any) => {
    setItems(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const removeLineItem = (index: number) => {
    setItems(prev => prev.filter((_, idx) => idx !== index));
  };

  // Financial Calculations
  const calculateSubtotal = () => {
    return items.reduce((acc, i) => {
      const price = parseFloat(i.unitPrice) || 0;
      const qty = parseFloat(i.quantity) || 0;
      return acc + (price * qty);
    }, 0);
  };

  const getTaxableServicesSum = () => {
    return items.reduce((acc, i) => {
      if (i.isTaxable) {
        const price = parseFloat(i.unitPrice) || 0;
        const qty = parseFloat(i.quantity) || 0;
        return acc + (price * qty);
      }
      return acc;
    }, 0);
  };

  const getExemptDisbursementsSum = () => {
    return items.reduce((acc, i) => {
      if (!i.isTaxable) {
        const price = parseFloat(i.unitPrice) || 0;
        const qty = parseFloat(i.quantity) || 0;
        return acc + (price * qty);
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

  // Installments calculation
  const getInstallmentMilestones = () => {
    const total = calculateTotal();
    const count = parseInt(installmentCount) || 3;
    const baseAmount = Math.floor(total / count);
    const milestones = [];
    
    for (let i = 0; i < count; i++) {
      // Adjust last installment for precision rounding
      const amount = i === count - 1 ? total - (baseAmount * (count - 1)) : baseAmount;
      milestones.push({
        name: `Installment ${i + 1}`,
        amount,
        status: i === 0 ? "Pending" : "Upcoming"
      });
    }
    return milestones;
  };

  const formatNaira = (val: number) => {
    return `₦${val.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
  };

  // Form final submit & save
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
      billingTrigger, // retainer etc
      issuedDate,
      dueDate,
      items: items.map(i => ({ item: i.item, unitPrice: i.unitPrice, quantity: i.quantity, isTaxable: i.isTaxable } as any)),
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
        ...(mixedContingency ? ["contingency"] : [])
      ],
      retainerAmount,
    };

    if (editingInvoice) {
      updateInvoice(invoiceData);
    } else {
      addInvoice(invoiceData);
    }

    setStep(4); // Trigger success screen
  };

  // Navigations
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
      if (items.length === 0 || items.some(i => !i.item.trim() || !i.unitPrice || !i.quantity)) {
        alert("Please enter details for all line items.");
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onClose();
    }
  };
  let displayBillingType = "";
  if (billingTrigger === "retainer") {
    displayBillingType = "Retainer";
  } else if (billingTrigger === "contingency") {
    displayBillingType = `Contingency - ${caseTitle || "Wrongful Termination"}`;
  } else if (billingTrigger === "statutory") {
    displayBillingType = `Statutory - ${caseTitle || "Probate"}`;
  } else if (billingTrigger === "mixed") {
    const activeTypes = [];
    if (mixedRetainer) activeTypes.push("Retainer");
    if (mixedStatutory) activeTypes.push("Statutory");
    if (mixedContingency) activeTypes.push("Contingency");
    displayBillingType = `Mixed - ${activeTypes.join(" & ")}`;
  }

  return (
    <div className="flex flex-col gap-6 w-full min-h-screen bg-[#F8FAF9] p-2 md:p-6 rounded-2xl border border-slate-200/60 animate-in fade-in duration-200">
      
     
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
              Create New Invoice
            </h1>
            <p className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase">
              Step {step} of 4
            </p>
          </div>
        </div>

        {/* User avatar on right of dashboard sub-header */}
       
      </div>

      {/* Stepper Progress bar */}
      {step < 4 && (
        <div className="max-w-4xl  mx-auto w-full py-2 md:py-4 border-b border-slate-100/50 mb-2 md:mb-4">
          <div className="flex items-center justify-between relative w-full">
            {/* Connection background line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            
            {/* Green progress active bar line */}
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#1A4331] -translate-y-1/2 z-0 transition-all duration-300" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: "Create Draft" },
              { num: 2, label: "Billing & Rates" },
              { num: 3, label: "Review & Approve" },
              { num: 4, label: "Send to Client" }
            ].map((s) => {
              const isCompleted = step > s.num;
              const isActive = step === s.num;

              return (
                <div key={s.num} className="flex flex-col items-center gap-2 relative z-10">
                  <div 
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border duration-350",
                      isCompleted 
                        ? "bg-[#1A4331] border-[#1A4331] text-white shadow-sm" 
                        : isActive
                        ? "bg-white border-[#1A4331] text-[#1A4331] ring-2 ring-[#1A4331]/10 font-extrabold shadow-xsScale"
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

      {/* Main Wizard Form Steps Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full">
        
        {/* STEP 1: CREATE INVOICE DRAFT */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-6 md:p-8 space-y-2 md:space-y-6 shadow-sm">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Create Invoice Draft</h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                Link the invoice to a client and matter, then select the billing type.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              {/* Invoice Number */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Invoice Number
                </label>
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="e.g. INV-2025-0143"
                  className="h-10 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a] bg-slate-50 font-semibold font-mono"
                />
              </div>

              {/* Invoice Date */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Invoice Date
                </label>
                <Input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="h-10 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>

              {/* Client Selection */}
              <div>
                <label className="text-[10px] font-bold text-[#1A4331] uppercase tracking-wider block mb-1.5 font-extrabold">
                  Select Client *
                </label>
                <Select value={clientName} onValueChange={handleClientChange}>
                  <SelectTrigger className="h-10 text-xs border-slate-200 rounded-lg focus:ring-1 focus:ring-[#1a7a4a] bg-white">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-56">
                    {clients.map(c => (
                      <SelectItem key={c.id} value={c.name} className="text-xs font-semibold">
                        {c.name} ({c.clientId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Case/Matter Selection */}
              <div>
                <label className="text-[10px] font-bold text-[#1A4331] uppercase tracking-wider block mb-1.5 font-extrabold">
                  Select Matter/Case *
                </label>
                <Select value={caseTitle} onValueChange={handleCaseChange} disabled={!clientName}>
                  <SelectTrigger className="h-10 text-xs border-slate-200 rounded-lg focus:ring-1 focus:ring-[#1a7a4a] bg-white disabled:opacity-50">
                    <SelectValue placeholder={clientName ? "Select case/matter" : "Choose a client first"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {clientMatters.length > 0 ? (
                      clientMatters.map(m => (
                        <SelectItem key={m.id} value={m.title} className="text-xs font-semibold">
                          {m.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled className="text-xs">No linked cases found</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Suit Number */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Suit Number
                </label>
                <Input
                  value={suitNumber}
                  onChange={(e) => setSuitNumber(e.target.value)}
                  placeholder="e.g. FHC/L/CS/4521/2025"
                  className="h-10 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a] bg-white font-mono"
                />
              </div>

              {/* Empty column helper or spacing */}
              <div className="hidden md:block" />

              {/* Issued Date */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Issue Date
                </label>
                <Input
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  className="h-10 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-10 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>
            </div>

            {/* Billing Type selection */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Billing Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "retainer", label: "Retainer" },
                  { value: "contingency", label: "Contingency" },
                  { value: "statutory", label: "Statutory" },
                  { value: "mixed", label: "Mixed" }
                ].map((type) => {
                  const isSelected = billingTrigger === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setBillingTrigger(type.value)}
                      className={cn(
                        "py-3.5 px-4 rounded-xl border text-xs font-bold transition-all text-center select-none cursor-pointer",
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
                <label className="text-[10px] font-bold text-[#1A4331] uppercase tracking-wider block font-extrabold">
                  Select Mixed Sub-Types *
                </label>
                <div className="flex flex-wrap gap-6 pt-1">
                  <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={mixedRetainer}
                      onChange={(e) => setMixedRetainer(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] cursor-pointer"
                    />
                    Retainer
                  </label>
                  <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={mixedStatutory}
                      onChange={(e) => setMixedStatutory(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] cursor-pointer"
                    />
                    Statutory
                  </label>
                  <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={mixedContingency}
                      onChange={(e) => setMixedContingency(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] cursor-pointer"
                    />
                    Contingency
                  </label>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold italic leading-snug">
                  Select all the billing components that make up this mixed invoice.
                </p>
              </div>
            )}

            {/* Step 1 Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={onClose}
                className="h-10 px-6 text-xs font-semibold rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer shadow-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNextStep}
                className="h-10 px-6 text-xs font-semibold rounded-lg bg-[#1A4331] hover:bg-[#133224] text-white cursor-pointer shadow-sm"
              >
                Continue to Next Step
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: SET BILLING TYPE & RATES */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6 items-start">
            
            {/* Left panels: Inputs & line items */}
            <div className="lg:col-span-2  space-y-2 md:space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 md:p-6 space-y-6 shadow-sm">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Set Billing Type & Rates</h2>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    Configure fee arrangement based on retainer billing type.
                  </p>
                </div>

                {/* Dynamic Rates Inputs based on Billing Type */}
                {billingTrigger === "retainer" && (
                  <div className="animate-in fade-in duration-200">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Retainer Amount (₦)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        ₦
                      </span>
                      <Input
                        type="number"
                        value={retainerAmount}
                        onChange={(e) => setRetainerAmount(e.target.value)}
                        placeholder="e.g. 1500000"
                        className="h-10 pl-8 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                      />
                    </div>
                  </div>
                )}

                {billingTrigger === "contingency" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                          Contingency Percentage (%)
                        </label>
                        <Input
                          type="number"
                          value={contingencyPercentage}
                          onChange={(e) => setContingencyPercentage(e.target.value)}
                          placeholder="e.g. 30"
                          className="h-10 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                        />
                        <p className="text-[10.5px] text-amber-600 font-semibold mt-1">
                          Maximum 45% per RPC 2023 guidelines
                        </p>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                          Expected Recovery Amount (₦)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            ₦
                          </span>
                          <Input
                            type="number"
                            value={expectedRecovery}
                            onChange={(e) => setExpectedRecovery(e.target.value)}
                            placeholder="e.g. 10000000"
                            className="h-10 pl-8 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                          />
                        </div>
                      </div>
                    </div>
                    {parseFloat(contingencyPercentage) > 45 && (
                      <div className="text-[10px] text-red-655 font-bold bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200">
                        ⚠️ Warning: Contingency percentage exceeds the professional regulation RPC 2023 limit of 45%.
                      </div>
                    )}
                  </div>
                )}

                {billingTrigger === "statutory" && (
                  <div className="animate-in fade-in duration-200">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Total Statutory Fee (₦)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        ₦
                      </span>
                      <Input
                        type="number"
                        value={statutoryFee}
                        onChange={(e) => setStatutoryFee(e.target.value)}
                        placeholder="e.g. 1500000"
                        className="h-10 pl-8 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                      />
                    </div>
                  </div>
                )}

                {billingTrigger === "mixed" && (
                  <div className="animate-in fade-in duration-200">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Total Billing Fee (₦)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        ₦
                      </span>
                      <Input
                        type="number"
                        value={mixedBillingFee}
                        onChange={(e) => setMixedBillingFee(e.target.value)}
                        placeholder="e.g. 2500000"
                        className="h-10 pl-8 text-xs border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                      />
                    </div>
                  </div>
                )}

                {/* Line items section */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Invoice Line Items
                    </h3>
                    <button
                      type="button"
                      onClick={addLineItem}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#1A4331] hover:text-[#133224] transition-colors cursor-pointer bg-[#F0FDF4] px-2.5 py-1 rounded-lg border border-[#1A4331]/20"
                    >
                      <Plus size={12} /> Add Item
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar pr-1">
                    {items.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl space-y-3 relative group transition-all hover:bg-slate-50"
                      >
                        <div className="grid grid-cols-12 gap-3 pr-8">
                          
                          {/* Item Name */}
                          <div className="col-span-12 sm:col-span-6">
                            <label className="text-[9px] font-bold text-slate-450 uppercase block mb-1">
                              Item Description
                            </label>
                            <Input
                              value={item.item}
                              onChange={(e) => updateLineItem(idx, "item", e.target.value)}
                              placeholder="Title of product/service"
                              className="h-9 text-xs border-slate-200 bg-white rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                            />
                          </div>

                          {/* Unit Price */}
                          <div className="col-span-6 sm:col-span-3">
                            <label className="text-[9px] font-bold text-slate-450 uppercase block mb-1">
                              Unit Price (₦)
                            </label>
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateLineItem(idx, "unitPrice", e.target.value)}
                              placeholder="Price"
                              className="h-9 text-xs border-slate-200 bg-white rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                            />
                          </div>

                          {/* Quantity */}
                          <div className="col-span-3 sm:col-span-2">
                            <label className="text-[9px] font-bold text-slate-450 uppercase block mb-1">
                              Qty
                            </label>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(idx, "quantity", e.target.value)}
                              placeholder="Qty"
                              className="h-9 text-xs border-slate-200 bg-white rounded-lg focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-center"
                            />
                          </div>

                          {/* Dynamic Tax Badge (Vat / Exempt) */}
                          <div className="col-span-3 sm:col-span-1 flex flex-col items-center justify-end">
                            <label className="text-[9px] font-bold text-slate-450 uppercase block mb-1 text-center">
                              Tax
                            </label>
                            <button
                              type="button"
                              onClick={() => updateLineItem(idx, "isTaxable", !item.isTaxable)}
                              className={cn(
                                "w-full h-9 rounded-lg border text-[9.5px] font-extrabold flex items-center justify-center uppercase transition-all select-none cursor-pointer",
                                item.isTaxable
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/50"
                                  : "bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200/50"
                              )}
                              title={item.isTaxable ? "Item is VAT taxable (7.5%)" : "Item is VAT exempt / disbursement"}
                            >
                              {item.isTaxable ? "VAT" : "NO"}
                            </button>
                          </div>

                        </div>

                        {/* Delete row action */}
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLineItem(idx)}
                            className="absolute right-3.5 top-3.5 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Installments toggling */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Pay in Installments</h4>
                      <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5">
                        Divide invoice payment amount across multiple scheduled milestones.
                      </p>
                    </div>
                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => setPayInInstallments(!payInInstallments)}
                      className={cn(
                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-hidden",
                        payInInstallments ? "bg-[#1A4331]" : "bg-slate-200"
                      )}
                    >
                      <span
                        className={cn(
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-250 ease-in-out",
                          payInInstallments ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>

                  {payInInstallments && (
                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl flex flex-col md:flex-row items-center gap-4 animate-in slide-in-from-top-1.5 duration-200">
                      <div className="w-full md:w-1/3">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Number of Installments
                        </label>
                        <Select value={installmentCount} onValueChange={setInstallmentCount}>
                          <SelectTrigger className="h-9 text-xs border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-[#1a7a4a]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {["2", "3", "4", "5", "6"].map((num) => (
                              <SelectItem key={num} value={num} className="text-xs font-semibold">
                                {num} Installments
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Right milestones listing */}
                      <div className="flex-1 w-full space-y-1.5">
                        <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">
                          Milestones Preview
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {getInstallmentMilestones().map((m, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-[10px] font-semibold flex items-center gap-2">
                              <span className="text-slate-400">{idx + 1}st:</span>
                              <span className="text-slate-800 font-bold">{formatNaira(m.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Gateway checkboxes */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Payment Gateway
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === "paystack"}
                        onChange={() => setPaymentGateway("paystack")}
                        className="h-4 w-4 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] cursor-pointer"
                      />
                      Paystack
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === "flutterwave"}
                        onChange={() => setPaymentGateway("flutterwave")}
                        className="h-4 w-4 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] cursor-pointer"
                      />
                      Flutterwave
                    </label>
                  </div>
                </div>

                {/* VAT switch and details */}
                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <label className="flex items-start gap-2.5 text-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={applyVat}
                      onChange={(e) => setApplyVat(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] mt-0.5 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 block">Apply VAT (7.5%)</span>
                      <span className="text-[10px] text-slate-400 font-semibold block leading-tight">
                        VAT will be calculated and added to the total fee. Only exempt if you have a valid tax exemption certificate.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right panel: Summary card */}
            <div className="lg:col-span-1 space-y-6 sticky top-6">
              <div className="bg-[#1A4331] text-white rounded-2xl border border-emerald-950 p-6 space-y-5 shadow-lg relative overflow-hidden">
                {/* Decorative scale glow background */}
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />

                <h3 className="text-xs font-bold tracking-wider uppercase border-b border-white/10 pb-3 text-emerald-100">
                  Payment Summary
                </h3>

                <div className="space-y-3.5 text-xs">
                  {/* Taxable services */}
                  <div className="flex justify-between items-center text-emerald-150 font-medium">
                    <span>Taxable Services:</span>
                    <span className="font-bold text-white">{formatNaira(getTaxableServicesSum())}</span>
                  </div>

                  {/* Exempt services */}
                  <div className="flex justify-between items-center text-emerald-150 font-medium">
                    <span>Exempt/Disbursements:</span>
                    <span className="font-bold text-white">{formatNaira(getExemptDisbursementsSum())}</span>
                  </div>

                  {/* VAT */}
                  <div className="flex justify-between items-center text-emerald-150 font-medium">
                    <span>VAT (7.5%):</span>
                    <span className="font-bold text-white">{formatNaira(calculateVat())}</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-3.5 flex justify-between items-end">
                    <span className="text-sm font-bold text-emerald-100 uppercase tracking-wide">Total Amount Due</span>
                    <span className="text-lg font-extrabold text-white leading-none font-mono">
                      {formatNaira(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleNextStep}
                  className="w-full h-11 bg-[#1A4331] hover:bg-[#133224] text-white text-xs font-bold rounded-xl cursor-pointer shadow-md"
                >
                  Continue to Next Step
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="w-full h-11 bg-white border-slate-200 text-slate-500 text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer shadow-none"
                >
                  Back to Step 1
                </Button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: REVIEW & APPROVE (INVOICE PREVIEW) */}
        {step === 3 && (
          <div className=" space-y-2 md:space-y-6">
            
            {/* Header breadcrumb & summary actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-2 md:p-5 rounded-2xl shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Invoices</span>
                  <span>/</span>
                  <span className="text-[#1A4331]">Invoice Preview</span>
                </div>
                <h2 className="text-base font-extrabold text-slate-900">Invoice Preview</h2>
                <p className="text-[11px] text-slate-500 font-semibold">
                  Review the invoice details before sending to the client. All amounts are in Nigerian Naira (NGN).
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Downloading PDF summary invoice...")}
                  className="h-9 text-xs font-semibold border-slate-200 text-slate-650 rounded-lg hover:border-[#1A4331] hover:text-[#1A4331] shadow-none flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} /> Download PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Launching browser billing print preview...")}
                  className="h-9 text-xs font-semibold border-slate-200 text-slate-650 rounded-lg hover:border-[#1A4331] hover:text-[#1A4331] shadow-none flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye size={13} /> Preview
                </Button>
              </div>
            </div>

            {/* Paper Sheet Preview container */}
            <div className="bg-white border border-slate-250/80 rounded-2xl shadow-xl p-4 sm:p-6  md:p-12 max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 text-slate-700 min-h-225 flex flex-col justify-between relative overflow-hidden">
              
              {/* Paper line decorative element */}
              <div className="absolute left-0 top-0 right-0 h-1.5 bg-[#1A4331]" />

              {/* Top invoice header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {/* Styled scale logo */}
                  <div className="h-10 w-10 bg-[#1A4331] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md shadow-emerald-800/10">
                    ⚖️
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#1A4331] leading-none tracking-tight">Firmly</h4>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Legal Practice Management</span>
                  </div>
                </div>
                
                <div className="sm:text-right space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-wider">INVOICE</h3>
                  <span className="text-[11px] font-bold text-slate-500 block font-mono">Invoice #: {invoiceNumber}</span>
                  <span className="text-[10px] font-semibold text-slate-400 block">Date Issued: {issuedDate}</span>
                </div>
              </div>

              {/* Grid: Billed From / Billed To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] leading-relaxed pt-2">
                <div className="space-y-1.5">
                  <span className="font-extrabold text-slate-450 uppercase tracking-wider text-[8.5px] block mb-1">BILLED FROM:</span>
                  <p className="font-extrabold text-slate-800 text-[12px]">Firmly Legal Practice</p>
                  <p className="text-slate-500 font-medium">15 Broad Street, Marina</p>
                  <p className="text-slate-500 font-medium">Lagos State, Nigeria</p>
                  <p className="text-slate-500 font-medium">Email: billing@firmly.law</p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-extrabold text-slate-450 uppercase tracking-wider text-[8.5px] block mb-1">BILLED TO:</span>
                  <p className="font-extrabold text-slate-800 text-[12px]">{clientName || "Emeka Okonkwo"}</p>
                  <p className="text-slate-500 font-medium">{clientAddress || "Plot 245, Victoria Island, Lagos"}</p>
                  <p className="text-slate-500 font-medium">Phone: {clientPhone || "+234 803 456 7890"}</p>
                  <p className="text-slate-500 font-medium">Email: {clientEmail || "emeka@okonkwo.com"}</p>
                </div>
              </div>

              {/* Client Information green block layout */}
              <div className="bg-[#F4FAF6] border border-[#1A4331]/10 rounded-2xl p-3 md:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[11px] leading-tight">
                <div>
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Client Name</span>
                  <p className="font-bold text-slate-800 truncate">{clientName}</p>
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Client Email</span>
                  <p className="font-bold text-slate-800 truncate">{clientEmail}</p>
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Client Phone</span>
                  <p className="font-bold text-slate-800">{clientPhone}</p>
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Suit/Matter No</span>
                  <p className="font-bold text-slate-800 font-mono truncate">{suitNumber}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Client Address</span>
                  <p className="font-semibold text-slate-600 truncate">{clientAddress}</p>
                </div>
                <div>
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Invoice Type</span>
                  <p className="font-bold text-[#1A4331] uppercase tracking-wider text-[10px]">{displayBillingType}</p>
                </div>
              </div>

              {/* Invoice Items table */}
              <div className="pt-2">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 block">
                  Invoice Line Items
                </h4>
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-450 font-bold uppercase tracking-wider bg-slate-50/50">
                        <th className="py-2.5 px-4">Item/Service</th>
                        <th className="py-2.5 text-center w-12">Qty</th>
                        <th className="py-2.5 text-right w-24">Unit Price</th>
                        <th className="py-2.5 text-right w-24">Total (NGN)</th>
                        <th className="py-2.5 text-center w-12">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => {
                        const rowTotal = (parseFloat(item.unitPrice) || 0) * (parseFloat(item.quantity) || 0);
                        return (
                          <tr key={idx} className="border-b border-slate-100 text-slate-650 font-semibold transition-colors hover:bg-slate-50/50">
                            <td className="py-3 px-4 max-w-[240px] truncate">
                              <p className="text-slate-800 font-bold">{item.item || "Legal representation / Services"}</p>
                              <span className="text-[8.5px] text-slate-400 font-bold">
                                {item.isTaxable ? "VAT Taxable (7.5%)" : "VAT Exempt / Disbursement"}
                              </span>
                            </td>
                            <td className="py-3 text-center">{item.quantity || "1"}</td>
                            <td className="py-3 text-right">{formatNaira(parseFloat(item.unitPrice) || 0)}</td>
                            <td className="py-3 text-right text-slate-900 font-bold">{formatNaira(rowTotal)}</td>
                            <td className="py-3 text-center">
                              {items.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeLineItem(idx)}
                                  className="text-slate-400 hover:text-red-500 rounded-full p-1 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete Item"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Milestones (Installment Plan preview) */}
              {payInInstallments && (
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2.5">
                  <span className="font-extrabold text-slate-450 uppercase tracking-wider text-[8.5px] block">
                    Payment Milestones - Installment Plan
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {getInstallmentMilestones().map((m, idx) => (
                      <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-2.5 text-[9.5px] space-y-1 shadow-xs">
                        <span className="font-bold text-slate-400 block">{m.name}</span>
                        <p className="font-extrabold text-slate-800">{formatNaira(m.amount)}</p>
                        <span className={cn(
                          "inline-block text-[8px] font-bold px-1.5 py-0.5 rounded uppercase leading-none mt-1 border",
                          m.status === "Pending" 
                            ? "bg-amber-50 text-amber-700 border-amber-100" 
                            : "bg-slate-50 text-slate-450 border-slate-200"
                        )}>
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtotal summary calculations */}
              <div className="border-t border-slate-150 pt-4 flex flex-col items-center md:items-end text-[11px] font-bold space-y-1.5 text-slate-500">
                <div className="flex justify-between w-48 font-medium">
                  <span>Subtotal:</span>
                  <span className="text-slate-800 font-semibold">{formatNaira(calculateSubtotal())}</span>
                </div>
                {applyVat && (
                  <div className="flex justify-between w-48 font-medium">
                    <span>VAT (7.5%):</span>
                    <span className="text-slate-800 font-semibold">{formatNaira(calculateVat())}</span>
                  </div>
                )}
                <div className="flex justify-between w-48 border-t border-slate-200 pt-2 text-[12px] font-extrabold text-slate-900">
                  <span>TOTAL AMOUNT DUE:</span>
                  <span className="text-slate-950 font-mono font-black">{formatNaira(calculateTotal())}</span>
                </div>
                {payInInstallments && (
                  <div className="flex justify-between w-48 text-[10px] text-[#1A4331] font-bold mt-1 bg-emerald-50/50 p-1.5 rounded border border-emerald-100">
                    <span>First Installment Due:</span>
                    <span>{formatNaira(getInstallmentMilestones()[0]?.amount || 0)}</span>
                  </div>
                )}
              </div>

              {/* Online payment secure instructions card */}
              <div className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/30 gap-4 text-[10.5px]">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-slate-850 flex items-center gap-1.5 text-slate-800">
                    <ShieldCheck size={14} className="text-emerald-600" /> Pay Online (Secure)
                  </span>
                  <p className="text-slate-400 font-semibold">
                    Pay securely using Paystack. Click the payment link below or scan the QR code.
                  </p>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-[#1a7a4a] hover:underline font-bold font-mono text-[9px] block pt-0.5"
                  >
                    https://pay.paystack.com/invoice-{invoiceNumber.toLowerCase()}
                  </a>
                </div>
                <Button 
                  className="bg-[#1A4331] hover:bg-[#133224] text-white h-8.5 px-4 rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0 text-[10px]"
                  onClick={() => alert("Initializing payment processor simulation...")}
                >
                  <CreditCard size={12} /> Pay {payInInstallments ? formatNaira(getInstallmentMilestones()[0]?.amount || 0) : formatNaira(calculateTotal())}
                </Button>
              </div>

              {/* Terms and Conditions block */}
              <div className="text-[8.5px] text-slate-400 space-y-1 border-t border-slate-100 pt-3.5">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Terms & Conditions</span>
                <p>&bull; Payment is due within 30 days of invoice date. Late payments will attract 2% interest per month.</p>
                <p>&bull; All payments must reference the invoice number: {invoiceNumber}.</p>
                <p>&bull; Fees are exclusive of court-awarded costs, which will be billed separately if applicable.</p>
              </div>

              <p className="text-center text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mt-6 block">
                Thank you for your business!
              </p>
            </div>

            {/* Step 3 Wizard Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 max-w-4xl mx-auto w-full">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="h-10 px-6 text-xs font-semibold rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer shadow-none"
              >
                Back to Step 2
              </Button>
              <Button
                onClick={handleSaveInvoice}
                className="h-10 px-6 text-xs font-semibold rounded-lg bg-[#1A4331] hover:bg-[#133224] text-white cursor-pointer shadow-sm"
              >
                Approve & Save Invoice
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION SCREEN */}
        {step === 4 && (
          <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
            {/* Animated check circle */}
            <div className="w-16 h-16 bg-[#F0FDF4] border border-[#1A4331]/10 rounded-full flex items-center justify-center mx-auto text-[#1A4331] shadow-inner">
              <CheckCircle2 size={36} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900">Invoice Sent Successfully!</h2>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                The invoice has been finalized, saved to administrative records, and transmitted successfully to the client.
              </p>
            </div>

            {/* Transaction summary card */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Invoice ID:</span>
                <span className="text-slate-800 font-bold font-mono">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Client:</span>
                <span className="text-slate-800 font-bold">{clientName}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Billing Type:</span>
                <span className="text-[#1A4331] font-bold uppercase tracking-wider text-[10px]">{displayBillingType}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Amount:</span>
                <span className="text-slate-800 font-extrabold text-[#1A4331]">{formatNaira(calculateTotal())}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Issue Date:</span>
                <span className="text-slate-800 font-bold">{issuedDate}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Due Date:</span>
                <span className="text-slate-800 font-bold">{dueDate}</span>
              </div>
            </div>

            <Button
              onClick={onSuccess}
              className="w-full h-11 bg-[#1A4331] hover:bg-[#133224] text-white text-xs font-bold rounded-xl cursor-pointer shadow-md"
            >
              Go Back to Billing Dashboard
            </Button>
          </div>
        )}

      </div>

    </div>
  );
}
