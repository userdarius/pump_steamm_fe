"use client";

import { Header } from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getTokenBySlug,
  initializeTokensIfEmpty,
  TokenData,
} from "@/services/tokenService";
import { TokenImage } from "@/components/TokenImage";

export default function TokenPage({ params }: { params: { slug: string } }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1D");
  const [token, setToken] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialize tokens if none exist
    initializeTokensIfEmpty();

    // Get the token data
    const tokenData = getTokenBySlug(params.slug);
    setToken(tokenData);
    setLoading(false);
  }, [params.slug]);

  // Format time difference
  const getTimeAgo = (timestamp: number) => {
    if (!timestamp) return "UNKNOWN";

    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds} SEC AGO`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} MIN AGO`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} HOUR${hours !== 1 ? "S" : ""} AGO`;

    const days = Math.floor(hours / 24);
    return `${days} DAY${days !== 1 ? "S" : ""} AGO`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050B2E] text-white p-4">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-xl">Loading token data...</p>
        </div>
      </main>
    );
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-[#050B2E] text-white p-4">
        <Header />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-2xl">Token not found</p>
          <Link
            href="/"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Return to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050B2E] text-white p-4">
      <Header />

      {/* Token Name and Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link
            href="/"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            HOME
          </Link>
          <span className="opacity-70">/</span>
          <span>{token.symbol}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section - 2/3 width on desktop */}
        <div className="lg:col-span-2 bg-[#081040] rounded-lg p-4">
          {/* Timeframe Selection */}
          <div className="flex mb-4 gap-2 justify-end">
            {["1H", "1D", "1W", "1M", "ALL"].map((timeframe) => (
              <button
                key={timeframe}
                className={`px-2 py-1 rounded text-xs ${
                  selectedTimeframe === timeframe
                    ? "bg-blue-500 text-white"
                    : "bg-[#122250] text-gray-300"
                }`}
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </button>
            ))}
          </div>

          <div className="h-96 border border-[#152767] rounded relative overflow-hidden">
            {/* Placeholder for the chart */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              {selectedTimeframe} Chart for {token.symbol} will be implemented
              here
            </div>
          </div>
        </div>

        {/* Buy/Sell Section - 1/3 width on desktop */}
        <div className="bg-[#081040] rounded-lg p-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button className="bg-[#8eff8e] text-black font-bold py-3 rounded">
              BUY
            </button>
            <button className="bg-[#122250] text-white font-bold py-3 rounded">
              SELL
            </button>
          </div>

          <div className="flex justify-end mb-4">
            <div className="text-xs opacity-70">SET MAX SLIPPAGE</div>
          </div>

          <div className="flex mb-4">
            <div className="flex-1 bg-[#122250] rounded p-3 flex justify-between items-center">
              <span>SUI</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <button className="px-2 py-1 bg-[#122250] rounded text-xs">
              RESET
            </button>
            <button className="px-2 py-1 bg-[#122250] rounded text-xs">
              1 SUI
            </button>
            <button className="px-2 py-1 bg-[#122250] rounded text-xs">
              5 SUI
            </button>
            <button className="px-2 py-1 bg-[#122250] rounded text-xs">
              10 SUI
            </button>
            <button className="px-2 py-1 bg-[#122250] rounded text-xs">
              25 SUI
            </button>
            <button className="px-2 py-1 bg-[#122250] rounded text-xs">
              ALL
            </button>
          </div>

          <button className="w-full bg-[#8eff8e] text-black font-bold py-3 rounded mb-4">
            PLACE ORDER
          </button>

          {/* Token Info */}
          <div className="flex gap-4 mb-4">
            <div className="w-20 h-20">
              <TokenImage
                src={token.imageUrl}
                alt={token.symbol}
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-bold">{token.name}</h3>
              <p className="text-green-400 font-semibold">{token.mcap} MCAP</p>
              <p className="text-sm opacity-70">
                {getTimeAgo(token.createdAt)}
              </p>
              <p className="text-sm opacity-70">
                CONTRACT: {token.contractAddress || "0x123...456"}
              </p>
              <p className="text-sm opacity-70">REPLIES: {token.replies}</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>BONDING CURVE PROGRESS:</span>
              <span>{Math.round(token.bondingCurveProgress)}%</span>
            </div>
            <div className="w-full bg-[#122250] rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${token.bondingCurveProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>SPOTLIGHT PROGRESS:</span>
              <span>{Math.round(token.spotlightProgress)}%</span>
            </div>
            <div className="w-full bg-[#122250] rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${token.spotlightProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Holder Distribution */}
          <div>
            <h4 className="mb-2">HOLDER DISTRIBUTION:</h4>
            <div className="space-y-1 text-sm">
              {(token.holders || []).map((holder, i) => (
                <div key={i} className="flex justify-between">
                  <span>
                    {i + 1}. {holder.address}{" "}
                    {holder.isBondingCurve ? "(BONDING CURVE)" : ""}
                  </span>
                  <span>
                    {holder.isBondingCurve
                      ? `${Math.round(
                          (holder.amount / token.initialSupply) * 100
                        )}%`
                      : holder.amount.toLocaleString()}
                  </span>
                </div>
              ))}

              {/* Add some fake holders if we don't have enough */}
              {(token.holders?.length || 0) < 10 &&
                [...Array(10 - (token.holders?.length || 0))].map((_, i) => (
                  <div
                    key={i + (token.holders?.length || 0)}
                    className="flex justify-between"
                  >
                    <span>
                      {i + 1 + (token.holders?.length || 0)}. 0x
                      {Math.random().toString(16).slice(2, 10)}
                    </span>
                    <span>
                      {Math.floor(Math.random() * 1000).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comments and Trades Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex mb-4">
            <button className="px-6 py-2 bg-blue-500 rounded-t-lg font-bold">
              COMMENTS
            </button>
            <button className="px-6 py-2 bg-[#081040] rounded-t-lg font-bold ml-2">
              TRADES
            </button>
          </div>

          <div className="bg-[#081040] rounded-lg p-4 space-y-4">
            {/* Comment 1 */}
            <div className="border-b border-[#152767] pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="text-green-400">0x123456 (Creator)</div>
                <div className="text-xs opacity-50">2/25/2023 11:04:11 AM</div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-[#122250] rounded-lg flex items-center justify-center">
                  <TokenImage
                    src={token.imageUrl}
                    alt={token.symbol}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h4 className="font-bold mb-1">
                    THE FUTURE OF DECENTRALIZED {token.symbol}-NANCE
                  </h4>
                  <p className="text-sm">
                    Welcome everyone to the true future of decentralization on
                    Sui, the {token.symbol.toLowerCase()} are here and in the
                    bag bro.
                  </p>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="border-b border-[#152767] pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="text-green-400">0x45678</div>
                <div className="text-xs opacity-50">2/25/2023 11:08:11 AM</div>
                <div className="text-xs opacity-50">♥ 7 [HAHA+]</div>
              </div>
              <p className="text-sm">
                Yoooo!!! These look awesome, wen moon????
              </p>
            </div>

            {/* Comment 3 */}
            <div className="border-b border-[#152767] pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="text-green-400">0x45634</div>
                <div className="text-xs opacity-50">2/25/2023 12:04:11 PM</div>
                <div className="text-xs opacity-50">♥ 3 [REPLY]</div>
              </div>
              <p className="text-sm">
                omg I just left the exchange, I need all the{" "}
                {token.symbol.toLowerCase()} reeeeee
              </p>
            </div>

            {/* Comment 4 */}
            <div className="border-b border-[#152767] pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="text-green-400">0x45363</div>
                <div className="text-xs opacity-50">2/25/2023 12:08:11 PM</div>
                <div className="text-xs opacity-50">♥ 11 [REPLY]</div>
              </div>
              <p className="text-sm">
                {token.symbol} {token.symbol} {token.symbol} {token.symbol}
              </p>
            </div>

            {/* Comment 5 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="text-green-400">0x45678</div>
                <div className="text-xs opacity-50">2/25/2023 11:09:11 AM</div>
                <div className="text-xs opacity-50">♥ 9 [HAHA+]</div>
              </div>
              <p className="text-sm">gib me</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
