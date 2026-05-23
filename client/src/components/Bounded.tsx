import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Bounded({ children }: Props) {
  return (
    <main className="flex  flex-1 flex-col p-3  py-2 sm:p-4 md:p-6 overflow-y-auto no-scrollbar space-y-5 w-full">
      {children}
    </main>
  );
}
