export default function TypingIndicator({ participant }) {
  return (
    <div className="message-row received">
      <div className="message-avatar">
        <img src={participant?.avatar} alt={participant?.name} />
      </div>
      <div className="typing-indicator">
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="typing-text">{participant?.name} is typing</span>
      </div>
    </div>
  );
}
