export function SearchBar() {
  return (
    <div className="flex justify-center gap-4 mb-12">
      <input
        type="text"
        placeholder="SEARCH FOR TOKEN"
        className="bg-[#2A1F3D] border border-purple-500 text-white px-4 py-2 rounded-lg w-full max-w-xl"
      />
      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
        SEARCH
      </button>
    </div>
  );
} 