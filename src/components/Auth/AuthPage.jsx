import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Auth.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="url(#logo-gradient)" />
                <path d="M12 14C12 12.8954 12.8954 12 14 12H26C27.1046 12 28 12.8954 28 14V22C28 23.1046 27.1046 24 26 24H22L18 28V24H14C12.8954 24 12 23.1046 12 22V14Z" fill="white" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#6C5CE7" />
                    <stop offset="1" stopColor="#00B4D8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1>ChatVibe</h1>
            <p className="auth-subtitle">
              {isLogin ? 'Welcome back! Sign in to continue' : 'Create an account to get started'}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <div className={`auth-tab-indicator ${isLogin ? 'left' : 'right'}`}></div>
          </div>

          <div className="auth-form-container">
            <div className={`auth-forms ${isLogin ? 'show-login' : 'show-signup'}`}>
              <div className="auth-form-panel">
                <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
              </div>
              <div className="auth-form-panel">
                <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
