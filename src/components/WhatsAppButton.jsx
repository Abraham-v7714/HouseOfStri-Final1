import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919902542749"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all flex items-center justify-center hover:-translate-y-1"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full animate-subtle-pulse bg-[#25D366] opacity-50"></div>
      <MessageCircle size={28} className="relative z-10" />
    </motion.a>
  );
}
