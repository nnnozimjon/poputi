"use client";

import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@mantine/core";

const TransactionDetails = () => (
  <div className="w-full bg-[#f9fbfc] rounded-lg border border-[#f3d6d6] px-6 py-4 mb-6">
    <h2 className="text-center text-[#8492a6] text-sm font-semibold mb-4">Transaction Details</h2>
    <div className="grid grid-cols-2 gap-y-2 text-sm">
      <div className="text-[#8492a6]">Amount</div>
      <div className="text-right text-[#273444] font-medium">$249.00</div>
      <div className="text-[#8492a6]">Order ID</div>
      <div className="text-right text-[#273444] font-medium">PORD-2023-11-16-490</div>
      <div className="text-[#8492a6]">Date</div>
      <div className="text-right text-[#273444] font-medium">November 16, 2023</div>
      <div className="text-[#8492a6]">Status</div>
      <div className="text-right text-[#D84040] font-medium">FAILED</div>
      <div className="text-[#8492a6]">Reason</div>
      <div className="text-right text-[#273444] font-medium">Insufficient funds</div>
    </div>
  </div>
);

const ActionButtons = () => (
  <div className="flex flex-col md:flex-row gap-3 w-full mb-2">
    <Button
      className="w-full bg-[#D84040] hover:bg-[#b32c2c] text-white font-semibold py-3 rounded-lg transition h-12"
      component={Link}
      href="/checkout"
    >
      Try Again
    </Button>
    <Button
      className="w-full border border-[#D84040] text-[#D84040] bg-white hover:bg-[#ffeded] font-semibold py-3 rounded-lg transition h-12"
      variant="outline"
      component={Link}
      href="/"
    >
      Return to Home
    </Button>
  </div>
);


export default function PaymentDeclinedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fbfc] px-4">
      <div className="flex flex-col items-center max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-[#ffeded] rounded-full p-4 mb-4 flex items-center justify-center">
            <FaExclamationTriangle className="text-[#D84040]" size={40} />
          </div>
          <h1 className="text-2xl font-semibold text-[#D84040] mb-1 text-center">
            Payment Declined
          </h1>
          <p className="text-[#8492a6] text-center text-sm mb-2">
            Unfortunately, your payment could not be processed.
          </p>
        </div>
        <TransactionDetails />
        <ActionButtons />
      </div>
    </div>
  );
}
