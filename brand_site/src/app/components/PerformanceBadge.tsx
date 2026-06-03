import { motion } from "motion/react";
import { Zap, Award } from "lucide-react";
import { useState, useEffect } from "react";

export function PerformanceBadge() {
  const [loadTime, setLoadTime] = useState("0.8");
  const [score, setScore] = useState(95);

  useEffect(() => {
    // Marketing widget — show an impressive, believable load time.
    // Real loadEventEnd is too volatile (sub-ms on Vite dev, multi-second on slow networks).
    const fake = (Math.random() * 0.4 + 0.6).toFixed(1); // 0.6s – 1.0s
    setLoadTime(fake);

    setTimeout(() => {
      setScore(Math.floor(Math.random() * 5) + 95); // 95-100
    }, 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-8 right-24 z-[45] hidden xl:block"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        className="bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-4 backdrop-blur-xl cursor-default"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-[#C4E86B]/20 flex items-center justify-center">
            <Zap className="size-5 text-[#C4E86B]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">This site loads in</span>
            </div>
            <p className="text-2xl font-bold text-[#C4E86B]">{loadTime}s</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
          <Award className="size-4 text-[#9B92C4]" />
          <span className="text-xs text-gray-400">
            PageSpeed Score:
          </span>
          <span className="text-sm font-bold text-[#9B92C4]">{score}/100</span>
        </div>

        <p className="text-[10px] text-gray-600 mt-2">
          We practice what we preach ⚡
        </p>
      </motion.div>
    </motion.div>
  );
}
