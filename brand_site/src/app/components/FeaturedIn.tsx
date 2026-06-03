import { motion } from "motion/react";

const media = [
  "TechCrunch", "Forbes", "Wired", "Fast Company", "Entrepreneur", "Inc."
];

export function FeaturedIn() {
  return (
    <section className="py-12 px-8 md:px-16 bg-black border-y border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <p className="text-sm text-gray-500 uppercase tracking-wider">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {media.map((outlet, index) => (
              <motion.div
                key={outlet}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-lg font-semibold text-gray-600 hover:text-[#9B92C4] transition-colors cursor-default"
              >
                {outlet}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
