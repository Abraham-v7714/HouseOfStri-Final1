import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const specializations = [
  {
    id: 'bridal',
    title: 'Bridal',
    subtitle: 'Bespoke Trousseau',
    description: 'Experience the elegance of custom-crafted masterpieces tailored exclusively for your special day. From intricate hand-embroidery to flawless silhouettes, our full bespoke bridal trousseau services ensure you look breathtaking from every angle.',
    image: '/images/bridal_specialization.png',
    cta: 'Consult for Bridal'
  },
  {
    id: 'semi-bridal',
    title: 'Semi-Bridal',
    subtitle: 'Customized Blouses & Gowns',
    description: 'Emphasize your grace with our intricately designed blouses and elegant gowns. Perfect for pre-wedding festivities and receptions, beautifully blending traditional craftsmanship with contemporary aesthetics.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    cta: 'Design Your Blouse'
  },
  {
    id: 'indian-wear',
    title: 'Indian Wear',
    subtitle: 'Timeless Ethnics',
    description: 'A celebration of rich heritage and artisanal mastery. We showcase traditional ethnic craftsmanship through flawlessly tailored sarees, luxurious lehengas, and sophisticated kurtas for any occasion.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
    cta: 'Explore Indian Wear'
  },
  {
    id: 'western-wear',
    title: 'Western Wear',
    subtitle: 'Modern Silhouettes',
    description: 'Highlight your individuality with modern silhouettes and precisely tailored fits. Discover our collection of chic, sophisticated ensembles designed and tailored perfectly for the contemporary wardrobe.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    cta: 'Tailor Western Wear'
  },
  {
    id: 'exclusive',
    title: 'Exclusive',
    subtitle: 'Couture Creations',
    description: 'A premium tier for one-of-a-kind, couture-level creations. Limited edition designs crafted with uncompromising luxury, exquisite fabrics, and unparalleled attention to detail for when you need to make a statement.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
    cta: 'Discover Exclusive'
  }
];

export default function Specializations() {
  return (
    <section className="py-24 md:py-32 px-4 bg-white" id="specializations">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:max-w-2xl"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-charcoal/60 mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-charcoal tracking-tight mb-6">Mastering the Art of Flawless Design.</h2>
            <p className="text-charcoal/70 text-lg font-light leading-relaxed">
              From the delicate threads of our bridal wear to the sharp lines of our modern tailoring, explore our specialized services crafted to elevate your wardrobe.
            </p>
          </motion.div>
        </div>

        <div className="space-y-32 md:space-y-48">
          {specializations.map((spec, index) => {
            const isEven = index % 2 === 0;
            const message = encodeURIComponent(`Hi House of Stri! I would like to ${spec.cta.toLowerCase()}.`);

            return (
              <div 
                key={spec.id} 
                className={`flex flex-col gap-12 md:gap-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                {/* Image Container */}
                <motion.div 
                  className="w-full md:w-1/2"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl group">
                    <div className="absolute inset-0 bg-charcoal/5 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                    <img 
                      src={spec.image} 
                      alt={spec.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                {/* Content Container */}
                <motion.div 
                  className="w-full md:w-1/2 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className={`max-w-lg ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <span className="text-xs tracking-widest font-medium uppercase text-charcoal/50 mb-3 block">0{index + 1} &mdash; {spec.subtitle}</span>
                    <h3 className="text-3xl md:text-5xl font-semibold text-charcoal mb-6 tracking-tight">{spec.title}</h3>
                    <p className="text-lg text-charcoal/70 font-light leading-relaxed mb-10">
                      {spec.description}
                    </p>
                    
                    <a 
                      href={`https://wa.me/919902542749?text=${message}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 group"
                    >
                      <div className="w-14 h-14 rounded-full bg-charcoal text-white flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110">
                        <ArrowRight size={20} className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" />
                      </div>
                      <span className="font-medium text-charcoal uppercase tracking-widest text-sm relative overflow-hidden">
                        <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{spec.cta}</span>
                        <span className="inline-block absolute top-0 left-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">{spec.cta}</span>
                      </span>
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
