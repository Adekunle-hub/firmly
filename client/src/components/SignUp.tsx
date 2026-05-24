"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconCheckCircle,
  IconEye,
  IconIdentity,
  IconMail,
  IconUser,
  IconArrowLeft,
} from "@/utils/Icons";
import AuthFooter from "@/components/AuthFooter";
import SetupHeader from "@/components/SetupHeader";
import UploadDocument from "@/components/UploadDocument";
import PlanCard from "@/components/PlanCard";
import { PLANS } from "@/utils/plans";
import CustomSelect from "./CustomSelect";

export function FirmlyLogo({ size = 48 }) {
  return (
    <Image src="/images/logo.png" alt="Firmly" width={size} height={size} />
  );
}

function OtpInput({ value = "", onChange }) {
  const inputsRef = useRef([]);
  const setInputRef =
    (index: number) =>
    (el: HTMLInputElement | null): void => {
      inputsRef.current[index] = el;
    };

  const OTP_LENGTH = 6;
  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] || "");

  const updateOtp = (newDigits) => onChange(newDigits.join(""));

  const handleChange = (e, idx) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;
    const newDigits = [...digits];
    newDigits[idx] = char;
    updateOtp(newDigits);
    inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newDigits = [...digits];
      if (newDigits[idx]) {
        newDigits[idx] = "";
        updateOtp(newDigits);
      } else {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={setInputRef(idx)}
          value={digit}
          maxLength={1}
          inputMode="numeric"
          type="text"
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-15 h-15 text-center text-xl border rounded"
        />
      ))}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group self-start"
    >
      <span className="group-hover:-translate-x-0.5 transition-transform">
        <IconArrowLeft />
      </span>
      Back
    </button>
  );
}

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [identity, setIdentity] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("start");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    firmName: "",
    firmType: "",
    address: "",
    phone: "",
    cac: "",
    nin: "",
    password: "",
    confirm: "",
  });

  const setField = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const field = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setField(key, e.target.value);

  const totalSetupSteps = identity === "law-firm" ? 6 : 5;

  function next() {
    const nextMap: Record<number, number> = {
      0: 1,
      1: 2,
      2: 3,
      3: identity === "law-firm" ? 4 : 5,
      4: 5,
      5: 6,
      6: 7,
    };
    setStep(nextMap[step] ?? step + 1);
  }

  function back() {
    const backMap: Record<number, number> = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: identity === "law-firm" ? 4 : 3,
      6: 5,
    };
    setStep(backMap[step] ?? step - 1);
  }

  if (step === 0) {
    return (
      <div className="w-full flex flex-col items-center py-5 md:py-8">
        <div className="mb-2 md:mb-6 flex flex-col items-center text-center">
          <FirmlyLogo size={48} />
          <h2 className="mt-3 text-2xl font-bold text-white">
            Choose Your Identity
          </h2>
          <p className="text-base font-light text-white/70 mt-2 max-w-120 leading-relaxed">
            Select the profile that best represents your legal practice to
            customize your Firmly experience.
          </p>
        </div>

        <div className="flex gap-5 w-full max-w-4xl mb-8">
          {[
            {
              id: "law-firm",
              title: "Law Firm",
              desc: "Comprehensive practice management for multiple attorneys, paralegals, and administrative staff with enterprise-grade oversight.",
              badge: "MULTI-USER ACCESS",
            },
            {
              id: "solo",
              title: "Solo Lawyer",
              desc: "Streamlined tools designed specifically for independent practitioners to manage cases, billing, and clients with maximum efficiency.",
              badge: "INDIVIDUAL FOCUSED",
            },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setIdentity(opt.id)}
              className={`flex-1 rounded-2xl cursor-pointer bg-white/8 border-2 p-8 text-left transition-all hover:bg-white/12 ${
                identity === opt.id ? "border-[#29724f]" : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/15 mb-5 text-white">
                <IconIdentity />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {opt.title}
              </h3>
              <p className="text-base font-normal text-white/80 leading-relaxed mb-4">
                {opt.desc}
              </p>
              <span className="text-sm font-bold tracking-widest text-white/60">
                {opt.badge}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={!identity}
          onClick={next}
          className={`h-12 w-full max-w-4xl cursor-pointer rounded-xl text-base font-bold transition-colors ${
            identity
              ? "bg-firmly-primary hover:bg-firmly-primary-hover text-white"
              : "bg-[#e3e4e5] text-[#979c9e] cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        <p className="mt-4 text-sm text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-amber-400 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>

        <AuthFooter maxWidth="896px" />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="w-full flex flex-col items-center py-10">
        <SetupHeader
          setupStep={1}
          totalSteps={totalSetupSteps}
          title="Firm Information"
        />

        <div className="w-full max-w-140 mb-3">
          <BackButton onClick={back} />
        </div>

        <div className="w-full max-w-140 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-10 py-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">Full Name</label>
            <div className="flex items-center gap-3 h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-firmly-link transition-colors">
              <span className="text-white/50 shrink-0"><IconUser /></span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={field("name")}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">Email Address</label>
            <div className="flex items-center gap-3 h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-firmly-link transition-colors">
              <span className="text-white/50 shrink-0"><IconMail /></span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={field("email")}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">Firm Legal Name</label>
            <div className="flex items-center h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-firmly-link transition-colors">
              <input
                type="text"
                placeholder="Enter firm name"
                value={form.firmName}
                onChange={field("firmName")}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">Firm Type</label>
            <CustomSelect
              value={form.firmType}
              onChange={(val) => setField("firmType", val)}
              placeholder="Select firm type"
              options={[
                { value: "law-firm", label: "Law Firm" },
                { value: "solo", label: "Solo Practice" },
                { value: "boutique", label: "Boutique Firm" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">Office Address</label>
            <div className="flex items-center h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-[#5cab82] transition-colors">
              <input
                type="text"
                placeholder="Enter office address"
                value={form.address}
                onChange={field("address")}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">Phone Number</label>
            <div className="flex items-center h-12 rounded-xl bg-white/8 border border-white/10 px-4 gap-3 focus-within:border-[#5cab82] transition-colors">
              <span className="flex items-center gap-1 text-sm bg-white/15 rounded px-2 py-0.5 shrink-0 text-white font-medium">
                🇳🇬 <span className="text-sm">+234</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <input
                type="tel"
                placeholder="Mobile number"
                value={form.phone}
                onChange={field("phone")}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">CAC Number</label>
            <div className="flex items-center h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-[#5cab82] transition-colors">
              <input
                type="text"
                placeholder="Enter CAC number"
                value={form.cac}
                onChange={field("cac")}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            className="h-12 w-full rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors mt-1"
          >
            Continue
          </button>

          <p className="text-sm text-white text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>

        <AuthFooter />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="w-full flex flex-col items-center py-10">
        <SetupHeader
          setupStep={2}
          totalSteps={totalSetupSteps}
          title="Verify Identity"
        />

        <div className="w-full max-w-120 mb-3">
          <BackButton onClick={back} />
        </div>

        <div className="w-full max-w-120 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-12 py-8 flex flex-col gap-6">
          <div className="text-center">
            <p className="text-base font-light text-white/80">
              We sent a verification code to{" "}
              <span className="font-medium text-white">
                {form.email || "your email"}
              </span>
            </p>
          </div>

          <OtpInput value={otp} onChange={setOtp} />

          <button
            type="button"
            onClick={next}
            className="h-12 w-full rounded-xl cursor-pointer bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors"
          >
            Continue
          </button>

          <p className="text-sm text-white text-center">
            Didn&apos;t receive a code?{" "}
            <button className="text-[#5cab82] cursor-pointer hover:underline font-semibold">
              Resend
            </button>
          </p>
        </div>

        <AuthFooter />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="w-full flex flex-col items-center py-10">
        <SetupHeader
          setupStep={3}
          totalSteps={totalSetupSteps}
          title="Documentation Upload"
        />

        <div className="w-full max-w-146 mb-3">
          <BackButton onClick={back} />
        </div>

        <div className="w-full max-w-146 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-10 py-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base text-white font-normal">NIN</label>
            <div className="flex items-center h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-firmly-link transition-colors">
              <input
                type="text"
                placeholder="Enter NIN"
                value={form.nin}
                onChange={field("nin")}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
              />
            </div>
          </div>

          <UploadDocument
            label="Annual Practicing Certificate (APC)"
            hint="Upload your annual practicing Certificate"
          />

          <UploadDocument
            label="BAR (NBA membership)"
            hint="Upload your BAR (NBA membership)"
          />

          <button
            type="button"
            onClick={next}
            className="h-12 w-full rounded-xl bg-firmly-primary hover:bg-firmly-primary-hover text-white text-base font-bold transition-colors mt-1"
          >
            Continue
          </button>
        </div>

        <AuthFooter />
      </div>
    );
  }

  if (step === 4 && identity === "law-firm") {
    return (
      <div className="w-full flex flex-col items-center py-10">
        <SetupHeader setupStep={4} totalSteps={6} title="Invite Team Members" />

        <div className="w-full max-w-120 mb-3">
          <BackButton onClick={back} />
        </div>

        <div className="w-full max-w-120 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-10 py-8 flex flex-col gap-5">
          <p className="text-sm text-white/60">
            Add attorneys, paralegals, and staff to your firm account.
          </p>

          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <label className="text-base text-white font-normal">
                Member {i + 1} Email
              </label>
              <div className="flex items-center gap-3 h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-firmly-link transition-colors">
                <span className="text-white/50 shrink-0"><IconMail /></span>
                <input
                  type="email"
                  placeholder="colleague@firm.com"
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="text-sm text-[#5cab82] hover:underline text-left w-fit"
          >
            + Add another member
          </button>

          <button
            type="button"
            onClick={next}
            className="h-12 w-full rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors mt-1"
          >
            Continue
          </button>

          <button
            type="button"
            onClick={next}
            className="text-sm text-white/50 hover:text-white text-center transition-colors"
          >
            Skip for now
          </button>
        </div>

        <AuthFooter />
      </div>
    );
  }

  if (step === 5) {
    const ss = identity === "law-firm" ? 5 : 4;
    return (
      <div className="w-full flex flex-col items-center py-10">
        <SetupHeader
          setupStep={ss}
          totalSteps={totalSetupSteps}
          title="Setup Account"
          maxWidth="1100px"
        />

        <div className="w-full max-w-275 mb-3">
          <BackButton onClick={back} />
        </div>

        <div className="grid grid-cols-4 gap-4 w-full max-w-275 mb-8">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={i}
              plan={plan}
              selected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="h-12 w-full max-w-150 cursor-pointer rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors"
        >
          Continue
        </button>

        <AuthFooter maxWidth="1100px" />
      </div>
    );
  }

  if (step === 6) {
    const ss = identity === "law-firm" ? 6 : 5;
    const hasMinLength = form.password.length >= 8;
    const hasSpecialChar = /[^A-Za-z0-9]/.test(form.password);
    return (
      <div className="w-full flex flex-col items-center py-10">
        <SetupHeader
          setupStep={ss}
          totalSteps={totalSetupSteps}
          title="Password Set Up"
        />

        <div className="w-full max-w-146  mb-3">
          <BackButton onClick={back} />
        </div>

        <div className="w-full max-w-146 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-10 py-8 flex flex-col items-center gap-5">
          <FirmlyLogo size={56} />
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">Set Password</h3>
            <p className="text-sm font-light text-white/60 mt-1">
              Set your password to your Firmly account
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base text-white font-normal">Password</label>
              <div className="flex items-center gap-3 h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-firmly-link transition-colors">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  value={form.password}
                  onChange={field("password")}
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-white/50 hover:text-white shrink-0 transition-colors"
                >
                  <IconEye off={showPw} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base text-white font-normal">Confirm Password</label>
              <div className="flex items-center gap-3 h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-firmly-link transition-colors">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  value={form.confirm}
                  onChange={field("confirm")}
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-white/50 hover:text-white shrink-0 transition-colors"
                >
                  <IconEye off={showConfirm} />
                </button>
              </div>
            </div>

            <div className="flex-col gap-2 hidden">
              <div className="flex items-center gap-2">
                <IconCheckCircle active={hasMinLength} />
                <span className={`text-sm ${hasMinLength ? "text-firmly-link" : "text-white"}`}>
                  Must be at least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheckCircle active={hasSpecialChar} />
                <span className={`text-sm ${hasSpecialChar ? "text-firmly-link" : "text-white"}`}>
                  Must contain one special character
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            className="h-12 w-full rounded-xl bg-firmly-primary hover:bg-firmly-primary-hover text-white cursor-pointer text-base font-bold transition-colors"
          >
            Continue
          </button>
        </div>

        <AuthFooter />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-150 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-16 py-16 flex flex-col items-center gap-6">
        <FirmlyLogo size={120} />
        <h2 className="text-2xl font-bold text-white text-center">
          Welcome to Firmly!
        </h2>
        <p className="text-base text-white/70 text-center">
          Your account has been set up successfully.
        </p>
        <Link
          href="/login"
          className="h-12 w-full flex items-center justify-center rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}