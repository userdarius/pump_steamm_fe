export function SearchBar() {
  return (
    <div className="flex justify-center gap-4 mb-12">
      <input
        type="text"
        placeholder="SEARCH FOR TOKEN"
        className="bg-[#081040] border border-blue-500 text-white px-4 py-2 rounded-lg w-full max-w-xl focus:border-blue-400 focus:outline-none"
      />
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors">
        SEARCH
      </button>
    </div>
  );
} 