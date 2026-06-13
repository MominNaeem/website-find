import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUp, Phone } from "lucide-react";
import { useState } from "react";

interface FloatingCTAProps {
  onBookCall: () => void;
}

export function FloatingCTA({ onBookCall }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 500);
    setShowBackToTop(latest > 1000);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Book Call Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={onBookCall}
        className="fixed bottom-24 md:bottom-8 right-8 z-[60] group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#C4E86B]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Button */}
          <div className="relative size-16 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] flex items-center justify-center shadow-2xl">
            <Phone className="size-6 text-black" />
          </div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 bg-white text-black rounded-lg text-sm font-medium shadow-xl pointer-events-none"
          >
            Book a Free Call
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 size-2 bg-white" />
          </motion.div>
        </div>
      </motion.button>

      {/* Back to Top Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: showBackToTop ? 1 : 0,
          opacity: showBackToTop ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 z-50 size-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="size-5" />
      </motion.button>
    </>
  );
}
