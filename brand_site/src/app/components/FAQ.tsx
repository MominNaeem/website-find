import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Most projects are completed within 2-4 weeks, depending on complexity. We'll provide a detailed timeline during our initial consultation and keep you updated throughout the process."
  },
  {
    question: "What if I don't like the design?",
    answer: "We offer unlimited revisions until you're 100% satisfied. Our collaborative design process includes regular check-ins and feedback sessions to ensure we're aligned with your vision every step of the way."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Absolutely! We provide 30 days of free post-launch support. After that, we offer flexible monthly maintenance packages including updates, security monitoring, performance optimization, and content changes."
  },
  {
    question: "How much input do I need to provide?",
    answer: "As much or as little as you'd like! Some clients prefer a hands-on approach, while others trust us to handle everything. We adapt to your preferred level of involvement and communication style."
  },
  {
    question: "What happens if I need changes after launch?",
    answer: "Minor tweaks are included in your 30-day post-launch support. For larger changes or new features, we offer competitive hourly rates or can create a custom package based on your needs."
  },
  {
    question: "Do you work with businesses outside Toronto?",
    answer: "Yes! While we're based in Toronto, we work with clients globally. All our collaboration happens remotely through video calls, shared design tools, and project management platforms."
  },
  {
    question: "What makes you different from other agencies?",
    answer: "We focus on results, not just aesthetics. Every design decision is backed by conversion data and user psychology. Plus, we guarantee a 3x ROI or we'll work for free until you get there."
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Definitely! We specialize in transforming underperforming websites into conversion machines. We'll audit your current site, identify opportunities, and create a strategy to maximize your ROI."
  }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-[#E8E8EA] group-hover:text-[#9B92C4] transition-colors pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="size-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#9B92C4]/20 transition-colors"
        >
          {isOpen ? (
            <Minus className="size-4 text-[#9B92C4]" />
          ) : (
            <Plus className="size-4 text-gray-400 group-hover:text-[#9B92C4]" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed font-light">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-8 md:px-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Questions?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              We've Got Answers
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Everything you need to know about working with us
          </p>
        </motion.div>

        <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-lg">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#9B92C4] hover:text-[#7B72A4] transition-colors font-medium"
          >
            Get in touch with our team
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
