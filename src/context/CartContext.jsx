import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Sync State with Auth
  useEffect(() => {
    if (user) {
      // Fetch specifically for THEIR user ID (isolation)
      // First try local storage for quick load, then backend could overwrite
      const saved = localStorage.getItem(`houseOfStri_cart_${user._id}`);
      if (saved && saved !== 'undefined' && saved !== 'null') {
        setCartItems(JSON.parse(saved) || []);
      } else {
        setCartItems(user.cart || []);
      }
    } else {
      // logout cleanup: reset to zero
      setCartItems([]);
    }
  }, [user]);

  // 2. Persistent Storage & Backend Sync
  useEffect(() => {
    if (user && Array.isArray(cartItems)) {
      localStorage.setItem(`houseOfStri_cart_${user._id}`, JSON.stringify(cartItems));
      
      // Backend Sync - Debounced or on change
      const syncCart = async () => {
        try {
          await fetch(`${API_URL}/auth/cart`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ cart: cartItems })
          });
        } catch (err) {
          console.error('Cart sync failed:', err);
        }
      };
      
      const timer = setTimeout(syncCart, 2000); // Debounce sync
      return () => clearTimeout(timer);
    }
  }, [cartItems, user, token]);

  const addToCart = (product, configuration) => {
    // Authentication Guard
    if (!user) {
      alert("Please log in to save items to your cart.");
      navigate('/auth', { state: { message: "Please log in to save items to your cart." } });
      return;
    }

    setCartItems(prev => [...prev, { id: Date.now(), product, configuration, quantity: 1 }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      cartSubtotal: cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
