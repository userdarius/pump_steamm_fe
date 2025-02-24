"use client";

import { ConnectButton } from "@mysten/dapp-kit";
import Image from "next/image";

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
        <button className="bg-transparent border border-purple-500 text-white px-6 py-2 rounded-lg">
          [launch a new coin]
        </button>
        <ConnectButton />
      </div>
    </nav>
  );
} 