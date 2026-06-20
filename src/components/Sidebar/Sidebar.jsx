import UserProfile from './UserProfile';
import SearchBar from './SearchBar';
import ChatList from './ChatList';
import './Sidebar.css';

export default function Sidebar({ onSelectChat }) {
  return (
    <div className="sidebar">
      <UserProfile />
      <SearchBar />
      <ChatList onSelectChat={onSelectChat} />
    </div>
  );
}
