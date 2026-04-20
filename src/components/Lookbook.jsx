import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOOKBOOK_ITEMS = [
  { id: 1, title: 'The Royal Wedding', img: '/images/472501964_2109710246137582_1686977478784632714_n.jpg', height: 'h-[600px]', link: '/shop' },
  { id: 2, title: 'Summer Florals', img: '/images/166711274_1194599050982044_6270426226883514264_n.jpg', height: 'h-[400px]', link: '/shop' },
  { id: 3, title: 'Modern Heirloom', img: 'https://images.unsplash.com/photo-1610189013063-8a3fc02e70e9?q=80&w=2787&auto=format&fit=crop', height: 'h-[700px]', link: '/shop' },
  { id: 4, title: 'Evening Elegance', img: '/images/481001969_1076526647821045_4152357952502763403_n.jpg', height: 'h-[500px]', link: '/shop' },
  { id: 5, title: 'Contemporary Silk', img: '/images/473524949_2120114618430478_169379780733222852_n.jpg', height: 'h-[450px]', link: '/shop' },
  { id: 6, title: 'Minimalist Festive', img: '/images/477063021_1066180105522366_5657374101924216005_n.jpg', height: 'h-[650px]', link: '/shop' },
];

function ParallaxImage({ item }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Slow parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div 
      ref={ref} 
      className={`relative w-full overflow-hidden rounded-lg mb-8 group cursor-pointer bg-gray-100 ${item.height}`}
    >
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-95 origin-center"
        />
      </motion.div>
      
      {/* Frosted Glass Overlay on Hover */}
      <div className="absolute inset-x-0 bottom-0 top-0 bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex flex-col items-center justify-center pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/50 text-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out shadow-2xl">
          <h3 className="text-2xl font-light text-charcoal mb-2">{item.title}</h3>
          <span className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-charcoal/70 font-medium">
            Explore Collection <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Lookbook() {
  return (
    <div className="pt-24 pb-32 bg-[#fdfdfd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-32 mt-12">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-charcoal mb-6">The Lookbook</h1>
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            An editorial journey through our curated collections. Immersive narratives crafted with thread, needle, and passion.
          </p>
        </div>

        {/* Masonry Layout Container */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-12">
          {LOOKBOOK_ITEMS.map((item) => (
            <Link to={item.link} key={item.id} className="block break-inside-avoid">
              <ParallaxImage item={item} />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
