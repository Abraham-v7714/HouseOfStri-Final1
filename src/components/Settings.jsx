import { useState } from 'react';
import ChangePassword from './ChangePassword';
import { User, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> }
  ];

  return (
    <div className="pt-32 pb-24 md:pl-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        <header className="mb-12">
          <h1 className="text-3xl font-light tracking-wide text-charcoal uppercase mb-2">Account Settings</h1>
          <p className="text-sm text-gray-500 font-light">Manage your personal information and account security.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Tabs */}
          <aside className="w-full lg:w-64 flex flex-col gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-lg text-sm transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-charcoal text-white shadow-lg shadow-charcoal/10' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="tracking-wide">{tab.label}</span>
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm max-w-xl">
                 <h3 className="text-lg font-medium text-charcoal mb-6">Personal Information</h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 block">Full Name</label>
                        <p className="text-sm border-b border-gray-100 pb-2">{user?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 block">Email</label>
                        <p className="text-sm border-b border-gray-100 pb-2">{user?.email || 'N/A'}</p>
                      </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-12">
                <section>
                  <ChangePassword />
                </section>
                
                <section className="bg-red-50/30 border border-red-100 p-8 rounded-xl">
                  <h4 className="text-red-700 font-medium mb-2">Danger Zone</h4>
                  <p className="text-sm text-red-600/70 mb-6 underline underline-offset-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="px-6 py-2 border border-red-200 text-red-600 rounded text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                    Delete Account
                  </button>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
