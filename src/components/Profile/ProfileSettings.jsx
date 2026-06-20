import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Camera, Save } from 'lucide-react';
import './ProfileSettings.css';

export default function ProfileSettings({ onClose }) {
  const { user, updateProfile } = useAuth();

  // Firebase user object uses .name (from our DB) and .avatar
  const [name, setName] = useState(user?.name || user?.displayName || '');
  const [avatar, setAvatar] = useState(user?.avatar || user?.photoURL || '');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsSaving(true);
    await updateProfile(name.trim(), avatar);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="profile-modal-body">
          <div className="profile-avatar-edit">
            <div className="avatar-preview">
              <img src={avatar} alt="Profile preview" />
              <button
                className="avatar-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Change picture"
              >
                <Camera size={20} />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="profile-name">Display Name</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={isSaving}
            />
          </div>

          <div className="profile-form-group">
            <label>Email</label>
            <input
              type="text"
              value={user?.email || ''}
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>
        </div>

        <div className="profile-modal-footer">
          <button className="cancel-btn" onClick={onClose} disabled={isSaving}>Cancel</button>
          <button className="save-btn" onClick={handleSave} disabled={!name.trim() || isSaving}>
            <Save size={16} />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
