"use client";

import { Header } from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { uploadTokenImage } from "@/services/imageService";
import { createToken } from "@/services/tokenService";
import { getWalletAddress, isWalletConnected } from "@/services/walletService";

export default function LaunchPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWalletRequired, setIsWalletRequired] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    initialSupply: "1000000",
    initialPrice: "0.1",
    logo: null as File | null,
  });

  const [previewURL, setPreviewURL] = useState<string | null>(null);

  // Check for wallet connection on mount
  useEffect(() => {
    if (isWalletConnected()) {
      setWalletAddress(getWalletAddress());
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, logo: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if wallet is connected
    if (!walletAddress) {
      setIsWalletRequired(true);
      return;
    }

    try {
      setIsSubmitting(true);

      // Validate form
      if (!formData.name || !formData.symbol || !formData.description) {
        alert("Please fill in all required fields");
        return;
      }

      // Upload image if provided
      let imageUrl = "/placeholder.png";
      if (formData.logo) {
        imageUrl = await uploadTokenImage(formData.logo, formData.symbol);
      }

      // Create the token using the connected wallet address
      const newToken = createToken({
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        initialSupply: parseInt(formData.initialSupply),
        price: parseFloat(formData.initialPrice),
        imageUrl,
        creatorAddress: walletAddress,
      });

      // Redirect to the token page
      router.push(`/token/${newToken.slug}`);
    } catch (error) {
      console.error("Error creating token:", error);
      alert("Failed to create token. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // When wallet changes, update our state
  useEffect(() => {
    if (walletAddress) {
      setIsWalletRequired(false);
    }
  }, [walletAddress]);

  // Listen for wallet connections from header
  useEffect(() => {
    const checkWalletInterval = setInterval(() => {
      if (isWalletConnected()) {
        const address = getWalletAddress();
        if (address !== walletAddress) {
          setWalletAddress(address);
        }
      } else if (walletAddress) {
        setWalletAddress(null);
      }
    }, 1000);

    return () => clearInterval(checkWalletInterval);
  }, [walletAddress]);

  return (
    <main className="min-h-screen bg-[#050B2E] text-white p-4">
      <Header />

      {/* Page Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link
            href="/"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            HOME
          </Link>
          <span className="opacity-70">/</span>
          <span>LAUNCH NEW COIN</span>
        </div>
        <h1 className="text-2xl font-bold mb-8">CREATE YOUR OWN TOKEN</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section - 2/3 width on desktop */}
        <div className="lg:col-span-2 bg-[#081040] rounded-lg p-6">
          {isWalletRequired && !walletAddress && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="font-medium">
                You need to connect a wallet to create a token!
              </p>
              <p className="text-sm opacity-80 mt-1">
                Please connect your wallet using the button in the header.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wallet status indicator */}
            <div className="bg-[#122250] p-3 rounded flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  walletAddress ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <div>
                <p className="text-sm font-medium">Wallet Status</p>
                <p className="text-xs opacity-80">
                  {walletAddress
                    ? `Connected: ${walletAddress.slice(
                        0,
                        6
                      )}...${walletAddress.slice(-4)}`
                    : "Not connected - Connect wallet to create token"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  TOKEN NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#122250] rounded p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g. MY AWESOME TOKEN"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  TOKEN SYMBOL
                </label>
                <input
                  type="text"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  className="w-full bg-[#122250] rounded p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g. MAT"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                DESCRIPTION
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#122250] rounded p-3 text-white outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Describe your token and its utility..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  INITIAL SUPPLY
                </label>
                <input
                  type="number"
                  name="initialSupply"
                  value={formData.initialSupply}
                  onChange={handleChange}
                  className="w-full bg-[#122250] rounded p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  INITIAL PRICE (SUI)
                </label>
                <input
                  type="number"
                  name="initialPrice"
                  value={formData.initialPrice}
                  onChange={handleChange}
                  className="w-full bg-[#122250] rounded p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.000001"
                  step="0.000001"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                TOKEN LOGO
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="w-full bg-[#122250] rounded p-3 text-center border-2 border-dashed border-gray-600 hover:border-blue-500">
                    <p>
                      {formData.logo
                        ? formData.logo.name
                        : "CLICK TO UPLOAD IMAGE"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG or SVG, max 2MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {previewURL && (
                  <div className="w-20 h-20 relative">
                    <Image
                      src={previewURL}
                      alt="Token logo preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !walletAddress}
              className={`w-full font-bold py-4 rounded transition-colors ${
                isSubmitting || !walletAddress
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#8eff8e] text-black hover:bg-[#7aeb7a]"
              }`}
            >
              {isSubmitting ? "CREATING TOKEN..." : "LAUNCH TOKEN"}
            </button>
          </form>
        </div>

        {/* Info Section - 1/3 width on desktop */}
        <div className="bg-[#081040] rounded-lg p-6">
          <h2 className="font-bold text-lg mb-4">ABOUT LAUNCHING</h2>
          <div className="space-y-4 text-sm">
            <div className="bg-[#122250] p-4 rounded">
              <h3 className="font-bold mb-2">BONDING CURVE</h3>
              <p className="text-gray-300">
                Your token will use an automatic market maker with a bonding
                curve to determine price based on supply.
              </p>
            </div>

            <div className="bg-[#122250] p-4 rounded">
              <h3 className="font-bold mb-2">WALLET REQUIRED</h3>
              <p className="text-gray-300">
                Connect your wallet to create a token. Your wallet address will
                be associated with the token as the creator.
              </p>
            </div>

            <div className="bg-[#122250] p-4 rounded">
              <h3 className="font-bold mb-2">TOKEN DISTRIBUTION</h3>
              <p className="text-gray-300">
                Initially, 80% of the tokens will be allocated to your wallet,
                and 20% to the bonding curve liquidity pool.
              </p>
            </div>

            <div className="bg-[#122250] p-4 rounded">
              <h3 className="font-bold mb-2">FEES & SPOTLIGHT</h3>
              <p className="text-gray-300">
                A small fee on each trade is used to fund the spotlight program,
                which increases visibility for your token.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
