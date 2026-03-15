// OntarioMapEmbed - Embeds the Ontario First Nations Map via CDN blob URL
// Supports expandable fullscreen view
// Colors: Red #BB0A12, warm white #fdfcf9, sand #ede9e0, ink #1a1a18

import { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

const MAP_CDN_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/dbdnf9YxmUznohGAsnbG3a/ontario_map_v6_8818e0d7.html";

interface OntarioMapEmbedProps {
  className?: string;
  height?: string;
}

export default function OntarioMapEmbed({ className = "", height = "600px" }: OntarioMapEmbedProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(MAP_CDN_URL)
      .then(r => r.text())
      .then(html => {
        if (cancelled) return;
        const blob = new Blob([html], { type: "text/html" });
        setBlobUrl(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isFullscreen]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-[#FAF6F0] rounded-lg border border-[#e0d5c8] ${className}`} style={{ height }}>
        <p className="text-sm text-[#8a7e72]">Unable to load the map. Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <>
      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3" style={{ background: "#1a1a18" }}>
            <h3 className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Ontario First Nations Communities Map
            </h3>
            <button
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", background: "none", border: "none", cursor: "pointer" }}
            >
              <Minimize2 className="w-4 h-4" />
              Exit Fullscreen (Esc)
            </button>
          </div>
          <div className="flex-1">
            {blobUrl && (
              <iframe
                src={blobUrl}
                className="w-full h-full"
                style={{ border: "none" }}
                title="Ontario First Nations Map - Fullscreen"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            )}
          </div>
        </div>
      )}

      {/* Inline Map */}
      <div ref={containerRef} className={`relative ${className}`}>
        {loading && (
          <div className="flex items-center justify-center bg-[#FAF6F0] rounded-lg" style={{ height }}>
            <div className="text-center">
              <div className="w-8 h-8 border-3 border-[#BB0A12] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-[#6b5e52]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Loading map...</p>
            </div>
          </div>
        )}
        {blobUrl && (
          <div className="relative rounded-lg overflow-hidden" style={{ height }}>
            <iframe
              src={blobUrl}
              className="w-full h-full"
              style={{ border: "none" }}
              title="Ontario First Nations Communities Map"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
            {/* Expand Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all hover:shadow-lg"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(255,255,255,0.95)",
                color: "#1a1a18",
                border: "1px solid rgba(0,0,0,0.1)",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Expand Map
            </button>
          </div>
        )}
        <p className="text-xs text-[#8a7e72] mt-3 italic leading-relaxed">
          Interactive map displaying First Nations communities across Ontario with on-reserve population data.
          Select any community bubble for detailed information. Data sourced from Crown-Indigenous Relations and Northern Affairs Canada.
        </p>
      </div>
    </>
  );
}
