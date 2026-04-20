import { Link } from 'react-router-dom';
import { User, Grid, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SidebarNav() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-white border-r border-gray-100 z-[80] hidden md:flex flex-col items-center py-8 justify-between shadow-sm">
      <div className="flex flex-col gap-8">
        <Link to="/" className="text-charcoal hover:text-sage transition-colors p-2" title="Account">
          <User size={20} strokeWidth={1.5} />
        </Link>
        <Link to="/shop" className="text-charcoal hover:text-sage transition-colors p-2" title="Shop">
          <Grid size={20} strokeWidth={1.5} />
        </Link>
        <Link to="/lookbook" className="text-charcoal hover:text-sage transition-colors p-2" title="Lookbook">
          <Sparkles size={20} strokeWidth={1.5} />
        </Link>
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative text-charcoal hover:text-sage transition-colors p-2" 
          aria-label="Open Cart"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-sage text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
