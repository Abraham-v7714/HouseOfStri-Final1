import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { API_URL } from '../config';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    if (getPasswordStrength(password) < 3) {
      return setError('Password is too weak. Please use symbols and numbers.');
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess(true);
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 py-32 font-sans w-full">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 max-w-md w-full relative overflow-hidden">
        
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage/30 via-sage to-sage/30"></div>

        {success ? (
          <div className="text-center py-4">
            <div className="flex justify-center mb-6">
              <CheckCircle2 size={64} className="text-sage animate-bounce" />
            </div>
            <h2 className="text-2xl font-light text-charcoal mb-4">Password Reset!</h2>
            <p className="text-sm text-gray-500 mb-8 font-light">Your password has been securely updated. Redirecting you to login...</p>
            <Link to="/auth" className="text-sage font-medium underline underline-offset-4">Back to Login Now</Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-10 text-charcoal">
              <div className="flex justify-center mb-4">
                <ShieldCheck size={40} className="text-sage/60" />
              </div>
              <h2 className="text-3xl font-light tracking-tight mb-3">Set New Password</h2>
              <p className="text-sm text-gray-500 font-light tracking-wide">Enter your new secure password below to regain access.</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-lg text-sm mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">New Password</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all font-sans"
                  placeholder="••••••••"
                />
                {password && (
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Confirm New Password</label>
                <input 
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all font-sans"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || !token}
                className="w-full bg-charcoal text-white rounded-lg py-3.5 text-sm font-medium tracking-wide hover:bg-black transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-4"
              >
                {loading ? <Loader2 size={18} className="animate-spin text-white/70" /> : 'Update Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
