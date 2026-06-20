import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, LogOut } from 'lucide-react';
import ProfileSettings from '../Profile/ProfileSettings';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <div className="user-profile">
        <div 
          className="user-profile-info" 
          onClick={() => setShowProfileModal(true)}
          style={{ cursor: 'pointer' }}
          title="Edit Profile"
        >
          <div className="user-profile-avatar">
            <img src={user?.avatar} alt={user?.name} />
            <span className="status-dot online"></span>
          </div>
          <div className="user-profile-details">
            <h3>{user?.name}</h3>
            <span className="user-status-text">Active now</span>
          </div>
        </div>
        <div className="user-profile-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            id="theme-toggle-btn"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="icon-btn logout-btn" onClick={logout} title="Logout" id="logout-btn">
            <LogOut size={18} />
          </button>
        </div>
      </div>
      
      {showProfileModal && (
        <ProfileSettings onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
}
