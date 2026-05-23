import React from "react";
import { IconGlobe, IconChevronDownSmall } from "../utils/Icons";

type Props = {
  maxWidth?: string;
};

export default function AuthFooter({ maxWidth = "584px" }: Props) {
  const links = ["Terms", "Privacy", "Docs", "Helps"];

  return (
    <div
      className="mt-8 flex w-full items-center justify-between"
      style={{ maxWidth }}
    >
   
      <div className="flex items-center gap-1">
        {links.map((t, i) => (
          <span key={t} className="flex items-center gap-1">
            <a
              href="#"
              className="text-sm text-firmly-muted hover:text-white transition-colors"
            >
              {t}
            </a>

            {i < links.length - 1 && (
              <span className="text-firmly-muted text-xs">·</span>
            )}
          </span>
        ))}
      </div>

     
      <button className="flex items-center gap-1.5 text-sm text-firmly-muted hover:text-white transition-colors">
        <IconGlobe />
        <span>English</span>
        <IconChevronDownSmall />
      </button>
    </div>
  );
}