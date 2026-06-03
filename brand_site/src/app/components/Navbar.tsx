import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../../imports/Logo/Logo";

interface NavbarProps {
  onBookCall: () => void;
}

export function Navbar({ onBookCall }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined) {
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrolled(latest > 50);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-32 h-10"
          >
            <Logo />
          </motion.div>

          <div className="hidden md:flex items-center gap-10">
            {[
              { name: "Services", href: "#services", color: "#9B92C4" },
              { name: "Results", href: "#stats", color: "#9B92C4" },
              { name: "Testimonials", href: "#testimonials", color: "#9B92C4" },
              { name: "Contact", href: "#contact", color: "#9B92C4" }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative text-gray-300 hover:text-white transition-colors group cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-px"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <motion.button
              onClick={onBookCall}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-medium relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-magnetic
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Free Audit</span>
            </motion.button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pt-8 pb-4 space-y-6"
            >
            {[
              { name: "Services", href: "#services" },
              { name: "Results", href: "#stats" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Contact", href: "#contact" }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                onBookCall();
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-medium"
            >
              Free Audit
            </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
