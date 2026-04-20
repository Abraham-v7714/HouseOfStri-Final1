import { useState, useMemo, useEffect } from 'react';
import { Search, Heart, Star, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Sarees', 'Bridal', 'Semi-Bridal', 'Indian Wear', 'Western Wear'];
const SIZES = ['Free Size', 'Custom', 'S', 'M', 'L'];
const COLORS = ['Red', 'Pink', 'Green', 'Gold', 'Ivory', 'Black'];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Filters State
  const [filters, setFilters] = useState({
    inStock: false,
    priceRange: 50000,
    discount: 'Any',
    category: 'All',
    hasBlouse: null, // null = any
    size: 'All',
    color: 'All'
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
            size: 'Free Size',
            color: 'Gold',
            discount: 0
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getActiveFilterTags = () => {
    const tags = [];
    if (filters.inStock) tags.push({ key: 'inStock', label: 'In Stock Only' });
    if (filters.discount !== 'Any') tags.push({ key: 'discount', label: `${filters.discount}%+ Off` });
    if (filters.category !== 'All') tags.push({ key: 'category', label: filters.category });
    if (filters.hasBlouse !== null) tags.push({ key: 'hasBlouse', label: filters.hasBlouse ? 'With Blouse' : 'Without Blouse' });
    if (filters.size !== 'All') tags.push({ key: 'size', label: `Size: ${filters.size}` });
    if (filters.color !== 'All') tags.push({ key: 'color', label: `Color: ${filters.color}` });
    return tags;
  };

  const activeTags = getActiveFilterTags();

  const resetFilters = () => {
    setFilters({
      inStock: false,
      priceRange: 50000,
      discount: 'Any',
      category: 'All',
      hasBlouse: null,
      size: 'All',
      color: 'All'
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // String matches
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // Filter logic
      if (filters.inStock && !product.inStock) return false;
      if (product.price > filters.priceRange) return false;
      if (filters.discount !== 'Any' && product.discount < parseInt(filters.discount)) return false;
      if (filters.category !== 'All' && product.category !== filters.category) return false;
      if (filters.hasBlouse !== null && product.hasBlouse !== filters.hasBlouse) return false;
      if (filters.size !== 'All' && product.size !== filters.size) return false;
      if (filters.color !== 'All' && product.color !== filters.color) return false;

      return true;
    });
  }, [products, searchTerm, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 bg-white min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-light text-charcoal tracking-wide uppercase">The Lookbook</h1>
          <p className="text-sm text-gray-500 mt-2 hover:text-charcoal transition-colors cursor-pointer w-fit leading-relaxed font-light">{filteredProducts.length} Products Found</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search specific designs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-charcoal transition-colors bg-transparent text-sm"
            />
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <button 
            className="md:hidden flex items-center gap-2 border border-gray-200 px-4 py-2 rounded text-sm uppercase tracking-wider"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            Filters <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Left Sidebar Filters (Desktop) */}
        <aside className={`w-64 flex-shrink-0 font-light flex flex-col gap-8 ${isMobileFilterOpen ? 'fixed inset-0 z-[100] bg-white p-6 overflow-y-auto' : 'hidden md:block'}`}>
          {isMobileFilterOpen && (
            <div className="flex justify-between items-center mb-8 md:hidden">
              <h2 className="text-xl tracking-wide uppercase">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
            </div>
          )}

          {/* Availability */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Availability</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={filters.inStock} onChange={(e) => handleFilterChange('inStock', e.target.checked)} className="accent-charcoal w-4 h-4" />
              <span className="text-sm">In Stock Only</span>
            </label>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Price</h3>
            <input 
              type="range" 
              min="0" max="100000" step="5000"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full accent-charcoal"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>₹0</span>
              <span>Up to ₹{Number(filters.priceRange).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="category" checked={filters.category === cat} onChange={() => handleFilterChange('category', cat)} className="accent-charcoal" />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Blouse Piece */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Blouse Piece</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="blouse" checked={filters.hasBlouse === true} onChange={() => handleFilterChange('hasBlouse', true)} className="accent-charcoal" />
                <span className="text-sm">With Blouse</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="blouse" checked={filters.hasBlouse === false} onChange={() => handleFilterChange('hasBlouse', false)} className="accent-charcoal" />
                <span className="text-sm">Without Blouse</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="blouse" checked={filters.hasBlouse === null} onChange={() => handleFilterChange('hasBlouse', null)} className="accent-charcoal" />
                <span className="text-sm">Any</span>
              </label>
            </div>
          </div>

          {/* Discount */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Discount</h3>
            <select value={filters.discount} onChange={(e) => handleFilterChange('discount', e.target.value)} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-charcoal bg-transparent">
              <option value="Any">Any Discount</option>
              <option value="10">10% or more</option>
              <option value="20">20% or more</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Size</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(s => (
                <button 
                  key={s} 
                  onClick={() => handleFilterChange('size', s)}
                  className={`px-3 py-1 text-xs border transition-colors ${filters.size === s ? 'border-charcoal bg-charcoal text-white' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {isMobileFilterOpen && (
            <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-charcoal text-white py-3 mt-8 rounded text-sm uppercase tracking-wider">
              Apply Filters
            </button>
          )}
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Active Tags */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {activeTags.map(tag => (
                <span key={tag.key} className="flex items-center gap-1 text-xs uppercase tracking-wider bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-sm">
                  {tag.label}
                  <button onClick={() => {
                    if (tag.key === 'hasBlouse') handleFilterChange('hasBlouse', null);
                    else if (tag.key === 'inStock') handleFilterChange('inStock', false);
                    else if (tag.key === 'priceRange') handleFilterChange('priceRange', 50000);
                    else handleFilterChange(tag.key, 'All');
                  }} className="ml-2 hover:text-red-500">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button onClick={resetFilters} className="text-xs uppercase tracking-wider text-sage border-b border-sage pb-0.5 ml-2 font-medium">
                Reset All
              </button>
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-400">
              <Loader2 size={32} className="animate-spin mb-4" />
              <p className="text-sm font-medium">Fetching Lookbook collection...</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 cursor-pointer">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Bestseller Badge */}
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-white text-charcoal text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium shadow-sm">
                        Bestseller
                      </span>
                    )}
                    {/* Out of Stock */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                        <span className="bg-white text-charcoal text-xs uppercase tracking-wider px-4 py-2 font-medium">Out of Stock</span>
                      </div>
                    )}
                    {/* Hover Wishlist */}
                    <button className="absolute bottom-3 right-3 bg-white p-2.5 rounded-full text-charcoal opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-50 transform translate-y-4 group-hover:translate-y-0 shadow-sm" onClick={(e) => { e.preventDefault(); /* wishlist logic */ }}>
                      <Heart size={16} />
                    </button>
                  </Link>

                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <Link to={`/product/${product.id}`} className="text-base font-medium text-charcoal mb-2 hover:text-sage transition-colors">{product.title}</Link>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-xs text-gray-400 line-through">₹{(product.price * (1 + product.discount/100)).toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-sage font-medium bg-sage/10 px-1.5 py-0.5 rounded uppercase">{product.discount}% Off</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-light text-charcoal mb-4">No match found</h3>
              <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={resetFilters} className="bg-charcoal text-white px-6 py-3 text-sm tracking-wider uppercase">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
