"use client"

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { AuroraBackground } from "@/components/ui/auroraBackground";
import { motion } from "framer-motion";
import axiosInstance from "@/interceptors/axios";

export default function SignupPage() {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",

  });

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePicture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
       await axiosInstance.post("/api/signup", formData);
      
      router.push("/");
    } catch (error) {
      console.error("Signup failed:", error);
      
    }
  };

  const handleLoginClick = () => {
    router.push("/");
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="max-w-md w-full  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Welcome to Money Tracker
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Login to money tracker if you can because we don&apos;t have a login flow
              yet
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Navneet" type="text" onChange={handleInputChange} value={formData.firstName} required />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Jha" type="text" onChange={handleInputChange} value={formData.lastName} required />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <Input id="profilePicture" type="file" accept="image/*" onChange={handleProfilePictureChange} />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="Navneetjha2012@gmail.com" type="email" onChange={handleInputChange} value={formData.email} required />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type="password" onChange={handleInputChange} value={formData.password} required />
              </LabelInputContainer>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Sign up &rarr;
                <BottomGradient />
              </button>

              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

              <h2 className="font-bold text-xl text-center m-3 text-neutral-800 dark:text-neutral-200">
                Already have an account?
              </h2>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="button"
                onClick={handleLoginClick}
              >
                Login &rarr;
                <BottomGradient />
              </button>
            </form>
          </div>
        </main>
      </motion.div>
    </AuroraBackground>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
