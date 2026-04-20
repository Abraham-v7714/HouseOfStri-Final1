import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader2, KeyRound, ShieldAlert } from 'lucide-react';
import { API_URL } from '../config';

export default function ChangePassword() {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
    if (newPassword !== confirmPassword) {
      return setMessage({ type: 'error', text: 'New passwords do not match' });
    }
    if (getPasswordStrength(newPassword) < 3) {
      return setMessage({ type: 'error', text: 'New password is too weak. Please use symbols and numbers.' });
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage({ type: 'success', text: 'Password successfully updated!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center text-sage">
          <KeyRound size={20} />
        </div>
        <div>
          <h3 className="text-lg font-medium text-charcoal">Update Password</h3>
          <p className="text-xs text-gray-500 font-light">Ensure your account stays secure with a strong password.</p>
        </div>
      </div>

      {message.text && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-3 ${
          message.type === 'success' ? 'bg-sage/10 text-sage border border-sage/20' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {message.type === 'error' && <ShieldAlert size={16} />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Current Password</label>
          <input 
            type="password" 
            required 
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all font-sans"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">New Password</label>
          <input 
            type="password" 
            required 
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all font-sans"
            placeholder="••••••••"
          />
          {newPassword && (
            <div className="mt-2 flex gap-1 h-1">
              {[1, 2, 3, 4].map(idx => (
                <div 
                  key={idx} 
                  className={`flex-1 rounded-full transition-colors duration-500 ${
                    getPasswordStrength(newPassword) >= idx ? 'bg-sage' : 'bg-gray-100'
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
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-gray-300 transition-all font-sans"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-charcoal text-white rounded px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-black transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={14} className="animate-spin text-white/70" /> : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
