import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ChatWindow from '../Chat/ChatWindow';
import { useChat } from '../../context/ChatContext';
import './ChatLayout.css';

export default function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { activeConversationId } = useChat();

  const handleSelectChat = () => {
    // On mobile, close sidebar when a chat is selected
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleBackClick = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="chat-layout">
      <div className={`chat-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <Sidebar onSelectChat={handleSelectChat} />
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`chat-main ${!sidebarOpen || activeConversationId ? 'visible' : ''}`}>
        <ChatWindow onBackClick={handleBackClick} />
      </div>
    </div>
  );
}
