"use client";

import { useState } from "react";
import Link from "next/link";
import AuthFooter from "@/components/AuthFooter";
import { IconMail, IconArrowLeft, IconEye, IconCheckCircle, IconSms } from "@/utils/Icons";



/* ── Page ─────────────────────────────────────────────────── */
export default function ResetPasswordPage() {
  const [step, setStep] = useState(0);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

 
  if (step === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#29724f] mb-4">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-[32px] font-bold text-white leading-tight">Reset Password</h1>
        </div>

        <div className="w-full max-w-[584px] rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 px-12 py-8">
          <p className="text-base font-light text-white mb-6">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); setStep(1); }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-base text-white font-normal">Email</label>
              <div className="flex items-center gap-3 h-11 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-[#5cab82] transition-colors">
                <span className="text-white/50 shrink-0"><IconMail /></span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/32 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors mt-1"
            >
              Continue
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#5cab82] transition-colors"
            >
              <IconArrowLeft />
              Back to Sign in
            </button>
          </div>
        </div>

        <AuthFooter />
      </div>
    );
  }

  /* ─── Step 1: Check email ─── */
  if (step === 1) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#29724f] mb-4">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-[32px] font-bold text-white leading-tight">Reset Password</h1>
        </div>

        <div className="w-full max-w-[584px] rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 px-12 py-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-xl font-bold text-white">Check your Email</h2>
            <p className="text-base font-normal text-white">
              We sent a password reset link to{" "}
              <span className="font-semibold">{email || "your email"}</span>
            </p>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="h-12 w-full rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors"
            >
              Open Email
            </button>

            <p className="text-base font-normal text-white">
              Didn&apos;t receive the email?{" "}
              <button className="text-[#5cab82] hover:underline font-medium">
                Click resend
              </button>
            </p>

            <button
              onClick={() => setStep(0)}
              className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#5cab82] transition-colors mt-2"
            >
              <IconArrowLeft />
              Back to Sign in
            </button>
          </div>
        </div>

        <AuthFooter />
      </div>
    );
  }

  
  if (step === 2) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#29724f] mb-4">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-[32px] font-bold text-white leading-tight">Reset Password</h1>
        </div>

        <div className="w-full max-w-[584px] rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 px-12 py-8">
          <p className="text-base font-light text-white mb-6">
            Set your password to your firmly account
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); setStep(3); }}
            className="flex flex-col gap-5"
          >
            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-white font-normal">New Password</label>
              <div className="flex items-center gap-3 h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-[#5cab82] transition-colors">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#72777a] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/50 hover:text-white shrink-0 transition-colors"
                >
                  <IconEye off={showPassword} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-white font-normal">Confirm Password</label>
              <div className="flex items-center gap-3 h-12 rounded-xl bg-white/8 border border-white/10 px-4 focus-within:border-[#5cab82] transition-colors">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
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

            {/* Password requirements */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IconCheckCircle active={hasMinLength} />
                <span className={`text-sm ${hasMinLength ? "text-[#5cab82]" : "text-white"}`}>
                  Must be at least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheckCircle active={hasSpecialChar} />
                <span className={`text-sm ${hasSpecialChar ? "text-[#5cab82]" : "text-white"}`}>
                  Must contain one special character
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors mt-1"
            >
              Continue
            </button>
          </form>
        </div>

        <AuthFooter />
      </div>
    );
  }

  /* ─── Step 3: Success ─── */
  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#29724f] mb-4">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <h1 className="text-[32px] font-bold text-white leading-tight">Reset Password</h1>
      </div>

      <div className="w-full max-w-[584px] rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 px-12 py-10">
        <div className="flex flex-col items-start gap-5">
          {/* Email icon with green bg */}
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#e2efe7]">
            <span className="text-[#29724f]"><IconSms /></span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">Successful</h2>
            <p className="text-base font-normal text-white leading-relaxed">
              Your password has been changed successfully.
              <br />
              Click below to login magically
            </p>
          </div>

          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#29724f] hover:bg-[#1e5c3a] text-white text-base font-bold transition-colors"
          >
            Continue
          </Link>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
