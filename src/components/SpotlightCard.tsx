import Image from "next/image";

export function SpotlightCard() {
  return (
    <div className="text-center mb-12">
      <h2 className="text-yellow-400 mb-4">SPOTLIGHT</h2>
      <div className="inline-block bg-gradient-to-b from-yellow-400/20 to-transparent p-8 rounded-full">
        <div className="bg-[#081040] p-4 rounded-lg max-w-xs">
          <div className="flex gap-4">
            <Image
              src="/placeholder.png"
              alt="Token"
              width={60}
              height={60}
              className="rounded-lg"
            />
            <div className="text-left">
              <h3 className="font-bold">KAWAIIII</h3>
              <p className="text-green-400 text-lg font-semibold mb-1">$69.42K MCAP</p>
              <p className="text-sm text-gray-400">MADE BY: 0x.1234</p>
              <p className="text-sm text-gray-400">13 MIN AGO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 