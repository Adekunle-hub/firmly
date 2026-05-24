"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import AuthFooter from "@/components/AuthFooter";
import {
  IconUser,
  IconEye,
  IconCheckSquare,
  IconGoogle,
  IconLock,
} from "@/utils/Icons";
import { OtpInputProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { simulateLoginApi } from "@/utils/mockAuthApi";
import { toast } from "sonner";
import { setCredentials } from "@/store/slice/authSlice";
import { MOCK_USERS } from "@/utils/mockDatabase";
import BackgroundLoader from "./BackgroundLoader";

function FirmlyLogo() {
  return (
    <Image src="/images/logo.png" alt="Firmly Logo" width={48} height={48} />
  );
}

function OtpInput({
  value,
  onChange,
  hasError,
}: OtpInputProps & { hasError?: boolean }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = v;
    onChange(next.join(""));
    if (v && idx < 5) inputs.current[idx + 1]?.focus();
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  }

  return (
    <div className="flex gap-2 flex-wrap md:gap-3 justify-center w-full">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`w-15 h-15 rounded-sm border text-white text-2xl font-semibold text-center outline-none transition-colors
            ${
              hasError
                ? "bg-red-950/40 border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                : "bg-[#333838] border-white/15 focus:border-firmly-link focus:ring-1 focus:ring-firmly-link"
            }`}
        />
      ))}
    </div>
  );
}

function InlineError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 mt-1.5 text-sm text-red-400">
      <svg
        className="w-3.5 h-3.5 shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4.5zm0 6.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
      </svg>
      {message}
    </p>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credError, setCredError] = useState("");
  const [otpError, setOtpError] = useState("");

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  const handleNextStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setCredError("");

    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return;

    const user = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (!user) {
      setCredError("Invalid email or password credentials.");
      return;
    }

    setStep(1);
  };

  const handleFinalAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtpError("");

    if (otp.length < 6) {
      setOtpError("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await simulateLoginApi(email, password, otp);

      dispatch(
        setCredentials({ user: result.user, accessToken: result.accessToken }),
      );

      Cookies.set("firmly_auth_token", result.accessToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("firmly_user_email", email, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      toast.success("User logged in successfully!");
      router.push("/");
    } catch (err: any) {
      if (
        err.message?.toLowerCase().includes("code") ||
        err.message?.toLowerCase().includes("otp")
      ) {
        setOtpError(err.message);
      } else {
        toast.error(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  if(isSubmitting)<BackgroundLoader/>

  if (step === 0) {
    return (
      <main className="w-full flex flex-col items-center py-4 md:py-10">
        <div className="mb-2 md:mb-6 flex flex-col items-center text-center">
          <FirmlyLogo />
          <h1 className="mt-3 text-[32px] font-bold text-white leading-tight tracking-tight">
            Login to Firmly
          </h1>
        </div>

        <form
          onSubmit={handleNextStep}
          className="w-full max-w-150 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 px-4 md:px-8 py-4 md:py-8 flex flex-col gap-5"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm md:text-base text-white font-sans">
              Email
            </label>
            <div
              className={`flex items-center gap-3 h-11 rounded-xl bg-white/8 border px-4 focus-within:border-firmly-link transition-colors ${emailError || credError ? "border-red-500" : "border-white/10"}`}
            >
              <span className="text-white/50 shrink-0">
                <IconUser />
              </span>
              <input
                type="email"
                placeholder="Username or email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setCredError("");
                }}
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
              />
            </div>
            <InlineError message={emailError} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-sm md:text-base text-white font-normal">
                Password
              </label>
              <Link
                href="/reset-password"
                className="text-sm cursor-pointer font-semibold text-firmly-link hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div
              className={`flex items-center gap-2 md:gap-3 h-11 rounded-xl bg-white/8 border px-4 focus-within:border-firmly-link transition-colors ${passwordError || credError ? "border-red-500" : "border-white/10"}`}
            >
              <span className="text-white/50 shrink-0">
                <IconLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                  setCredError("");
                }}
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/50 hover:text-white cursor-pointer shrink-0 transition-colors"
              >
                <IconEye off={showPassword} />
              </button>
            </div>
            <InlineError message={passwordError} />
          </div>

          <InlineError message={credError} />

          <button
            type="button"
            onClick={() => setRemember(!remember)}
            className="flex cursor-pointer items-center gap-2 w-fit"
          >
            <IconCheckSquare checked={remember} />
            <span className="text-sm text-white">Remember Me</span>
          </button>

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-firmly-primary hover:bg-firmly-primary-hover text-white text-base cursor-pointer font-bold transition-colors"
          >
            Continue
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-3 h-11 w-full rounded-xl bg-white text-[#000b1e] text-sm font-semibold hover:bg-white/90 transition-colors border border-white/20"
          >
            <IconGoogle />
            Sign in with Google
          </button>

          <p className="text-sm text-white text-center">
            Do not have an account?{" "}
            <Link
              href="/signup"
              className="text-[#FFD964] hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>

        <AuthFooter />
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col items-center py-10">
      <section className="mb-6 flex flex-col items-center text-center">
        <FirmlyLogo />
        <h1 className="mt-3 text-[32px] font-bold text-white leading-tight tracking-tight">
          Login to Firmly
        </h1>
      </section>

      <form
        onSubmit={handleFinalAuthSubmit}
        className="w-full max-w-150 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 md:px-12 px-4 sm:px-8 py-8 flex flex-col gap-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-medium text-white mb-1">
            Verify your Identity
          </h2>
          <p className="text-base font-light text-white/80">
            We sent a code to{" "}
            <span className="font-medium text-white">
              {email || "your email"}
            </span>
          </p>
        </div>

        <OtpInput
          value={otp}
          onChange={(val) => {
            setOtp(val);
            setOtpError("");
          }}
          hasError={!!otpError}
        />

        {otpError && (
          <div className="flex justify-center">
            <InlineError message={otpError} />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full max-w-120 cursor-pointer mx-auto flex items-center justify-center rounded-xl bg-firmly-primary hover:bg-firmly-primary-hover disabled:bg-slate-500 text-white text-base font-bold transition-colors"
        >
          {isSubmitting ? "Authenticating Session..." : "Verify & Login"}
        </button>

        <p className="text-sm text-white text-center">
          Didn&apos;t receive an email?{" "}
          <button
            type="button"
            onClick={() =>
              toast.info("A new OTP sequence was sent to your inbox.")
            }
            className="text-[#FFD964] hover:underline cursor-pointer font-semibold"
          >
            Resend
          </button>
        </p>
      </form>

      <AuthFooter />
    </main>
  );
}
