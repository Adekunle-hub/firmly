"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationIcon } from "@/utils/Icons";
import { Input } from "./ui/input";
import Image from "next/image";
import { useState } from "react";
import UserProfileDropdown from "./UserProfileDropdown";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slice/authSlice";
import { formatDateTime } from "@/utils/formatDateTime";
import NotificationsDropdown from "./NotificationsTab";

export default function Header() {
  const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false);
 
const user = useSelector(selectUser);
const firmName = user?.firmName ?? "";
const role = user?.role ?? "";
 
  return (
    <header className="sticky top-0 z-20 bg-white border h-fit md:h-18 py-2">
      <div className="flex items-center justify-between h-full md:px-3 px-2 ">
        <section className="flex items-center gap-3 ">
          <SidebarTrigger className="cursor-pointer" size="xs" />

          <div className="flex flex-col">
            <div className="flex text-sm flex-wrap text-[#0A0D14] font-bold gap-1 ">
              Good Morning,
              <br className="md:hidden" /> {firmName}{" "}
              <div className="flex items-center md:flex-row flex-col gap-1">
                <Image
                  src="/images/Vector.png"
                  alt="vector"
                  width={20}
                  height={20}
                  className="w-4 h-5 hidden md:block"
                />

                <span className="text-black text-md md:block hidden leading-none">
                  •
                </span>

                <span className="text-[#868C98] md:block hidden font-bold  text-xs">
                  {role}
                </span>
              </div>
            </div>
            <p className="text-xs hidden sm:block text-[#868C98]">
              {formatDateTime()}
            </p>
          </div>
        </section>

        <div className="w-1/3 hidden md:block">
          <Input className="bg-[#F0F9F4] " placeholder="Search here..." />
        </div>

        <section className="flex items-center gap-2">
          <div className="bg-[#F0F2F5] w-10 cursor-pointer flex items-center justify-center h-10 rounded-full">
            <NotificationsDropdown />
          </div>

          <UserProfileDropdown avatarUrl="/images/ede.jpg" userName="Dapo" />
        </section>
      </div>
   
    </header>
  );
}
