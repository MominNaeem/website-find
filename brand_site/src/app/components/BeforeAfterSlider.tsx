import { motion } from "motion/react";
import { useState } from "react";
import { MoveHorizontal, Star, Phone, MapPin, ShoppingBag, Code2, Sparkles, Heart, Shield, Clock, Users, Zap, Check } from "lucide-react";

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
    <div className="absolute inset-0 overflow-hidden" style={{ fontFamily: "'Comic Sans MS', 'Times New Roman', cursive, serif" }}>
      <BrowserChrome url={`http://www.~${project.brand.toLowerCase().replace(/[^a-z]/g, "")}.geocities.com/index.htm`} dated />

      {/* Popup ad overlay */}
      <div className="absolute top-10 left-4 z-20 bg-[#ffffcc] border-2 border-[#808080] shadow-[3px_3px_0_#000] p-1.5 w-[55%]" style={{ fontFamily: "Arial, sans-serif" }}>
        <div className="bg-[#000080] text-white text-[7px] px-1 py-0.5 flex justify-between items-center mb-1">
          <span>Special Offer!!!</span>
          <span className="bg-[#c0c0c0] text-black px-1 border border-[#808080] text-[6px] cursor-pointer">X</span>
        </div>
        <div className="text-[7px] text-center">
          <div className="text-red-600 font-bold text-[9px]">CONGRATULATIONS!!!</div>
          <div className="text-[7px]">You are the 1,000,000th visitor!</div>
          <div className="bg-[#ff6600] text-white text-[7px] font-bold px-2 py-0.5 mt-1 inline-block border-2 border-[#cc0000]">CLAIM PRIZE NOW</div>
        </div>
      </div>

      {/* Gaudy tiled background */}
      <div className="absolute inset-0 top-6" style={{ background: "repeating-linear-gradient(45deg, #f5e6d0, #f5e6d0 8px, #ede0cc 8px, #ede0cc 16px)" }} />

      {/* Marquee banner */}
      <div className="relative bg-[#ff0000] text-[#ffff00] text-center py-0.5 text-[8px] font-bold tracking-wider border-y-2 border-[#ffff00]" style={{ textShadow: "1px 1px 0 #000" }}>
        *** HOT!!! MEGA SALE!!! FREE SHIPPING!!! CLICK HERE NOW!!! WOW!!! ***
      </div>

      {/* Ugly rainbow divider */}
      <div className="h-1" style={{ background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)" }} />

      {/* Navigation - way too many items */}
      <div className="relative bg-[#003399] text-white px-1 py-0.5 flex flex-wrap gap-x-1.5 gap-y-0.5 text-[7px] border-b-2 border-[#ffff00]" style={{ fontFamily: "Verdana, sans-serif" }}>
        {["Home", "About Us", "Products", "Services", "Gallery", "FAQ", "Links", "Guestbook", "Webring", "Contact", "Sitemap", "Forum"].map((l, i) => (
          <span key={l} className={`underline ${i === 7 ? "text-[#ff0]" : i === 4 ? "text-[#0ff]" : ""}`}>
            {l}{i === 2 ? " NEW!" : ""}
          </span>
        ))}
      </div>

      {/* Under construction + welcome */}
      <div className="relative px-2 py-1 text-center" style={{ background: "linear-gradient(to bottom, #ffffcc, #ffeeaa)" }}>
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <div className="w-4 h-3 bg-[#ffcc00] border border-[#000] flex items-center justify-center text-[6px]">GIF</div>
          <span className="text-[10px] text-[#ff0000] font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>UNDER CONSTRUCTION</span>
          <div className="w-4 h-3 bg-[#ffcc00] border border-[#000] flex items-center justify-center text-[6px]">GIF</div>
        </div>
        <h4 className="text-[#000080] text-[14px] font-bold" style={{ fontFamily: "Times New Roman, serif", textShadow: "1px 1px 0 #ccc" }}>
          ~*~Welcome to {project.brand}~*~
        </h4>
        <div className="flex items-center justify-center gap-1">
          <span className="text-[7px] text-[#666] italic">Est. 2003</span>
          <span className="text-[7px]">|</span>
          <span className="text-[7px] text-[#666]">Visitor #{" "}
            <span className="bg-black text-[#00ff00] font-mono px-1">004285</span>
          </span>
        </div>
        <div className="text-[6px] text-[#888] mt-0.5">Best viewed in Internet Explorer 6 at 800x600 resolution</div>
      </div>

      {/* Auto-play music indicator */}
      <div className="relative bg-[#660066] text-[#ff99ff] text-[6px] text-center py-0.5 flex items-center justify-center gap-1">
        <span>Now playing: midi_song.mid</span>
        <span className="text-[7px]">||</span>
        <span className="underline text-[#ffff00]">STOP MUSIC</span>
      </div>

      {/* Main content area */}
      <div className="relative px-1.5 py-1 grid grid-cols-[55px_1fr_50px] gap-1">
        {/* Left sidebar */}
        <div className="space-y-1">
          <div className="bg-[#000080] text-[#00ff00] p-1 text-[6px] border border-[#333]">
            <div className="font-bold underline text-[#ffff00] text-[7px]">MENU</div>
            {["Home", "Shop", "Blog", "Help", "Links"].map(l => (
              <div key={l} className="text-[#00ffff] underline">{">"} {l}</div>
            ))}
          </div>
          <div className="border border-[#999] bg-white p-0.5 text-center">
            <div className="text-[5px] text-gray-600">GEOCITIES</div>
            <div className="text-[5px] text-gray-600">WEB RING</div>
            <div className="flex justify-center gap-0.5 mt-0.5">
              <span className="text-[6px] text-blue-700 underline">{"<"}Prev</span>
              <span className="text-[6px] text-blue-700 underline">Next{">"}</span>
            </div>
          </div>
          <div className="bg-[#ffcc00] border-2 border-[#ff0000] p-0.5 text-center">
            <div className="text-[6px] text-[#ff0000] font-bold">HOT!</div>
            <div className="text-[5px]">Sign our</div>
            <div className="text-[6px] text-blue-700 underline font-bold">Guestbook!</div>
          </div>
        </div>

        {/* Center content */}
        <div className="space-y-1">
          {project.type === "ecom" && (
            <>
              <div className="text-[8px] text-[#cc0000] font-bold text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                $$$SALE$$$SALE$$$SALE$$$
              </div>
              <div className="grid grid-cols-3 gap-0.5">
                {[
                  { name: "Dress", price: "$19.99", sale: "$9.99!", bg: "#ffcccc" },
                  { name: "Shirt", price: "$24.99", sale: "$12.49!", bg: "#ccffcc" },
                  { name: "Pants", price: "$34.99", sale: "$17.49!", bg: "#ccccff" },
                  { name: "Shoes", price: "$49.99", sale: "$24.99!", bg: "#ffffcc" },
                  { name: "Bag", price: "$29.99", sale: "$14.99!", bg: "#ffccff" },
                  { name: "Hat", price: "$14.99", sale: "$7.49!", bg: "#ccffff" },
                ].map((item, i) => (
                  <div key={i} className="border-2 border-[#666] p-0.5 flex flex-col items-center" style={{ backgroundColor: item.bg }}>
                    <div className="w-full aspect-square bg-[#ddd] border border-[#999] flex items-center justify-center mb-0.5 relative">
                      <div className="text-[6px] text-gray-500">[photo]</div>
                      {i < 2 && (
                        <div className="absolute -top-1 -right-1 bg-[#ff0000] text-[#fff] text-[5px] font-bold px-0.5 rounded-sm rotate-12">NEW!</div>
                      )}
                    </div>
                    <div className="text-[6px] font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>{item.name}</div>
                    <div className="text-[6px] line-through text-gray-500">{item.price}</div>
                    <div className="text-[7px] text-[#ff0000] font-bold">{item.sale}</div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="inline-block bg-[#00ff00] text-[#000] text-[7px] font-bold px-2 py-0.5 border-2 border-[#009900]" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  ADD ALL TO CART!!!
                </div>
              </div>
            </>
          )}

          {project.type === "saas" && (
            <>
              <div className="text-center mb-1" style={{ background: "linear-gradient(to right, #000066, #006600, #000066)" }}>
                <div className="text-[10px] text-[#00ff00] font-bold py-1" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "1px 1px 0 #000" }}>
                  DOWNLOAD NOW!!!
                </div>
              </div>
              <table className="w-full border-collapse text-[7px] border-2 border-[#000080]">
                <thead>
                  <tr className="bg-[#000080] text-[#ffff00]">
                    <th className="border border-[#666] p-0.5 text-left">Feature</th>
                    <th className="border border-[#666] p-0.5">Us</th>
                    <th className="border border-[#666] p-0.5">Them</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Speed", "FAST!!!", "slow"],
                    ["Support", "24/7!!!", "never"],
                    ["Price", "CHEAP!", "$$$"],
                    ["Uptime", "100%*", "50%"],
                  ].map(([f, us, them], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#ffffcc]" : "bg-[#ccffcc]"}>
                      <td className="border border-[#666] p-0.5 font-bold">{f}</td>
                      <td className="border border-[#666] p-0.5 text-center text-[#009900] font-bold">{us}</td>
                      <td className="border border-[#666] p-0.5 text-center text-[#cc0000]">{them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-[5px] text-[#888] italic">*uptime not guaranteed</div>
              <div className="bg-[#ffeecc] border-2 border-[#cc9900] p-1 mt-1">
                <div className="text-[7px] font-bold text-[#660000]" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  &quot;This softwere changed my life!!!&quot;
                </div>
                <div className="text-[6px] text-[#666] italic">- John S., Happy Customer</div>
              </div>
              <div className="flex gap-1 mt-1">
                <div className="flex-1 bg-[#ff0000] text-[#fff] text-[8px] font-bold text-center py-1 border-2 border-[#ffff00]" style={{ textShadow: "1px 1px 0 #000" }}>
                  DOWNLOAD FREE!!!
                </div>
                <div className="flex-1 bg-[#ff6600] text-[#fff] text-[8px] font-bold text-center py-1 border-2 border-[#ffff00]" style={{ textShadow: "1px 1px 0 #000" }}>
                  BUY PRO $$$
                </div>
              </div>
            </>
          )}

          {project.type === "local" && (
            <>
              <div className="flex items-start gap-1">
                <div className="w-12 h-10 bg-[#cccccc] border-2 border-[#999] flex items-center justify-center shrink-0">
                  <div className="text-[6px] text-gray-500 text-center">[clip<br/>art]</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#cc0000] font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    CALL NOW!!!
                  </div>
                  <div className="text-[12px] text-[#ff0000] font-bold" style={{ fontFamily: "Impact, sans-serif" }}>
                    (555) 123-4567
                  </div>
                  <div className="text-[6px] text-[#666]">Se habla espanol | Walk-ins welcome</div>
                </div>
              </div>
              <div className="bg-[#ccffcc] border-2 border-[#009900] p-1">
                <div className="text-[7px] font-bold text-[#006600] underline">Office Hours:</div>
                <table className="text-[6px] w-full border-collapse mt-0.5">
                  {[["Mon", "9-5"], ["Tue", "9-5"], ["Wed", "9-7"], ["Thu", "9-5"], ["Fri", "9-3"], ["Sat", "10-2"], ["Sun", "CLOSED"]].map(([d, h]) => (
                    <tr key={d}>
                      <td className="border border-[#999] bg-[#ffffcc] px-0.5">{d}</td>
                      <td className={`border border-[#999] px-0.5 ${h === "CLOSED" ? "bg-[#ffcccc] text-red-700 font-bold" : "bg-white"}`}>{h}</td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="bg-[#e0e0e0] border border-[#999] p-1 text-center">
                <div className="text-[7px] text-gray-600">[MAP WOULD GO HERE]</div>
                <div className="text-[6px] text-blue-700 underline">Click for directions (MapQuest)</div>
              </div>
              <div className="bg-[#ffffcc] border-2 border-[#cc0000] p-1 mt-0.5">
                <div className="text-[8px] text-[#cc0000] font-bold text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>SPECIAL OFFER!</div>
                <div className="text-[7px] text-center font-bold">FREE TEETH WHITENING</div>
                <div className="text-[6px] text-center text-[#666]">with any cleaning - print this page!</div>
              </div>
            </>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-1">
          <div className="bg-[#ffff99] border border-[#666] p-0.5 text-[6px] text-black">
            <div className="font-bold underline text-[7px]">NEWS</div>
            <div>* New site!!!</div>
            <div>* Sale on now</div>
            <div>* Like us on MySpace</div>
            <div className="text-blue-700 underline">* AOL Keyword</div>
          </div>
          <div className="bg-white border-2 border-[#666] p-0.5 text-center">
            <div className="text-[6px] text-gray-600">Web Counter</div>
            <div className="bg-black text-[#00ff00] text-[9px] font-mono px-1">042857</div>
          </div>
          <div className="border border-[#999] bg-[#f0f0f0] p-0.5 text-center">
            <div className="text-[5px] text-gray-500">Made with</div>
            <div className="text-[6px] text-blue-700 font-bold">Notepad</div>
            <div className="text-[5px] text-gray-500">HTML 3.2</div>
          </div>
          <div className="bg-[#330066] text-[#ff99ff] border border-[#666] p-0.5 text-center text-[5px]">
            <div className="font-bold text-[6px] text-[#ffff00]">ADS</div>
            <div>FREE</div>
            <div>iPods!</div>
            <div className="underline text-[#00ffff]">CLICK!</div>
          </div>
          <div className="bg-[#009900] text-white text-[5px] p-0.5 text-center border border-[#006600]">
            <div className="font-bold">AWARD</div>
            <div>Best Site</div>
            <div>2007</div>
          </div>
        </div>
      </div>

      {/* Rainbow divider */}
      <div className="relative h-0.5" style={{ background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)" }} />

      {/* Footer */}
      <div className="relative bg-[#003399] text-white text-[6px] text-center py-0.5 px-1">
        <div>Copyright (C) 2003-2008 {project.brand}. All Rights Reserved.</div>
        <div className="text-[5px]">
          <span className="underline">webmaster@aol.com</span> | <span className="underline">Privacy Policy</span> | <span className="underline">Disclaimer</span> | This site is not affiliated with GeoCities
        </div>
      </div>

      {/* BEFORE badge */}
      <div className="absolute top-8 right-3 z-30 bg-red-500/95 backdrop-blur-sm border border-red-300 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg" style={{ fontFamily: "system-ui" }}>
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
          {/* Hero with lifestyle image placeholder */}
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

          {/* Product cards */}
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

          {/* Trust bar */}
          <div className="px-3 mt-2">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
              {[
                { icon: "truck", label: "Free shipping $75+" },
                { icon: "return", label: "30-day returns" },
                { icon: "secure", label: "Secure checkout" },
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
          {/* Hero */}
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

          {/* Code editor / terminal preview */}
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

          {/* Metric cards */}
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

          {/* Integration logos */}
          <div className="px-4 mt-2">
            <div className="text-[7px] text-gray-400 text-center mb-1 font-medium">Integrates with your stack</div>
            <div className="flex justify-center gap-2">
              {["GitHub", "Slack", "AWS", "Vercel", "Docker"].map(l => (
                <div key={l} className="px-1.5 py-0.5 rounded bg-gray-50 border border-gray-100 text-[6px] text-gray-500 font-medium">{l}</div>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div className="px-4 mt-2 flex items-center justify-center gap-2">
            <div className="flex -space-x-1">
              {[0,1,2,3].map(i => (
                <div key={i} className="size-3.5 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white" />
              ))}
            </div>
            <div className="text-[7px] text-gray-500">
              <span className="font-semibold text-gray-700">2,400+</span> teams shipping with Stackline
            </div>
          </div>
        </>
      )}

      {project.type === "local" && (
        <>
          {/* Hero with booking CTA */}
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

          {/* Trust row: rating + open + phone */}
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

          {/* Services preview */}
          <div className="px-3 mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-semibold text-gray-900">Our services</span>
              <span className="text-[6px] text-gray-400 font-medium">View all &rarr;</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[
                { name: "Cleanings", icon: "sparkle" },
                { name: "Whitening", icon: "sun" },
                { name: "Implants", icon: "plus" },
                { name: "Invisalign", icon: "smile" },
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

          {/* Testimonial card */}
          <div className="px-3 mt-2">
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

          {/* Insurance logos */}
          <div className="px-3 mt-1.5">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[6px] text-gray-400">Accepted:</span>
              {["Delta", "Aetna", "Cigna", "MetLife"].map(l => (
                <span key={l} className="text-[6px] text-gray-400 font-medium bg-gray-50 px-1 py-0.5 rounded">{l}</span>
              ))}
            </div>
          </div>
        </>
      )}

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
        role="slider"
        tabIndex={0}
        aria-label={`Before and after comparison for ${project.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-col-resize select-none shadow-2xl shadow-black/50 focus:outline-none focus:ring-2 focus:ring-[#9B92C4] focus:ring-offset-2 focus:ring-offset-black"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + 5));
        }}
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
