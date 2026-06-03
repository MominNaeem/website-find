import { motion, useInView } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

interface CTAProps {
  onBookCall: () => void;
}

export function CTA({ onBookCall }: CTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-24 px-8 md:px-16 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(183,148,246,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(159,127,232,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(183,148,246,0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="size-4 text-[#9B92C4]" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">Let's Work Together</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#E8E8EA] leading-tight">
            Get Your Free
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Website Audit
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light">
            Discover exactly how to 3x your conversions. Get a personalized audit with actionable insights — absolutely free.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={onBookCall}
              className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold flex items-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-magnetic
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center">
                Get My Free Audit
                <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 rounded-full bg-white/5 backdrop-blur-xl text-white border border-white/10 font-medium hover:border-[#9B92C4]/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-magnetic
            >
              View Services
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#C4E86B] animate-pulse" />
              <span>100% Free Audit</span>
            </div>
            <div>•</div>
            <div>No Credit Card Required</div>
            <div>•</div>
            <div>Results in 24 Hours</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
