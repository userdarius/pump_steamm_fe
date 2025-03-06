"use client";

import { useEffect } from "react";
import { initializeTokensIfEmpty } from "@/services/tokenService";
import { initializeWallet } from "@/services/walletService";

/**
 * Component for initializing client-side services
 * This is used in the layout to ensure tokens are initialized
 * without making the layout a client component
 */
export default function TokenInitializer() {
  useEffect(() => {
    // Initialize tokens if needed
    initializeTokensIfEmpty();

    // Initialize wallet if available
    initializeWallet();
  }, []);

  // This component doesn't render anything
  return null;
}
