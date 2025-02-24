export function TrendingTags() {
  const tags = ["AI", "CAT", "VITALIK", "PIZZA", "WAVE", "LAMBO"];
  
  return (
    <div className="flex items-center gap-4 mb-8 px-4">
      <span className="text-gray-400">TRENDING:</span>
      {tags.map((tag) => (
        <button
          key={tag}
          className="bg-[#2A1F3D] px-4 py-1 rounded-lg text-sm"
        >
          {tag}
        </button>
      ))}
    </div>
  );
} 