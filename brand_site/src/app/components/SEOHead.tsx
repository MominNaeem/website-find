import { useEffect } from "react";

export function SEOHead() {
  useEffect(() => {
    // Set document title
    document.title = "Thrive Web Co | 3x Your Conversions with Award-Winning Web Design";

    // Create or update meta tags
    const metaTags = [
      { name: "description", content: "Get a free website audit. We build conversion-optimized websites that generate 3x ROI. Award-winning agency trusted by 150+ brands. Money-back guarantee." },
      { name: "keywords", content: "web design agency, conversion optimization, website audit, ROI guarantee, Toronto web design" },
      { property: "og:title", content: "Thrive Web Co | 3x Your Conversions" },
      { property: "og:description", content: "Award-winning web design agency. Get your free conversion audit today." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://thrivewebco.ca" },
      { property: "og:image", content: "https://thrivewebco.ca/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Thrive Web Co | 3x Your Conversions" },
      { name: "twitter:description", content: "Award-winning web design agency. Get your free conversion audit today." },
      { name: "twitter:image", content: "https://thrivewebco.ca/og-image.jpg" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#C4E86B" },
      { name: "robots", content: "index, follow" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (name) meta.name = name;
        if (property) meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }

      meta.content = content;
    });

    // Add structured data for Google
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Thrive Web Co",
      "image": "https://thrivewebco.ca/logo.png",
      "description": "Award-winning web design agency specializing in conversion optimization",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "Ontario",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "43.6532",
        "longitude": "-79.3832"
      },
      "url": "https://thrivewebco.ca",
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150"
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

  }, []);

  return null; // This component doesn't render anything
}
