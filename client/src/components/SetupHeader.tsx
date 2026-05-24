import React from "react";
import { FirmlyLogo } from "./SignUp";

type Props = {
  setupStep: number;
  totalSteps: number;
  title: string;
  maxWidth?: string;
};

export default function SetupHeader({
  setupStep,
  totalSteps,
  title,
  maxWidth = "584px",
}: Props) {
  const pct = Math.round((setupStep / totalSteps) * 100);

  return (
    <div
      className="w-full flex flex-col items-center mb-6"
      style={{ maxWidth }}
    >
      <FirmlyLogo size={44} />

      <h2 className="mt-2 text-[22px] font-semibold text-white">
        Set up Your account
      </h2>

      <p className="text-sm font-light text-white/70 mt-0.5">
        Input your details to finish your account setup
      </p>

      <div className="w-full mt-5">
        <span className="text-sm font-bold text-white tracking-widest uppercase">
          STEP {setupStep} OF {totalSteps}
        </span>

        <h3 className="text-[30px] font-bold text-white mt-0.5">
          {title}
        </h3>

        <div className="h-1 rounded-full bg-white/15 mt-2 overflow-hidden">
          <div
            style={{ width: `${pct}%` }}
            className="h-full bg-firmly-primary rounded-full transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}