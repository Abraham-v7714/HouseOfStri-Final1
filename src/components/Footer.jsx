export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-semibold tracking-tight mb-4">House of Stri</h3>
          <p className="text-white/70 mb-6 font-light leading-relaxed max-w-sm text-balance">
            Crafting premium custom ethnic wear with unparalleled attention to detail. Your perfect fit awaits.
          </p>
          <a href="https://wa.me/919902542749" target="_blank" rel="noopener noreferrer" className="text-sage hover:text-white transition-colors underline underline-offset-4">
            Book a Consultation
          </a>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-lg font-medium tracking-wide mb-4">Visit Us</h4>
          <p className="text-white/70 font-light mb-2">Arekere Gate, Bannerghatta Road</p>
          <p className="text-white/70 font-light mb-6">Bangalore, Karnataka</p>
          
          <h4 className="text-lg font-medium tracking-wide mb-4 mt-8">Operating Hours</h4>
          <p className="text-white/70 font-light">Monday - Sunday</p>
          <p className="text-white/70 font-light">10:00 AM – 8:00 PM</p>
        </div>

        {/* Map */}
        <div className="h-48 md:h-full min-h-[200px] w-full rounded-xl overflow-hidden bg-white/10 group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3bae14f9d0c9f131%3A0xc3f605eb8bbdd81a!2sArekere%20Gate!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
          ></iframe>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50 font-light">
        <p>&copy; {new Date().getFullYear()} House of Stri. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://www.instagram.com/stri_by_sudha/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Style Guides</a>
          <a href="#" className="hover:text-white transition-colors">Size Charts</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
