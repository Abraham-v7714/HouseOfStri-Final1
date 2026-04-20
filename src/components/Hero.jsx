import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Elegant boutique ethnic fashion" 
          className="w-full h-full object-cover object-center"
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-charcoal/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pt-20">

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-tight mb-6"
        >
          Let's craft your <br className="hidden md:block" /> perfect fit.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light text-balance"
        >
          Experience the luxury of custom ethnic fashion tailoring. Exquisite craftsmanship, created exclusively for you in Arekere, Bangalore.
        </motion.p>
        
        <motion.a 
          href="https://wa.me/919902542749?text=Hi%20House%20of%20Stri!%20I'd%20like%20to%20consult%20with%20a%20designer%20for%20a%20custom%20fit."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-charcoal px-8 py-4 rounded-full font-medium text-sm md:text-base uppercase tracking-widest hover:shadow-xl transition-all"
        >
          Design My Outfit
        </motion.a>
      </div>
    </section>
  );
}
