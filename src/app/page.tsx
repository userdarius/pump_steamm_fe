"use client";

import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { SpotlightCard } from "@/components/SpotlightCard";
import { TokenGrid } from "@/components/TokenGrid";
import { TrendingTags } from "@/components/TrendingTags";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A061E] text-white p-4">
      <Header />
      <SpotlightCard />
      <SearchBar />
      <TrendingTags />
      <SortButton />
      <TokenGrid />
    </main>
  );
}
