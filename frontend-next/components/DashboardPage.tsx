"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { AuroraBackground } from "@/components/ui/auroraBackground";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import Link from "next/link";
import DashboardPrice from "./DashboardPrice";
import axiosInstance from "@/interceptors/axios";
import { toast } from "react-toastify";

type Transaction = {
  title: string;
  datetime: string;
  description: string;
  credit?: number;
  debit?: number;
};

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    title: "",
    datetime: "",
    description: "",
    credit: "",
    debit: "",
  });
  const [data, setData] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  const calculateBalance = (transactions: Transaction[]): number => {
    return transactions.reduce((acc, transaction) => {
      const { debit = 0, credit = 0 } = transaction || {};
      acc += credit;
      acc -= debit;
      return acc;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/transaction", formData);

      // Re-fetch the transaction data to ensure we have the latest data
      fetchTransactions();

      setFormData({ title: "", datetime: "", description: "", credit: "", debit: "" });
      toast.success('Transaction added successfully!', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to add transaction. Please try again later.', { position: 'top-right' });
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get('/api/transaction');
      setData(response.data.transactions);
      setBalance(calculateBalance(response.data.transactions));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTransactionsMemoized = useCallback(() => {
    fetchTransactions();
  }, []);
  
  useEffect(() => {
    fetchTransactionsMemoized();
  }, [fetchTransactionsMemoized]);
  
  const displayLimit = 3;
  const reversedData = [...data].reverse();
  const displayData = reversedData.slice(0, displayLimit);

  
  const handleClickTransaction = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = true; 
        if (isSuccess) {
          resolve("Data loaded successfully");
        } else {
          reject(new Error("Failed to load data"));
        }
      }, 2000);
    });

    toast.promise(
      promise,
      {
        pending: "Loading...",
        success: "Loaded successfully 👌",
        error: "Error loading data 🤯",
      }
    );
  };


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
        <main className="flex min-h-screen flex-col md:flex-row items-center justify-center gap-20">
          <div className="max-w-md w-full mx-auto rounded-none mt-20 md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Fill Your Debit and Credit
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Bag"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="datetime">Date</Label>
                  <Input
                    id="datetime"
                    placeholder="Select a date"
                    type="date"
                    value={formData.datetime}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </LabelInputContainer>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="credit">Credit</Label>
                  <Input
                    id="credit"
                    placeholder="Credit amount"
                    type="number"
                    value={formData.credit}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="debit">Debit</Label>
                  <Input
                    id="debit"
                    placeholder="Debit amount"
                    type="number"
                    value={formData.debit}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>
              </div>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Add Transaction&rarr;
                <BottomGradient />
              </button>
            </form>
          </div>

          <div className="flrx items-center justify-center">
            <div className="flex flex-row items-center justify-between">
              <h1></h1>
              <p className="text-left font-bold underline hover:underline-offset-4 md:underline-offset-4">Available balance: {balance}</p>
            </div>

            {displayData.map(({ title, datetime, description, debit, credit }, index) => (
              <DashboardPrice
                key={`${datetime}-${index}`}
                title={title}
                datetime={datetime}
                description={description}
                credit={credit}
                debit={debit}
              />
            ))}
            {data.length > displayLimit && (
              <Link href={`/table`} passHref>
                <button 
                 onClick={handleClickTransaction}
                  className="bg-gradient-to-br relative group/btn from-white dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-black text-sm p-1 mt-6 text-center rounded-md h-7 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                >
                  Click here to see more
                </button>
              </Link>
            )}
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
