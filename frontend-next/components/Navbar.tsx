"use client";

import React, { useState, useEffect } from "react"; 
import logout from "@/public/pp.svg";

import { cn } from "@/utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navMenu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>(""); 
  const router = useRouter();

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || "";
    const lastName = localStorage.getItem('lastName') || "";
    setFullName(`${firstName} ${lastName}`);
  }, []); 

  // Function to clear all cookies
  const clearAllCookies = () => {
    const allCookies = Cookies.get(); 
    for (const cookieName in allCookies) {
      Cookies.remove(cookieName); 
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearAllCookies();
    console.log('All cookies have been cleared.');
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
            {/* <HoveredLink onClick={}>My Profile</HoveredLink> */}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
