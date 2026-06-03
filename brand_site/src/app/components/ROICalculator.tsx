import { motion } from "motion/react";
import { useState } from "react";
import { TrendingUp, DollarSign, Users } from "lucide-react";

export function ROICalculator() {
  const [monthlyTraffic, setMonthlyTraffic] = useState(5000);
  const [currentConversion, setCurrentConversion] = useState(2);
  const [averageValue, setAverageValue] = useState(100);

  const currentRevenue = (monthlyTraffic * (currentConversion / 100) * averageValue);
  const projectedConversion = currentConversion + 2; // Conservative 2% increase
  const projectedRevenue = (monthlyTraffic * (projectedConversion / 100) * averageValue);
  const monthlyIncrease = projectedRevenue - currentRevenue;
  const yearlyIncrease = monthlyIncrease * 12;

  return (
    <section id="calculator" className="py-24 px-8 md:px-16 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,146,196,0.06)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Calculate Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Potential ROI
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            See how much revenue you could generate with an optimized website
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#E8E8EA] mb-6">Your Current Numbers</h3>

            <div className="space-y-6">
              {/* Monthly Traffic */}
              <div>
                <label className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-2">
                    <Users className="size-4" />
                    Monthly Website Traffic
                  </span>
                  <span className="text-[#9B92C4] font-semibold">{monthlyTraffic.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={monthlyTraffic}
                  onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #9B92C4 0%, #9B92C4 ${((monthlyTraffic - 1000) / 99000) * 100}%, rgba(255,255,255,0.1) ${((monthlyTraffic - 1000) / 99000) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>

              {/* Conversion Rate */}
              <div>
                <label className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="size-4" />
                    Current Conversion Rate
                  </span>
                  <span className="text-[#9B92C4] font-semibold">{currentConversion}%</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={currentConversion}
                  onChange={(e) => setCurrentConversion(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #9B92C4 0%, #9B92C4 ${((currentConversion - 0.5) / 9.5) * 100}%, rgba(255,255,255,0.1) ${((currentConversion - 0.5) / 9.5) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>

              {/* Average Order Value */}
              <div>
                <label className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-2">
                    <DollarSign className="size-4" />
                    Average Order Value
                  </span>
                  <span className="text-[#9B92C4] font-semibold">${averageValue}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={averageValue}
                  onChange={(e) => setAverageValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #9B92C4 0%, #9B92C4 ${((averageValue - 10) / 990) * 100}%, rgba(255,255,255,0.1) ${((averageValue - 10) / 990) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#9B92C4]/10 to-[#7B72A4]/5 backdrop-blur-xl rounded-3xl border border-[#9B92C4]/20 p-8 shadow-lg shadow-[#9B92C4]/10"
          >
            <h3 className="text-xl font-semibold text-[#E8E8EA] mb-6">Your Potential Growth</h3>

            <div className="space-y-6">
              {/* Current Revenue */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-gray-400 mb-1">Current Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">${currentRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>

              {/* Projected Revenue */}
              <div className="p-4 bg-[#9B92C4]/20 rounded-xl border border-[#9B92C4]/30">
                <p className="text-sm text-gray-400 mb-1">Projected Monthly Revenue</p>
                <p className="text-3xl font-bold text-[#C4E86B]">${projectedRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                <p className="text-sm text-[#9B92C4] mt-1">at {projectedConversion}% conversion</p>
              </div>

              {/* Monthly Increase */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-gray-400 mb-1">Monthly Increase</p>
                <p className="text-2xl font-bold text-[#C4E86B]">+${monthlyIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>

              {/* Yearly Increase */}
              <div className="p-6 bg-gradient-to-r from-[#C4E86B]/10 to-[#D4F19C]/5 rounded-xl border border-[#C4E86B]/20">
                <p className="text-sm text-gray-400 mb-1">First Year Increase</p>
                <p className="text-4xl font-bold text-[#C4E86B]">${yearlyIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                <p className="text-xs text-gray-500 mt-2">Based on conservative 2% conversion improvement</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6 text-center">
              * Results based on industry averages. Actual results may vary.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">Ready to unlock this potential?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-[#C4E86B] to-[#D4F19C] text-black font-semibold hover:opacity-90 transition-opacity"
          >
            Get Your Free Website Audit
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
