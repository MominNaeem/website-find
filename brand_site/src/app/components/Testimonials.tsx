import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechFlow",
    content: "Thrive Web Co transformed our online presence completely. Our conversion rate increased by 340% in just 3 months.",
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, GrowthLabs",
    content: "The attention to detail and strategic thinking is unmatched. They don't just build websites, they build growth engines.",
    avatar: "MR",
  },
  {
    name: "Emily Watson",
    role: "CMO, Innovate Inc",
    content: "Working with Thrive was a game-changer. Professional, creative, and results-driven. Highly recommend!",
    avatar: "EW",
  },
  {
    name: "David Kim",
    role: "Director, Nexus Digital",
    content: "Best investment we've made. The website is stunning and the lead quality has improved dramatically.",
    avatar: "DK",
  },
  {
    name: "Lisa Anderson",
    role: "VP, Quantum Media",
    content: "Exceptional work from start to finish. They truly understand what it takes to build a high-converting website.",
    avatar: "LA",
  },
  {
    name: "James Miller",
    role: "CEO, Apex Solutions",
    content: "The team went above and beyond. Our new website is not only beautiful but drives real business results.",
    avatar: "JM",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />

      <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Loved by
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Industry Leaders
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Scrolling testimonials */}
          <div className="flex gap-6 overflow-hidden">
            <motion.div
              className="flex gap-6 flex-shrink-0"
              animate={{
                x: [0, -(testimonials.length * 436)],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-[420px] flex-shrink-0 p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#9B92C4]/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#9B92C4]/10"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-5 fill-[#9B92C4] text-[#9B92C4]" />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed font-light">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-gradient-to-br from-[#9B92C4] to-[#7B72A4] flex items-center justify-center text-black font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
