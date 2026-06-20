import { useChat } from '../../context/ChatContext';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';
import './Chat.css';

export default function ChatWindow({ onBackClick }) {
  const { activeConversation, getParticipant, typingUsers } = useChat();
  const messagesEndRef = useRef(null);

  const participant = activeConversation
    ? getParticipant(activeConversation.participantId)
    : null;

  const isTyping = participant ? typingUsers[participant.id] : false;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isTyping]);

  if (!activeConversation) {
    return (
      <div className="chat-window">
        <div className="chat-empty">
          <div className="chat-empty-icon">
            <MessageSquare size={64} strokeWidth={1} />
          </div>
          <h2>Welcome to ChatVibe</h2>
          <p>Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <ChatHeader participant={participant} onBackClick={onBackClick} />

      <div className="messages-area">
        <div className="messages-container">
          {activeConversation.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} participant={participant} />
          ))}
          {isTyping && <TypingIndicator participant={participant} />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput />
    </div>
  );
}
