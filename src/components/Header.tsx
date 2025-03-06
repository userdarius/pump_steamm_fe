"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  connectWallet,
  disconnectWallet,
  getWalletAddress,
  isWalletConnected,
} from "@/services/walletService";

export function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check wallet connection on mount
    const connected = isWalletConnected();
    if (connected) {
      setWalletAddress(getWalletAddress());
    }
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    setWalletAddress(null);
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>

        {/* Custom wallet button */}
        {walletAddress ? (
          <div className="relative group">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              onClick={handleDisconnectWallet}
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </button>
            <div className="absolute hidden group-hover:block right-0 mt-2 bg-gray-800 rounded-lg shadow-xl p-2 z-10">
              <button
                className="w-full text-white text-sm px-3 py-1 hover:bg-gray-700 rounded"
                onClick={handleDisconnectWallet}
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={handleConnectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </div>
    </nav>
  );
}
