import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "Discuss your vision, measurements, and fabric preferences with our expert designers.",
  },
  {
    num: "02",
    title: "Tailoring",
    desc: "Master craftspeople precisely cut, embroider, and stitch your garment to perfection.",
  },
  {
    num: "03",
    title: "Delivery",
    desc: "Receive your custom-fitted ethnic wear, crafted exclusively for you.",
  }
];

export default function Process() {
  return (
    <section className="py-24 px-4 bg-blush">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-charcoal/60 mb-2 block">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-charcoal tracking-tight">The Perfect Fit Process</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="text-5xl md:text-6xl font-light text-sage mb-6 group-hover:scale-110 transition-transform origin-left duration-500">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-charcoal">{step.title}</h3>
              <p className="text-charcoal/70 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
