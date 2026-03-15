// CourseLessons - COO Branding
// Course pathway page with module details and lesson cards
// Colors: Red #BB0A12, warm white #fdfcf9, sand #E0DFD9, ink #1a1a18
// Fonts: Playfair Display (headings), Source Serif 4 (body), DM Sans (UI)

import { Link } from "wouter";
import { COURSE, ALL_LESSONS } from "@/data/courseData";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useState, useEffect, useRef } from "react";

const MODULE_COLORS: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  "module-1": { bg: "#fef5f5", border: "#BB0A12", dot: "#BB0A12", text: "#8a0710" },
  "module-2": { bg: "#f5f0f0", border: "#8a0710", dot: "#8a0710", text: "#6b0510" },
  "module-3": { bg: "#fef8f5", border: "#c4442a", dot: "#c4442a", text: "#8a2e1a" },
  "module-4": { bg: "#f8f5f0", border: "#7a3d2e", dot: "#7a3d2e", text: "#5c2e22" },
  "module-5": { bg: "#f5f5f0", border: "#4a3528", dot: "#4a3528", text: "#3d2e22" },
  "module-6": { bg: "#f0f5f5", border: "#2a6b5a", dot: "#2a6b5a", text: "#1d4a3f" },
};

const DEFAULT_MODULE_COLOR = { bg: "#f5f5f0", border: "#4a3528", dot: "#4a3528", text: "#3d2e22" };

