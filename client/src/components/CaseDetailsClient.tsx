"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Pencil,
  Share2,
  User,
  Calendar,
  FileText,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
  Trash2,
  Plus,
  Download,
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface CaseDetailsClientProps {
  id: string;
}

type TabType = "witnesses" | "hearings" | "documents" | "billing" | "notes";

interface Note {
  type: string;
  author: string;
  content: string;
}

export default function CaseDetailsClient({ id }: CaseDetailsClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("witnesses");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("In Progress");
  const [expandedWitness, setExpandedWitness] = useState<string | null>("sarah");
  
  // Notes State
  const [notes, setNotes] = useState<Note[]>([
    {
      type: "Case Update",
      author: "Principal Counsel • 10/04/2025",
      content: "Client maintaining innocence. Strong documentary evidence available to support defense. Need to engage forensic accountant for expert testimony.",
    },
    {
      type: "Legal Research",
      author: "Associate • 25/03/2025",
      content: "Research shows precedent in FHC/L/1892/2023 case with similar fact pattern. Defense was successful based on lack of mens rea.",
    },
  ]);
  
  // Note Modal State
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [noteContent, setNoteContent] = useState("");


  const router = useRouter()
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newNote: Note = {
      type: "Case Update",
      author: `Principal Counsel (via ${recipientEmail || "email"}) • Today`,
      content: noteContent,
    };

    setNotes([newNote, ...notes]);
    setNoteContent("");
    setRecipientEmail("");
    setIsNoteModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-7xl mx-auto px-1">
      {/* Top Navigation Row */}
      <div className="flex flex-col gap-2">
        <button
          onClick={()=>router.back()}
          className="flex items-center gap-1 cursor-pointer text-[#1A4331] hover:text-[#133224] text-xs font-semibold w-fit transition-colors"
        >
          <ChevronLeft size={14} />
          Back
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                Johnson vs. TechCorp Inc.
              </h1>
              <span className="inline-flex items-center rounded-sm bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 border border-red-200">
                High Priority
              </span>
              <span className="inline-flex items-center rounded-sm bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                In Progress
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Case ID: {id}</p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="h-9 w-24 text-xs font-semibold bg-white border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="High" className="text-xs">High Priority</SelectItem>
                <SelectItem value="Medium" className="text-xs">Medium</SelectItem>
                <SelectItem value="Low" className="text-xs">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-9 w-28 text-xs font-semibold bg-white border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="In Progress" className="text-xs">In Progress</SelectItem>
                <SelectItem value="Open" className="text-xs">Open</SelectItem>
                <SelectItem value="Closed" className="text-xs">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs gap-1.5 border-slate-200 text-slate-650 rounded-lg shadow-none hover:bg-slate-50"
            >
              <Pencil size={13} />
              Edit Case
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs gap-1.5 border-slate-200 text-slate-650 rounded-lg shadow-none hover:bg-slate-50"
            >
              <Share2 size={13} />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client & Dates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Info */}
            <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-4.5 space-y-4">
              <div className="flex items-center gap-2 text-slate-400 border-b border-slate-50 pb-2">
                <User size={15} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Client Information
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Name
                  </p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    Michael Johnson
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">
                    michaeljohnson@email.com
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </Card>

            {/* Dates & Timeline */}
            <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-4.5 space-y-4">
              <div className="flex items-center gap-2 text-slate-400 border-b border-slate-50 pb-2">
                <Calendar size={15} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Timeline & Dates
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Category
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    Employment Law
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Incident Date
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    March 15, 2023
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Start Date
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    January 10, 2024
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Expected End Date
                  </p>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    December 31, 2024
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Case Details Card */}
          <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <FileText size={15} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Case Details
                </span>
              </div>
              <p className="text-sm text-slate-650 leading-relaxed pt-1">
                Employment discrimination case involving wrongful termination and hostile work environment claims. Client alleges systematic discrimination based on age and retaliation after filing internal complaints.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 text-xs">
              {/* Court info */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                  Court Information
                </h4>
                <div className="space-y-2">
                  <p className="text-slate-500 leading-snug">
                    <span className="font-semibold text-slate-700 block text-[11px]">Court</span>
                    Superior Court of California, County of San Francisco
                  </p>
                  <p className="text-slate-500">
                    <span className="font-semibold text-slate-700 block text-[11px]">Case Number</span>
                    CGC-24-596768
                  </p>
                  <p className="text-slate-500">
                    <span className="font-semibold text-slate-700 block text-[11px]">Judge</span>
                    Hon. Patricia Martinez
                  </p>
                  <p className="text-slate-500">
                    <span className="font-semibold text-slate-700 block text-[11px]">Next Hearing</span>
                    February 15, 2024
                  </p>
                </div>
              </div>

              {/* Counsel info */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                  Counsel Information
                </h4>
                <div className="space-y-3.5">
                  <div>
                    <span className="font-semibold text-slate-700 block text-[11px]">Lead Counsel</span>
                    <p className="font-semibold text-slate-800 mt-0.5">Ajayi Olabode</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block text-[11px]">Opposing Counsel</span>
                    <p className="font-semibold text-slate-850 mt-0.5">Ajayi Olabode</p>
                    <div className="text-slate-500 space-y-1 mt-1.5 text-[11px] bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                      <p className="truncate"><span className="font-medium text-slate-450">Email:</span> ajayiolabode6@gmail.com</p>
                      <p><span className="font-medium text-slate-450">Phone:</span> +1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          {/* Activity Timeline */}
          <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-4.5 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-50 pb-2">
              Activity Timeline
            </h3>
            <div className="relative pl-4 space-y-5 border-l border-slate-100 text-xs">
              {/* Timeline Item 1 */}
              <div className="relative pl-1">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-4 ring-emerald-50" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-semibold text-slate-800">Matter Status: Adjourned</p>
                  <span className="text-[8px] bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded-sm font-bold border border-emerald-100 uppercase tracking-wide leading-none">
                    Urgent
                  </span>
                </div>
                <p className="text-slate-500 mt-1 leading-snug">
                  Hearing held at Court 6. Adjourned to March 5th for further cross-examination of witness A.
                </p>
                <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-wide">
                  Sarah Chen • Today, 10:42 AM
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-1">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-50" />
                <p className="font-semibold text-slate-800">Client Notification Sent</p>
                <p className="text-slate-500 mt-1 leading-snug">
                  SMS: &quot;Mr. Henderson, your matter was adjourned to 5/03. Next step: Witness testimony.&quot;
                </p>
                <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-wide">
                  System Automation • Today, 10:43 AM
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-1">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-50" />
                <p className="font-semibold text-slate-800">Document Filed: Motion for Discovery</p>
                <p className="text-slate-500 mt-1 leading-snug">
                  Formal request submitted to opposing counsel regarding electronic evidence logs.
                </p>
                <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-wide">
                  Primary Trial Assistant • Today, 12:15 PM
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full text-xs h-9 border-slate-200 hover:bg-slate-50 shadow-none rounded-lg text-slate-650"
            >
              Load Older Activity
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-4.5 space-y-3.5">
            <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-50 pb-2">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="justify-start gap-2 h-9 text-xs border-slate-200 hover:bg-slate-50 shadow-none text-slate-650 cursor-pointer"
              >
                <Pencil size={13} /> Update Case
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-9 text-xs border-slate-200 hover:bg-slate-50 shadow-none text-slate-650 cursor-pointer"
              >
                <Calendar size={13} /> Schedule Hearing
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-9 text-xs border-slate-200 hover:bg-slate-50 shadow-none text-slate-650 cursor-pointer"
              >
                <Plus size={13} /> Add Document
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-9 text-xs border-red-200 text-red-600 hover:bg-red-50 shadow-none bg-white cursor-pointer"
              >
                <Trash2 size={13} /> Delete Case
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs Container */}
      <div className="space-y-4 pt-4">
        {/* Tab Buttons bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-px overflow-x-auto no-scrollbar">
          {[
            { id: "witnesses", label: "Witnesses" },
            { id: "hearings", label: "Hearings" },
            { id: "documents", label: "Documents" },
            { id: "billing", label: "Billing" },
            { id: "notes", label: "Notes" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "text-xs font-semibold px-4 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap",
                  isSelected
                    ? "border-[#1A4331] text-[#1A4331]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Views */}
        <div className="w-full">
          {/* Witnesses Tab */}
          {activeTab === "witnesses" && (
            <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Witnesses (3)</h3>
                <Button className="bg-[#1A4331] text-white hover:bg-[#133224] h-8.5 px-3 text-[11px] font-semibold rounded-lg shadow-sm cursor-pointer">
                  + Add Witness
                </Button>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: "sarah",
                    name: "Sarah Williams",
                    role: "Former Colleague",
                    phone: "+1 (555) 123-4567",
                    email: "sarah.williams@email.com",
                    relationship: "Former Supervisor at TechCorp",
                    statement:
                      "Sarah was the direct supervisor during the incident period. She observed the hostile working conditions and verified that the client complained about age discrimination on multiple occasions before termination.",
                  },
                  {
                    id: "robert",
                    name: "Robert Chen",
                    role: "HR Manager",
                    phone: "+1 (555) 234-5678",
                    email: "robert.chen@techcorp.com",
                    relationship: "Human Resources Officer",
                    statement:
                      "Robert handled the termination file. His statements provide crucial insight into the internal review process and timeline details surrounding the exit interview.",
                  },
                  {
                    id: "emma",
                    name: "Emma Davis",
                    role: "Department Head",
                    phone: "+1 (555) 345-6789",
                    email: "emma.davis@techcorp.com",
                    relationship: "Managing Director",
                    statement:
                      "Emma oversaw the department structure. Her interview notes illustrate structural organization patterns and performance assessment reports.",
                  },
                ].map((witness) => {
                  const isExpanded = expandedWitness === witness.id;
                  return (
                    <div
                      key={witness.id}
                      className="border border-slate-100 rounded-lg overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() =>
                          setExpandedWitness(isExpanded ? null : witness.id)
                        }
                        className="w-full flex items-center justify-between p-3.5 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-xs text-[#1A4331]">
                            {witness.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              {witness.name}
                            </p>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                              {witness.role}
                            </span>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp size={15} className="text-slate-400" />
                        ) : (
                          <ChevronDown size={15} className="text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 border-t border-slate-100 text-xs space-y-4 bg-white">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                Phone
                              </span>
                              <p className="font-semibold text-slate-700 mt-0.5">
                                {witness.phone}
                              </p>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                Email
                              </span>
                              <p className="font-semibold text-slate-700 mt-0.5 truncate">
                                {witness.email}
                              </p>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                Relationship
                              </span>
                              <p className="font-semibold text-slate-700 mt-0.5">
                                {witness.relationship}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1 bg-slate-50/50 p-3 rounded-lg border border-slate-50">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              Statements & Notes
                            </span>
                            <p className="text-slate-650 leading-relaxed mt-1">
                              {witness.statement}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Hearings Tab */}
          {activeTab === "hearings" && (
            <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Court Hearings</h3>
                <Button className="bg-[#1A4331] text-white hover:bg-[#133224] h-8.5 px-3 text-[11px] font-semibold rounded-lg shadow-sm cursor-pointer">
                  + Schedule Hearing
                </Button>
              </div>

              <div className="space-y-3 pt-1">
                {/* Hearing 1 */}
                <div className="border border-slate-100 rounded-xl p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800">Trial Hearing</h4>
                      <span className="text-[8px] bg-blue-50 text-blue-700 border border-blue-100 rounded-sm font-bold px-1.5 py-0.5 uppercase tracking-wider">
                        Scheduled
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-slate-500">
                      <p><span className="font-semibold text-slate-700">Date/Time:</span> 22/05/2025 @ 10:00 AM</p>
                      <p><span className="font-semibold text-slate-700">Location:</span> Lagos State High Court - Court 3</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug pt-1">
                      <span className="font-bold text-slate-700">Notes:</span> Witness Testimony - Prosecution witness expected
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 self-start md:self-center">
                    <MoreVertical size={14} />
                  </Button>
                </div>

                {/* Hearing 2 */}
                <div className="border border-slate-100 rounded-xl p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800">Pre-trial Conference</h4>
                      <span className="text-[8px] bg-slate-50 text-slate-600 border border-slate-100 rounded-sm font-bold px-1.5 py-0.5 uppercase tracking-wider">
                        Completed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-slate-500">
                      <p><span className="font-semibold text-slate-700">Date/Time:</span> 15/04/2025 @ 2:30 PM</p>
                      <p><span className="font-semibold text-slate-700">Location:</span> Lagos State High Court - Court 2</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug pt-1">
                      <span className="font-bold text-slate-700">Notes:</span> Directions given for filing of written documents
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 self-start md:self-center">
                    <MoreVertical size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-55 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Evidence & Documents</h3>
                <Button className="bg-[#1A4331] text-white hover:bg-[#133224] h-8.5 px-3 text-[11px] font-semibold rounded-lg shadow-sm cursor-pointer">
                  + Add Document
                </Button>
              </div>

              {/* Evidence Section */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Evidence Files</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: "Employment_Contract.pdf", size: "2.4 MB" },
                    { name: "Email_Communications.pdf", size: "1.8 MB" },
                    { name: "Witness_Statements.docx", size: "1.2 MB" },
                  ].map((doc) => (
                    <div key={doc.name} className="border border-slate-100 p-2.5 rounded-lg flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText size={16} className="text-red-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-700 truncate">{doc.name}</p>
                          <span className="text-[9px] text-slate-400 block">{doc.size}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-450 hover:text-slate-700">
                        <Download size={13} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Documents Section */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Case Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: "Initial_Complaint.pdf", size: "3.1 MB" },
                    { name: "Discovery_Documents.zip", size: "12.4 MB" },
                  ].map((doc) => (
                    <div key={doc.name} className="border border-slate-100 p-2.5 rounded-lg flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText size={16} className="text-[#1A4331] shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-700 truncate">{doc.name}</p>
                          <span className="text-[9px] text-slate-400 block">{doc.size}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-450 hover:text-slate-700">
                        <Download size={13} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Client Invoices</h3>
                <Button className="bg-[#1A4331] text-white hover:bg-[#133224] h-8.5 px-3 text-[11px] font-semibold rounded-lg shadow-sm cursor-pointer">
                  + Create Invoice
                </Button>
              </div>

              {/* Mini Billing Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/50 border border-slate-100 p-3 rounded-xl text-xs">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Invoiced</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">₦1,900,000</p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-slate-150 pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Paid Amount</span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">₦700,000</p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-slate-150 pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Outstanding</span>
                  <p className="text-sm font-bold text-red-650 mt-0.5">₦1,200,000</p>
                </div>
              </div>

              {/* Invoices List */}
              <div className="space-y-3 text-xs">
                {/* Inv 1 */}
                <div className="border border-slate-100 rounded-lg p-3 space-y-2 hover:bg-slate-50/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">INV-2025-001</span>
                      <span className="text-[10px] text-slate-400 ml-2">Issued: 01/02/2025</span>
                    </div>
                    <span className="text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-sm font-bold px-1.5 py-0.5 uppercase">
                      Paid
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <p className="text-slate-500 font-medium leading-none">Legal consultation & initial review</p>
                    <p className="text-sm font-bold text-slate-800">₦500,000</p>
                  </div>
                </div>

                {/* Inv 2 */}
                <div className="border border-slate-100 rounded-lg p-3 space-y-2 hover:bg-slate-50/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">INV-2025-015</span>
                      <span className="text-[10px] text-slate-400 ml-2">Issued: 01/03/2025</span>
                    </div>
                    <span className="text-[8px] bg-amber-50 text-amber-700 border border-amber-100 rounded-sm font-bold px-1.5 py-0.5 uppercase">
                      Partially Paid
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <p className="text-slate-500 font-medium leading-none">Court representation - Pre-trial</p>
                    <p className="text-sm font-bold text-slate-800">₦750,000</p>
                  </div>
                  <p className="text-[9px] text-slate-400 text-right pt-0.5">Paid: ₦200,000 | Balance: ₦550,000</p>
                </div>

                {/* Inv 3 */}
                <div className="border border-slate-100 rounded-lg p-3 space-y-2 hover:bg-slate-50/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">INV-2025-028</span>
                      <span className="text-[10px] text-slate-400 ml-2">Issued: 01/04/2025</span>
                    </div>
                    <span className="text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-sm font-bold px-1.5 py-0.5 uppercase">
                      Paid
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <p className="text-slate-500 font-medium leading-none">Legal research and case prep</p>
                    <p className="text-sm font-bold text-slate-800">₦650,000</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Case Notes</h3>
                <Button
                  onClick={() => setIsNoteModalOpen(true)}
                  className="bg-[#1A4331] text-white hover:bg-[#133224] h-8.5 px-3 text-[11px] font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  + Add Note
                </Button>
              </div>

              <div className="space-y-3.5 pt-1 text-xs">
                {notes.map((note, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 bg-white space-y-2.5 relative group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-slate-800 text-[13px]">{note.type}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{note.author}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                    <p className="text-slate-650 leading-relaxed font-medium">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Add Note Modal Overlay */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <Card className="max-w-md w-full rounded-xl border border-slate-200 shadow-2xl p-6 bg-white space-y-4 mx-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 leading-none">Add Note</h3>
              <p className="text-xs text-slate-400 font-medium">
                Kindly fill out all fields provided below
              </p>
            </div>

            <form onSubmit={handleAddNote} className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Recipient Email</label>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-slate-800 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] text-xs shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Note</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter Note"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-lg text-slate-800 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] text-xs resize-none shadow-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="h-10 px-4 text-xs border-slate-200 hover:bg-slate-50 text-slate-650 rounded-lg shadow-none cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 px-4 text-xs bg-[#1A4331] hover:bg-[#133224] text-white rounded-lg shadow-sm cursor-pointer"
                >
                  Save
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
