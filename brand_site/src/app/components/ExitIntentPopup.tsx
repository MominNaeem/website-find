import { motion, AnimatePresence } from "motion/react";
import { X, Gift } from "lucide-react";
import { useState, useEffect } from "react";

interface ExitIntentPopupProps {
  onBookCall: () => void;
}

export function ExitIntentPopup({ onBookCall }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasShown, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    setIsVisible(false);
    onBookCall();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-[111] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl border border-white/10 shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="size-4 text-gray-400" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="size-16 rounded-full bg-[#C4E86B]/20 flex items-center justify-center mx-auto mb-6"
              >
                <Gift className="size-8 text-[#C4E86B]" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-[#E8E8EA] mb-3">Wait! Don't Leave Yet</h3>
                <p className="text-gray-400 mb-2">Get a <span className="text-[#C4E86B] font-semibold">FREE</span> 30-Minute Strategy Session</p>
                <p className="text-sm text-gray-500 mb-6">
                  We'll analyze your website and show you exactly how to increase conversions by 200%+
                </p>

                <div className="space-y-3 mb-6 text-left">
                  {[
                    "Personalized conversion audit",
                    "Actionable improvement roadmap",
                    "Competitor analysis insights"
                  ].map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="size-5 rounded-full bg-[#9B92C4]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="size-3 text-[#9B92C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-400">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={handleCTA}
                  className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold hover:opacity-90 transition-opacity mb-3"
                >
                  Claim My Free Session
                </button>

                <button
                  onClick={handleClose}
                  className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
                >
                  No thanks, I'll figure it out myself
                </button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
