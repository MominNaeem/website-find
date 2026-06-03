import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] max-w-md"
        >
          <div className="bg-gradient-to-r from-[#1a1a1a] to-black border border-[#C4E86B]/30 rounded-2xl shadow-2xl p-4 flex items-center gap-3 backdrop-blur-xl">
            <div className="size-10 rounded-full bg-[#C4E86B]/20 flex items-center justify-center">
              <CheckCircle className="size-5 text-[#C4E86B]" />
            </div>
            <p className="text-white font-medium flex-1">{message}</p>
            <button
              onClick={onClose}
              className="size-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="size-4 text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
