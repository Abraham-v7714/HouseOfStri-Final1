import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Star, Heart, CheckCircle2, ChevronRight, Truck, Ruler, ShieldCheck, Loader2 } from 'lucide-react';
import { API_URL } from '../config';

const CustomRadio = ({ checked }) => (
  <motion.div 
    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors duration-300 flex-shrink-0 mt-0.5 ${checked ? 'border-charcoal bg-charcoal' : 'border-gray-300'}`}
  >
    {checked && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-white rounded-full" />}
  </motion.div>
);

const CustomCheckbox = ({ checked, readonly }) => (
  <motion.div 
    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors duration-300 flex-shrink-0 ${checked ? (readonly ? 'border-sage bg-sage' : 'border-charcoal bg-charcoal') : 'border-gray-300'}`}
  >
    {checked && <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></motion.svg>}
  </motion.div>
);

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct({
            id: data._id,
            _id: data._id,
            name: data.name,
            category: data.category || 'PREMIUM SILK SAREE',
            price: data.basePrice || 0,
            basePrice: data.basePrice || 0,
            rating: 5.0,
            reviews: 124,
            description: data.description || '',
            images: data.images && data.images.length > 0 ? data.images : [
              'https://images.unsplash.com/photo-1610189013063-8a3fc02e70e9?q=80&w=2787&auto=format&fit=crop'
            ],
            addOns: data.addOns || []
          });
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);
  
  // Add-on states
  const [expandedSection, setExpandedSection] = useState('blouse');
  const [config, setConfig] = useState({
    blouse: null,
    petticoat: null,
    preDrape: false,
    dupattaStyling: false,
    gifting: false,
    fallEdging: true
  });

  const blouseOptions = [
    { id: 'b_std', name: 'Standard Princess Cut', price: 1500, desc: 'Classic, perfectly tailored fit with standard front and back necklines.' },
    { id: 'b_custom', name: 'Custom Back Design', price: 2500, desc: 'Bespoke detailing for the back (Deep V, Dori ties).' },
    { id: 'b_creative', name: 'Creative Sleeve', price: 3200, desc: 'Dramatic sleeve architecture (Fluted, Bishop) adding structure.' }
  ];

  const petticoatOptions = [
    { id: 'p_std', name: 'Pure Cotton 6-Part', price: 600, desc: 'Breathable, paneled construction for a flared finish.' },
    { id: 'p_shape', name: 'Lycra Fish-Cut Shapewear', price: 1800, desc: 'Compressive, stretchable fabric smoothing the silhouette.' }
  ];

  const handleConfigChange = (type, value) => {
    setConfig(prev => ({ ...prev, [type]: value }));
  };

  const calculateTotal = () => {
    if (!product) return 0;
    let total = product.price;
    if (config.blouse) total += config.blouse.price;
    if (config.petticoat) total += config.petticoat.price;
    if (config.preDrape) total += 2000;
    if (config.dupattaStyling) total += 800;
    if (config.gifting) total += 500;
    return total;
  };

  const handleAddToCart = () => {
    if (product) addToCart(product, config);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ece9]/30 flex flex-col items-center justify-center pt-24 pb-32">
        <Loader2 size={40} className="animate-spin text-charcoal mb-4" />
        <p className="font-light text-gray-500 tracking-wider uppercase text-sm">Loading Product Details</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0ece9]/30 flex flex-col items-center justify-center pt-24 pb-32">
        <h2 className="text-3xl font-light text-charcoal mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-sage font-medium uppercase tracking-widest text-sm hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f0ece9]/30 min-h-screen text-charcoal flex flex-col font-sans w-full">
      <div className="pt-24 pb-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8 mt-4 font-medium">
            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Sticky Left Gallery (Massive Immersive) */}
            <div className="w-full lg:w-[60%] xl:w-[65%] sticky top-24 h-[calc(100vh-120px)] flex gap-4 overflow-hidden rounded-2xl bg-white/20 backdrop-blur-sm p-2 border border-white/40 shadow-sm">
              <div className="hidden md:flex flex-col gap-3 overflow-y-auto hide-scrollbar w-24">
                {product.images.map((img, idx) => (
                  <button key={idx} className="w-full h-32 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-gray-200 transition-colors">
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto hide-scrollbar rounded-xl snap-y snap-mandatory bg-black/5">
                {product.images.map((img, idx) => (
                  <div key={idx} className="h-full w-full snap-center snap-always flex-shrink-0 relative cursor-zoom-in">
                    <img src={img} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Scrollable Customization Column */}
            <div className="w-full lg:w-[40%] xl:w-[35%] py-4 pb-24">
              
              <div className="mb-8">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">{product.category}</p>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`bg-white/60 backdrop-blur rounded-full p-2.5 transition-colors shadow-sm ${isInWishlist(product._id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-charcoal'}`}
                  >
                    <Heart size={18} strokeWidth={1.5} fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 leading-none">{product.name}</h1>
                <p className="text-2xl font-light text-charcoal mb-6">₹{calculateTotal().toLocaleString('en-IN')}</p>
                
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 font-light">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star size={14} key={i} fill={i <= 4 ? "currentColor" : "none"} className={i > 4 ? "text-gray-300" : ""} />)}
                  </div>
                  <span>{product.rating} ({product.reviews} Reviews)</span>
                </div>

                <p className="text-gray-600 leading-relaxed font-light text-[15px]">{product.description}</p>
              </div>

              {/* Glassmorphic Add-on UI */}
              <div className="space-y-6 mb-10">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">Bespoke Customization</h3>

                {/* TIER 1: Blouse Options */}
                <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.03)]">
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'blouse' ? null : 'blouse')}
                    className="w-full flex justify-between items-center p-5 text-[15px] font-medium transition-colors hover:bg-white/30"
                  >
                    <span>With Blouse</span>
                    {expandedSection === 'blouse' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'blouse' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="p-2 space-y-2 pb-5 px-5">
                          {blouseOptions.map(opt => (
                            <label key={opt.id} className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${config.blouse?.id === opt.id ? 'bg-white shadow-sm border-white' : 'border-transparent hover:bg-white/50'}`}>
                              <input type="radio" className="hidden" checked={config.blouse?.id === opt.id} onChange={() => handleConfigChange('blouse', opt)} />
                              <CustomRadio checked={config.blouse?.id === opt.id} />
                              <div className="flex-1">
                                <div className="flex justify-between text-[15px]">
                                  <span className="font-medium text-charcoal">{opt.name}</span>
                                  <span className="text-gray-500 font-light">+₹{opt.price}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{opt.desc}</p>
                              </div>
                            </label>
                          ))}
                          <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${!config.blouse ? 'bg-white shadow-sm border-white' : 'border-transparent hover:bg-white/50'}`}>
                            <input type="radio" className="hidden" checked={!config.blouse} onChange={() => handleConfigChange('blouse', null)} />
                            <CustomRadio checked={!config.blouse} />
                            <span className="text-[15px] font-medium text-charcoal pt-0.5">No Blouse Assembly required</span>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* TIER 1: Petticoat Options */}
                <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.03)]">
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'petticoat' ? null : 'petticoat')}
                    className="w-full flex justify-between items-center p-5 text-[15px] font-medium transition-colors hover:bg-white/30"
                  >
                    <span>With Petticoat</span>
                    {expandedSection === 'petticoat' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'petticoat' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="p-2 space-y-2 pb-5 px-5">
                          {petticoatOptions.map(opt => (
                            <label key={opt.id} className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${config.petticoat?.id === opt.id ? 'bg-white shadow-sm border-white' : 'border-transparent hover:bg-white/50'}`}>
                              <input type="radio" className="hidden" checked={config.petticoat?.id === opt.id} onChange={() => handleConfigChange('petticoat', opt)} />
                              <CustomRadio checked={config.petticoat?.id === opt.id} />
                              <div className="flex-1">
                                <div className="flex justify-between text-[15px]">
                                  <span className="font-medium text-charcoal">{opt.name}</span>
                                  <span className="text-gray-500 font-light">+₹{opt.price}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{opt.desc}</p>
                              </div>
                            </label>
                          ))}
                          <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${!config.petticoat ? 'bg-white shadow-sm border-white' : 'border-transparent hover:bg-white/50'}`}>
                            <input type="radio" className="hidden" checked={!config.petticoat} onChange={() => handleConfigChange('petticoat', null)} />
                            <CustomRadio checked={!config.petticoat} />
                            <span className="text-[15px] font-medium text-charcoal pt-0.5">No Petticoat</span>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* TIER 2 & 3: Premium Services */}
                <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-5 space-y-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.03)]">
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">Premium Experiences</h4>
                  
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="hidden" checked={config.preDrape} onChange={(e) => handleConfigChange('preDrape', e.target.checked)} />
                      <CustomCheckbox checked={config.preDrape} />
                      <span className="text-[15px] text-charcoal font-medium">Pre-Drape Service</span>
                    </div>
                    <span className="text-sm text-gray-500 font-light">+₹2,000</span>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="hidden" checked={config.dupattaStyling} onChange={(e) => handleConfigChange('dupattaStyling', e.target.checked)} />
                      <CustomCheckbox checked={config.dupattaStyling} />
                      <span className="text-[15px] text-charcoal font-medium">Dupatta Styling</span>
                    </div>
                    <span className="text-sm text-gray-500 font-light">+₹800</span>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="hidden" checked={config.gifting} onChange={(e) => handleConfigChange('gifting', e.target.checked)} />
                      <CustomCheckbox checked={config.gifting} />
                      <span className="text-[15px] text-charcoal font-medium">Luxury Packaging</span>
                    </div>
                    <span className="text-sm text-gray-500 font-light">+₹500</span>
                  </label>

                  <label className="flex items-center justify-between cursor-not-allowed opacity-80 pt-4 border-t border-white/50">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="hidden" checked={config.fallEdging} readOnly />
                      <CustomCheckbox checked={config.fallEdging} readonly />
                      <span className="text-[15px] font-medium text-sage">Fall & Edging Included</span>
                    </div>
                    <span className="text-[10px] text-sage font-semibold uppercase tracking-wider bg-sage/10 px-2.5 py-1 rounded-full">Complimentary</span>
                  </label>
                </div>
              </div>

              {/* Add To Cart */}
              <div className="sticky bottom-6 z-20">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-charcoal/95 backdrop-blur-xl text-white py-5 rounded-2xl font-light tracking-widest uppercase text-[13px] hover:bg-black transition-all flex justify-between items-center px-8 shadow-2xl border border-white/10"
                >
                  <span>Add to Bag</span>
                  <span className="font-medium">₹{calculateTotal().toLocaleString('en-IN')}</span>
                </button>
              </div>

              {/* Informational Points */}
              <div className="grid grid-cols-2 gap-4 mt-8 py-8 border-y border-gray-200">
                <div className="flex items-center gap-3 text-[13px] text-gray-600 font-light">
                  <Truck size={16} className="text-charcoal opacity-70" />
                  <span>Express Global Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-gray-600 font-light">
                  <ShieldCheck size={16} className="text-charcoal opacity-70" />
                  <span>Authenticity Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-gray-600 font-light">
                  <Ruler size={16} className="text-charcoal opacity-70" />
                  <span>Made to Measure</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="space-y-4 mt-8">
                {['DESCRIPTION', 'DETAILS & CARE', 'SHIPPING'].map((tab) => (
                  <details key={tab} className="group border-b border-gray-200 pb-4">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[13px] uppercase tracking-widest text-charcoal mb-2">
                      {tab}
                      <span className="transition duration-300 group-open:rotate-180 opacity-50">
                        <ChevronDown size={14} />
                      </span>
                    </summary>
                    <div className="text-gray-500 text-[14px] font-light leading-relaxed mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      {tab === 'DESCRIPTION' && product.description}
                      {tab === 'DETAILS & CARE' && '100% Pure handwoven silk. Dry clean only. Iron on low heat. Store in the provided muslin fabric bag to preserve zari work.'}
                      {tab === 'SHIPPING' && 'Ready-to-wear items ship within 3-5 business days. Custom tailored garments require 14-21 days of crafting time. Duties & taxes calculated at checkout for international clients.'}
                    </div>
                  </details>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
