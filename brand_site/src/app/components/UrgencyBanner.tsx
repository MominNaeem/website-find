import { motion } from "motion/react";
import { Clock, Flame } from "lucide-react";
import { useState, useEffect } from "react";

export function UrgencyBanner() {
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    // Calculate time until end of month
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, type: "spring" }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 hidden md:block"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] px-6 py-3 rounded-full shadow-2xl shadow-[#C4E86B]/20 border border-[#C4E86B]/30"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="size-8 rounded-full bg-black/20 flex items-center justify-center"
          >
            <Flame className="size-4 text-black" />
          </motion.div>

          <div className="flex items-center gap-2 text-sm font-semibold text-black">
            <span>Only</span>
            <span className="text-lg font-bold">{spotsLeft}</span>
            <span>spots left this month</span>
          </div>

          <div className="h-6 w-px bg-black/20" />

          <div className="flex items-center gap-2 text-sm text-black/80">
            <Clock className="size-4" />
            <span className="font-medium">
              {timeLeft.days > 0 && `${timeLeft.days}d `}{timeLeft.hours}h {timeLeft.minutes}m until month end
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
