"use client";

import React, { useEffect, useState } from "react";
import { AuroraBackground } from "./ui/auroraBackground";
import { format } from 'date-fns';
import axiosInstance from "@/interceptors/axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


type Transaction = {
  title: string;
  datetime: string;
  description: string;
  credit?: string;
  debit?: string;
};

const TransactionsTable = () => {
 

  const [data, setData] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const showScroll = data.length > 10; 

  const calculateBalance = (transactions: Transaction[]): number => {
    return transactions.reduce((acc, { debit, credit }) => {
      if (credit) acc += parseFloat(credit) || 0;
      if (debit) acc -= parseFloat(debit) || 0;
      return acc;
    }, 0);
  };
  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/api/transaction');
        setData(response.data.transactions);
        setBalance(calculateBalance(response.data.transactions));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);
  

  const handleDownload = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(10);
    doc.text("Money Tracker", 14, 10);
    doc.text("Transaction History", 14, 27);
    doc.text(`Total Balance: ${balance}`, 160, 27);
  
    // Table
    doc.autoTable({
      head: [['Title', 'Date', 'Description', 'Credit', 'Debit']],
      body: data.map(transaction => [
        transaction.title,
        format(new Date(transaction.datetime), 'yyyy-MM-dd HH:mm'),
        transaction.description,
        transaction.credit || '',
        transaction.debit || ''
      ]),
      startY: 30,
      theme: 'grid',
      styles: {
        cellPadding: 2,
        fontSize: 10,
        valign: 'middle',
        halign: 'center'
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { cellWidth: 'wrap' },
        2: { cellWidth: 'wrap' },
        3: { cellWidth: 'wrap' },
        4: { cellWidth: 'wrap' }
      }
    });
  
    // Save the PDF
    doc.save('transaction-history.pdf');
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <AuroraBackground className="bg-black fixed top-0 left-0 w-full h-full z-0">
        <div></div>
      </AuroraBackground>

      <p className="text-xl text-white font-bold m-6 z-10 mt-10">Available balance: {balance} </p>
      <div className="flex items-end justify-end w-3/4 mb-2">
        <button 
          className="text-black z-10 flex items-end justify-end bg-gradient-to-br relative group/btn from-white dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 text-sm p-1 mt-6 text-center rounded-md h-7 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" 
          onClick={handleDownload}
          type="button"
        >
          Download History
        </button>  
      </div>  
      
      <div className={`w-4/5 ${showScroll ? 'overflow-y-auto h-96' : ''} z-10`}>
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead className="sticky top-0">
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-200">Title</th>
              <th className="px-4 py-2 border border-gray-200">Date</th>
              <th className="px-4 py-2 border border-gray-200">Description</th>
              <th className="px-4 py-2 border border-gray-200">Credit</th>
              <th className="px-4 py-2 border border-gray-200">Debit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
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
