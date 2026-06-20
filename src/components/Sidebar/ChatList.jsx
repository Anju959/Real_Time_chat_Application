import { useChat } from '../../context/ChatContext';
import ChatListItem from './ChatListItem';

export default function ChatList({ onSelectChat }) {
  const { conversations, activeConversationId, selectConversation, getParticipant } = useChat();

  const handleSelect = (convId) => {
    selectConversation(convId);
    if (onSelectChat) onSelectChat();
  };

  const sorted = [...conversations].sort((a, b) => {
    const aLast = a.messages[a.messages.length - 1]?.timestamp || 0;
    const bLast = b.messages[b.messages.length - 1]?.timestamp || 0;
    return bLast - aLast;
  });

  return (
    <div className="chat-list">
      {sorted.length === 0 && (
        <div className="chat-list-empty">
          <p>No conversations found</p>
        </div>
      )}
      {sorted.map((conv) => {
        const participant = getParticipant(conv.participantId);
        const lastMessage = conv.messages[conv.messages.length - 1];
        return (
          <ChatListItem
            key={conv.id}
            conversation={conv}
            participant={participant}
            lastMessage={lastMessage}
            isActive={conv.id === activeConversationId}
            onClick={() => handleSelect(conv.id)}
          />
        );
      })}
    </div>
  );
}
