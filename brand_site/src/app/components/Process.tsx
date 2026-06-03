import { motion, useInView } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep analysis of your market position, competitive landscape, and growth objectives."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Data-driven roadmap aligned with your business goals and conversion targets."
  },
  {
    number: "03",
    title: "Execution",
    description: "Precision development and deployment with rigorous testing protocols."
  },
  {
    number: "04",
    title: "Optimization",
    description: "Continuous performance monitoring and iterative improvements."
  }
];

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group bg-[#111118] relative overflow-hidden border-l-2 border-purple-600/0 hover:border-[#ccff00] transition-all duration-700"
    >
      {/* Hover background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      <div className="flex flex-col md:flex-row md:items-center gap-10 p-10 md:p-16 relative z-10">
        {/* Number */}
        <motion.div
          className="text-9xl md:text-[12rem] text-[#ccff00]/10 leading-none font-light tabular-nums"
          initial={{ opacity: 0.1 }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        >
          {step.number}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <motion.h3
            className="text-4xl md:text-5xl text-white mb-6 font-light tracking-tight"
            whileHover={{ x: 10, color: "#ccff00" }}
            transition={{ duration: 0.3 }}
          >
            {step.title}
          </motion.h3>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl font-light">
            {step.description}
          </p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 45 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 border border-purple-600/30 group-hover:border-[#ccff00] transition-colors duration-500"
              animate={{ rotate: 45 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-6 h-px bg-purple-600 group-hover:bg-[#ccff00] transition-colors duration-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-purple-600/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      />
    </motion.div>
  );
}

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <section ref={ref} className="py-40 px-6 bg-[#111118] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-px bg-[#ccff00]" />
            <div className="text-[#ccff00] uppercase tracking-[0.25em] text-xs font-light">How We Work</div>
          </motion.div>
          <h2 className="text-6xl md:text-8xl text-white mb-8 font-light tracking-[-0.02em]">
            Our Process
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light">
            A systematic approach to digital transformation
          </p>
        </motion.div>

        <div className="space-y-px bg-purple-600/5">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
