export interface InvoiceItem {
  item: string;
  unitPrice: string;
  quantity: string;
}

export interface Invoice {
  id: string; // e.g. "INV-2026-0101"
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  caseTitle: string; // key matching dropdown or plain text
  suitNumber: string;
  billingTrigger: string; // "retainer" | "milestone" | "completion" | etc.
  issuedDate: string;
  dueDate: string;
  contingencyFee?: string;
  items: InvoiceItem[];
  paymentStructure: "full" | "installment";
  installmentCount: string;
  includeVat: boolean;
  status: "PAID" | "PENDING" | "OVERDUE" | "DRAFT";
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  contingencyPercentage?: string;
  expectedRecovery?: string;
  statutoryFee?: string;
  mixedBillingFee?: string;
  mixedSubtypes?: string[];
  retainerAmount?: string;
}

const STORAGE_KEY = "firmly_invoices";

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "INV-2026-0101",
    clientName: "Jane Doe",
    clientEmail: "jane.doe@gmail.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "123 Victoria Island, Lagos",
    caseTitle: "johnson-v-techcorp",
    suitNumber: "LD/142/2025",
    billingTrigger: "completion",
    issuedDate: "2026-01-10",
    dueDate: "2026-02-10",
    contingencyFee: "",
    items: [
      { item: "Legal Representation & Case Analysis", unitPrice: "350000", quantity: "1" },
      { item: "Drafting of Originating Processes", unitPrice: "1200000", quantity: "1" }
    ],
    paymentStructure: "full",
    installmentCount: "3",
    includeVat: true,
    status: "PAID",
    subtotal: 1550000,
    vatAmount: 116250,
    totalAmount: 1666250,
  },
  {
    id: "INV-2026-0102",
    clientName: "Ibrahim Yusuf",
    clientEmail: "ibrahim.yusuf@firmmail.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "Plot 15, Admiralty Way, Lekki, Lagos",
    caseTitle: "ojo-v-lagos",
    suitNumber: "LD/285/2025",
    billingTrigger: "retainer",
    issuedDate: "2026-05-02",
    dueDate: "2026-06-02",
    contingencyFee: "",
    items: [
      { item: "Retainer Fee - Land Title Litigation", unitPrice: "3500000", quantity: "1" },
      { item: "Filing and Court Process Processing", unitPrice: "1000000", quantity: "1" }
    ],
    paymentStructure: "installment",
    installmentCount: "3",
    includeVat: false,
    status: "PENDING",
    subtotal: 4500000,
    vatAmount: 0,
    totalAmount: 4500000,
  },
  {
    id: "INV-2026-0103",
    clientName: "Zainab Bello",
    clientEmail: "z.bello@startuplaw.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "A01, Wuse II, Abuja",
    caseTitle: "firs-tax",
    suitNumber: "FHC/ABJ/CS/55/25",
    billingTrigger: "milestone",
    issuedDate: "2026-03-15",
    dueDate: "2026-04-15",
    contingencyFee: "",
    items: [
      { item: "Contract Drafting & Negotiation Support", unitPrice: "2200000", quantity: "1" },
      { item: "Intellectual Property Filing", unitPrice: "1000000", quantity: "1" }
    ],
    paymentStructure: "full",
    installmentCount: "2",
    includeVat: true,
    status: "OVERDUE",
    subtotal: 3200000,
    vatAmount: 240000,
    totalAmount: 3440000,
  },
  {
    id: "INV-2026-0104",
    clientName: "Victor Ade",
    clientEmail: "vade@gmail.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "45 Allen Avenue, Ikeja, Lagos",
    caseTitle: "johnson-v-techcorp",
    suitNumber: "ID/983/HD/2025",
    billingTrigger: "retainer",
    issuedDate: "2026-05-18",
    dueDate: "2026-06-18",
    contingencyFee: "",
    items: [
      { item: "Initial Consultation - Family Mediation", unitPrice: "250000", quantity: "1" },
      { item: "Drafting of Dissolution Agreements", unitPrice: "600000", quantity: "1" }
    ],
    paymentStructure: "full",
    installmentCount: "3",
    includeVat: false,
    status: "DRAFT",
    subtotal: 850000,
    vatAmount: 0,
    totalAmount: 850000,
  },
  {
    id: "INV-2026-0105",
    clientName: "Funke Akindele",
    clientEmail: "funke.a@firmlaw.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "6 Chevron Drive, Lekki, Lagos",
    caseTitle: "ojo-v-lagos",
    suitNumber: "LD/9873/2025",
    billingTrigger: "milestone",
    issuedDate: "2026-02-01",
    dueDate: "2026-03-01",
    contingencyFee: "",
    items: [
      { item: "Representation Fees - Phase 1 Trial", unitPrice: "10000000", quantity: "1" },
      { item: "Expert Witness Prep & Briefing", unitPrice: "2500000", quantity: "1" }
    ],
    paymentStructure: "installment",
    installmentCount: "2",
    includeVat: true,
    status: "PAID",
    subtotal: 12500000,
    vatAmount: 937500,
    totalAmount: 13437500,
  },
  {
    id: "INV-2026-0106",
    clientName: "Chidi Okonkwo",
    clientEmail: "chidi.okonkwo@gmail.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "18 Awolowo Road, Ikoyi, Lagos",
    caseTitle: "firs-tax",
    suitNumber: "FHC/L/CS/2026/01",
    billingTrigger: "retainer",
    issuedDate: "2026-04-28",
    dueDate: "2026-05-28",
    contingencyFee: "",
    items: [
      { item: "Property Litigation Retainer", unitPrice: "5000000", quantity: "1" },
      { item: "Advisory on Zoning Regulations", unitPrice: "1800000", quantity: "1" }
    ],
    paymentStructure: "full",
    installmentCount: "3",
    includeVat: true,
    status: "PENDING",
    subtotal: 6800000,
    vatAmount: 510000,
    totalAmount: 7310000,
  },
  {
    id: "INV-2026-0107",
    clientName: "Babatunde Olatunji",
    clientEmail: "baba.t@gmail.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "17 Ademola Adetokunbo, Victoria Island, Lagos",
    caseTitle: "johnson-v-techcorp",
    suitNumber: "LD/3290/2025",
    billingTrigger: "completion",
    issuedDate: "2026-01-05",
    dueDate: "2026-02-05",
    contingencyFee: "",
    items: [
      { item: "Corporate Restructuring Advice", unitPrice: "2200000", quantity: "1" }
    ],
    paymentStructure: "full",
    installmentCount: "2",
    includeVat: false,
    status: "OVERDUE",
    subtotal: 2200000,
    vatAmount: 0,
    totalAmount: 2200000,
  },
  {
    id: "INV-2026-0108",
    clientName: "Chioma Obi",
    clientEmail: "chioma.obi@firmlaw.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "32 Creek Road, Apapa, Lagos",
    caseTitle: "ojo-v-lagos",
    suitNumber: "FHC/L/CS/778/25",
    billingTrigger: "milestone",
    issuedDate: "2026-03-10",
    dueDate: "2026-04-10",
    contingencyFee: "",
    items: [
      { item: "Maritime Claim Litigation Representation", unitPrice: "8000000", quantity: "1" },
      { item: "Vessel Detention Appeal Filings", unitPrice: "1500000", quantity: "1" }
    ],
    paymentStructure: "installment",
    installmentCount: "3",
    includeVat: true,
    status: "PAID",
    subtotal: 9500000,
    vatAmount: 712500,
    totalAmount: 10212500,
  },
  {
    id: "INV-2026-0109",
    clientName: "Simisola Ilesanmi",
    clientEmail: "ssimi@gmail.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "24 Bode Thomas, Surulere, Lagos",
    caseTitle: "johnson-v-techcorp",
    suitNumber: "LD/1124/2025",
    billingTrigger: "completion",
    issuedDate: "2026-04-05",
    dueDate: "2026-05-05",
    contingencyFee: "",
    items: [
      { item: "Arbitration Hearing Legal Representation", unitPrice: "1200000", quantity: "1" }
    ],
    paymentStructure: "full",
    installmentCount: "1",
    includeVat: false,
    status: "PAID",
    subtotal: 1200000,
    vatAmount: 0,
    totalAmount: 1200000,
  },
  {
    id: "INV-2026-0110",
    clientName: "Emeka Eze",
    clientEmail: "emeka.eze@gmail.com",
    clientPhone: "+234 803 123 4567",
    clientAddress: "14 Ogunlana Drive, Surulere, Lagos",
    caseTitle: "firs-tax",
    suitNumber: "FHC/L/CS/992/25",
    billingTrigger: "retainer",
    issuedDate: "2026-05-15",
    dueDate: "2026-06-15",
    contingencyFee: "",
    items: [
      { item: "Patent Application & Filing Services", unitPrice: "2500000", quantity: "1" },
      { item: "Drafting of Licensing Agreements", unitPrice: "1000000", quantity: "1" }
    ],
    paymentStructure: "full",
    installmentCount: "3",
    includeVat: true,
    status: "PENDING",
    subtotal: 3500000,
    vatAmount: 262500,
    totalAmount: 3762500,
  }
];

export function getInvoices(): Invoice[] {
  if (typeof window === "undefined") return MOCK_INVOICES;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INVOICES));
    return MOCK_INVOICES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse invoices from storage", e);
    return MOCK_INVOICES;
  }
}

export function saveInvoices(invoices: Invoice[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

export function addInvoice(invoice: Invoice) {
  const invoices = getInvoices();
  // Avoid duplicate ID
  if (invoices.some((i) => i.id === invoice.id)) {
    return;
  }
  invoices.unshift(invoice);
  saveInvoices(invoices);
}

export function updateInvoice(updated: Invoice) {
  const invoices = getInvoices();
  const index = invoices.findIndex((i) => i.id === updated.id);
  if (index !== -1) {
    invoices[index] = updated;
    saveInvoices(invoices);
  }
}

export function deleteInvoice(id: string) {
  const invoices = getInvoices();
  const filtered = invoices.filter((i) => i.id !== id);
  saveInvoices(filtered);
}
