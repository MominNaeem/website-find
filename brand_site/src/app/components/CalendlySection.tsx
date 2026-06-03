import { motion } from "motion/react";
import { Calendar, Clock, Video } from "lucide-react";

const benefits = [
  { icon: Calendar, label: "Pick a time that works for you" },
  { icon: Clock, label: "30-minute strategy session" },
  { icon: Video, label: "Video call or phone - your choice" },
];

interface CalendlySectionProps {
  onBookCall: () => void;
}

export function CalendlySection({ onBookCall }: CalendlySectionProps) {
  return (
    <section className="py-24 px-8 md:px-16 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,232,107,0.04)_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Book Your Free
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4E86B] to-[#D4F19C]">
              Strategy Call
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            No forms, no waiting. Choose a time and we'll call you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10"
              >
                <div className="size-12 rounded-xl bg-[#C4E86B]/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="size-6 text-[#C4E86B]" />
                </div>
                <p className="text-[#E8E8EA]">{benefit.label}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#C4E86B]/10 to-[#D4F19C]/5 border border-[#C4E86B]/20"
            >
              <h3 className="text-lg font-semibold text-[#E8E8EA] mb-3">
                What We'll Cover:
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#C4E86B] mt-0.5">•</span>
                  <span>Your current website challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4E86B] mt-0.5">•</span>
                  <span>Quick wins to boost conversions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4E86B] mt-0.5">•</span>
                  <span>Custom growth strategy for your business</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right - Calendar Embed Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-lg min-h-[500px] flex items-center justify-center"
          >
            <div className="text-center">
              <Calendar className="size-16 text-[#9B92C4] mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-[#E8E8EA] mb-4">
                Direct Calendar Booking
              </h3>
              <p className="text-gray-400 mb-6">
                Calendly widget would be embedded here
              </p>
              <button
                onClick={onBookCall}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Book via Form Instead
              </button>
              <p className="text-xs text-gray-600 mt-4">
                Or integrate with Calendly Pro
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
