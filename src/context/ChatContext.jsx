import { createContext, useContext, useState, useCallback } from 'react';
import { users, initialConversations } from '../data/mockData';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typingUsers, setTypingUsers] = useState({});

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  const getParticipant = useCallback(
    (participantId) => users.find((u) => u.id === participantId),
    []
  );

  const selectConversation = useCallback((convId) => {
    setActiveConversationId(convId);
    // Mark messages as read
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unread: 0 } : c))
    );
  }, []);

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim() || !activeConversationId) return;

      const newMessage = {
        id: `m-${Date.now()}`,
        senderId: 'user-0',
        text: text.trim(),
        timestamp: Date.now(),
        status: 'sent',
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: [...c.messages, newMessage] }
            : c
        )
      );

      // Simulate delivery after 1s
      setTimeout(() => {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === newMessage.id ? { ...m, status: 'delivered' } : m
                  ),
                }
              : c
          )
        );
      }, 1000);

      // Simulate typing reply
      const conv = conversations.find((c) => c.id === activeConversationId);
      if (conv) {
        const participantId = conv.participantId;
        setTimeout(() => {
          setTypingUsers((prev) => ({ ...prev, [participantId]: true }));
        }, 1500);

        // Simulate reply
        const replies = [
          'That sounds great! 👍',
          'I agree, let me check on that.',
          'Interesting! Tell me more 🤔',
          'Sure thing, I will get right on it!',
          'Haha, that is awesome! 😄',
          'Let me think about it and get back to you.',
          'Perfect, thanks for letting me know! 🙌',
          'On it! Will update you soon.',
        ];
        const replyText = replies[Math.floor(Math.random() * replies.length)];

        setTimeout(() => {
          setTypingUsers((prev) => ({ ...prev, [participantId]: false }));
          const replyMessage = {
            id: `m-${Date.now()}-reply`,
            senderId: participantId,
            text: replyText,
            timestamp: Date.now(),
            status: 'read',
          };
          setConversations((prevConvs) =>
            prevConvs.map((c) =>
              c.id === activeConversationId
                ? { ...c, messages: [...c.messages, replyMessage] }
                : c
            )
          );
        }, 3500);
      }
    },
    [activeConversationId, conversations]
  );

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const participant = getParticipant(conv.participantId);
    return participant?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ChatContext.Provider
      value={{
        conversations: filteredConversations,
        activeConversation,
        activeConversationId,
        typingUsers,
        searchQuery,
        setSearchQuery,
        selectConversation,
        sendMessage,
        getParticipant,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
}
