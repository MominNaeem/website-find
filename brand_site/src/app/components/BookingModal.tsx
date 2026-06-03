import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({ isOpen, onClose, onSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Show toast and reset
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      onSuccess();
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        preferredDate: "",
        preferredTime: "",
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl border border-white/10 shadow-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
              >
                <X className="size-5 text-gray-400" />
              </button>

              {/* Success state */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl flex items-center justify-center z-20 overflow-hidden"
                >
                  {/* Confetti particles */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute size-2 rounded-full"
                      style={{
                        background: i % 3 === 0 ? '#C4E86B' : i % 3 === 1 ? '#9B92C4' : '#D4F19C',
                        left: `${50 + (Math.random() - 0.5) * 20}%`,
                        top: '50%',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1, 0.5],
                        opacity: [0, 1, 0],
                        x: (Math.random() - 0.5) * 400,
                        y: (Math.random() - 0.5) * 400,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.03,
                        ease: "easeOut"
                      }}
                    />
                  ))}

                  <div className="text-center relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2, bounce: 0.6 }}
                      className="size-20 rounded-full bg-[#C4E86B]/20 flex items-center justify-center mx-auto mb-4 relative"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#C4E86B]/20"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: 2,
                          delay: 0.3,
                        }}
                      />
                      <motion.svg
                        className="size-10 text-[#C4E86B]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl font-bold text-white mb-2"
                    >
                      Request Received!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-400"
                    >
                      Your free audit will be sent within 24 hours.
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-xl bg-[#C4E86B]/20 flex items-center justify-center">
                    <Calendar className="size-5 text-[#C4E86B]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Get Your Free Audit</h2>
                  </div>
                </div>
                <p className="text-gray-400 font-light">
                  Get a personalized conversion audit + 30-min strategy session — completely free.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <User className="size-4" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#9B92C4] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Mail className="size-4" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#9B92C4] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Phone className="size-4" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#9B92C4] focus:outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#9B92C4] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Calendar className="size-4" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#9B92C4] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Clock className="size-4" />
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#9B92C4] focus:outline-none transition-colors"
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    Tell us about your project
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#9B92C4] focus:outline-none transition-colors resize-none"
                    placeholder="What are your goals? What challenges are you facing?"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="size-5 border-2 border-black/20 border-t-black rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Calendar className="size-5" />
                      Request Free Audit
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
