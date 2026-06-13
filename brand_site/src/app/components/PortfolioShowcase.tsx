import { motion } from "motion/react";
import { Star, Phone, MapPin, ShoppingBag, Code2, Sparkles, Heart, Shield, Clock, Zap, Check } from "lucide-react";

type Industry = "ecom" | "saas" | "local";

const projects: Array<{
  name: string;
  industry: string;
  type: Industry;
  metric: string;
  brand: string;
  headline: string;
  sub: string;
}> = [
  {
    name: "E-commerce Redesign",
    industry: "Fashion",
    type: "ecom",
    metric: "+340% Conversions",
    brand: "LUNA & CO.",
    headline: "Effortless style, delivered.",
    sub: "Sustainable fashion designed for every day."
  },
  {
    name: "SaaS Landing Page",
    industry: "Software",
    type: "saas",
    metric: "+280% Sign-ups",
    brand: "Stackline",
    headline: "Ship faster. Sleep better.",
    sub: "The all-in-one platform for modern engineering teams."
  },
  {
    name: "Local Business",
    industry: "Services",
    type: "local",
    metric: "+450% Leads",
    brand: "Northside Dental",
    headline: "Smile with confidence.",
    sub: "Modern dentistry for the whole family — book in 60 seconds."
  }
];

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="h-6 flex items-center gap-1.5 px-2 bg-[#f3f4f6] border-b border-gray-200">
      <div className="size-2 rounded-full bg-[#ff5f57]" />
      <div className="size-2 rounded-full bg-[#febc2e]" />
      <div className="size-2 rounded-full bg-[#28c840]" />
      <div className="ml-2 flex-1 h-3 rounded text-[8px] flex items-center px-1.5 bg-white text-gray-400">
        {url}
      </div>
    </div>
  );
}

