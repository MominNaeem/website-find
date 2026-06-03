import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play, TrendingUp, Users, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface HeroProps {
  onBookCall: () => void;
}

function MacBookMockup({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const laptopRef = useRef<HTMLDivElement>(null);
  const [laptopPosition, setLaptopPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!laptopRef.current) return;
    const rect = laptopRef.current.getBoundingClientRect();
    setLaptopPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }, []);

  const offsetX = (mousePosition.x - laptopPosition.x) * 0.015;
  const offsetY = (mousePosition.y - laptopPosition.y) * 0.015;

  return (
    <motion.div
      ref={laptopRef}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: offsetX, y: offsetY }}
      className="relative w-full"
      data-magnetic
    >
      {/* MacBook */}
      <div className="relative" style={{ perspective: "2000px" }}>
        <motion.div
          className="relative"
          initial={{ rotateX: 25 }}
          animate={{ rotateX: 15 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Screen */}
          <div className="relative bg-[#1a1a1a] rounded-xl p-1.5 shadow-2xl" style={{ transform: "translateZ(0)" }}>
            {/* Display bezel */}
            <div className="relative bg-black rounded-lg overflow-hidden border border-gray-900">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-50 flex items-center justify-center">
                <div className="size-1 rounded-full bg-gray-800" />
              </div>

              {/* Screen content */}
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-950 via-black to-gray-950 relative">
                {/* Browser window */}
                <div className="absolute inset-2 bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                  {/* Browser chrome */}
                  <div className="h-8 bg-gradient-to-b from-white/[0.07] to-white/[0.03] border-b border-white/5 flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                      <div className="size-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="size-2.5 rounded-full bg-[#febc2e]" />
                      <div className="size-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 mx-6 h-5 bg-white/5 rounded-md flex items-center px-2.5 gap-1.5">
                      <svg className="size-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div className="text-[9px] text-gray-500">thrivewebco.com</div>
                    </div>
                  </div>

                  {/* Website content - Realistic E-commerce Example */}
                  <div className="h-full bg-gradient-to-br from-gray-950 to-black overflow-hidden">
                    <div className="p-4 space-y-4">
                      {/* Navigation bar */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="flex items-center justify-between pb-3 border-b border-white/5"
                      >
                        <div className="text-[9px] font-bold text-white">LUXE</div>
                        <div className="flex gap-2">
                          <div className="size-1.5 rounded-full bg-white/30" />
                          <div className="size-1.5 rounded-full bg-white/30" />
                        </div>
                      </motion.div>

                      {/* Hero section with image placeholder */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.6 }}
                        className="relative aspect-[16/9] bg-gradient-to-br from-[#C4E86B]/20 to-[#D4F19C]/10 rounded-lg overflow-hidden border border-[#C4E86B]/20"
                      >
                        {/* Image overlay pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,232,107,0.15),transparent_70%)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-2 p-3">
                            <div className="text-[10px] font-bold text-white">Premium Collection</div>
                            <div className="text-[6px] text-gray-400">Spring 2026</div>
                          </div>
                        </div>
                        {/* Sale badge */}
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute top-2 right-2 bg-[#C4E86B] text-black text-[6px] font-bold px-2 py-0.5 rounded-full"
                        >
                          -40%
                        </motion.div>
                      </motion.div>

                      {/* Product grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6, duration: 0.6 }}
                        className="grid grid-cols-3 gap-2"
                      >
                        {[
                          { price: "$199", label: "Sneaker Pro" },
                          { price: "$149", label: "Urban Fit" },
                          { price: "$299", label: "Elite Run" }
                        ].map((product, i) => (
                          <div key={i} className="bg-white/[0.03] rounded-lg p-2 border border-white/5 hover:border-[#9B92C4]/30 transition-colors">
                            <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded mb-1.5 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-tr from-[#C4E86B]/10 to-transparent" />
                            </div>
                            <div className="text-[6px] text-gray-400 mb-0.5">{product.label}</div>
                            <div className="text-[8px] font-bold text-[#C4E86B]">{product.price}</div>
                          </div>
                        ))}
                      </motion.div>

                      {/* Stats bar */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3, duration: 0.6 }}
                        className="flex justify-between items-center pt-2 border-t border-white/5"
                      >
                        <div className="text-center">
                          <div className="text-[9px] font-bold text-[#C4E86B]">12K+</div>
                          <div className="text-[5px] text-gray-500 uppercase">Sales</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[9px] font-bold text-white">4.9★</div>
                          <div className="text-[5px] text-gray-500 uppercase">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[9px] font-bold text-white">2.5K</div>
                          <div className="text-[5px] text-gray-500 uppercase">Reviews</div>
                        </div>
                      </motion.div>

                      {/* CTA button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.2, duration: 0.6 }}
                        className="pt-1"
                      >
                        <div className="w-full h-6 bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] rounded-full flex items-center justify-center relative overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="relative text-[8px] font-bold text-black">Shop Now</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Screen glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C4E86B]/5 via-transparent to-[#D4F19C]/5 pointer-events-none rounded-lg" />
              </div>
            </div>
          </div>

          {/* Keyboard base */}
          <div className="relative mt-0.5">
            <div className="h-5 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-2xl shadow-2xl relative overflow-hidden">
              {/* Keyboard pattern */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Trackpad area */}
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-[#1a1a1a] rounded-sm border border-white/5" />
            </div>

            {/* Bottom lip */}
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-gradient-to-b from-[#1a1a1a] to-transparent rounded-b-xl" />
          </div>
        </motion.div>

        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/20 blur-xl rounded-full" />
      </div>

      {/* Floating metrics around laptop */}
      <FloatingMetric
        icon={TrendingUp}
        label="Conversion"
        value="+340%"
        position={{ top: "10%", right: "-8%" }}
        delay={3.2}
        color="#9B92C4"
      />

      <FloatingMetric
        icon={Users}
        label="Visitors"
        value="2.4M"
        position={{ bottom: "20%", left: "-12%" }}
        delay={3.5}
        color="#9B92C4"
      />

      <FloatingMetric
        icon={Zap}
        label="ROI"
        value="3.4x"
        position={{ top: "50%", right: "-10%" }}
        delay={3.8}
        color="#9B92C4"
      />
    </motion.div>
  );
}

function FloatingMetric({
  icon: Icon,
  label,
  value,
  position,
  delay,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={position}
      className="absolute hidden xl:block"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative backdrop-blur-2xl bg-white/[0.05] rounded-xl border border-white/10 p-3 shadow-2xl"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-1 rounded-xl blur-xl -z-10"
          style={{ background: `linear-gradient(to right, ${color}20, ${color}20)` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <Icon className="size-4" style={{ color }} />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
          </div>
        </div>

        {/* Pulse indicator */}
        <motion.div
          className="absolute top-1.5 right-1.5 size-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero({ onBookCall }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-black pt-24 pb-24">
      {/* Animated background shapes */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(183,148,246,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(159,127,232,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left content */}
          <motion.div style={{ y: titleY, opacity, scale }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 mb-8"
            >
              <div className="relative size-2 rounded-full bg-[#9B92C4]">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#9B92C4]"
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm text-gray-400 uppercase tracking-[0.2em] font-light">
                Award-Winning Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight text-[#E8E8EA]"
            >
              Websites That
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
                  Actually Convert
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-[#9B92C4]/15 to-[#7B72A4]/15 blur-2xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-light leading-relaxed"
            >
              Custom websites built for ambitious brands that want to grow online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton primary onClick={onBookCall}>
                Get Free Audit
                <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                <Play className="size-5 mr-2" />
                View Projects
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10"
            >
              {[
                { number: "200+", label: "Projects" },
                { number: "98%", label: "Satisfaction" },
                { number: "3x", label: "Avg ROI" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-[#9B92C4] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - MacBook mockup */}
          <div className="relative hidden lg:block">
            <MacBookMockup mousePosition={mousePosition} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xs text-gray-500 uppercase tracking-widest flex flex-col items-center gap-4"
        >
          <span>Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#9B92C4]/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function MagneticButton({ children, primary = false, onClick }: { children: React.ReactNode; primary?: boolean; onClick?: () => void }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`group relative px-8 py-4 rounded-full font-medium flex items-center overflow-hidden ${
        primary
          ? "bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black"
          : "bg-white/[0.03] backdrop-blur-xl text-white border border-white/10"
      }`}
      data-magnetic
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {primary && (
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10 flex items-center">{children}</span>
    </motion.button>
  );
}
