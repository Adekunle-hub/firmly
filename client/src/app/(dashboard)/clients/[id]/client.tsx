"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ChevronLeft,
  Mail,
  Pencil,
  Plus,
  FileText,
  MoreVertical,
  Upload,
  X,
  Briefcase,
  Calendar,
  MapPin,
  Building,
  Phone,
  User,
  Check,
  Trash2,
  Download,
  AlertCircle,
  Clock,
  Globe2,
  FilePlus,
  Send,
  Eye,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getClientById, updateClient } from "@/utils/clientStorage";
import {
  DetailedClient,
  CaseDetail,
  DocumentDetail,
  ConflictStatus,
} from "@/utils/types";
import Bounded from "@/components/Bounded";

interface ClientDetailProps {
  id: string;
}

export default function ClientDetailComponent({ id }: ClientDetailProps) {
  const router = useRouter();

  const [client, setClient] = useState<DetailedClient | null>(null);

  useEffect(() => {
    setClient(getClientById(id));
  }, [id]);

  useEffect(() => {
    if (client) {
      updateClient(client);
    }
  }, [client]);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editClientType, setEditClientType] = useState("");
  const [editConflictStatus, setEditConflictStatus] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editState, setEditState] = useState("");
  const [editLga, setEditLga] = useState("");
  const [editNationality, setEditNationality] = useState("");
  const [editWorkplace, setEditWorkplace] = useState("");
  const [editPreferredContact, setEditPreferredContact] = useState("");

  // Add Case Inputs
  const [caseTitle, setCaseTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseType, setCaseType] = useState("");
  const [caseFilingDate, setCaseFilingDate] = useState("");
  const [caseJurisdiction, setCaseJurisdiction] = useState("");
  const [caseStatus, setCaseStatus] = useState("Active");

  // Upload Document Inputs
  const [docName, setDocName] = useState("");
  const [docType, setDocType] = useState("Contract");
  const [docSize, setDocSize] = useState("1.5 MB");

  // Sync edit state values on client change or modal open
  useEffect(() => {
    if (client) {
      setEditName(client.name);
      setEditEmail(client.email);
      setEditPhone(client.phone);
      setEditClientType(client.clientType);
      setEditConflictStatus(client.conflictStatus);
      setEditAddress(client.address);
      setEditState(client.state);
      setEditLga(client.lga);
      setEditNationality(client.nationality);
      setEditWorkplace(client.workplace);
      setEditPreferredContact(client.preferredContact);
    }
  }, [client, isEditModalOpen]);

  if (!client) {
    return (
      <Bounded>
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-2xl p-8 max-w-lg mx-auto shadow-sm">
          <AlertCircle className="w-16 h-16 text-slate-300 mb-4 animate-bounce" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Client Not Found
          </h2>
          <p className="text-slate-500 text-center mb-6 text-sm">
            The client with ID &quot;{id}&quot; does not exist or may have been
            removed.
          </p>
          <Button
            onClick={() => router.push("/clients")}
            className="bg-[#055939] hover:bg-[#155e38] text-white font-semibold"
          >
            Back to Client Management
          </Button>
        </div>
      </Bounded>
    );
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject || !emailMessage) {
      toast.error("Please fill in all email fields");
      return;
    }
    toast.success(`Email sent successfully to ${client.name}`);
    setEmailSubject("");
    setEmailMessage("");
    setIsEmailModalOpen(false);
  };

  // Handle save changes
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || !editEmail || !editPhone) {
      toast.success("Name, Email, and Phone fields are required");
      return;
    }

    setClient((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        name: editName,
        email: editEmail,
        phone: editPhone,
        clientType: editClientType,
        conflictStatus: editConflictStatus,
        address: editAddress,
        state: editState,
        lga: editLga,
        nationality: editNationality,
        workplace: editWorkplace,
        preferredContact: editPreferredContact,
      };
    });

    toast.success("Client information updated successfully!");
    setIsEditModalOpen(false);
  };

  // Handle add case
  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseTitle || !caseNumber || !caseType) {
      toast.error("Case Title, Number, and Type are required");
      return;
    }

    const newCase: CaseDetail = {
      id: "case_" + Date.now(),
      title: caseTitle,
      caseNumber: caseNumber,
      status: caseStatus,
      caseType: caseType,
      filingDate:
        caseFilingDate ||
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      jurisdiction: caseJurisdiction || "State High Court",
    };

    setClient((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        linkedCases: [...prev.linkedCases, newCase],
      };
    });

    toast.success("Case linked successfully!");
    // Clear inputs
    setCaseTitle("");
    setCaseNumber("");
    setCaseType("");
    setCaseFilingDate("");
    setCaseJurisdiction("");
    setCaseStatus("Active");
    setIsCaseModalOpen(false);
  };

  // Handle upload document
  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) {
      toast.error("Document name is required");
      return;
    }

    const newDoc: DocumentDetail = {
      id: "doc_" + Date.now(),
      name: docName.endsWith(".pdf") ? docName : `${docName}.pdf`,
      type: docType,
      dateUploaded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      size: docSize || "1.2 MB",
    };

    setClient((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        documents: [...prev.documents, newDoc],
      };
    });

    toast.success("Document uploaded successfully!");
    setDocName("");
    setDocSize("1.5 MB");
    setIsDocModalOpen(false);
  };

  const handleDeleteDoc = (docId: string) => {
    setClient((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        documents: prev.documents.filter((d) => d.id !== docId),
      };
    });
    toast.success("Document deleted successfully!");
  };

  const handleDeleteCase = (caseId: string) => {
    setClient((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        linkedCases: prev.linkedCases.filter((c) => c.id !== caseId),
      };
    });
    toast.success("Case link removed successfully!");
  };

  // Conflict status style helper
  const getConflictBadgeStyle = (status: string) => {
    const s = status.toLowerCase();
    if (
      s.includes("active") ||
      s.includes("no conflict") ||
      s.includes("success")
    ) {
      return {
        bg: "bg-emerald-50 border-emerald-100",
        text: "text-emerald-700",
        dot: "bg-emerald-600",
      };
    } else if (
      s.includes("potential") ||
      s.includes("pending") ||
      s.includes("check")
    ) {
      return {
        bg: "bg-amber-50 border-amber-100",
        text: "text-amber-700",
        dot: "bg-amber-500",
      };
    } else {
      return {
        bg: "bg-rose-50 border-rose-100",
        text: "text-rose-700",
        dot: "bg-rose-600",
      };
    }
  };

  const statusStyle = getConflictBadgeStyle(client.conflictStatus);

  return (
    <Bounded>
      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 relative">
        <header className="bg-[#0A3326] text-white p-3 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-[#0d3f2f] transition-all">
          <div className="flex items-center gap-4">
            <Link
              href="/clients"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Back to Clients"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  {client.name}
                </h1>
              </div>
              <p className="text-xs md:text-[12.5px] text-emerald-300/80 font-mono mt-0 md:mt-0.5">
                Client ID: {client.clientId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <Button
              onClick={() => setIsEmailModalOpen(true)}
              variant="outline"
              className="h-10 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-medium px-4 cursor-pointer text-[13.5px] rounded-xl flex items-center gap-2 shadow-sm transition-all hover:shadow"
            >
              <Mail className="w-4 h-4 text-slate-500" />
              Send Email
            </Button>
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="h-10 bg-[#055939] cursor-pointer hover:bg-[#044c30] text-white font-semibold px-4 text-[13.5px] rounded-xl flex items-center gap-2 border border-[#044c30] shadow-sm transition-all hover:scale-[1.02]"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Client
            </Button>
          </div>
        </header>

        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-[#055939]" />
              Client Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Full Name
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.name}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Email Address
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block break-all">
                {client.email}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Phone Number
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.phone}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Client Type
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.clientType || "Individual"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Date Registered
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.dateRegistered || "N/A"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Conflict Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold border ${statusStyle.bg} ${statusStyle.text} mt-0.5`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                />
                {client.conflictStatus || "Active"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Address
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.address || "N/A"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                State
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.state || "N/A"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                LGA
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.lga || "N/A"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Nationality
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.nationality || "N/A"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Workplace/Company
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.workplace || "N/A"}
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-slate-400 font-semibold  tracking-wider block mb-1">
                Preferred Contact
              </span>
              <span className="text-[13.5px] font-bold text-slate-800 block">
                {client.preferredContact || "Email"}
              </span>
            </div>
          </div>
        </section>

        {/* ── LINKED CASES SECTION ── */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
               
                Linked Cases
              </h2>
              <span className="text-xs text-slate-400 mt-1 block">
                {client.linkedCases.length}{" "}
                {client.linkedCases.length === 1 ? "case" : "cases"} associated
                with this client
              </span>
            </div>
            <Button
              onClick={() => setIsCaseModalOpen(true)}
              variant="outline"
              className="h-9 border-slate-200 text-slate-700 font-medium hover:border-[#1a7a4a] hover:text-[#1a7a4a] flex items-center gap-1.5 rounded-xl text-[13px] px-4 shadow-none hover:bg-slate-50 transition-colors"
            >
              <FilePlus className="w-4 h-4" />
              Add New Case
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {client.linkedCases.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/40">
                No cases associated with this client. Click &quot;Add New
                Case&quot; to link one.
              </div>
            ) : (
              client.linkedCases.map((c) => {
                const caseStyle = getConflictBadgeStyle(c.status);
                return (
                  <div
                    key={c.id}
                    className="border border-slate-100 rounded-2xl bg-white p-3 hover:shadow-md transition-shadow relative group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-sm md:text-base font-bold text-slate-800">
                          {c.title}
                        </h3>
                        <span className="text-[12px] font-mono text-slate-400 mt-0.5 block">
                          {c.caseNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-bold border ${caseStyle.bg} ${caseStyle.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5  rounded-full ${caseStyle.dot}`}
                          />
                          {c.status}
                        </span>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 cursor-pointer  md:opacity-0 opacity-100 md:group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-32 rounded-xl"
                          >
                            <DropdownMenuItem
                              onClick={() => {
                                setCaseTitle(c.title);
                                setCaseNumber(c.caseNumber);
                                setCaseType(c.caseType);
                                setCaseFilingDate(c.filingDate);
                                setCaseJurisdiction(c.jurisdiction);
                                setCaseStatus(c.status);
                                setClient((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        linkedCases: prev.linkedCases.filter(
                                          (x) => x.id !== c.id,
                                        ),
                                      }
                                    : null,
                                );
                                setIsCaseModalOpen(true);
                              }}
                              className="gap-2 text-[12.5px]"
                            >
                              <Pencil className="w-3.5 h-3.5 xursor-pointer" /> Edit Case
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteCase(c.id)}
                              className="gap-2 text-[12.5px] text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5 cursor-pointer" /> Unlink Case
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-50 pt-4">
                      <div>
                        <span className="text-sm text-slate-400 font-medium block">
                          Case Type
                        </span>
                        <span className="text-[13px] font-semibold text-slate-800 block mt-0.5">
                          {c.caseType}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400 font-medium block">
                          Filing Date
                        </span>
                        <span className="text-[13px] font-semibold text-slate-800 block mt-0.5">
                          {c.filingDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400 font-medium block">
                          Jurisdiction
                        </span>
                        <span className="text-[13px] font-semibold text-slate-800 block mt-0.5">
                          {c.jurisdiction}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ── UPLOADED DOCUMENTS SECTION ── */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#055939]" />
              Uploaded Documents
            </h2>
            <Button
              onClick={() => setIsDocModalOpen(true)}
              variant="outline"
              className="h-9 border-slate-200 text-slate-700 font-medium hover:border-[#1a7a4a] hover:text-[#1a7a4a] flex items-center gap-1.5 rounded-xl text-[13px] px-4 shadow-none hover:bg-slate-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                  <TableHead className="text-[11.5px] font-semibold text-slate-400 h-10 tracking-wide">
                    Document Name
                  </TableHead>
                  <TableHead className="text-[11.5px] font-semibold text-slate-400 h-10 tracking-wide">
                    Type
                  </TableHead>
                  <TableHead className="text-[11.5px] font-semibold text-slate-400 h-10 tracking-wide">
                    Date Uploaded
                  </TableHead>
                  <TableHead className="text-[11.5px] font-semibold text-slate-400 h-10 tracking-wide">
                    Size
                  </TableHead>
                  <TableHead className="text-[11.5px] font-semibold text-slate-400 h-10 tracking-wide text-right pr-4">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.documents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-12 text-slate-400 text-sm"
                    >
                      No documents uploaded. Click &quot;Upload Document&quot;
                      to add one.
                    </TableCell>
                  </TableRow>
                ) : (
                  client.documents.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className="hover:bg-slate-50/50 border-b border-slate-100 group"
                    >
                      <TableCell className="py-4 font-semibold text-slate-800 text-[13px] flex items-center gap-2.5 whitespace-nowrap">
                        <FileText className="w-4.5 h-4.5 text-[#055939] shrink-0" />
                        {doc.name}
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-slate-500">
                        {doc.type}
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-slate-500">
                        {doc.dateUploaded}
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-slate-500 font-mono">
                        {doc.size}
                      </TableCell>
                      <TableCell className="py-4 text-right pr-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-36 rounded-xl shadow-lg"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                toast.success(`Opening document: ${doc.name}`)
                              }
                              className="gap-2 text-[12.5px]"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-500" />{" "}
                              View Document
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toast.success(`Downloading: ${doc.name}`)
                              }
                              className="gap-2 text-[12.5px]"
                            >
                              <Download className="w-3.5 h-3.5 text-slate-500" />{" "}
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteDoc(doc.id)}
                              className="gap-2 text-[12.5px] text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* ── MODAL: SEND EMAIL ── */}
        {isEmailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
              onClick={() => setIsEmailModalOpen(false)}
            />

            {/* Modal Box */}
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#055939]" />
                  Send Email to {client.name}
                </h3>
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
                <div>
                  <label className="text-[12px] text-slate-400 font-bold block  mb-1">
                    To
                  </label>
                  <Input
                    value={client.email}
                    disabled
                    className="bg-slate-50 font-semibold text-slate-600"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 font-bold block  mb-1">
                    Subject
                  </label>
                  <Input
                    placeholder="Enter email subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                    className="focus:ring-1 focus:ring-[#1a7a4a]"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 font-bold block  mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Type your message here..."
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-200 p-3 text-[13.5px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] focus:border-[#1a7a4a] placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="h-10 text-[13px] cursor-pointer font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 bg-[#055939] hover:bg-[#155e38] text-white font-semibold px-5 text-[13px] rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Email
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Pencil className="w-4.5 h-4.5 text-[#055939]" />
                  Edit Client Information
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={handleSaveChanges}
                className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Full Name
                    </label>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Phone Number
                    </label>
                    <Input
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Client Type
                    </label>
                    <select
                      value={editClientType}
                      onChange={(e) => setEditClientType(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a]"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Conflict Status
                    </label>
                    <select
                      value={editConflictStatus}
                      onChange={(e) => setEditConflictStatus(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a]"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending Check">Pending Check</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Preferred Contact
                    </label>
                    <select
                      value={editPreferredContact}
                      onChange={(e) => setEditPreferredContact(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a]"
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Address
                    </label>
                    <Input
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      State
                    </label>
                    <Input
                      value={editState}
                      onChange={(e) => setEditState(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      LGA
                    </label>
                    <Input
                      value={editLga}
                      onChange={(e) => setEditLga(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Nationality
                    </label>
                    <Input
                      value={editNationality}
                      onChange={(e) => setEditNationality(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Workplace/Company
                    </label>
                    <Input
                      value={editWorkplace}
                      onChange={(e) => setEditWorkplace(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsEditModalOpen(false)}
                    className="h-10 text-[13px] font-semibold text-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 cursor-pointer bg-[#055939] hover:bg-[#155e38] text-white font-semibold px-5 text-[13px] rounded-lg shadow-sm"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MODAL: ADD CASE ── */}
        {isCaseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsCaseModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FilePlus className="w-5 h-5 text-[#055939]" />
                  Link New Case
                </h3>
                <button
                  onClick={() => setIsCaseModalOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddCase} className="flex bg-red-900 flex-col gap-4">
                <div className="">
                  <label className="text-sm text-slate-400 font-bold block  mb-1">
                    Case Title
                  </label>
                  <Input
                    placeholder="Wrongful Termination Claim"
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Case ID/Ref
                    </label>
                    <Input
                      placeholder="LD/142/2025"
                      value={caseNumber}
                      onChange={(e) => setCaseNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Case Type
                    </label>
                    <Input
                      placeholder="Employment Dispute"
                      value={caseType}
                      onChange={(e) => setCaseType(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Filing Date
                    </label>
                    <Input
                      type="date"
                      value={caseFilingDate}
                      onChange={(e) => setCaseFilingDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Status
                    </label>
                    <select
                      value={caseStatus}
                      onChange={(e) => setCaseStatus(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a]"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending Check">Pending Check</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 font-bold block  mb-1">
                    Jurisdiction
                  </label>
                  <Input
                    placeholder="Lagos State High Court"
                    value={caseJurisdiction}
                    onChange={(e) => setCaseJurisdiction(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsCaseModalOpen(false)}
                    className="h-10 text-[13px] font-semibold text-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 bg-[#055939] hover:bg-[#155e38] text-white font-semibold px-5 text-[13px] rounded-lg shadow-sm"
                  >
                    Link Case
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MODAL: UPLOAD DOCUMENT ── */}
        {isDocModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsDocModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#055939]" />
                  Upload New Document
                </h3>
                <button
                  onClick={() => setIsDocModalOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUploadDoc} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm text-slate-400 font-bold block  mb-1">
                    Document Name
                  </label>
                  <Input
                    placeholder="e.g. Employment Contract"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Document Type
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a]"
                    >
                      <option value="Contract">Contract</option>
                      <option value="Identification">Identification</option>
                      <option value="Agreement">Agreement</option>
                      <option value="Legal Document">Legal Document</option>
                      <option value="Evidence">Evidence</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 font-bold block  mb-1">
                      Simulated Size
                    </label>
                    <Input
                      placeholder="e.g. 1.2 MB"
                      value={docSize}
                      onChange={(e) => setDocSize(e.target.value)}
                    />
                  </div>
                </div>

                {/* Drag and Drop Box mockup */}
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer group mt-1">
                  <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[12.5px] font-semibold text-slate-700">
                    Drag & drop files here
                  </span>
                  <span className="text-sm text-slate-400 mt-1">
                    or click to browse from system
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsDocModalOpen(false)}
                    className="h-10 text-[13px] font-semibold text-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-10 bg-[#055939] hover:bg-[#155e38] text-white font-semibold px-5 text-[13px] rounded-lg shadow-sm"
                  >
                    Upload Document
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Bounded>
  );
}
