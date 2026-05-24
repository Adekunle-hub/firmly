import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <img
        src="/images/onboard-bg.webp"
        alt="Background pattern"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4">
        {children}
      </div>
    </div>
  );
}
