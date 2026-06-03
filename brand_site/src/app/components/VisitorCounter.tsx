import { motion } from "motion/react";
import { Eye } from "lucide-react";
import { useState, useEffect } from "react";

export function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Simulated visitor count (would be real analytics in production)
    const baseCount = Math.floor(Math.random() * 30) + 35; // 35-65
    setVisitors(baseCount);

    // Update count occasionally to simulate real-time
    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(25, Math.min(80, newCount)); // Keep between 25-80
      });
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
      className="fixed bottom-8 left-8 z-[40] hidden md:block"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="size-2 rounded-full bg-[#C4E86B]"
        />

        <Eye className="size-4 text-gray-400" />

        <div className="text-sm">
          <span className="font-bold text-[#E8E8EA]">{visitors}</span>
          <span className="text-gray-500 ml-1">visitors in the last hour</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
