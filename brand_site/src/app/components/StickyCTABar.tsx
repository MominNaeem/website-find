import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

interface StickyCTABarProps {
  onBookCall: () => void;
}

export function StickyCTABar({ onBookCall }: StickyCTABarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show after scrolling 50% of the page
    setIsVisible(latest > 0.5);
  });

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-[55] border-t border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl"
    >
      <div className="max-w-[1600px] mx-auto px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-[#C4E86B]" />
            <div>
              <h3 className="text-sm font-semibold text-[#E8E8EA]">
                Ready to 3x Your Conversions?
              </h3>
              <p className="text-xs text-gray-500">Get your free audit • Limited spots available</p>
            </div>
          </div>

          {/* Right side */}
          <motion.button
            onClick={onBookCall}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold flex items-center gap-2 shadow-lg shadow-[#C4E86B]/20 whitespace-nowrap"
          >
            Get Free Audit Now
            <ArrowRight className="size-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
