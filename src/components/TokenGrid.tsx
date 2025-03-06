"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  TokenData,
  getAllTokens,
  initializeTokensIfEmpty,
} from "@/services/tokenService";
import { TokenImage } from "./TokenImage";

export function TokenGrid() {
  const [tokens, setTokens] = useState<TokenData[]>([]);

  useEffect(() => {
    // Initialize tokens if none exist (first time the app is loaded)
    initializeTokensIfEmpty();

    // Load tokens from our service
    setTokens(getAllTokens());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {tokens.map((token, i) => (
        <TokenCard key={i} token={token} />
      ))}
    </div>
  );
}

function TokenCard({ token }: { token: TokenData }) {
  // Format time difference
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds} SEC AGO`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} MIN AGO`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} HOUR${hours !== 1 ? "S" : ""} AGO`;

    const days = Math.floor(hours / 24);
    return `${days} DAY${days !== 1 ? "S" : ""} AGO`;
  };

  return (
    <Link href={`/token/${token.slug}`} className="block">
      <div className="bg-[#081040] p-4 rounded-lg hover:bg-[#0A1550] transition-colors cursor-pointer">
        <div className="aspect-square bg-[#0A1550] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <TokenImage
            src={token.imageUrl}
            alt={token.symbol}
            width={200}
            height={200}
          />
        </div>
        <h3 className="font-bold">{token.name}</h3>
        <p className="text-green-400 text-lg font-semibold mb-2">
          {token.mcap} MCAP
        </p>
        <p className="text-gray-300 mb-3">{token.description}</p>
        <div className="flex justify-between text-sm text-gray-400">
          <p>{getTimeAgo(token.createdAt)}</p>
          <p>{token.replies} REPLIES</p>
        </div>
      </div>
    </Link>
  );
}
