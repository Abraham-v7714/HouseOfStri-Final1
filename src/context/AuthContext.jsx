import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Restore user from payload on initial load
  useEffect(() => {
    const fetchProfile = async () => {
      // Only fetch if we have a token but no user data (e.g., on page refresh)
      if (token && !user) {
        try {
          const response = await fetch(`${API_URL}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Profile fetch failed:", err);
          logout();
        }
      }
      setIsAuthLoading(false);
    };

    fetchProfile();
  }, [token, user]); // Added user to dependency to ensure we only fetch when needed

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userName', userData.name);
    setToken(userData.token);
    setUser(userData);
  };

  const logout = () => {
    // Session state clearing
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    
    // Explicitly purging identifying info
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
