import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "14165551234"; // Replace with actual number
  const message = "Hi! I'm interested in learning more about your web design services.";

  const handleChat = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-40 md:bottom-24 right-8 z-[60] hidden md:block group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#25D366]"
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
          <div className="relative size-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-[#25D366]/30">
            <MessageCircle className="size-6 text-white" fill="white" />
          </div>

          {/* Unread Badge */}
          <div className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-black">
            <span className="text-[10px] font-bold text-white">1</span>
          </div>
        </div>
      </motion.button>

      {/* Chat Tooltip/Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed bottom-40 right-8 z-50 w-80 bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-white flex items-center justify-center">
                  <MessageCircle className="size-5 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Chat with us</h3>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="size-4 text-white" />
              </button>
            </div>

            {/* Message */}
            <div className="p-4">
              <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 mb-4">
                <p className="text-sm text-gray-300">
                  👋 Hi there! Have questions about our web design services? Let's chat!
                </p>
              </div>

              <button
                onClick={handleChat}
                className="w-full px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="size-4" />
                Start Chat on WhatsApp
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                We'll respond within minutes during business hours
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
