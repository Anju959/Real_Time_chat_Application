import { useChat } from '../../context/ChatContext';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useChat();

  return (
    <div className="search-bar">
      <Search size={16} className="search-icon" />
      <input
        id="search-users"
        type="text"
        placeholder="Search conversations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className="search-clear" onClick={() => setSearchQuery('')}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
