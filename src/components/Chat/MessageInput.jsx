import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { Send, Smile, Paperclip } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useTheme } from '../../context/ThemeContext';

export default function MessageInput() {
  const { sendMessage, activeConversationId } = useChat();
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef(null);
  const emojiRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    }
  }, [text]);

  // Close emoji picker on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Reset text when switching conversations
  useEffect(() => {
    setText('');
    setShowEmoji(false);
  }, [activeConversationId]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
    setShowEmoji(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    textareaRef.current?.focus();
  };

  return (
    <div className="message-input-area">
      {showEmoji && (
        <div className="emoji-picker-wrapper" ref={emojiRef}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme={theme === 'dark' ? 'dark' : 'light'}
            width="100%"
            height={350}
            searchDisabled={false}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}

      <div className="message-input-bar">
        <button
          className={`input-action-btn ${showEmoji ? 'active' : ''}`}
          onClick={() => setShowEmoji(!showEmoji)}
          title="Emoji"
          id="emoji-btn"
        >
          <Smile size={20} />
        </button>

        <button className="input-action-btn" title="Attach file" id="attach-btn">
          <Paperclip size={20} />
        </button>

        <textarea
          ref={textareaRef}
          id="message-input"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <button
          className={`send-btn ${text.trim() ? 'active' : ''}`}
          onClick={handleSend}
          disabled={!text.trim()}
          title="Send message"
          id="send-btn"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
