import { motion } from "motion/react";
import { Shield, Award, Clock, TrendingUp } from "lucide-react";
import { GuaranteeModal } from "./GuaranteeModal";

const badges = [
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "100% refund if not satisfied"
  },
  {
    icon: TrendingUp,
    title: "3x ROI Promise",
    description: "Or we work for free"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "98% delivered within deadline"
  },
  {
    icon: Award,
    title: "Award-Winning",
    description: "Top 1% agencies globally"
  }
];

export function TrustBadges() {
  return (
    <section className="py-16 px-8 md:px-16 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#9B92C4]/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="size-12 rounded-full bg-[#9B92C4]/20 flex items-center justify-center mx-auto mb-4"
              >
                <badge.icon className="size-6 text-[#9B92C4]" strokeWidth={2} />
              </motion.div>
              <h3 className="text-sm font-semibold text-[#E8E8EA] mb-2">{badge.title}</h3>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <GuaranteeModal />
        </motion.div>
      </div>
    </section>
  );
}
