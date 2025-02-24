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
    <div className="bg-[#2A1F3D] p-4 rounded-lg">
      <div className="aspect-square bg-purple-900 rounded-lg mb-4" />
      <h3 className="font-bold">LOREM IPSUM TOKEN</h3>
      <p className="text-sm text-gray-400">MADE BY: 0x.1234</p>
      <p className="text-sm text-gray-400">13 MIN AGO</p>
      <p className="text-sm text-gray-400">123 REPLIES</p>
      <p className="text-green-400">$69.42K MCAP</p>
    </div>
  );
} 