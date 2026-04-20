import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

export default function FeaturedCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (res.ok) {
          const data = await res.json();
          // Filter purely to fetch items with images, capping at 4
          setProducts(data.filter(p => p.images && p.images.length > 0).slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Graceful empty state holding to premium un-broken layout.
  if (!loading && products.length === 0) return null; 

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Minimalist Heading Header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-charcoal uppercase mb-6">
            Featured Collection
          </h2>
          <div className="w-16 h-[1px] bg-charcoal/20"></div>
        </div>

        {/* Data UI & Skeleton Match */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="flex flex-col gap-4 animate-pulse">
                <div className="bg-gray-100 aspect-[3/4] w-full rounded-xl mix-blend-multiply"></div>
                <div className="space-y-2 flex flex-col items-center">
                  <div className="h-2 bg-gray-200/60 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200/60 rounded w-2/4"></div>
                  <div className="h-3 bg-gray-200/60 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {products.map(product => (
              <Link 
                key={product._id} 
                to={`/product/${product._id}`}
                className="group flex flex-col gap-4 focus:outline-none"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1.5">
                    {product.category || 'Collection'}
                  </span>
                  <h3 className="text-sm md:text-base text-charcoal font-medium tracking-wide mb-1">
                    {product.name}
                  </h3>
                  <span className="text-[13px] md:text-sm font-light text-gray-500">
                    ₹{(product.basePrice || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-16 flex justify-center">
          <Link 
            to="/shop"
            className="px-8 py-3.5 border border-gray-300 text-charcoal uppercase tracking-[0.15em] text-[11px] font-medium hover:border-charcoal hover:bg-charcoal hover:text-white transition-all duration-500 rounded"
          >
            View All Collection
          </Link>
        </div>

      </div>
    </section>
  );
}
