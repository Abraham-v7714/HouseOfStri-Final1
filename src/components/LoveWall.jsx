import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { 
    name: 'Priya S.', 
    text: 'The attention to detail on my bridal blouse was absolutely breathtaking. It fit like a glove and the embroidery was everything I dreamed of!', 
    img: '/images/480893553_2151819078593365_1528989951221539907_n.jpg' 
  },
  { 
    name: 'Ananya R.', 
    text: 'I have never felt more confident. The pure silk they suggested was perfect for the occasion. Highly recommend House of Stri for any bespoke needs.', 
    img: '/images/480950539_2151835308591742_1770889308060041673_n.jpg' 
  },
  { 
    name: 'Megha V.', 
    text: 'Such a seamless process from consultation to delivery. The finishing is incredibly premium and the fit is tailored to perfection.', 
    img: null 
  },
  { 
    name: 'Sneha M.', 
    text: 'I brought in an old saree of my grandmother\'s and they transformed it into a stunning lehenga for me. Truly magical craftsmanship.', 
    img: '/images/481003156_2151835058591767_1325976108393863819_n.jpg' 
  },
  { 
    name: 'Radhika K.', 
    text: 'The most elegant boutique in Bangalore! Their understanding of modern fashion combined with traditional roots is unparalleled.', 
    img: null 
  },
];

const igPosts = [
  { id: 'DOfXYIGE4jw', link: 'https://www.instagram.com/reel/DOfXYIGE4jw/', img: '/images/481122461_2151835331925073_6859719336549493867_n.jpg' },
  { id: 'DNnQhoby1iq', link: 'https://www.instagram.com/reel/DNnQhoby1iq/', img: '/images/481202880_2151835391925067_7833213548805774466_n.jpg' },
  { id: 'DJMCk1PyVKP', link: 'https://www.instagram.com/reel/DJMCk1PyVKP/', img: '/images/481220390_1082570410550002_8726829868458989535_n.jpg' },
  { id: 'C3Ut67pL6SH', link: 'https://www.instagram.com/reel/C3Ut67pL6SH/', img: '/images/481221361_2151835068591766_3292692275488330680_n.jpg' },
];

export default function LoveWall() {
  return (
    <section className="py-24 px-4 bg-sage/30">
      <div className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-charcoal/60 mb-2 block">Wall of Love</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-charcoal tracking-tight">Stories of Our Craft</h2>
        </div>

        {/* Masonry Testimonials */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="break-inside-avoid bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="mr-1" />)}
              </div>
              <p className="text-charcoal/80 font-light text-lg mb-6 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                {t.img ? (
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center text-sage font-medium text-lg">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-charcoal">{t.name}</h4>
                  <p className="text-xs text-gray-400 font-light">Verified Client</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-charcoal">Follow Our Journey</h3>
            <p className="text-sage font-medium mt-1">@stri_by_sudha</p>
          </div>
          <a 
            href="https://www.instagram.com/stri_by_sudha/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:inline-block text-sm uppercase tracking-widest font-medium border-b border-charcoal/30 pb-1 hover:border-charcoal transition-colors text-charcoal"
          >
            Visit Profile
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {igPosts.map((post, idx) => (
            <motion.a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative aspect-[9/16] overflow-hidden group rounded-xl bg-white shadow-sm"
            >
              <img src={post.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" alt="Instagram Reel" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 6v12l10-6L7 6z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-[10px] text-white uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Watch Reel</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
