"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CreditCard,
  CalendarCheck,
  FileText,
  BarChart2,
  AlertTriangle,
  ClipboardList,
  Users2,
  Settings2,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainNav = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Client Management", href: "/clients", icon: Users },
  { label: "Case Management", href: "/cases", icon: FolderOpen },
  {
    label: "Invoicing & Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    label: "Calendar & Task",
    href: "/calendar",
    icon: CalendarCheck,
  },
  { label: "Documents", href: "/documents", icon: FileText },
  // { label: "Tasks", href: "/research", icon: ClipboardList },
  {
    label: "Analytics & Reports",
    href: "/analytics",
    icon: BarChart2,
  },
];

// const complianceNav = [
//   {
//     label: "Conflicts Check",
//     href: "/conflicts",
//     icon: AlertTriangle,
//     badge: 2,
//   },
//   {
//     label: "Annual Certificate Register",
//     href: "/certificates",
//     icon: ClipboardList,
//   },
// ];

const settingsNav = [
  // { label: "Team", href: "/team", icon: Users2 },
  { label: "Settings", href: "/settings", icon: Settings2 },
];

function NavItems({
  items,
}: {
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        console.log({
          pathname,
          href: item.href,
          isActive,
        });

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                "my-1 h-10 rounded-sm px-3",
                "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                "data-[active=true]:bg-[#1A4331] data-[active=true]:text-white",
                "data-[active=true]:hover:bg-[#1A4331]",
              )}
            >
              <Link href={item.href}>
                <Icon
                  size={16}
                  className={cn(
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-600",
                  )}
                />

                <span>{item.label}</span>

                {item.badge && (
                  <span className="ml-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarHeader>
        <div className="flex items-center justify-center py-4">
          <Image
            src="/images/dashboard-logo.webp"
            alt="Logo"
            width={80}
            height={50}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <NavItems items={mainNav} />
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel>Compliance</SidebarGroupLabel>
          <NavItems items={complianceNav} />
        </SidebarGroup> */}

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <NavItems items={settingsNav} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-12 px-4 text-white">
        <footer className="flex items-center bg-[#1A4331] py-4 px-2 rounded-sm justify-between ">
          <div className="bg-[#10B98133] rounded-full p-2">
            <Zap color="#34D399" size={15} />
          </div>
          <div className="flex flex-col ">
            <p className="text-xs font-semibold m-0 p-0">Pro Plan Active</p>
            <span className="text-[10px] text-[#FFFFFF80]">Next billing Dec 12</span>
          </div>

          <button className="text-xs  text-[#055939] font-semibold bg-white px-1 py-1 rounded-sm">
            Upgrade
          </button>
        </footer>
      </SidebarFooter>
    </Sidebar>
  );
}
