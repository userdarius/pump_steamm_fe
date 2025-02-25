"use client";

import { ConnectButton } from "@mysten/dapp-kit";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <nav className="flex justify-between items-center mb-12 px-4">
      <div className="flex items-center gap-2">
        <Image
          src="/rabbit-logo.png"
          alt="Fullsend Logo"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="font-bold">FULLSEND.LOL</span>
          <span className="text-xs text-gray-400">CHASE THE RABBIT</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="/launch" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 font-medium"
        >
          <span>launch a new coin</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
        <ConnectButton />
      </div>
    </nav>
  );
} 