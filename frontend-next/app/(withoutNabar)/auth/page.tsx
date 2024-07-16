"use client";
import React, { useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { AuroraBackground } from "@/components/ui/auroraBackground";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/interceptors/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";



export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    setIsLoading(true);
  
    try {
      // Simulate async login process with axiosInstance
      const response = await axiosInstance.post("/api/login", formData);
      Cookies.set("access", response.data.token, { expires: 1 });
  
      // Fetch profile after successful login
      const profile = await axiosInstance.get("/api/profile");
      localStorage.setItem("firstName", profile.data.user.firstName);
      localStorage.setItem("lastName", profile.data.user.lastName);
  
      // Use toast.promise for showing pending, success, and error messages
      await toast.promise(
        // Provide the Promise directly for the pending message
        new Promise((resolve) => setTimeout(resolve, 1000)), // Example delay, replace with actual login process
        {
          pending: 'Logging in...',
          success: 'Login Success',
          error: 'Login failed, try again'
        }
      );
  
      router.push('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          await toast.warning('Check your Email or Password');
        } else {
          await toast.error('Login failed, try again');
        }
      } else {
        console.error("Login failed:", err);
        await toast.error('Login failed, try again');
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  const handleSignupClick = () => {
    setIsLoading(true);
    router.push("/auth/signup")
    setIsLoading(false);

  }

  return (
    <AuroraBackground className="bg-black">
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
          <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Welcome Back to Money Tracker
            </h2>
            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="Navneetjha2012@gmail.com" type="email" onChange={handleInputChange} value={formData.email} required />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} onChange={handleInputChange} value={formData.password} required 
                />
                <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-2 right-14 -top-36 "
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
              </LabelInputContainer>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Login →
                {/* {isLoading ? 'Logging in...' : 'Login →'}
                {isLoading && <BottomGradient />} */}
                <BottomGradient />
              </button>

              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

              <h2 className="font-bold text-xl text-center m-4 text-neutral-800 dark:text-neutral-200">
                Already have an account?
              </h2>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="button"
                onClick={handleSignupClick}
              >
                SignUp &rarr;
                <BottomGradient />
              </button>

              <div className="flex flex-col space-y-4 m-7">

                {/* <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                  </span>
                  <BottomGradient />
                </button> */}




              </div>
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
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};


