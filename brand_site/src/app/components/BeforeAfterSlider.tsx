import { motion } from "motion/react";
import { useState } from "react";
import { MoveHorizontal, Star, Phone, MapPin, ShoppingBag, Code2, Sparkles } from "lucide-react";

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

function BrowserChrome({ url, dated = false }: { url: string; dated?: boolean }) {
  return (
    <div className={`h-6 flex items-center gap-1.5 px-2 ${dated ? "bg-[#c0c0c0] border-b border-[#808080]" : "bg-[#f3f4f6] border-b border-gray-200"}`}>
      <div className={`size-2 rounded-full ${dated ? "bg-[#ff4444]" : "bg-[#ff5f57]"}`} />
      <div className={`size-2 rounded-full ${dated ? "bg-[#ffcc00]" : "bg-[#febc2e]"}`} />
      <div className={`size-2 rounded-full ${dated ? "bg-[#00cc00]" : "bg-[#28c840]"}`} />
      <div className={`ml-2 flex-1 h-3 rounded text-[8px] flex items-center px-1.5 ${dated ? "bg-white border border-[#808080] text-blue-700 underline font-serif" : "bg-white text-gray-400"}`}>
        {url}
      </div>
    </div>
  );
}

function BeforeMockup({ project }: { project: typeof projects[0] }) {
  return (
    <div className="absolute inset-0 bg-[#f0e9d2] overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <BrowserChrome url={`www.${project.brand.toLowerCase().replace(/[^a-z]/g, "")}.com/index.html`} dated />

      {/* hideous marquee banner */}
      <div className="bg-[#ff0000] text-[#ffff00] text-center py-0.5 text-[9px] font-bold tracking-wider">
        ★ ★ ★ MEGA SALE!!! CLICK HERE NOW!!! ★ ★ ★
      </div>

      {/* ugly nav */}
      <div className="bg-[#003399] text-white px-2 py-1 flex gap-2 text-[9px] border-b-2 border-[#ffff00]">
        {["Home", "About Us", "Products", "Services", "Contact", "FAQ", "Sitemap"].map(l => (
          <span key={l} className="underline">{l}</span>
        ))}
      </div>

      {/* welcome header */}
      <div className="px-3 py-2 text-center bg-[#ffffcc] border-b border-[#999]">
        <h4 className="text-[#000080] text-lg font-bold">Welcome to {project.brand}!!!</h4>
        <p className="text-[10px] text-[#444] italic">You are visitor number 0042857</p>
      </div>

      {/* content body */}
      <div className="px-2 py-2 grid grid-cols-[1fr_60px] gap-2">
        <div>
          <p className="text-[9px] text-[#000] leading-tight mb-2">
            Welcome to our website. We are the leading provider of {project.industry.toLowerCase()} services in the area. Please browse our pages and use the contact form below to reach us. Best viewed in Internet Explorer 6.
          </p>

          {project.type === "ecom" && (
            <div className="grid grid-cols-3 gap-1">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square bg-[#ddd] border border-[#666] flex flex-col items-center justify-center">
                  <div className="text-[7px] text-gray-500">[img {i}]</div>
                  <div className="text-[7px] text-red-700 font-bold">$19.99</div>
                </div>
              ))}
            </div>
          )}

          {project.type === "saas" && (
            <table className="w-full border-collapse text-[8px]">
              <tbody>
                {["Feature 1: Easy to use", "Feature 2: Fast servers", "Feature 3: 24/7 support", "Feature 4: Money-back guarantee"].map(t => (
                  <tr key={t} className="border border-[#666]">
                    <td className="bg-[#ddd] p-0.5 w-3 text-center">►</td>
                    <td className="bg-white p-0.5">{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {project.type === "local" && (
            <div className="text-[9px] text-black">
              <p className="font-bold mb-0.5">Office Hours:</p>
              <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
              <p>Sat: 10:00 AM - 2:00 PM</p>
              <p className="mt-1 font-bold">Call us today: <span className="text-blue-700 underline">(555) 123-4567</span></p>
              <p className="mt-2 text-red-700 font-bold underline">► Click here for directions</p>
              <p className="mt-1 underline text-blue-700">► Read our patient guarantee</p>
            </div>
          )}

          <div className="mt-2 inline-block bg-[#cc0000] text-[#ffff00] px-2 py-0.5 text-[10px] font-bold border-2 border-[#ffff00]" style={{ textShadow: "1px 1px 0 #000" }}>
            CLICK HERE NOW!!!
          </div>
        </div>

        <div className="space-y-1">
          <div className="bg-[#ffff99] border border-[#666] p-1 text-[7px] text-black">
            <div className="font-bold underline">Latest News:</div>
            <div>• New site launched!</div>
            <div>• Summer sale on now</div>
            <div>• Like us on MySpace</div>
          </div>
          <div className="bg-white border border-[#666] p-1 text-center">
            <div className="text-[7px] text-gray-600">Web Counter</div>
            <div className="bg-black text-[#00ff00] text-[10px] font-mono">042857</div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="absolute bottom-0 inset-x-0 bg-[#003399] text-white text-[7px] text-center py-0.5">
        Copyright © 2008 {project.brand}. All Rights Reserved. <span className="underline">webmaster@example.com</span>
      </div>

      {/* BEFORE badge */}
      <div className="absolute top-8 right-3 bg-red-500/95 backdrop-blur-sm border border-red-300 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg" style={{ fontFamily: "system-ui" }}>
        BEFORE
      </div>
    </div>
  );
}

function AfterMockup({ project }: { project: typeof projects[0] }) {
  const Icon = project.type === "ecom" ? ShoppingBag : project.type === "saas" ? Code2 : Sparkles;
  return (
    <div className="absolute inset-0 bg-white overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <BrowserChrome url={`${project.brand.toLowerCase().replace(/[^a-z]/g, "")}.com`} />

      {/* clean nav */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="size-4 rounded bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
            <Icon className="size-2.5 text-white" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-gray-900">{project.brand}</span>
        </div>
        <div className="flex gap-3.5 text-[9px] text-gray-600 font-medium">
          <span>Shop</span><span>About</span><span>Journal</span><span>Contact</span>
        </div>
        <button className="bg-gray-900 text-white px-2.5 py-1 text-[8px] font-medium rounded-md">
          {project.type === "saas" ? "Start free trial" : project.type === "local" ? "Book now" : "Sign in"}
        </button>
      </div>

      {/* hero */}
      <div className="px-5 py-4 grid grid-cols-[1.2fr_1fr] gap-3 items-center">
        <div>
          <div className="inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full text-[8px] text-gray-700 font-medium mb-2">
            <div className="size-1 rounded-full bg-green-500" />
            {project.type === "ecom" ? "New collection" : project.type === "saas" ? "Now in beta" : "Accepting new patients"}
          </div>
          <h4 className="text-gray-900 text-[15px] font-semibold leading-tight tracking-tight mb-1.5">
            {project.headline}
          </h4>
          <p className="text-gray-500 text-[9px] leading-snug mb-2.5">{project.sub}</p>
          <div className="flex gap-1.5">
            <button className="bg-gray-900 text-white px-2.5 py-1 text-[8px] font-medium rounded-md">
              {project.type === "ecom" ? "Shop new arrivals" : project.type === "saas" ? "Get started free" : "Book consultation"}
            </button>
            <button className="text-gray-700 px-2.5 py-1 text-[8px] font-medium">
              Learn more →
            </button>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[#C4E86B]/30 via-[#9B92C4]/20 to-gray-100 relative overflow-hidden border border-gray-100">
          <div className="absolute inset-3 rounded-md bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <Icon className="size-6 text-gray-400" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* feature row */}
      <div className="px-5 pb-3">
        {project.type === "ecom" && (
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="aspect-[3/4] rounded-md bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 p-1.5 flex flex-col justify-end">
                <div className="text-[7px] font-medium text-gray-900">Linen Shirt</div>
                <div className="text-[7px] text-gray-500">$89</div>
              </div>
            ))}
          </div>
        )}

        {project.type === "saas" && (
          <div className="grid grid-cols-3 gap-2">
            {["10x faster", "99.99% uptime", "SOC 2 ready"].map(t => (
              <div key={t} className="rounded-md bg-gray-50 border border-gray-100 px-2 py-1.5">
                <div className="text-[10px] font-semibold text-gray-900">{t}</div>
                <div className="text-[7px] text-gray-500 mt-0.5">than the average</div>
              </div>
            ))}
          </div>
        )}

        {project.type === "local" && (
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-md bg-gray-50 border border-gray-100 px-2 py-1.5 flex items-center gap-1.5">
              <Star className="size-3 text-[#C4E86B] fill-[#C4E86B]" />
              <div>
                <div className="text-[9px] font-semibold text-gray-900">4.9 ★</div>
                <div className="text-[7px] text-gray-500">312 reviews</div>
              </div>
            </div>
            <div className="rounded-md bg-gray-50 border border-gray-100 px-2 py-1.5 flex items-center gap-1.5">
              <MapPin className="size-3 text-gray-500" />
              <div>
                <div className="text-[9px] font-semibold text-gray-900">Open today</div>
                <div className="text-[7px] text-gray-500">til 6 PM</div>
              </div>
            </div>
            <div className="rounded-md bg-gray-50 border border-gray-100 px-2 py-1.5 flex items-center gap-1.5">
              <Phone className="size-3 text-gray-500" />
              <div>
                <div className="text-[9px] font-semibold text-gray-900">Same-day</div>
                <div className="text-[7px] text-gray-500">availability</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AFTER badge */}
      <div className="absolute top-8 left-3 bg-[#C4E86B]/95 backdrop-blur-sm border border-[#C4E86B] px-2.5 py-1 rounded-full text-[10px] font-bold text-black shadow-lg">
        AFTER
      </div>
    </div>
  );
}

function SliderItem({ project, index }: { project: typeof projects[0]; index: number }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const container = e.currentTarget.getBoundingClientRect();
    const position = 'touches' in e
      ? e.touches[0].clientX - container.left
      : e.clientX - container.left;

    const percentage = Math.max(0, Math.min(100, (position / container.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="space-y-4"
    >
      {/* Project Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#E8E8EA] mb-1">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.industry}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#C4E86B]">{project.metric}</p>
        </div>
      </div>

      {/* Before/After Slider */}
      <div
        className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-col-resize select-none shadow-2xl shadow-black/50"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Before (full underlay) */}
        <BeforeMockup project={project} />

        {/* After (clipped overlay) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <AfterMockup project={project} />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-11 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center ring-4 ring-white/20">
            <MoveHorizontal className="size-5 text-black" />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        <MoveHorizontal className="size-3 inline mr-1" />
        Drag slider to compare
      </p>
    </motion.div>
  );
}

export function BeforeAfterSlider() {
  return (
    <section className="py-24 px-8 md:px-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#E8E8EA]">
            Real Transformations
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B92C4] to-[#7B72A4]">
              Real Results
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            See the dramatic difference our designs make
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <SliderItem key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
