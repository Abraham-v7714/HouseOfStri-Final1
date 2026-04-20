import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { HeartOff, ShoppingBag, Trash2 } from 'lucide-react';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    // Add default behavior if config omitted or needed
    addToCart(product, { size: 'Made to Measure' }); 
    removeFromWishlist(product._id);
  };

  return (
    <div className="pt-32 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-charcoal mb-4">My Wishlist</h1>
            <p className="text-gray-500 font-light tracking-wide text-sm uppercase">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
            </p>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm text-center px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <HeartOff size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-light text-charcoal mb-3 tracking-wide">Your wishlist is empty</h2>
            <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
              You haven't saved any items yet. Discover our collections and add your favorite pieces to your wishlist.
            </p>
            <Link 
              to="/shop" 
              className="bg-charcoal text-white px-8 py-3.5 rounded text-sm uppercase tracking-widest font-medium hover:bg-black transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
            {wishlistItems.map((product) => (
              <div key={product._id} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-500">
                {/* Image Container */}
                <Link to={`/product/${product._id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 block">
                  <img 
                    src={product.images && product.images[0] ? product.images[0] : ''} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  
                  {/* Remove Button Overlay */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(product._id);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-red-500 shadow-lg"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </Link>
                
                {/* Product Details */}
                <div className="p-3 md:p-6 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-widest text-sage font-medium mb-2">
                    {product.category}
                  </span>
                  <Link to={`/product/${product._id}`} className="text-sm md:text-lg text-charcoal font-medium tracking-wide mb-1 md:mb-2 hover:text-sage transition-colors line-clamp-1 block">
                    {product.name}
                  </Link>
                  <span className="text-[13px] md:text-sm font-medium text-gray-500 mb-4 md:mb-6">
                    ₹{(product.basePrice || product.price || 0).toLocaleString('en-IN')}
                  </span>
                  
                  {/* Actions */}
                  <div className="mt-auto">
                    <button 
                      onClick={() => handleMoveToCart(product)}
                      className="w-full py-2 md:py-3 bg-gray-50 border border-gray-200 text-charcoal uppercase tracking-widest text-[9px] md:text-[11px] font-medium hover:bg-charcoal hover:border-charcoal hover:text-white transition-all duration-300 rounded flex items-center justify-center gap-1 md:gap-2"
                    >
                      <ShoppingBag size={12} />
                      <span className="hidden xs:inline">Move to Bag</span>
                      <span className="xs:hidden">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
