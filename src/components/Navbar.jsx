import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isDarkBg = location.pathname === '/'; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 ${
        isScrolled || isOpen
          ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm text-charcoal' 
          : `py-8 ${isDarkBg ? 'text-white' : 'text-charcoal'}`
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center transition-all duration-500">
          <Link to="/" className="text-xl font-medium tracking-widest uppercase hover:opacity-80 transition-opacity z-[70]">
            House of Stri
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link 
              to="/" 
              className={`text-sm uppercase tracking-wide transition-colors ${location.pathname === '/' ? 'opacity-100 font-medium' : 'opacity-60 hover:opacity-100'}`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`text-sm uppercase tracking-wide transition-colors ${location.pathname === '/shop' ? 'opacity-100 font-medium' : 'opacity-60 hover:opacity-100'}`}
            >
              Shop
            </Link>
            <a 
              href="/#specializations" 
              className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors"
            >
              Services
            </a>
            <a 
              href="/#contact" 
              className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors"
            >
              Contact
            </a>

            {/* Auth Conditional Links */}
            <div className="flex items-center gap-6 border-l border-current pl-8 ml-2">
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <Link to="/admin" className="text-sm uppercase tracking-widest font-medium text-sage hover:text-charcoal transition-colors">
                      Admin Dashboard
                    </Link>
                  ) : (
                    <div className="flex items-center gap-6">
                      <Link to="/wishlist" className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors">Wishlist</Link>
                      <Link to="/my-orders" className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors">My Orders</Link>
                      <Link to="/settings" className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors">Settings</Link>
                    </div>
                  )}
                  <button onClick={logout} className="text-xs uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/auth" className="text-sm uppercase tracking-wide opacity-60 hover:opacity-100 transition-colors">
                    Log In
                  </Link>
                  <Link to="/auth" className="text-sm uppercase tracking-wide bg-charcoal text-white px-5 py-2 rounded hover:bg-black transition-colors font-medium">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-[70] p-2 -mr-2 flex flex-col gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 transition-colors ${isDarkBg && !isScrolled && !isOpen ? 'bg-white' : 'bg-charcoal'}`}
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-6 h-0.5 transition-colors ${isDarkBg && !isScrolled && !isOpen ? 'bg-white' : 'bg-charcoal'}`}
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 transition-colors ${isDarkBg && !isScrolled && !isOpen ? 'bg-white' : 'bg-charcoal'}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[50] bg-white pt-32 px-6 flex flex-col gap-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <Link to="/" className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Home <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </Link>
              <Link to="/shop" className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Shop <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </Link>
              <a href="/#specializations" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Services <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                Contact <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
              </a>

              {/* Mobile Auth Links */}
              <div className="pt-4 mt-2 border-t border-gray-100">
                {user ? (
                  <>
                    {user.role === 'admin' ? (
                      <Link to="/admin" onClick={() => setIsOpen(false)} className="text-xl font-medium tracking-tight text-sage flex justify-between items-center group mb-4">
                        Admin Dashboard <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                      </Link>
                    ) : (
                      <>
                        <Link to="/wishlist" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-tight text-charcoal flex justify-between items-center group mb-4">
                          Wishlist <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </Link>
                        <Link to="/my-orders" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-tight text-charcoal flex justify-between items-center group mb-4">
                          My Orders <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </Link>
                        <Link to="/settings" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-tight text-charcoal flex justify-between items-center group mb-4">
                          Settings <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </Link>
                      </>
                    )}
                    <button onClick={() => { logout(); setIsOpen(false); }} className="text-sm font-medium tracking-widest uppercase text-gray-400 hover:text-charcoal transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link to="/auth" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-tight text-charcoal flex justify-between items-center group">
                      Log In <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)} className="text-xl font-medium tracking-tight text-charcoal flex justify-between items-center group">
                      Create Account <span className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pb-12 pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Stay Connected</p>
              <a 
                href="https://www.instagram.com/stri_by_sudha/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-medium text-charcoal flex items-center gap-3"
              >
                Instagram <span className="text-sage text-sm font-light">@stri_by_sudha</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
