import { motion, AnimatePresence } from "motion/react";
import { X, Download, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 45 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 45000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit email to backend
    try {
      await fetch("/api/checklist-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Still allow download even if API fails
    }

    setIsSubmitted(true);

    // Trigger PDF download
    const link = document.createElement("a");
    link.href = "/thrive_conversion_checklist.pdf";
    link.download = "Thrive_Web_Co_Conversion_Checklist.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsVisible(false);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105]"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-[106] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-gradient-to-br from-[#1a1a1a] to-black rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
              >
                <X className="size-5 text-gray-400" />
              </button>

              {isSubmitted ? (
                // Success State
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="size-20 rounded-full bg-[#C4E86B]/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="size-10 text-[#C4E86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#E8E8EA] mb-3">Downloading!</h3>
                  <p className="text-gray-400">
                    Your free conversion checklist is downloading now.
                  </p>
                </motion.div>
              ) : (
                // Form State
                <>
                  {/* Icon Header */}
                  <div className="bg-gradient-to-br from-[#9B92C4]/20 to-[#7B72A4]/10 p-8 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="size-16 rounded-full bg-[#C4E86B]/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <Download className="size-8 text-[#C4E86B]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#E8E8EA] mb-2">
                      Free Conversion Checklist
                    </h3>
                    <p className="text-sm text-gray-400">
                      The exact 27-point checklist we use to 3x conversions
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="space-y-3 mb-6">
                      {[
                        "Above-the-fold optimization tactics",
                        "Call-to-action placement guide",
                        "Mobile conversion must-haves"
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="size-5 rounded-full bg-[#9B92C4]/20 flex items-center justify-center flex-shrink-0">
                            <svg className="size-3 text-[#9B92C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                          <Mail className="size-4" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#9B92C4] focus:outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <Download className="size-5" />
                        Download Free Checklist
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        No spam. Unsubscribe anytime.
                      </p>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
