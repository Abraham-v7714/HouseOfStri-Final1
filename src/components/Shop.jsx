import { useState, useMemo, useEffect } from 'react';
import { Search, Heart, Star, ShoppingBag, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { API_URL } from '../config';

const CATEGORIES = ['All', 'Sarees', 'Bridal', 'Semi-Bridal', 'Indian Wear', 'Western Wear'];

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [blouseFilter, setBlouseFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          const mapped = data.map((p) => ({
            ...p,
            id: p._id,
            title: p.name,
            price: p.basePrice || 0,
            img: p.images && p.images.length > 0 ? p.images[0] : '',
            rating: 5.0,
            isBestseller: false,
            inStock: p.quantity > 0,
            hasBlouse: p.addOns && p.addOns.length > 0,
            size: 'Free Size'
          }));
          setProducts(mapped);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (category !== 'All' && product.category !== category) return false;
      if (blouseFilter !== 'All') {
        const hasBlouse = blouseFilter === 'With Blouse';
        if (product.hasBlouse !== hasBlouse) return false;
      }
      if (sizeFilter !== 'All' && product.size !== sizeFilter) return false;
      return true;
    });
  }, [products, searchTerm, category, blouseFilter, sizeFilter]);

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, {
      blouse: null, petticoat: null, preDrape: false, dupattaStyling: false, gifting: false, fallEdging: true
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-[#fafafa]">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
        <h1 className="text-4xl lg:text-5xl font-light text-charcoal tracking-wide mb-2">Shop Collection</h1>
        <p className="text-gray-500 font-light">Curated bespoke Indian and Western wear.</p>
      </div>

      {/* Sticky Horizontal Filter Bar */}
      <div className="sticky top-16 md:top-20 z-[40] bg-white/60 backdrop-blur-xl border-y border-gray-100/50 py-4 mb-8 transiton-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Main Categories - Pill buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category === cat ? 'bg-charcoal text-white shadow-md' : 'bg-white/40 hover:bg-white text-gray-600 hover:text-charcoal backdrop-blur-md border border-gray-200/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filters & Search */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {/* Blouse Dropdown */}
            <div className="relative group">
              <select 
                value={blouseFilter} 
                onChange={(e) => setBlouseFilter(e.target.value)}
                className="appearance-none bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-full pl-5 pr-10 py-2 text-sm text-gray-600 outline-none focus:border-gray-400 focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">Blouse Piece</option>
                <option value="With Blouse">With Blouse</option>
                <option value="Without Blouse">Without Blouse</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-charcoal transition-colors" />
            </div>

            {/* Size Dropdown */}
            <div className="relative group">
              <select 
                value={sizeFilter} 
                onChange={(e) => setSizeFilter(e.target.value)}
                className="appearance-none bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-full pl-5 pr-10 py-2 text-sm text-gray-600 outline-none focus:border-gray-400 focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">Size</option>
                <option value="Free Size">Free Size</option>
                <option value="Custom">Custom</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-charcoal transition-colors" />
            </div>

            {/* Search */}
            <div className="relative flex-1 min-w-[150px]">
              <input 
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:bg-white focus:border-gray-400 transition-all text-charcoal placeholder:text-gray-400"
              />
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

        </div>
      </div>

      {/* Product Grid Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 min-h-[40vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-medium">Fetching curated collection...</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group flex flex-col"
              >
                <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4 cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-charcoal/10 isolate">
                  <img 
                    src={product.img} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Frosted Bestseller Badge */}
                  {product.isBestseller && (
                    <span className="absolute top-4 left-4 bg-white/70 backdrop-blur-md text-charcoal text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium rounded-full z-10 border border-white/40 leading-none">
                      Bestseller
                    </span>
                  )}
                  
                  {/* Floating Wishlist Button */}
                  <button 
                    className={`absolute top-4 right-4 bg-white/70 backdrop-blur-md p-2 rounded-full transition-all hover:bg-white border border-white/40 z-10 duration-300 transform translate-y-2 group-hover:translate-y-0 ${isInWishlist(product.id) ? 'text-red-500 opacity-100 translate-y-0' : 'text-charcoal opacity-0 group-hover:opacity-100'}`} 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                  >
                    <Heart size={16} strokeWidth={1.5} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                  </button>

                  {/* Slide-Up Quick Add */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                    <button 
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="w-full bg-white/90 backdrop-blur-xl text-charcoal py-2.5 md:py-3.5 rounded-lg flex items-center justify-center gap-2 font-medium text-[10px] md:text-sm tracking-wide shadow-lg border border-white/50 hover:bg-charcoal hover:text-white transition-colors duration-300"
                    >
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      Quick Add
                    </button>
                  </div>
                  
                  {/* Bottom Gradient for Quick Add visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                </Link>

                <div className="flex flex-col px-1">
                  <div className="flex justify-between items-start mb-1.5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{product.category}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Star size={10} className="fill-charcoal/20 text-charcoal/20" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <Link to={`/product/${product.id}`} className="text-sm md:text-base font-medium text-charcoal mb-1 hover:text-sage transition-colors line-clamp-1">{product.title}</Link>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] md:text-sm text-gray-600">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-32 flex flex-col items-center justify-center">
            <ShoppingBag size={48} className="text-gray-200 mb-6" strokeWidth={1} />
            <h3 className="text-2xl font-light text-charcoal mb-2">No items found</h3>
            <p className="text-gray-500 text-sm">We couldn't find anything matching your filters or inventory is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
