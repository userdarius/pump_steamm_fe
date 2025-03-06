// Token service for managing token data

// Define types for our token data
export interface TokenData {
  slug: string;
  name: string;
  symbol: string;
  description: string;
  mcap: string;
  price: number;
  imageUrl: string;
  contractAddress?: string;
  createdAt: number; // timestamp
  creatorAddress?: string;
  initialSupply: number;
  replies: number;
  holders?: Array<{
    address: string;
    amount: number;
    isBondingCurve?: boolean;
  }>;
  bondingCurveProgress: number;
  spotlightProgress: number;
}

// In a real app, this would be fetched from a database or blockchain
// For this demo, we'll store in localStorage
const TOKENS_STORAGE_KEY = "pump-steamm-tokens";

/**
 * Get all tokens
 */
export function getAllTokens(): TokenData[] {
  // Make sure we're in a browser environment
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const tokensString = localStorage.getItem(TOKENS_STORAGE_KEY);
    if (!tokensString) {
      // Return empty array if no tokens found
      return [];
    }

    return JSON.parse(tokensString);
  } catch (e) {
    console.error("Failed to parse tokens from storage", e);
    return [];
  }
}

/**
 * Get a token by its slug
 */
export function getTokenBySlug(slug: string): TokenData | null {
  const tokens = getAllTokens();
  return tokens.find((token) => token.slug === slug) || null;
}

/**
 * Create a new token
 */
export function createToken(
  tokenData: Omit<
    TokenData,
    | "createdAt"
    | "replies"
    | "mcap"
    | "bondingCurveProgress"
    | "spotlightProgress"
    | "slug"
  >
): TokenData {
  const tokens = getAllTokens();

  // Generate a slug from the token name
  const slug = tokenData.symbol.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Calculate initial market cap (price * initialSupply)
  const mcap = `$${((tokenData.price * tokenData.initialSupply) / 1000).toFixed(
    2
  )}K`;

  // Create the new token
  const newToken: TokenData = {
    ...tokenData,
    slug,
    mcap,
    createdAt: Date.now(),
    replies: 0,
    bondingCurveProgress: Math.random() * 100, // Random for demo
    spotlightProgress: Math.random() * 100, // Random for demo
    holders: [
      {
        address: tokenData.creatorAddress || "0x123456",
        amount: tokenData.initialSupply * 0.8,
        isBondingCurve: false,
      },
      {
        address: "0xBONDINGCURVE",
        amount: tokenData.initialSupply * 0.2,
        isBondingCurve: true,
      },
    ],
  };

  // Add to the list of tokens
  tokens.push(newToken);

  // Save back to localStorage
  try {
    // Make sure we're in a browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(tokens));
    }
  } catch (e) {
    console.error("Failed to save tokens to storage", e);
  }

  return newToken;
}

/**
 * Initialize with sample tokens if none exist
 */
export function initializeTokensIfEmpty(): void {
  // Make sure we're in a browser environment
  if (typeof window === "undefined") {
    return;
  }

  try {
    const tokens = getAllTokens();
    if (tokens.length === 0) {
      const sampleTokens: TokenData[] = [
        {
          slug: "fries",
          name: "FRIES TOKEN",
          symbol: "FRIES",
          description:
            "A decentralized token for french fries generation and distribution across the Sui network.",
          mcap: "$69.42K",
          price: 0.069,
          imageUrl: "/placeholder.png",
          contractAddress: "0x123...456",
          createdAt: Date.now() - 13 * 60 * 1000, // 13 minutes ago
          creatorAddress: "0x123456",
          initialSupply: 1000000,
          replies: 123,
          bondingCurveProgress: 69,
          spotlightProgress: 42,
          holders: [
            { address: "0xBONDINGCURVE", amount: 200000, isBondingCurve: true },
            { address: "0x123456", amount: 800000 },
          ],
        },
        {
          slug: "kawaiiii",
          name: "KAWAIIII",
          symbol: "KAWAII",
          description:
            "The cutest token on the Sui network with powerful utility.",
          mcap: "$42.69K",
          price: 0.042,
          imageUrl: "/placeholder.png",
          contractAddress: "0x789...012",
          createdAt: Date.now() - 25 * 60 * 1000, // 25 minutes ago
          creatorAddress: "0x789012",
          initialSupply: 1000000,
          replies: 89,
          bondingCurveProgress: 55,
          spotlightProgress: 38,
          holders: [
            { address: "0xBONDINGCURVE", amount: 200000, isBondingCurve: true },
            { address: "0x789012", amount: 800000 },
          ],
        },
      ];

      localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(sampleTokens));
    }
  } catch (e) {
    console.error("Failed to initialize tokens", e);
  }
}
