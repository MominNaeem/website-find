import { motion, AnimatePresence } from "motion/react";
import { User, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const notifications = [
  { name: "Sarah", location: "New York", action: "requested an audit", time: "2 minutes ago" },
  { name: "Michael", location: "Toronto", action: "booked a consultation", time: "5 minutes ago" },
  { name: "Emma", location: "San Francisco", action: "requested an audit", time: "8 minutes ago" },
  { name: "James", location: "Chicago", action: "started a project", time: "12 minutes ago" },
  { name: "Olivia", location: "Los Angeles", action: "requested an audit", time: "15 minutes ago" },
  { name: "William", location: "Boston", action: "booked a consultation", time: "18 minutes ago" },
];

export function SocialProofNotifications() {
  const [currentNotification, setCurrentNotification] = useState<typeof notifications[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 10 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 10000);

    // Then show notifications every 45-60 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, Math.random() * 15000 + 45000); // Random between 45-60s

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const showRandomNotification = () => {
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    setCurrentNotification(randomNotification);
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isVisible && currentNotification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-8 left-8 z-[60] max-w-sm"
        >
          <div className="bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-4 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="size-10 rounded-full bg-gradient-to-br from-[#9B92C4] to-[#7B72A4] flex items-center justify-center flex-shrink-0">
                <User className="size-5 text-black" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#E8E8EA] text-sm">{currentNotification.name}</span>
                  <span className="text-xs text-gray-500">from</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="size-3" />
                    {currentNotification.location}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {currentNotification.action}
                </p>
                <p className="text-xs text-gray-600 mt-1">{currentNotification.time}</p>
              </div>

              {/* Pulse indicator */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="size-2 rounded-full bg-[#C4E86B] flex-shrink-0"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
