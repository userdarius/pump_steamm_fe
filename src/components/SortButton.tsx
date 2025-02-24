export function SortButton() {
  return (
    <div className="flex items-center gap-4 mb-8 px-4">
      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
        SORT: RISING
        <span className="transform rotate-90">➜</span>
      </button>
    </div>
  );
} 