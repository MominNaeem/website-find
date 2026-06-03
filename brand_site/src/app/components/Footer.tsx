import { motion } from "motion/react";
import { Instagram, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import Logo from "../../imports/Logo/Logo";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-8 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="w-40 h-12 mb-6">
                <Logo />
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed font-light">
                Creating digital experiences that convert visitors into customers. Let's build something extraordinary together.
              </p>
            </motion.div>

            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/thrivewebco" },
                { Icon: Twitter, href: "https://twitter.com/thrivewebco" },
                { Icon: Linkedin, href: "https://linkedin.com/company/thrivewebco" },
                { Icon: Mail, href: "mailto:hello@thrivewebco.com" }
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#9B92C4] hover:border-[#9B92C4]/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="size-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Services", "Work", "About", "Contact", "Careers"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#9B92C4] transition-colors flex items-center gap-2 group"
                  >
                    {item}
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li>
                <a
                  href="https://www.instagram.com/thrivewebco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C4E86B] hover:text-[#D4F19C] transition-colors"
                >
                  @thrivewebco
                </a>
              </li>
              <li className="pt-2">
                Toronto, Ontario
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500"
        >
          <p>&copy; 2026 Thrive Web Co. All rights reserved.</p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#9B92C4] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
