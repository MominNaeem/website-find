import { motion, useInView } from "motion/react";
import { Calendar, Lightbulb, Palette, Code, Rocket, CheckCircle } from "lucide-react";
import { useRef } from "react";

const timeline = [
  {
    week: "Week 1",
    title: "Discovery & Strategy",
    icon: Lightbulb,
    tasks: [
      "Kick-off call & goal alignment",
      "Competitor analysis",
      "User research & personas",
      "Sitemap & content strategy"
    ],
    color: "#9B92C4"
  },
  {
    week: "Week 2",
    title: "Design & Prototyping",
    icon: Palette,
    tasks: [
      "Wireframes & user flows",
      "High-fidelity mockups",
      "Interactive prototypes",
      "Feedback & revisions"
    ],
    color: "#9B92C4"
  },
  {
    week: "Week 3",
    title: "Development",
    icon: Code,
    tasks: [
      "Frontend development",
      "Backend integration",
      "Responsive optimization",
      "Performance tuning"
    ],
    color: "#9B92C4"
  },
  {
    week: "Week 4",
    title: "Testing & Launch",
    icon: Rocket,
    tasks: [
      "Quality assurance testing",
      "Final client review",
      "Deployment & DNS setup",
      "Training & handoff"
    ],
    color: "#C4E86B"
  }
];

function TimelineItem({ item, index, isLast }: { item: typeof timeline[0]; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-center gap-8"
    >
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-px h-full bg-gradient-to-b from-white/20 to-transparent hidden md:block" />
      )}

      {/* Timeline Node */}
      <div className="relative flex-shrink-0">
        <motion.div
          animate={isInView ? { scale: [0.8, 1.1, 1] } : { scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className="size-16 rounded-full bg-gradient-to-br from-[#9B92C4] to-[#7B72A4] flex items-center justify-center shadow-lg shadow-[#9B92C4]/20 relative z-10"
        >
          <item.icon className="size-7 text-black" strokeWidth={2} />
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: item.color }}
          animate={isInView ? {
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="flex-1 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#9B92C4]/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#9B92C4]/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="size-5 text-[#9B92C4]" />
          <span className="text-sm font-semibold text-[#9B92C4] uppercase tracking-wider">{item.week}</span>
        </div>

        <h3 className="text-2xl font-bold text-[#E8E8EA] mb-4">{item.title}</h3>

        <ul className="space-y-2">
          {item.tasks.map((task, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
              className="flex items-start gap-3 text-gray-400 font-light"
            >
              <CheckCircle className="size-4 text-[#9B92C4] flex-shrink-0 mt-0.5" />
              <span>{task}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function ProcessTimeline() {
  return (
    <section id="process" className="py-24 px-8 md:px-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9B92C4]/4 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7B72A4]/3 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Our Proven
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              4-Week Process
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            From concept to launch in just one month. Here's exactly what to expect.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {timeline.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 p-6 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <p className="text-gray-400 mb-4">
            <span className="text-[#C4E86B] font-semibold">Plus:</span> 30 days of free post-launch support & optimization
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Rocket className="size-4 text-[#9B92C4]" />
            <span>Average project completion: 3.5 weeks</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
