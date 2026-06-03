import { motion, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, isInView]);

  return <div ref={ref}>{count}{suffix}</div>;
}

const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 3, suffix: "x", label: "Average ROI" },
  { value: 150, suffix: "+", label: "Happy Clients" },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" ref={ref} className="py-24 px-8 md:px-16 bg-black relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(183,148,246,0.08)_0%,transparent_65%)]" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#E8E8EA] mb-6">
            Results That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Speak Volumes
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group"
            >
              <div className="p-6 md:p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#9B92C4]/30 transition-all duration-500 text-center shadow-lg hover:shadow-2xl hover:shadow-[#9B92C4]/10">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#9B92C4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                <motion.div
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4] mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </motion.div>
                <div className="text-gray-400 uppercase tracking-wider text-xs font-light">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
