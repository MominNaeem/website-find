import { motion, useInView } from "motion/react";
import { Code, Palette, Megaphone, Zap, TrendingUp, Sparkles } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    icon: Palette,
    title: "Brand Design",
    description: "Visual identities that capture attention and build lasting recognition",
    color: "#9B92C4",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Lightning-fast, conversion-optimized websites built with modern tech",
    color: "#9B92C4",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Data-driven strategies that scale your business and maximize ROI",
    color: "#9B92C4",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Campaigns that reach the right audience at the perfect moment",
    color: "#9B92C4",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Speed optimization that keeps visitors engaged and converts",
    color: "#9B92C4",
  },
  {
    icon: Sparkles,
    title: "UX Design",
    description: "Intuitive experiences that users love and remember",
    color: "#9B92C4",
  },
];

function ServiceCard({ service, index, onBookCall }: { service: typeof services[0]; index: number; onBookCall: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onBookCall}
      className="group relative p-6 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#9B92C4]/30 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#9B92C4]/10 cursor-pointer"
      data-magnetic
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#9B92C4]/8 to-[#9B92C4]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ filter: "blur(40px)" }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
          style={{
            background: `linear-gradient(to bottom right, ${service.color}15, ${service.color}15)`,
          }}
          whileHover={{ rotate: 5 }}
        >
          <service.icon className="size-8" style={{ color: service.color }} strokeWidth={1.5} />
        </motion.div>

        <h3 className="text-xl font-semibold mb-3 text-[#E8E8EA] transition-colors duration-300 leading-tight" style={{ '--hover-color': service.color } as React.CSSProperties}>
          {service.title}
        </h3>

        <p className="text-gray-400 leading-relaxed font-light text-sm line-clamp-3">
          {service.description}
        </p>

        <motion.div
          className="mt-6 flex items-center gap-2 text-[#9B92C4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 5 }}
        >
          <span className="text-sm font-medium">Learn More</span>
          <div className="w-8 h-px bg-[#9B92C4]" />
        </motion.div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#9B92C4]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
    </motion.div>
  );
}

export function Services({ onBookCall }: { onBookCall: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <section id="services" ref={ref} className="py-24 px-8 md:px-16 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9B92C4]/4 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7B72A4]/3 rounded-full blur-[120px]" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="size-4 text-[#9B92C4]" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">What We Do</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Services That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Drive Results
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            We combine creativity with data to build digital experiences that convert
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} onBookCall={onBookCall} />
          ))}
        </div>
      </div>
    </section>
  );
}
