export function TrendingTags() {
  const tags = ["AI", "CAT", "VITALIK", "PIZZA", "WAVE", "LAMBO"];
  
  return (
    <div className="flex items-center gap-4 mb-8 px-4 overflow-x-auto">
      <span className="text-gray-400">TRENDING:</span>
      {tags.map((tag) => (
        <button
          key={tag}
          className="bg-[#081040] px-4 py-1 rounded-lg text-sm hover:bg-[#0A1550] transition-colors"
        >
          {tag}
        </button>
      ))}
    </div>
  );
} 