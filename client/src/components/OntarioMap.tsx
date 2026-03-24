// OntarioMap - Used within lesson content
// Embeds the Ontario First Nations Map from local public/docs
// Colors: Red #BB0A12, warm white #fdfcf9, sand #ede9e0, ink #1a1a18

import { useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

const MAP_URL = "/docs/ontario-map.html";

interface OntarioMapProps {
  className?: string;
}

export default function OntarioMap({ className = "" }: OntarioMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
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

  return (
    <>
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
            <iframe
              src={MAP_URL}
              className="w-full h-full"
              style={{ border: "none" }}
              title="Ontario First Nations Map - Fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </div>
      )}

      <div className={`relative ${className}`}>
        <div className="relative rounded-lg overflow-hidden" style={{ height: "500px" }}>
          <iframe
            src={MAP_URL}
            className="w-full h-full"
            style={{ border: "none" }}
            title="Ontario First Nations Communities Map"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
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
        <p className="text-xs text-[#8a7e72] mt-3 italic leading-relaxed">
          Interactive map displaying First Nations communities across Ontario with on-reserve population data.
          Select any community bubble for detailed information. Data sourced from Crown-Indigenous Relations and Northern Affairs Canada.
        </p>
      </div>
    </>
  );
}
