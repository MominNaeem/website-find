import { motion } from "motion/react";
import { Play, Award, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

const highlights = [
  { icon: Award, label: "Award-Winning Team", value: "Top 1%" },
  { icon: Users, label: "Clients Served", value: "150+" },
  { icon: TrendingUp, label: "Avg ROI Increase", value: "340%" },
];

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 px-8 md:px-16 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,146,196,0.05)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Meet the Team
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Behind Your Results
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            See how we've helped businesses like yours achieve extraordinary growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video bg-gradient-to-br from-[#9B92C4]/10 to-[#7B72A4]/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {/* Placeholder background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,146,196,0.15)_0%,transparent_70%)]" />

            {/* Play button overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="size-20 rounded-full bg-gradient-to-br from-[#C4E86B] to-[#D4F19C] flex items-center justify-center shadow-2xl shadow-[#C4E86B]/30 group-hover:shadow-[#C4E86B]/50 transition-shadow"
                >
                  <Play className="size-8 text-black ml-1" fill="black" />
                </motion.div>
              </motion.div>
            )}

            {/* Video content placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-lg text-[#E8E8EA] font-semibold mb-2">
                  60-Second Success Story
                </p>
                <p className="text-sm text-gray-400">
                  See real results from real clients
                </p>
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
              1:00
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#9B92C4]/30 transition-all duration-300"
              >
                <div className="size-12 rounded-xl bg-[#9B92C4]/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="size-6 text-[#9B92C4]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-[#E8E8EA]">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#9B92C4]/10 to-[#7B72A4]/5 border border-[#9B92C4]/20"
            >
              <p className="text-sm text-gray-400 mb-3">What our clients say:</p>
              <p className="text-lg text-[#E8E8EA] font-light leading-relaxed mb-2">
                "The team's expertise transformed our website into a conversion powerhouse. Best investment we've made."
              </p>
              <p className="text-sm text-gray-500">— Sarah Chen, CEO at TechFlow</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