const LESSON_TYPE_LABELS: Record<string, string> = {
  overview: "Module Overview",
  chapter: "Story Chapter",
  activities: "Activities & Tools",
  intro: "Introduction",
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function CourseLessons() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fnt_completed");
      if (saved) setCompletedLessons(JSON.parse(saved));
    } catch {}
  }, []);

  const totalLessons = ALL_LESSONS.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdfcf9" }}>
      <SiteHeader />

      {/* ===== HERO HEADER ===== */}
      <section style={{ background: "#fdfcf9", borderBottom: "1px solid #e8e2d8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <p
            className="uppercase tracking-[0.2em] mb-3 text-[11px] sm:text-[13px] font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
          >
            Program Pathway
          </p>
          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 4.5vw, 42px)",
              color: "#1a1a18",
            }}
          >
            Modules & Lessons
          </h1>
          <p
            className="mx-auto max-w-[600px] mb-6"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "clamp(14px, 1.6vw, 17px)",
              color: "#5a5a55",
              lineHeight: 1.7,
            }}
          >
            Work through each module at your own pace. Each includes a story chapter, video, discussion prompts, and hands-on activities.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b6b65" }}>
                Your Progress
              </span>
              <span className="text-sm font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}>
                {progressPercent}% &mdash; {completedCount}/{totalLessons} lessons
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e8e2d8" }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%`, background: "#BB0A12" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PATHWAY PROGRESS DOTS ===== */}
      <section style={{ background: "#E0DFD9" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Grid layout: 21 dots split into even rows */}
          {/* Large screens: 1 row of 21, Medium: 2 rows (11+10), Small: 3 rows (7+7+7) */}
          {/* Use CSS grid with fixed columns per breakpoint */}
          <style>{`
              .progress-dots-grid {
                display: grid !important;
                gap: 8px 4px;
                justify-items: center;
                align-items: center;
              }
              /* Mobile: 7 columns (3 rows of 7) */
              .progress-dots-grid { grid-template-columns: repeat(7, 1fr); }
              /* Tablet: 11 columns (2 rows) */
              @media (min-width: 640px) { .progress-dots-grid { grid-template-columns: repeat(11, 1fr); } }
              /* Desktop: all 21 in one row */
              @media (min-width: 1024px) { .progress-dots-grid { grid-template-columns: repeat(21, 1fr); } }
          `}</style>
          <div className="progress-dots-grid">
            {ALL_LESSONS.map((lesson, idx) => {
              const isCompleted = completedLessons.includes(lesson.slug);
              const moduleColor = lesson.moduleId ? (MODULE_COLORS[lesson.moduleId] || DEFAULT_MODULE_COLOR) : MODULE_COLORS["module-1"];
              return (
                <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}>
                  <div className="flex items-center justify-center group cursor-pointer">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-200 group-hover:scale-110"
                      style={{
                        background: isCompleted ? moduleColor.dot : "transparent",
                        border: `2px solid ${isCompleted ? moduleColor.dot : "#c4c0b8"}`,
                        color: isCompleted ? "#fff" : "#8a7e72",
                      }}
                      title={lesson.title}
                    >
                      {isCompleted ? "\u2713" : idx + 1}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MODULES DETAIL ===== */}
      <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#fdfcf9" }}>
        {/* Introduction Lesson Card */}
        <div className="max-w-4xl mx-auto mb-10">
          <Link href={`/lessons/${COURSE.intro.slug}`}>
            <div
              className="group rounded-sm p-5 sm:p-6 border-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
              style={{
                background: "#fff",
                borderColor: completedLessons.includes(COURSE.intro.slug) ? "#BB0A12" : "#e0d5c8",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#fef5f5", border: "2px solid #BB0A12" }}
                >
                  <span style={{ color: "#BB0A12", fontSize: 18 }}>&#9733;</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
                    >
                      Start Here
                    </span>
                    {completedLessons.includes(COURSE.intro.slug) && (
                      <span className="text-xs text-white px-2 py-0.5 rounded-full font-medium" style={{ fontFamily: "'DM Sans', sans-serif", background: "#BB0A12" }}>
                        Completed
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-bold group-hover:text-[#BB0A12] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 2vw, 20px)", color: "#1a1a18" }}
                  >
                    Before You Begin: Context for the Path Forward
                  </h3>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Source Serif 4', serif", color: "#6b5e52" }}>
                    Explore an interactive map of Ontario First Nations communities and ground yourself before starting the program.
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-xl" style={{ color: "#BB0A12" }}>
                  &rarr;
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Modules */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 sm:space-y-10">
            {COURSE.modules.map((module, moduleIdx) => {
              const colors = MODULE_COLORS[module.id] || DEFAULT_MODULE_COLOR;
              const moduleCompleted = module.lessons.every(l => completedLessons.includes(l.slug));
              const moduleLessonsCompleted = module.lessons.filter(l => completedLessons.includes(l.slug)).length;

              return (
                <FadeIn key={module.id}>
                  <div>
                    {/* Module Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white text-lg sm:text-xl shrink-0"
                        style={{ fontFamily: "'DM Sans', sans-serif", background: colors.dot }}
                      >
                        {moduleIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2
                          className="font-bold"
                          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 22px)", color: "#1a1a18" }}
                        >
                          {module.title}
                        </h2>
                        <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}>
                          {moduleLessonsCompleted}/{module.lessons.length} lessons completed
                          {moduleCompleted && " \u2713"}
                        </p>
                      </div>
                    </div>

                    {/* Lesson Cards */}
                    <div className="space-y-3 ml-5 sm:ml-6 pl-5 sm:pl-6" style={{ borderLeft: `3px solid ${colors.border}22` }}>
                      {module.lessons.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson.slug);
                        return (
                          <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}>
                            <div
                              className="group rounded-sm p-4 sm:p-5 border transition-all duration-200 hover:shadow-md cursor-pointer"
                              style={{
                                background: isCompleted ? colors.bg : "#fff",
                                borderColor: isCompleted ? colors.border + "44" : "#e8e2d8",
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                                  style={{
                                    background: isCompleted ? colors.dot : "transparent",
                                    border: `2px solid ${isCompleted ? colors.dot : "#d4cfc6"}`,
                                    color: isCompleted ? "#fff" : "#8a7e72",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  {isCompleted ? "\u2713" : ""}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <span
                                      className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                                      style={{ fontFamily: "'DM Sans', sans-serif", color: colors.text }}
                                    >
                                      {LESSON_TYPE_LABELS[lesson.type]}
                                    </span>
                                    {isCompleted && (
                                      <span
                                        className="text-[10px] sm:text-xs text-white px-1.5 py-0.5 rounded-full font-medium"
                                        style={{ fontFamily: "'DM Sans', sans-serif", background: colors.dot }}
                                      >
                                        Done
                                      </span>
                                    )}
                                  </div>
                                  <h4
                                    className="font-semibold group-hover:text-[#BB0A12] transition-colors leading-snug"
                                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.6vw, 16px)", color: "#1a1a18" }}
                                  >
                                    {lesson.title}
                                  </h4>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "#BB0A12" }}>
                                  &rarr;
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
