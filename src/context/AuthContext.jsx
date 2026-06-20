import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';

const AuthContext = createContext();

// Helper: save user info to Firebase Realtime Database
async function saveUserToDatabase(uid, data) {
  await set(ref(db, `users/${uid}`), data);
}

// Helper: load user info from Firebase Realtime Database
async function loadUserFromDatabase(uid) {
  const snapshot = await get(ref(db, `users/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Load extra profile data from DB (name, avatar, status)
        const dbProfile = await loadUserFromDatabase(firebaseUser.uid);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: dbProfile?.name || firebaseUser.displayName || 'User',
          avatar: dbProfile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
          status: dbProfile?.status || 'online',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setAuthError('');
    if (!email || !password) {
      setAuthError('Please fill in all fields');
      return false;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      // Make Firebase errors user-friendly
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setAuthError('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        setAuthError('Too many attempts. Please try again later.');
      } else {
        setAuthError(error.message);
      }
      return false;
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    setAuthError('');
    if (!name || !email || !password || !confirmPassword) {
      setAuthError('Please fill in all fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setAuthError('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match');
      return false;
    }
    try {
      // 1. Create Firebase Auth user
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Update Firebase Auth display name
      await firebaseUpdateProfile(cred.user, { displayName: name });

      // 3. Save full user profile to Realtime Database
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${cred.user.uid}`;
      await saveUserToDatabase(cred.user.uid, {
        uid: cred.user.uid,
        name,
        email,
        avatar: avatarUrl,
        status: 'online',
        createdAt: Date.now(),
      });

      return true;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setAuthError('An account with this email already exists');
      } else {
        setAuthError(error.message);
      }
      return false;
    }
  };

  const logout = async () => {
    // Set status to offline before signing out
    if (user?.uid) {
      await update(ref(db, `users/${user.uid}`), { status: 'offline' });
    }
    await signOut(auth);
    setUser(null);
    setAuthError('');
  };

  const updateProfile = async (name, avatarUrl) => {
    if (!auth.currentUser) return;
    try {
      // Update Firebase Auth profile
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: name || auth.currentUser.displayName,
        photoURL: avatarUrl || auth.currentUser.photoURL,
      });

      // Update Realtime Database profile
      const updates = {};
      if (name) updates.name = name;
      if (avatarUrl) updates.avatar = avatarUrl;
      await update(ref(db, `users/${auth.currentUser.uid}`), updates);

      // Update local state
      setUser((prev) => ({
        ...prev,
        name: name || prev.name,
        avatar: avatarUrl || prev.avatar,
      }));
    } catch (error) {
      setAuthError(error.message);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '1rem',
        color: '#6C5CE7',
        fontFamily: 'sans-serif',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, authError, setAuthError, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
