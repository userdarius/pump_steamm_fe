// Wallet service for managing wallet connections

// Simple wallet state management
let currentWallet: string | null = null;
const WALLET_STORAGE_KEY = "pump-steamm-wallet";

/**
 * Check if wallet is connected
 */
export function isWalletConnected(): boolean {
  // Make sure we're in a browser environment
  if (typeof window === "undefined") {
    return false;
  }

  // First check our in-memory state
  if (currentWallet) {
    return true;
  }

  // Then check localStorage
  try {
    const savedWallet = localStorage.getItem(WALLET_STORAGE_KEY);
    if (savedWallet) {
      currentWallet = savedWallet;
      return true;
    }
  } catch (e) {
    console.error("Failed to check wallet connection", e);
  }

  return false;
}

/**
 * Get the current wallet address
 */
export function getWalletAddress(): string | null {
  // Make sure we're in a browser environment
  if (typeof window === "undefined") {
    return null;
  }

  // First check our in-memory state
  if (currentWallet) {
    return currentWallet;
  }

  // Then check localStorage
  try {
    const savedWallet = localStorage.getItem(WALLET_STORAGE_KEY);
    if (savedWallet) {
      currentWallet = savedWallet;
      return savedWallet;
    }
  } catch (e) {
    console.error("Failed to get wallet address", e);
  }

  return null;
}

/**
 * Connect a wallet
 */
export function connectWallet(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Make sure we're in a browser environment
    if (typeof window === "undefined") {
      reject(new Error("Cannot connect wallet in server environment"));
      return;
    }

    // In a real app, this would interact with MetaMask or other wallet providers
    // For this demo, we'll just generate a random address
    try {
      const randomWallet = `0x${Math.floor(Math.random() * 10000000000000000)
        .toString(16)
        .padStart(16, "0")}`;

      // Save to localStorage for persistence
      localStorage.setItem(WALLET_STORAGE_KEY, randomWallet);

      // Update in-memory state
      currentWallet = randomWallet;

      // Resolve with the wallet address
      resolve(randomWallet);
    } catch (e) {
      console.error("Failed to connect wallet", e);
      reject(new Error("Failed to connect wallet"));
    }
  });
}

/**
 * Disconnect the wallet
 */
export function disconnectWallet(): void {
  // Make sure we're in a browser environment
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Clear from localStorage
    localStorage.removeItem(WALLET_STORAGE_KEY);

    // Clear in-memory state
    currentWallet = null;
  } catch (e) {
    console.error("Failed to disconnect wallet", e);
  }
}

/**
 * Initialize wallet from localStorage if available
 */
export function initializeWallet(): void {
  // This just ensures the current wallet is loaded from localStorage
  getWalletAddress();
}
