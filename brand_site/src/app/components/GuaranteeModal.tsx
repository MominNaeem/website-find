import { motion, AnimatePresence } from "motion/react";
import { X, Shield, TrendingUp, RefreshCw, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

export function GuaranteeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const guarantees = [
    {
      icon: TrendingUp,
      title: "3x ROI Guarantee",
      description: "If we don't generate 3x return on your investment within 12 months, we'll work for free until you do. No questions asked."
    },
    {
      icon: DollarSign,
      title: "Money-Back Guarantee",
      description: "Not satisfied with the initial designs? Get 100% of your deposit back within the first 7 days. Your satisfaction is our priority."
    },
    {
      icon: RefreshCw,
      title: "Unlimited Revisions",
      description: "We'll keep refining the design until it's perfect. No limits, no extra charges. Your vision becomes reality."
    },
  ];

  return (
    <>
      {/* Trigger Badge */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C4E86B]/20 border border-[#C4E86B]/30 hover:bg-[#C4E86B]/30 transition-all cursor-pointer"
      >
        <Shield className="size-4 text-[#C4E86B]" />
        <span className="text-sm font-semibold text-[#C4E86B]">Our Guarantees</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-[111] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-3xl bg-gradient-to-br from-[#1a1a1a] to-black rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
                >
                  <X className="size-5 text-gray-400" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-br from-[#C4E86B]/20 to-[#D4F19C]/10 p-8 text-center border-b border-white/10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="size-16 rounded-full bg-[#C4E86B]/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <Shield className="size-8 text-[#C4E86B]" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-[#E8E8EA] mb-2">
                    Our Risk-Free Guarantees
                  </h2>
                  <p className="text-gray-400">
                    We're so confident in our results, we back it with these promises
                  </p>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="space-y-6 mb-8">
                    {guarantees.map((guarantee, index) => (
                      <motion.div
                        key={guarantee.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#C4E86B]/30 transition-all"
                      >
                        <div className="size-12 rounded-xl bg-[#C4E86B]/20 flex items-center justify-center flex-shrink-0">
                          <guarantee.icon className="size-6 text-[#C4E86B]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#E8E8EA] mb-2">
                            {guarantee.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {guarantee.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#9B92C4]/10 to-[#7B72A4]/5 border border-[#9B92C4]/20">
                    <h3 className="text-sm font-semibold text-[#9B92C4] mb-2">Why We Can Offer This:</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We've delivered over 500 projects with a 98% satisfaction rate. Our conversion-focused approach is proven to work. We're not just building websites—we're building growth engines that consistently deliver results.
                    </p>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold hover:opacity-90 transition-opacity"
                    >
                      Got It, Let's Get Started
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
