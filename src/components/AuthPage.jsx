import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import { API_URL } from '../config';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect away
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        // Redir to last intent or home path
        const origin = location.state?.from || '/';
        navigate(origin);
      }
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/signup`;
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const contentType = res.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(res.ok ? "Received unexpected format from server." : `Connection Error: Backend unreachable (${res.status}). Please verify API status.`);
      }
      
      if (!res.ok) {
        throw new Error(data?.message || 'Authentication failed. Please check your credentials.');
      }

      login(data);
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        const isLocalhostApi = API_URL.includes('localhost') || API_URL.includes('127.0.0.1');
        const isProdEnv = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        
        if (isLocalhostApi && isProdEnv) {
          setError('Deployment Configuration Error: The app is trying to connect to a local server ("localhost") from a live website. Please set your production API URL in the environment variables.');
        } else {
          setError('Connection Error: Unable to reach the backend server. Please check your internet or verify the server status.');
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setForgotMessage('');
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json();
      setForgotMessage(data.message);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 py-32 font-sans w-full">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 max-w-md w-full relative overflow-hidden">
        
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage/30 via-sage to-sage/30"></div>

        {showForgot ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light tracking-tight text-charcoal mb-3">Reset Password</h2>
              <p className="text-sm text-gray-500 font-light tracking-wide">Enter your email and we'll send you a simulation link to reset your password.</p>
            </div>

            {forgotMessage && (
              <div className="bg-sage/10 text-sage border border-sage/20 px-4 py-3 rounded-lg text-sm mb-6 text-center">
                {forgotMessage}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all font-sans"
                  placeholder="jane@example.com"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-charcoal text-white rounded-lg py-3.5 text-sm font-medium tracking-wide hover:bg-black transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? <Loader2 size={18} className="animate-spin text-white/70" /> : 'Send Reset Link'}
              </button>
              <button 
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-charcoal transition-colors mt-4"
              >
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light tracking-tight text-charcoal mb-3">
                {isLogin ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-sm text-gray-500 font-light tracking-wide">
                {isLogin ? 'Enter your details to access your account.' : 'Join us to manage orders and bespoke customizations.'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-lg text-sm mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all"
                placeholder="Jane Doe"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all"
              placeholder="jane@example.com"
            />
          </div>

          <div className="space-y-1.5 relative">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Password</label>
              {isLogin && (
                <button 
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-[10px] uppercase tracking-tighter text-sage hover:text-charcoal transition-colors"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all font-sans"
              placeholder="••••••••"
            />
            {!isLogin && password && (
              <div className="mt-2 flex gap-1 h-1">
                {[1, 2, 3, 4].map(idx => (
                  <div 
                    key={idx} 
                    className={`flex-1 rounded-full transition-colors duration-500 ${
                      getPasswordStrength(password) >= idx ? 'bg-sage' : 'bg-gray-100'
                    }`}
                  ></div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-charcoal text-white rounded-lg py-3.5 text-sm font-medium tracking-wide hover:bg-black transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4"
          >
            {loading ? <Loader2 size={18} className="animate-spin text-white/70" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm font-light text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sage font-medium hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
            </p>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
