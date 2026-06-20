import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';

export default function ChatHeader({ participant, onBackClick }) {
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <button className="back-btn" onClick={onBackClick} title="Back to chats" id="back-to-chats-btn">
          <ArrowLeft size={20} />
        </button>
        <div className="chat-header-avatar">
          <img src={participant?.avatar} alt={participant?.name} />
          <span className={`status-dot ${participant?.status === 'online' ? 'online' : 'offline'}`}></span>
        </div>
        <div className="chat-header-info">
          <h3>{participant?.name}</h3>
          <span className={`chat-header-status ${participant?.status === 'online' ? 'online' : ''}`}>
            {participant?.lastSeen}
          </span>
        </div>
      </div>

      <div className="chat-header-actions">
        <button className="icon-btn" title="Voice call">
          <Phone size={18} />
        </button>
        <button className="icon-btn" title="Video call">
          <Video size={18} />
        </button>
        <button className="icon-btn" title="More options">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}
