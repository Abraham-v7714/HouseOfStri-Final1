import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import Specializations from './components/Specializations';
import Process from './components/Process';
import LoveWall from './components/LoveWall';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Contact from './components/Contact';
import SidebarNav from './components/SidebarNav';
import CartDrawer from './components/CartDrawer';
import ProductPage from './components/ProductPage';
import Checkout from './components/Checkout';
import Shop from './components/Shop';
import Lookbook from './components/Lookbook';
import AuthPage from './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './components/Wishlist';
import MyOrders from './components/MyOrders';
import ResetPassword from './components/ResetPassword';
import Settings from './components/Settings';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import Overview from './components/admin/Overview';
import Inventory from './components/admin/Inventory';
import Orders from './components/admin/Orders';

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <Specializations />
      <Process />
      <LoveWall />
      <Contact />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div className="bg-[#fafafa] min-h-screen text-charcoal flex flex-col font-sans w-full overflow-hidden">
      <SidebarNav />
      <CartDrawer />
      <div className="flex-1 w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <div className="md:pl-16">
          <Footer />
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes - Protected */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Overview />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>
            
            {/* Public Routes */}
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
