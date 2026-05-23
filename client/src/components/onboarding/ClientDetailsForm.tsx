import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText } from "lucide-react";

interface ClientDetailsFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function ClientDetailsForm({ onSubmit, defaultValues }: ClientDetailsFormProps) {
  
  const [clientType, setClientType] = useState<"Individual" | "Corporate">("Individual");
  const [linkedCase, setLinkedCase] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState(""); 
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [lga, setLga] = useState("");
  const [nationality, setNationality] = useState("Nigerian");
  const [workplace, setWorkplace] = useState("");
  const [religion, setReligion] = useState("");
  const [legalMatter, setLegalMatter] = useState("");
  const [referral, setReferral] = useState("");
  const [notes, setNotes] = useState("");
 
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);

  useEffect(() => {
    if (defaultValues) {
      setClientType(defaultValues.clientType || "Individual");
      setLinkedCase(defaultValues.linkedCase || "");
      setEmail(defaultValues.email || "");
      setPhone(defaultValues.phone || "");
      setAddress(defaultValues.address || "");
      setStateVal(defaultValues.state || "");
      setLga(defaultValues.lga || "");
      setNationality(defaultValues.nationality || "Nigerian");
      setWorkplace(defaultValues.workplace || "");
      setReligion(defaultValues.religion || "");
      setLegalMatter(defaultValues.legalMatter || "");
      setReferral(defaultValues.referral || "");
      setNotes(defaultValues.notes || "");

      if (defaultValues.clientType === "Corporate") {
        setCompanyName(defaultValues.name || "");
      } else if (defaultValues.name) {
        
        const nameParts = defaultValues.name.trim().split(" ");
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");
      }

      if (defaultValues.fileName) {
        setUploadedFile({
          name: defaultValues.fileName,
          size: defaultValues.fileSize || "1.2 MB"
        });
      }
    }
  }, [defaultValues]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientType === "Individual" && (!firstName || !lastName)) return;
    if (clientType === "Corporate" && !companyName) return;
    if (!email || !phone) return;

    const data = {
      clientType,
      linkedCase,
      name: clientType === "Individual" ? `${firstName} ${lastName}` : companyName,
      email,
      phone,
      address,
      state: stateVal,
      lga,
      nationality,
      workplace,
      religion,
      legalMatter,
      referral,
      notes,
      fileName: uploadedFile ? uploadedFile.name : null,
      fileSize: uploadedFile ? uploadedFile.size : null,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white border border-slate-200/80 rounded-2xl  p-4 md:p-6 flex flex-col gap-3 md:gap-6  shadow-sm">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900">Add New Client</h2>
        <p className="text-[13px] text-slate-400 mt-1">
          Provide details to create a new client profile and initiate legal processes.
        </p>
      </div>

      
      <div className="flex flex-col gap-2">
        <label className="text-[12.5px] font-bold text-slate-700">Client Type</label>
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl max-w-2xl">
          <button
            type="button"
            onClick={() => setClientType("Individual")}
            className={`py-2 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
              clientType === "Individual"
                ? "bg-[#055939] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Individual
          </button>
          <button
            type="button"
            onClick={() => setClientType("Corporate")}
            className={`py-2 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
              clientType === "Corporate"
                ? "bg-[#055939] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Corporate
          </button>
        </div>
      </div>

  
      <div className="flex flex-col gap-2 max-w-2xl">
        <label className="text-[12.5px] font-bold text-slate-700">Link to Case</label>
        <select
          value={linkedCase}
          onChange={(e) => setLinkedCase(e.target.value)}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1a7a4a]"
        >
          <option value="">Select Case (Optional)</option>
          <option value="Employment Dispute">Wrongful Termination Claim (Employment Dispute)</option>
          <option value="Land Dispute">Lekki Land Title Dispute (Land Dispute)</option>
          <option value="Contract Review">SaaS Agreement Dispute (Contract Review)</option>
          <option value="Divorce & Custody">Dissolution of Marriage (Divorce & Custody)</option>
          <option value="Create New">Create a new case dynamically</option>
        </select>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
        {clientType === "Individual" ? (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px]  font-bold text-slate-600">First Name</label>
              <Input
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="h-10 text-sm md:text-base rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a] focus-visible:border-[#1a7a4a]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-600">Last Name</label>
              <Input
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a] focus-visible:border-[#1a7a4a]"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-[12px] font-bold text-slate-600">Company Name</label>
            <Input
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a] focus-visible:border-[#1a7a4a]"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Email Address</label>
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Phone Number</label>
          <Input
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Address</label>
          <Input
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">State</label>
          <Input
            placeholder="Enter state"
            value={stateVal}
            onChange={(e) => setStateVal(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">LGA</label>
          <Input
            placeholder="Enter LGA"
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Nationality</label>
          <Input
            placeholder="Enter nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>

        {/* Identification Upload */}
        <div className="sm:col-span-2 flex flex-col gap-2">
          <label className="text-[12px] font-bold text-slate-600">Identification Document</label>
          <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors group cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:scale-105 transition-transform" />
            <span className="text-[13px] font-semibold text-slate-700">
              Upload client Identification (NIN, TIN, Driver&apos;s License, Passport)
            </span>
            <span className="text-[11.5px] text-slate-400 mt-1">
              Drag and drop or <span className="text-[#055939] font-bold hover:underline">browse</span> to upload
            </span>
          </div>

          {uploadedFile && (
            <div className="flex items-center gap-3 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl mt-1 animate-slide-in">
              <FileText className="w-5 h-5 text-[#055939] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-slate-800 truncate">{uploadedFile.name}</p>
                <p className="text-[11px] text-slate-400">{uploadedFile.size}</p>
              </div>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Workplace/Company</label>
          <Input
            placeholder="Enter workplace"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Religion</label>
          <Input
            placeholder="Enter religion"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Legal Matter</label>
          <Input
            placeholder="E.g. Employment dispute"
            value={legalMatter}
            onChange={(e) => setLegalMatter(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-slate-600">Referral</label>
          <Input
            placeholder="LinkedIn / Partner"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            className="h-10 rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[12px] font-bold text-slate-600">Notes</label>
          <textarea
            rows={4}
            placeholder="Enter Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 text-[13.5px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] focus:border-[#1a7a4a] placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="pt-4 max-w-4xl">
        <Button
          type="submit"
          className="w-full h-11 bg-[#055939] hover:bg-[#155e38] text-white font-semibold rounded-xl text-[14.5px] shadow-sm hover:scale-[1.005] active:scale-[0.995] transition-all cursor-pointer"
        >
          Run Conflict Check
        </Button>
      </div>
    </form>
  );
}