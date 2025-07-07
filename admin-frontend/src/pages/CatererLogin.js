import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginCaterer, registerCaterer } from '../redux/slices/catererSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CatererLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({
    email: '',
    password: '',
    businessName: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (tab === 'login') {
        await dispatch(loginCaterer({ email: form.email, password: form.password })).unwrap();
        navigate('/caterer/dashboard');
      } else {
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        await dispatch(registerCaterer({ email: form.email, password: form.password, businessName: form.businessName })).unwrap();
        localStorage.setItem('firstLogin', '1');
        navigate('/caterer/dashboard');
      }
    } catch (err) {
      setError(err || 'Login/Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff0f6 0%, #ffe0ef 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div
        className="login-container"
        style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(255,92,141,0.10)',
          padding: 36,
          maxWidth: 370,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <button
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              background: tab === 'login' ? '#ff5c8d' : 'transparent',
              color: tab === 'login' ? '#fff' : '#ff5c8d',
              border: 'none',
              borderRadius: '18px 0 0 18px',
              padding: '10px 0',
              fontWeight: 700,
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setTab('signup')}
            style={{
              flex: 1,
              background: tab === 'signup' ? '#ff5c8d' : 'transparent',
              color: tab === 'signup' ? '#fff' : '#ff5c8d',
              border: 'none',
              borderRadius: '0 18px 18px 0',
              padding: '10px 0',
              fontWeight: 700,
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ color: '#ff5c8d', fontWeight: 600, fontSize: 15 }}>Business Name</span>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #ffd6e6', marginTop: 4, fontSize: 15 }}
              />
            </label>
          )}
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ color: '#ff5c8d', fontWeight: 600, fontSize: 15 }}>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #ffd6e6', marginTop: 4, fontSize: 15 }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ color: '#ff5c8d', fontWeight: 600, fontSize: 15 }}>Password</span>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #ffd6e6', marginTop: 4, fontSize: 15 }}
            />
          </label>
          {tab === 'signup' && (
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ color: '#ff5c8d', fontWeight: 600, fontSize: 15 }}>Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter your password"
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #ffd6e6', marginTop: 4, fontSize: 15 }}
              />
            </label>
          )}
          {error && <div style={{ color: '#d32f2f', marginBottom: 12, fontWeight: 600 }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#ff5c8d',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontWeight: 700,
              fontSize: 17,
              marginTop: 8,
              boxShadow: '0 2px 8px rgba(255,92,141,0.10)',
              cursor: 'pointer'
            }}
          >
            {loading ? (tab === 'login' ? 'Logging in...' : 'Signing up...') : (tab === 'login' ? 'Login' : 'Sign Up')}
          </button>
          {tab === 'login' && (
            <div style={{ textAlign: 'right', marginTop: 12 }}>
              <a
                href="/forgot-password"
                style={{ color: '#ff5c8d', textDecoration: 'underline', fontSize: 14, cursor: 'pointer' }}
              >
                Forgot Password?
              </a>
            </div>
          )}
        </form>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .login-container {
            padding: 20px !important;
            max-width: 100% !important;
            margin: 0 10px;
          }
          input {
            font-size: 14px !important;
          }
          button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CatererLogin;
