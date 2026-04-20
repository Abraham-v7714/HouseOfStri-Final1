import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 px-4 bg-white" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium tracking-widest uppercase text-charcoal/60 mb-2 block">Connect With Us</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-charcoal tracking-tight mb-6">We'd love to hear from you.</h2>
            <p className="text-charcoal/70 text-lg font-light mb-10 leading-relaxed">
              Whether you have a specific design in mind or just want to explore the possibilities, our team is here to help you craft your perfect fit.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center text-charcoal shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">Our Boutique</h4>
                  <p className="text-charcoal/60 font-light text-sm">Arekere Gate, Bannerghatta Road, Bangalore</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center text-charcoal shrink-0">
                  <Phone size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-charcoal">Speak With Us</h4>
                  <a href="https://wa.me/919902542749" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 font-light text-sm hover:text-sage transition-colors">
                    +91 99025 42749
                  </a>
                  <p className="text-[11px] text-gray-400 font-light mt-1">Available for Call or WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center text-charcoal shrink-0 font-bold text-xs">
                  IG
                </div>
                <a 
                  href="https://www.instagram.com/stri_by_sudha/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h4 className="font-medium text-charcoal group-hover:text-sage transition-colors">Instagram</h4>
                  <p className="text-charcoal/60 font-light text-sm group-hover:text-charcoal transition-colors">@stri_by_sudha</p>
                </a>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center text-charcoal shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">Email Inquiries</h4>
                  <p className="text-charcoal/60 font-light text-sm">hello@houseofstri.com</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-blush/50 p-8 md:p-12 rounded-3xl"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-charcoal/60 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your name"
                  className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage transition-all font-light"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-charcoal/60 mb-2">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us what you're looking for..."
                  className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage transition-all font-light resize-none"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full bg-charcoal text-white py-4 rounded-xl font-medium uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
              >
                Send Inquiry
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
