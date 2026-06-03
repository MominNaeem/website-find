import { motion } from "motion/react";

const clients = [
  "TechFlow", "GrowthLabs", "Innovate Inc", "Nexus Digital",
  "Quantum Media", "Apex Solutions", "Velocity Co", "Zenith Brands",
  "Fusion Tech", "Catalyst Group", "Momentum Inc", "Elevate Digital"
];

export function ClientLogos() {
  return (
    <section className="py-16 px-8 md:px-16 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Trusted By</p>
          <h3 className="text-2xl md:text-3xl font-bold text-[#E8E8EA]">
            150+ Growing Brands
          </h3>
        </motion.div>

        <div className="relative">
          {/* Scrolling logos */}
          <div className="flex gap-12 overflow-hidden">
            <motion.div
              className="flex gap-12 flex-shrink-0"
              animate={{
                x: [0, -(clients.length * 180)],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="w-40 h-20 flex items-center justify-center flex-shrink-0 px-6"
                >
                  <div className="text-xl font-bold text-gray-600 hover:text-[#9B92C4] transition-colors cursor-default">
                    {client}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
