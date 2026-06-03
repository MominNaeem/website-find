import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [data-magnetic]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Cursor glow - more subtle */}
      <motion.div
        className="fixed w-80 h-80 pointer-events-none z-[9998] mix-blend-screen"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.2,
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-[#C4E86B]/10 via-[#C4E86B]/3 to-transparent blur-3xl" />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed w-5 h-5 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-full h-full bg-[#C4E86B] rounded-full ring-2 ring-black/50 shadow-[0_0_8px_rgba(0,0,0,0.6)]" />
      </motion.div>
    </>
  );
}
