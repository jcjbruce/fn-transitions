// DocumentViewer - COO Branding
// Embeds standalone HTML documents via iframe from public/docs/
// No header banner — each HTML document has its own internal header/hero
// Colors: Red #BB0A12, warm white #fdfcf9, ink #1a1a18

import { useEffect, useRef, useState } from "react";
import { useRoute } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const documents: Record<string, { title: string; url: string }> = {
  strategy: {
    title: "Education Transition Strategy",
    url: "/docs/strategy.html",
  },
  report: {
    title: "Education Report",
    url: "/docs/report.html",
  },
  "best-practices": {
    title: "Best Practices",
    url: "/docs/best-practices.html",
  },
  resources: {
    title: "Programs & Resources",
    url: "/docs/resources.html",
  },
};

export default function DocumentViewer() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";
  const doc = documents[slug];

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#fdfcf9" }}>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1
              className="mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: "#1a1a18" }}
            >
              Document Not Found
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', serif", color: "#3d3d39" }}>
              The requested document could not be found.
            </p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdfcf9" }}>
      <SiteHeader />

      {/* Embedded Document — full height, no extra header */}
      <main className="flex-1 flex flex-col">
        <iframe
          src={doc.url}
          title={doc.title}
          style={{
            flex: 1,
            width: "100%",
            minHeight: "calc(100vh - 128px)",
            border: "none",
            background: "#ffffff",
          }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
