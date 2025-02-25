export function TokenGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {[...Array(9)].map((_, i) => (
        <TokenCard key={i} />
      ))}
    </div>
  );
}

function TokenCard() {
  return (
    <div className="bg-[#081040] p-4 rounded-lg hover:bg-[#0A1550] transition-colors">
      <div className="aspect-square bg-[#0A1550] rounded-lg mb-4" />
      <h3 className="font-bold">LOREM IPSUM TOKEN</h3>
      <p className="text-green-400 text-lg font-semibold mb-2">$69.42K MCAP</p>
      <p className="text-gray-300 mb-3">A decentralized token for lorem ipsum generation and distribution across the Sui network.</p>
      <div className="flex justify-between text-sm text-gray-400">
        <p>13 MIN AGO</p>
        <p>123 REPLIES</p>
      </div>
    </div>
  );
} 