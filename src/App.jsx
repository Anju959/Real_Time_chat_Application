import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import AuthPage from './components/Auth/AuthPage';
import ChatLayout from './components/Layout/ChatLayout';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