function MockupContent({ project }: { project: typeof projects[0] }) {
  const Icon = project.type === "ecom" ? ShoppingBag : project.type === "saas" ? Code2 : Sparkles;
  return (
    <div className="bg-white overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <BrowserChrome url={`${project.brand.toLowerCase().replace(/[^a-z]/g, "")}.com`} />

      {/* Clean nav */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="size-4 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
            <Icon className="size-2.5 text-white" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-gray-900">{project.brand}</span>
        </div>
        <div className="flex gap-3 text-[8px] text-gray-500 font-medium">
          {project.type === "ecom" && <><span>Shop</span><span>Collections</span><span>About</span><span>Journal</span></>}
          {project.type === "saas" && <><span>Product</span><span>Pricing</span><span>Docs</span><span>Blog</span></>}
          {project.type === "local" && <><span>Services</span><span>About</span><span>Reviews</span><span>Contact</span></>}
        </div>
        <button className="bg-gray-900 text-white px-2.5 py-1 text-[7px] font-medium rounded-md">
          {project.type === "saas" ? "Start free trial" : project.type === "local" ? "Book online" : "Shop now"}
        </button>
      </div>

      {project.type === "ecom" && (
        <>
          <div className="relative mx-3 mt-2 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #f8f6f3, #ede8e0)" }}>
            <div className="px-4 py-3 flex items-center">
              <div className="flex-1">
                <div className="text-[7px] text-gray-500 font-medium tracking-widest uppercase mb-1">New Season</div>
                <h4 className="text-[14px] font-semibold text-gray-900 leading-tight tracking-tight mb-1">{project.headline}</h4>
                <p className="text-[8px] text-gray-500 leading-snug mb-2">{project.sub}</p>
                <div className="flex gap-1.5">
                  <button className="bg-gray-900 text-white px-3 py-1 text-[7px] font-medium rounded-full">Shop collection</button>
                  <button className="text-gray-600 text-[7px] font-medium">Watch lookbook &rarr;</button>
                </div>
              </div>
              <div className="w-[80px] h-[72px] rounded-lg bg-gradient-to-br from-[#e8e0d4] to-[#d5ccc0] flex items-center justify-center ml-2">
                <ShoppingBag className="size-5 text-gray-400" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <div className="px-3 mt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-semibold text-gray-900">Trending now</span>
              <span className="text-[7px] text-gray-400 font-medium">View all &rarr;</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { name: "Linen Blazer", price: "$189", color: "#e8e0d4" },
                { name: "Silk Cami", price: "$79", color: "#d4dce8" },
                { name: "Wide Leg Pant", price: "$129", color: "#dce8d4" },
                { name: "Leather Tote", price: "$249", color: "#e8d4dc" },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="aspect-[3/4] rounded-lg mb-1 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}ee)` }}>
                    <div className="absolute top-1 right-1 size-4 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <Heart className="size-2 text-gray-400" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/5 to-transparent p-1">
                      <div className="bg-white/90 backdrop-blur-sm rounded-md text-center py-0.5">
                        <span className="text-[6px] font-medium text-gray-700">Quick add +</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[7px] font-medium text-gray-900">{item.name}</div>
                  <div className="text-[7px] text-gray-500">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 mt-2 pb-2">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
              {[
                { label: "Free shipping $75+" },
                { label: "30-day returns" },
                { label: "Secure checkout" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="size-3 rounded-full bg-gray-200 flex items-center justify-center">
                    {i === 2 ? <Shield className="size-1.5 text-gray-500" /> : <Check className="size-1.5 text-gray-500" />}
                  </div>
                  <span className="text-[6px] text-gray-500 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {project.type === "saas" && (
        <>
          <div className="px-4 pt-3 pb-2 text-center">
            <div className="inline-flex items-center gap-1 bg-[#C4E86B]/15 px-2 py-0.5 rounded-full text-[7px] text-[#7a8a2e] font-medium mb-1.5">
              <Zap className="size-2" />
              Now in public beta
            </div>
            <h4 className="text-gray-900 text-[14px] font-semibold leading-tight tracking-tight mb-1">{project.headline}</h4>
            <p className="text-gray-500 text-[8px] leading-snug mb-2 max-w-[80%] mx-auto">{project.sub}</p>
            <div className="flex justify-center gap-1.5">
              <button className="bg-gray-900 text-white px-3 py-1 text-[7px] font-medium rounded-md">Get started free</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 text-[7px] font-medium rounded-md border border-gray-200">View demo</button>
            </div>
          </div>
          <div className="mx-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-[#1e1e2e] px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="size-1.5 rounded-full bg-[#ff5f57]" />
                <div className="size-1.5 rounded-full bg-[#febc2e]" />
                <div className="size-1.5 rounded-full bg-[#28c840]" />
                <span className="text-[6px] text-gray-500 ml-1 font-mono">terminal</span>
              </div>
              <div className="text-[6px] font-mono space-y-0.5">
                <div><span className="text-[#C4E86B]">$</span> <span className="text-gray-300">npx stackline deploy</span></div>
                <div className="text-[#9B92C4]">Deploying to production...</div>
                <div className="text-[#C4E86B]">Deployed in 2.4s</div>
              </div>
            </div>
          </div>
          <div className="px-4 mt-2 grid grid-cols-3 gap-1.5">
            {[
              { value: "10x", label: "Faster deploys", color: "from-[#C4E86B]/10 to-[#C4E86B]/5" },
              { value: "99.9%", label: "Uptime SLA", color: "from-[#9B92C4]/10 to-[#9B92C4]/5" },
              { value: "500+", label: "Integrations", color: "from-gray-100 to-gray-50" },
            ].map((m, i) => (
              <div key={i} className={`rounded-lg bg-gradient-to-br ${m.color} border border-gray-100 px-2 py-1.5`}>
                <div className="text-[11px] font-bold text-gray-900">{m.value}</div>
                <div className="text-[6px] text-gray-500 font-medium">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="px-4 mt-2 pb-2">
            <div className="text-[7px] text-gray-400 text-center mb-1 font-medium">Integrates with your stack</div>
            <div className="flex justify-center gap-2">
              {["GitHub", "Slack", "AWS", "Vercel", "Docker"].map(l => (
                <div key={l} className="px-1.5 py-0.5 rounded bg-gray-50 border border-gray-100 text-[6px] text-gray-500 font-medium">{l}</div>
              ))}
            </div>
          </div>
        </>
      )}

      {project.type === "local" && (
        <>
          <div className="relative mx-3 mt-2 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f7ff, #e8f0fe)" }}>
            <div className="px-3 py-2.5 flex items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[7px] text-gray-600 font-medium mb-1.5">
                  <Clock className="size-2" />
                  Accepting new patients
                </div>
                <h4 className="text-[14px] font-semibold text-gray-900 leading-tight tracking-tight mb-1">{project.headline}</h4>
                <p className="text-[8px] text-gray-500 leading-snug mb-2">{project.sub}</p>
                <button className="bg-gray-900 text-white px-3 py-1 text-[7px] font-medium rounded-full">Book appointment</button>
              </div>
              <div className="w-[70px] h-[65px] rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center ml-2 border border-white/80">
                <Sparkles className="size-5 text-[#9B92C4]" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <div className="px-3 mt-2 grid grid-cols-3 gap-1.5">
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5">
              <div className="flex items-center gap-0.5 mb-0.5">
                {[0,1,2,3,4].map(i => (
                  <Star key={i} className="size-2 text-[#C4E86B] fill-[#C4E86B]" />
                ))}
              </div>
              <div className="text-[8px] font-semibold text-gray-900">4.9 rating</div>
              <div className="text-[6px] text-gray-500">312 Google reviews</div>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 flex items-center gap-1.5">
              <MapPin className="size-3 text-[#9B92C4]" />
              <div>
                <div className="text-[8px] font-semibold text-gray-900">Open today</div>
                <div className="text-[6px] text-gray-500">until 6:00 PM</div>
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 flex items-center gap-1.5">
              <Phone className="size-3 text-[#9B92C4]" />
              <div>
                <div className="text-[8px] font-semibold text-gray-900">Same-day</div>
                <div className="text-[6px] text-gray-500">appointments</div>
              </div>
            </div>
          </div>
          <div className="px-3 mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-semibold text-gray-900">Our services</span>
              <span className="text-[6px] text-gray-400 font-medium">View all &rarr;</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[
                { name: "Cleanings" },
                { name: "Whitening" },
                { name: "Implants" },
                { name: "Invisalign" },
              ].map((s, i) => (
                <div key={i} className="rounded-lg bg-gray-50 border border-gray-100 p-1.5 text-center">
                  <div className="size-4 rounded-full bg-[#9B92C4]/10 mx-auto mb-0.5 flex items-center justify-center">
                    <Sparkles className="size-2 text-[#9B92C4]" />
                  </div>
                  <div className="text-[6px] font-medium text-gray-700">{s.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 mt-2 pb-2">
            <div className="rounded-lg bg-gradient-to-br from-[#9B92C4]/5 to-[#C4E86B]/5 border border-gray-100 px-3 py-2">
              <div className="flex items-center gap-1 mb-1">
                <div className="size-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                <div>
                  <div className="text-[7px] font-semibold text-gray-900">Sarah M.</div>
                  <div className="flex gap-0.5">
                    {[0,1,2,3,4].map(i => <Star key={i} className="size-1.5 text-[#C4E86B] fill-[#C4E86B]" />)}
                  </div>
                </div>
              </div>
              <p className="text-[7px] text-gray-600 leading-snug italic">&ldquo;Best dental experience I&rsquo;ve ever had. The online booking was so easy and the team was incredibly professional.&rdquo;</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  // Stagger offsets for the fanned-out look
  const rotations = [-2, 0, 2];
  const yOffsets = [0, -8, -16];
  const xOffsets = [-12, 0, 12];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: rotations[index] * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="relative group"
      style={{
        marginTop: index === 0 ? 0 : -40,
        zIndex: index + 1,
        transform: `translateX(${xOffsets[index]}px) translateY(${yOffsets[index]}px)`,
      }}
    >
      <motion.div
        whileHover={{ y: -12, scale: 1.02, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
        style={{ rotate: `${rotations[index]}deg` }}
      >
        {/* Glassmorphism card border */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-2xl shadow-black/40 group-hover:border-[#9B92C4]/30 transition-colors duration-300">
          {/* Browser mockup */}
          <div className="aspect-video overflow-hidden">
            <MockupContent project={project} />
          </div>

          {/* Project info bar */}
          <div className="px-5 py-4 bg-black/60 backdrop-blur-md border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#E8E8EA]">{project.name}</h3>
              <span className="text-xs text-gray-500 font-medium bg-white/5 px-2 py-0.5 rounded-full inline-block mt-1">
                {project.industry}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[#C4E86B]">{project.metric}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PortfolioShowcase() {
  return (
    <section className="py-24 px-8 md:px-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B92C4]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Our Work
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Speaks for Itself
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Modern, conversion-focused websites built for real businesses
          </p>
        </motion.div>

        <div className="space-y-0 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
