"use client";

import React, { useState } from "react";
import logout from "@/public/pp.svg";

import { cn } from "@/utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navMenu";
import { useRouter } from "next/navigation";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        {/* Show userName instent of About */}
        <MenuItem setActive={setActive} active="" item="Money Tracker" imgSrc="">

        </MenuItem>

        <MenuItem
          setActive={setActive}
          active={active}
          item=""
          imgSrc={logout}
        >
          <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink onClick={handleLogout}>Log Out</HoveredLink>
            {/* <HoveredLink onClick={(}>My Profile</HoveredLink> */}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}