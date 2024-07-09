"use client";

import React from "react";
import { AuroraBackground } from "./ui/auroraBackground";
import { format } from 'date-fns';
import { transactions } from "../data/data";

const TransactionsTable = () => {
  const showScroll = transactions.length > 10; 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <AuroraBackground className="bg-white fixed top-0 left-0 w-full h-full z-0">
        <div></div>
      </AuroraBackground>

      <div className={`w-4/5 ${showScroll ? 'overflow-y-auto h-80' : ''} z-10`}>
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-200">Title</th>
              <th className="px-4 py-2 border border-gray-200">Date</th>
              <th className="px-4 py-2 border border-gray-200">Description</th>
              <th className="px-4 py-2 border border-gray-200">Credit</th>
              <th className="px-4 py-2 border border-gray-200">Debit</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={`border border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-4 py-2">{transaction.title}</td>
                <td className="px-4 py-2">{format(new Date(transaction.datetime), 'yyyy-MM-dd HH:mm')}</td>
                <td className="px-4 py-2">{transaction.description}</td>
                <td className="px-4 py-2 text-green-600">{transaction.credit}</td>
                <td className="px-4 py-2 text-red-600">{transaction.debit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TransactionsTable;
