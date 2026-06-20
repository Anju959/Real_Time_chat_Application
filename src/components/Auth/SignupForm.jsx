import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';

export default function SignupForm({ onSwitchToLogin }) {
  const { signup, authError, setAuthError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    setIsLoading(true);
    await signup(name, email, password, confirmPassword);
    setIsLoading(false);
  };

  const handleChange = (field, value) => {
    setAuthError('');
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {authError && <div className="auth-error">{authError}</div>}

      <div className={`input-group ${touched.name && !name ? 'error' : ''}`}>
        <div className="input-icon">
          <User size={18} />
        </div>
        <input
          id="signup-name"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          autoComplete="name"
          disabled={isLoading}
        />
        {touched.name && !name && <span className="field-error">Required</span>}
      </div>

      <div className={`input-group ${touched.email && !email ? 'error' : ''}`}>
        <div className="input-icon">
          <Mail size={18} />
        </div>
        <input
          id="signup-email"
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
          id="signup-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, password: true }))}
          autoComplete="new-password"
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

      <div className={`input-group ${touched.confirmPassword && !confirmPassword ? 'error' : ''}`}>
        <div className="input-icon">
          <Lock size={18} />
        </div>
        <input
          id="signup-confirm-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, confirmPassword: true }))}
          autoComplete="new-password"
          disabled={isLoading}
        />
        {touched.confirmPassword && !confirmPassword && (
          <span className="field-error">Required</span>
        )}
      </div>

      <button type="submit" className="auth-submit-btn" disabled={isLoading}>
        <UserPlus size={18} />
        <span>{isLoading ? 'Creating account...' : 'Create Account'}</span>
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} disabled={isLoading}>
          Sign In
        </button>
      </p>
    </form>
  );
}
