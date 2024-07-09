"use client";

import React, { useState, useEffect } from "react"; // Import useEffect for side-effects
import logout from "@/public/pp.svg";

import { cn } from "@/utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navMenu";
import { useRouter } from "next/navigation";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>(""); // State to hold full name
  const router = useRouter();

  useEffect(() => {
    // Fetch and set full name when component mounts
    const firstName = localStorage.getItem('firstName') || "";
    const lastName = localStorage.getItem('lastName') || "";
    setFullName(`${firstName} ${lastName}`);
  }, []); // Empty dependency array ensures this runs only once

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={""} item={fullName} imgSrc={""}>
          
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item={""} imgSrc={logout}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={handleLogout}>Log Out</HoveredLink>
            {/* Uncomment to add My Profile link */}
            {/* <HoveredLink onClick={}>My Profile</HoveredLink> */}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
