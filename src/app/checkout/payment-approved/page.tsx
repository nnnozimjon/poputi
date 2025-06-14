"use client";

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@mantine/core";

export default function PaymentApprovedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fbfc] px-4">
      <div className="flex flex-col items-center">
        <div className="bg-[#1fb6ff] bg-opacity-10 rounded-full p-4 mb-6 flex items-center justify-center">
          <FaCheckCircle className="text-[#1fb6ff]" size={48} />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1FB6FF] mb-2 text-center">
          Payment Approved
        </h1>
        <p className="text-[#8492a6] mb-8 text-center">
          Your payment was successfully processed
        </p>
        <div className="bg-[#FFF] rounded-xl shadow-md px-8 py-6 mb-8 w-full max-w-md">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <span className="text-[#8492a6] text-sm">Amount Paid</span>
              <div className="text-xl font-bold text-[#273444]">$249.99</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-[#8492a6]">
            <div>
              <span className="block text-[#8492a6]">Order ID</span>
              <span className="font-medium">#ORD-2023-11-26</span>
            </div>
            <div>
              <span className="block text-[#8492a6]">Date</span>
              <span className="font-medium">November 26, 2023</span>
            </div>
            <div>
              <span className="block text-[#8492a6]">Payment Method</span>
              <span className="font-medium">Visa ending in 4242</span>
            </div>
            <div>
              <span className="block text-[#8492a6]">Status</span>
              <span className="font-medium text-[#13ce66]">Confirmed</span>
            </div>
          </div>
        </div>
        <Link
          href="/"
          className="w-full max-w-md no-underline border-none"
        >
          <Button className="w-full bg-[#1fb6ff] hover:bg-[#054652] text-[#FFF] font-semibold py-3 rounded-lg transition mb-4 h-14">
            Return to Home
          </Button>
        </Link> 
      </div>
    </div>
  );
}
