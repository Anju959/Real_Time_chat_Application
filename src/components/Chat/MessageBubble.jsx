import { Check, CheckCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MessageBubble({ message, participant }) {
  const { user } = useAuth();

  // Compare against real Firebase uid, not hardcoded 'user-0'
  const isSent = message.senderId === (user?.uid || 'user-0');

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStatus = () => {
    if (!isSent) return null;
    switch (message.status) {
      case 'sent':
        return <Check size={14} className="msg-status" />;
      case 'delivered':
        return <CheckCheck size={14} className="msg-status" />;
      case 'read':
        return <CheckCheck size={14} className="msg-status read" />;
      default:
        return null;
    }
  };

  return (
    <div className={`message-row ${isSent ? 'sent' : 'received'}`}>
      {!isSent && (
        <div className="message-avatar">
          <img src={participant?.avatar} alt={participant?.name} />
        </div>
      )}
      <div className={`message-bubble ${isSent ? 'sent' : 'received'}`}>
        {!isSent && <span className="message-sender">{participant?.name}</span>}
        <p className="message-text">{message.text}</p>
        <div className="message-meta">
          <span className="message-time">{formatTime(message.timestamp)}</span>
          {renderStatus()}
        </div>
      </div>
    </div>
  );
}
