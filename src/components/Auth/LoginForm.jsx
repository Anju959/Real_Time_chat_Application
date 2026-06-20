import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginForm({ onSwitchToSignup }) {
  const { login, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  const handleChange = (field, value) => {
    setAuthError('');
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {authError && <div className="auth-error">{authError}</div>}

      <div className={`input-group ${touched.email && !email ? 'error' : ''}`}>
        <div className="input-icon">
          <Mail size={18} />
        </div>
        <input
          id="login-email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, email: true }))}
          autoComplete="email"
          disabled={isLoading}
        />
        {touched.email && !email && <span className="field-error">Required</span>}
      </div>

      <div className={`input-group ${touched.password && !password ? 'error' : ''}`}>
        <div className="input-icon">
          <Lock size={18} />
        </div>
        <input
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, password: true }))}
          autoComplete="current-password"
          disabled={isLoading}
        />
        <button
          type="button"
          className="input-toggle"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {touched.password && !password && <span className="field-error">Required</span>}
      </div>

      <button type="submit" className="auth-submit-btn" disabled={isLoading}>
        <LogIn size={18} />
        <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
      </button>

      <p className="auth-switch">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={onSwitchToSignup} disabled={isLoading}>
          Sign Up
        </button>
      </p>
    </form>
  );
}
