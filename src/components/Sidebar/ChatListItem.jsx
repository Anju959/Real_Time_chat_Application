export default function ChatListItem({ conversation, participant, lastMessage, isActive, onClick }) {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const truncate = (text, maxLen = 35) => {
    if (!text) return '';
    return text.length > maxLen ? text.substring(0, maxLen) + '...' : text;
  };

  return (
    <div
      className={`chat-list-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      id={`chat-item-${conversation.id}`}
    >
      <div className="chat-list-avatar">
        <img src={participant?.avatar} alt={participant?.name} />
        <span className={`status-dot ${participant?.status === 'online' ? 'online' : 'offline'}`}></span>
      </div>

      <div className="chat-list-content">
        <div className="chat-list-header">
          <h4 className="chat-list-name">{participant?.name}</h4>
          <span className="chat-list-time">{formatTime(lastMessage?.timestamp)}</span>
        </div>
        <div className="chat-list-preview">
          <p className="chat-list-last-message">
            {lastMessage?.senderId === 'user-0' && <span className="you-prefix">You: </span>}
            {truncate(lastMessage?.text)}
          </p>
          {conversation.unread > 0 && (
            <span className="unread-badge">{conversation.unread}</span>
          )}
        </div>
      </div>
    </div>
  );
}
