"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CreditCard,
  CalendarCheck,
  FileText,
  BookOpen,
  BarChart2,
  AlertTriangle,
  ClipboardList,
  Users2,
  Settings2,
  Scale,
  Zap,
} from "lucide-react";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Client Management", href: "/dashboard/clients", icon: Users },
  { label: "Case Management", href: "/dashboard/cases", icon: FolderOpen },
  { label: "Invoicing & Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Calendar & Task", href: "/dashboard/calendar", icon: CalendarCheck },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Legal Research Tool", href: "/dashboard/research", icon: BookOpen },
  { label: "Analytics & Reports", href: "/dashboard/analytics", icon: BarChart2 },
];

const complianceNav = [
  { label: "Conflicts Check", href: "/dashboard/conflicts", icon: AlertTriangle, badge: 2 },
  { label: "Annual Certificate Register", href: "/dashboard/certificates", icon: ClipboardList },
];

const settingsNav = [
  { label: "Team", href: "/dashboard/team", icon: Users2 },
  { label: "System", href: "/dashboard/system", icon: Settings2 },
];

function NavItem({
  href,
  icon: Icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-4 py-2 text-sm font-medium rounded-none transition-all duration-150 group",
        isActive
          ? "bg-[#1a7a4a] text-white"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <Icon
        size={15}
        className={cn(
          "shrink-0 transition-colors",
          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
        )}
      />
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pt-4 pb-1 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
      {children}
    </p>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1a7a4a]">
          <Scale size={14} className="text-white" />
        </div>
        <span className="text-[17px] font-bold tracking-tight text-slate-900">Firmly</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        <SectionLabel>Main Menu</SectionLabel>
        <ul>
          {mainNav.map((item) => (
            <li key={item.href}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>

        <SectionLabel>Compliance</SectionLabel>
        <ul>
          {complianceNav.map((item) => (
            <li key={item.href}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>

        <SectionLabel>Settings</SectionLabel>
        <ul>
          {settingsNav.map((item) => (
            <li key={item.href}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 px-3 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#1a7a4a] shrink-0" />
          <span className="text-[11px] font-medium text-slate-500">Pro Plan · Active</span>
        </div>
        <button className="flex items-center gap-1 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-[#1a7a4a]">
          <Zap size={10} />
          Upgrade
        </button>
      </div>
    </aside>
  );
}