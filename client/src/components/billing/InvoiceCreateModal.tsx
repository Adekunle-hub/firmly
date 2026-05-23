"use client";

import React, { useState, useEffect } from "react";
import InvoiceForm from "@/components/add-case/InvoiceForm";
import { Invoice, addInvoice, updateInvoice } from "@/utils/invoiceStorage";

interface InvoiceCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingInvoice: Invoice | null; // Null if creating a new invoice, otherwise the invoice to edit
}

interface InvoiceItem {
  item: string;
  unitPrice: string;
  quantity: string;
}

export default function InvoiceCreateModal({
  isOpen,
  onClose,
  onSuccess,
  editingInvoice,
}: InvoiceCreateModalProps) {
  /* State matching InvoiceFormProps */
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [suitNumber, setSuitNumber] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [billingTrigger, setBillingTrigger] = useState("retainer");
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [contingencyFee, setContingencyFee] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { item: "Legal Consultation & Case Analysis", unitPrice: "350000", quantity: "1" },
  ]);
  const [paymentStructure, setPaymentStructure] = useState<"full" | "installment">("full");
  const [installmentCount, setInstallmentCount] = useState("3");
  const [includeVat, setIncludeVat] = useState(true);

  // Initialize form states when opening
  useEffect(() => {
    if (editingInvoice) {
      setClientName(editingInvoice.clientName || "");
      setClientEmail(editingInvoice.clientEmail || "");
      setSuitNumber(editingInvoice.suitNumber || "");
      setClientPhone(editingInvoice.clientPhone || "");
      setClientAddress(editingInvoice.clientAddress || "");
      setCaseTitle(editingInvoice.caseTitle || "");
      setBillingTrigger(editingInvoice.billingTrigger || "retainer");
      setIssuedDate(editingInvoice.issuedDate || "");
      setDueDate(editingInvoice.dueDate || "");
      setContingencyFee(editingInvoice.contingencyFee || "");
      setItems(
        editingInvoice.items && editingInvoice.items.length > 0
          ? editingInvoice.items.map((i) => ({ ...i }))
          : [{ item: "Legal Consultation & Case Analysis", unitPrice: "350000", quantity: "1" }]
      );
      setPaymentStructure(editingInvoice.paymentStructure || "full");
      setInstallmentCount(editingInvoice.installmentCount || "3");
      setIncludeVat(editingInvoice.includeVat ?? true);
    } else {
      // Create mode - reset to defaults
      setClientName("");
      setClientEmail("");
      setSuitNumber("");
      setClientPhone("");
      setClientAddress("");
      setCaseTitle("johnson-v-techcorp");
      setBillingTrigger("retainer");
      
      // Default dates around current time
      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      setIssuedDate(today);
      setDueDate(thirtyDaysLater);
      
      setContingencyFee("");
      setItems([
        { item: "Legal Consultation & Case Analysis", unitPrice: "350000", quantity: "1" },
        { item: "Drafting of Legal Contracts & Instruments", unitPrice: "850000", quantity: "1" }
      ]);
      setPaymentStructure("full");
      setInstallmentCount("3");
      setIncludeVat(true);
    }
  }, [editingInvoice, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!clientName.trim() || !clientEmail.trim() || !suitNumber.trim() || !clientPhone.trim()) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    // Calculations
    const subtotal = items.reduce((acc, item) => {
      const price = parseFloat(item.unitPrice) || 0;
      const qty = parseFloat(item.quantity) || 0;
      return acc + price * qty;
    }, 0);

    const vatAmount = includeVat ? subtotal * 0.075 : 0;
    const totalAmount = subtotal + vatAmount;

    const invoiceData: Invoice = {
      id: editingInvoice ? editingInvoice.id : `INV-2026-0${Math.floor(100 + Math.random() * 900)}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      clientAddress: clientAddress.trim(),
      caseTitle,
      suitNumber: suitNumber.trim(),
      billingTrigger,
      issuedDate,
      dueDate,
      contingencyFee,
      items,
      paymentStructure,
      installmentCount,
      includeVat,
      status: editingInvoice ? editingInvoice.status : "PENDING",
      subtotal,
      vatAmount,
      totalAmount,
    };

    if (editingInvoice) {
      updateInvoice(invoiceData);
    } else {
      addInvoice(invoiceData);
    }

    onSuccess();
    onClose();
  };

  return (
    <InvoiceForm
      invoiceClientName={clientName}
      setInvoiceClientName={setClientName}
      invoiceClientEmail={clientEmail}
      setInvoiceClientEmail={setClientEmail}
      invoiceSuitNumber={suitNumber}
      setInvoiceSuitNumber={setSuitNumber}
      invoiceClientPhone={clientPhone}
      setInvoiceClientPhone={setClientPhone}
      invoiceClientAddress={clientAddress}
      setInvoiceClientAddress={setClientAddress}
      invoiceCaseTitle={caseTitle}
      setInvoiceCaseTitle={setCaseTitle}
      billingTrigger={billingTrigger}
      setBillingTrigger={setBillingTrigger}
      invoiceIssuedDate={issuedDate}
      setInvoiceIssuedDate={setIssuedDate}
      invoiceDueDate={dueDate}
      setInvoiceDueDate={setDueDate}
      contingencyFee={contingencyFee}
      setContingencyFee={setContingencyFee}
      invoiceItems={items}
      setInvoiceItems={setItems as any}
      paymentStructure={paymentStructure}
      setPaymentStructure={setPaymentStructure}
      installmentCount={installmentCount}
      setInstallmentCount={setInstallmentCount}
      includeVat={includeVat}
      setIncludeVat={setIncludeVat}
      onCreate={handleSubmit}
      onCancel={onClose}
    />
  );
}
