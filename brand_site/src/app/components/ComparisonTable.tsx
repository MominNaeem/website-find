import { motion } from "motion/react";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Conversion-Focused Design",
    us: true,
    them: false
  },
  {
    feature: "3x ROI Guarantee",
    us: true,
    them: false
  },
  {
    feature: "4-Week Turnaround",
    us: true,
    them: false
  },
  {
    feature: "Unlimited Revisions",
    us: true,
    them: false
  },
  {
    feature: "Performance Optimization",
    us: true,
    them: true
  },
  {
    feature: "Mobile Responsive",
    us: true,
    them: true
  },
  {
    feature: "30-Day Post-Launch Support",
    us: true,
    them: false
  },
  {
    feature: "Conversion Analytics Setup",
    us: true,
    them: false
  },
  {
    feature: "Money-Back Guarantee",
    us: true,
    them: false
  }
];

export function ComparisonTable() {
  return (
    <section className="py-24 px-8 md:px-16 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,146,196,0.04)_0%,transparent_70%)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Why Choose
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Thrive Web Co?
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            See how we stack up against typical web agencies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10 bg-white/[0.02]">
            <div className="text-gray-500 text-sm font-medium">Features</div>
            <div className="text-center">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#9B92C4]/20 to-[#7B72A4]/10 border border-[#9B92C4]/30">
                <span className="text-sm font-bold text-[#9B92C4]">Thrive Web Co</span>
              </div>
            </div>
            <div className="text-center text-sm font-medium text-gray-500">Other Agencies</div>
          </div>

          {/* Rows */}
          <div>
            {comparisons.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-3 gap-4 p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors"
              >
                <div className="text-sm text-gray-300">{item.feature}</div>
                <div className="flex justify-center">
                  {item.us ? (
                    <div className="size-6 rounded-full bg-[#C4E86B]/20 flex items-center justify-center">
                      <Check className="size-4 text-[#C4E86B]" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="size-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="size-4 text-red-400" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {item.them ? (
                    <div className="size-6 rounded-full bg-gray-700/30 flex items-center justify-center">
                      <Check className="size-4 text-gray-500" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="size-6 rounded-full bg-gray-700/20 flex items-center justify-center">
                      <X className="size-4 text-gray-600" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold hover:opacity-90 transition-opacity"
          >
            Start Your Project Today
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
