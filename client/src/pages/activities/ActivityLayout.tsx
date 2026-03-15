// ActivityLayout — Shared wrapper for all activity pages
// Provides consistent COO-branded header, navigation, and print styles

import React from "react";
import { Link } from "wouter";

interface ActivityLayoutProps {
  activityNumber: number;
  title: string;
  subtitle: string;
  moduleLabel: string;
  accentColor?: string;
  children: React.ReactNode;
}

const ACCENT_COLORS: Record<number, { primary: string; light: string; border: string }> = {
  1: { primary: "#8B2332", light: "#fef5f5", border: "#8B2332" },
  2: { primary: "#8B2332", light: "#fef5f5", border: "#8B2332" },
  3: { primary: "#8B2332", light: "#fef5f5", border: "#8B2332" },
  4: { primary: "#7a3420", light: "#fef8f0", border: "#C2703E" },
  5: { primary: "#7a3420", light: "#fef8f0", border: "#C2703E" },
  6: { primary: "#7a3420", light: "#fef8f0", border: "#C2703E" },
  7: { primary: "#5a6b3a", light: "#f5f8f0", border: "#7a8f52" },
  8: { primary: "#5a6b3a", light: "#f5f8f0", border: "#7a8f52" },
  9: { primary: "#5a6b3a", light: "#f5f8f0", border: "#7a8f52" },
  10: { primary: "#4a5a6b", light: "#f0f5f8", border: "#5a7a8f" },
  11: { primary: "#4a5a6b", light: "#f0f5f8", border: "#5a7a8f" },
  12: { primary: "#4a5a6b", light: "#f0f5f8", border: "#5a7a8f" },
  13: { primary: "#6b4a5a", light: "#f8f0f5", border: "#8f5a7a" },
  14: { primary: "#6b4a5a", light: "#f8f0f5", border: "#8f5a7a" },
  15: { primary: "#6b4a5a", light: "#f8f0f5", border: "#8f5a7a" },
};

export default function ActivityLayout({ activityNumber, title, subtitle, moduleLabel, children }: ActivityLayoutProps) {
  const colors = ACCENT_COLORS[activityNumber] || ACCENT_COLORS[1];

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .activity-no-print { display: none !important; }
          .activity-print-clean { box-shadow: none !important; border: 1px solid #ddd !important; }
          body { background: white !important; }
          .activity-hero-banner { background: white !important; padding: 1rem 0 !important; min-height: auto !important; }
          .activity-hero-banner * { color: #2C2420 !important; }
          .activity-hero-accent { display: none !important; }
        }
      `}</style>

      <div className="min-h-screen" style={{ background: "#FAF8F5" }}>
        {/* Hero Banner */}
        <div
          className="activity-hero-banner relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 50%, ${colors.primary}bb 100%)`,
            minHeight: 200,
          }}
        >
          {/* Decorative accent */}
          <div
            className="activity-hero-accent absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)`,
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Back nav */}
            <div className="activity-no-print mb-4">
              <Link
                href="/courses/transitions/lessons"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                Back to Program
              </Link>
            </div>

            {/* Module label */}
            <p
              className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}
            >
              {moduleLabel}
            </p>

            {/* Activity number badge */}
            <div className="flex items-start gap-4 mb-3">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 font-bold text-lg sm:text-xl"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {activityNumber}
              </div>
              <div>
                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h1>
              </div>
            </div>

            <p
              className="text-sm sm:text-base leading-relaxed max-w-xl"
              style={{ fontFamily: "'Source Serif 4', serif", color: "rgba(255,255,255,0.8)" }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          {children}
        </div>

        {/* Footer */}
        <div className="activity-no-print border-t border-[#e8ddd0] py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <Link
              href="/courses/transitions/lessons"
              className="inline-flex items-center gap-1.5 text-[#8B2332] hover:text-[#6d1b27] text-sm font-semibold transition"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Return to Lessons
            </Link>
            <p className="text-xs text-[#b8a898]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Chiefs of Ontario — First Nations Education Transitions
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
