import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  // 1. Sync State with Auth
  useEffect(() => {
    if (user) {
      // Fetch specifically for THEIR user ID (isolation)
      const saved = localStorage.getItem(`houseOfStri_wishlist_${user._id}`);
      if (saved && saved !== 'undefined' && saved !== 'null') {
        setWishlistItems(JSON.parse(saved) || []);
      } else {
        // Use wishlist from login response if nothing in storage
        setWishlistItems(user.wishlist || []);
      }
    } else {
      // logout cleanup: reset to zero
      setWishlistItems([]);
    }
  }, [user]);

  // 2. Persistent Storage & Backend Sync
  useEffect(() => {
    if (user && Array.isArray(wishlistItems)) {
      localStorage.setItem(`houseOfStri_wishlist_${user._id}`, JSON.stringify(wishlistItems));
      
      const syncWishlist = async () => {
        try {
          await fetch(`${API_URL}/auth/wishlist`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ wishlist: wishlistItems })
          });
        } catch (err) {
          console.error('Wishlist sync failed:', err);
        }
      };
      
      const timer = setTimeout(syncWishlist, 2000);
      return () => clearTimeout(timer);
    }
  }, [wishlistItems, user, token]);

  const toggleWishlist = (product) => {
    // Authentication Guard
    if (!user) {
      alert("Please log in to save items to your wishlist.");
      navigate('/auth', { state: { message: "Please log in to save items to your wishlist." } });
      return;
    }

    setWishlistItems((prev) => {
      const exists = prev.find((item) => item._id === product._id || item.id === product.id);
      if (exists) {
        return prev.filter((item) => (item._id !== product._id && item.id !== product.id));
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId || item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== productId && item.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
