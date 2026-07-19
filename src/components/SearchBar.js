import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <Search size={18} className="search-icon" />

      <input
        type="text"
        placeholder="Search by coin name or symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}