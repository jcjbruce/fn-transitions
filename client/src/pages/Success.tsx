/**
 * Success Page — "First Nations Students Are Succeeding"
 * COO Branding: #BB0A12 red, Playfair Display headings, DM Sans UI, Source Serif body
 * Tabbed dashboard showing postsecondary graduation data for Indigenous students in Ontario (2022)
 */
import { useState, useRef, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

/* ── palette ── */
const RED = "#BB0A12";
const INK = "#1a1a18";
const STONE = "#6b6b65";
const SAND = "#f5f0e8";
const WARM = "#fdfcf9";
const COO_WATERMARK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/dbdnf9YxmUznohGAsnbG3a/coo-watermark-original_8f92bcd6.png";
const CHART_COLORS = [
  "#BB0A12", "#d4543a", "#e8956e", "#f0c6a0", "#c9c2b4",
  "#7a8b6e", "#4a6741", "#2e4a2e", "#8b6f47", "#b89a6a",
];

/* ── data ── */
const KPI = [
  { value: "178,340", label: "Total Graduates", sub: "All students in Ontario" },
  { value: "4,790", label: "Indigenous Graduates", sub: "~2.7% of all graduates" },
  { value: "3,290", label: "Women (Indigenous)", sub: "69% of Indigenous graduates" },
  { value: "Trades & Natural Resources", label: "Most Common Field", sub: "Top field for Indigenous grads", small: true },
];

const COMMUNITY_DATA = {
  labels: ["First Nations", "Métis", "Inuit", "Multiple / Other"],
  values: [2410, 1870, 100, 410],
};

const FIELDS_DATA = {
  labels: [
    "Trades & Natural Resources", "Health Care", "Social & Behavioural Sciences",
    "Business & Administration", "Arts & Humanities", "Science & Technology",
    "Education & Teaching", "Engineering & Engineering Tech",
    "Math, Computer & Info Science", "Legal Studies",
  ],
  values: [1090, 920, 710, 540, 440, 310, 280, 270, 120, 110],
};

const GENDER_DATA = {
  labels: ["Women", "Men"],
  values: [3290, 1500],
};

const CREDENTIAL_DATA = {
  labels: [
    "Career Training Certificate", "Career Training Diploma",
    "Post-Career Training Certificate", "Undergraduate Certificate",
    "Undergraduate Degree", "Professional Degree",
    "Master's Degree", "Doctoral Degree", "Other Qualifications",
  ],
  values: [680, 1650, 150, 20, 1710, 60, 450, 30, 40],
};

const COMPARISON_DATA = {
  labels: [
    "Trades & Natural Resources", "Health Care", "Social & Behavioural Sciences",
    "Business & Administration", "Arts & Humanities", "Science & Technology",
    "Education & Teaching", "Engineering & Engineering Tech",
    "Math, Computer & Info Science", "Legal Studies",
  ],
  indigenous_pct: [22.8, 19.2, 14.8, 11.3, 9.2, 6.5, 5.8, 5.6, 2.5, 2.3],
  non_indigenous_pct: [14.1, 16.3, 15.7, 14.7, 8.8, 10.2, 4.4, 8.2, 5.3, 2.4],
};

const AGE_DATA = {
  labels: ["Younger Students (15–34)", "Mature Students (35–64)"],
  values: [4120, 660],
};

/* ── tabs ── */
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "community", label: "By Community" },
  { id: "fields", label: "Fields of Study" },
  { id: "credentials", label: "Credentials" },
  { id: "comparison", label: "Indigenous vs. Non-Indigenous" },
  { id: "demographics", label: "Demographics" },
];

/* ── FadeIn ── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Chart options helpers ── */
const chartFont = { family: "'DM Sans', sans-serif" };

function doughnutOpts(title: string) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "55%",
    plugins: {
      legend: { position: "bottom" as const, labels: { font: { ...chartFont, size: 13 }, padding: 18, usePointStyle: true, pointStyleWidth: 10 } },
      tooltip: { titleFont: chartFont, bodyFont: chartFont },
    },
  };
}

function barOpts(horizontal = false) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? ("y" as const) : ("x" as const),
    plugins: {
      legend: { display: false },
      tooltip: { titleFont: chartFont, bodyFont: chartFont },
    },
    scales: {
      x: { ticks: { font: { ...chartFont, size: 12 }, color: STONE }, grid: { display: !horizontal } },
      y: { ticks: { font: { ...chartFont, size: 12 }, color: STONE }, grid: { display: horizontal } },
    },
  };
}

function groupedBarOpts() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: { position: "top" as const, labels: { font: { ...chartFont, size: 13 }, usePointStyle: true, pointStyleWidth: 10 } },
      tooltip: { titleFont: chartFont, bodyFont: chartFont },
    },
    scales: {
      x: { ticks: { font: { ...chartFont, size: 12 }, color: STONE, callback: (v: number | string) => v + "%" }, grid: { display: true } },
      y: { ticks: { font: { ...chartFont, size: 12 }, color: STONE }, grid: { display: false } },
    },
  };
}

/* ── Section Card wrapper for each tab ── */
function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e8e4dc",
        borderRadius: 6,
        padding: "2rem 2rem 2.5rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {title && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 700,
              color: INK,
              marginBottom: subtitle ? 6 : 0,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15, color: STONE, lineHeight: 1.6 }}>
              {subtitle}
            </p>
          )}
          <div style={{ width: 40, height: 3, backgroundColor: RED, marginTop: 12, borderRadius: 2 }} />
        </div>
      )}
      {children}
    </div>
  );
}

/* ── Tab Content Components ── */

function OverviewTab() {
  return (
    <div className="space-y-8">
      <SectionCard
        title="At a Glance"
        subtitle="Key figures from the 2022 postsecondary graduation data for Indigenous students in Ontario."
      >
        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8, marginBottom: "2rem" }}>
          In 2022, nearly <strong>4,800 Indigenous students</strong> graduated from postsecondary institutions across Ontario. These graduates represent resilience, community strength, and the growing success of First Nations, Métis, and Inuit learners in higher education.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KPI.map((k, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="p-6 text-center"
                style={{
                  backgroundColor: i === 0 ? RED : "#fff",
                  color: i === 0 ? "#fff" : INK,
                  borderRadius: 6,
                  border: i === 0 ? "none" : "1px solid #e8e4dc",
                  boxShadow: i === 0 ? "0 4px 16px rgba(187,10,18,0.2)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: k.small ? "clamp(16px, 1.8vw, 20px)" : "clamp(28px, 3vw, 40px)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  {k.value}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: 4 }}>
                  {k.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, opacity: 0.6 }}>
                  {k.sub}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionCard>

      {/* Quick highlights */}
      <SectionCard title="Key Highlights" subtitle="Notable patterns from the 2022 data.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { num: "69%", label: "Women", desc: "Women make up the majority of Indigenous graduates" },
            { num: "86%", label: "Younger Students", desc: "Most graduates are aged 15–34" },
            { num: "2.7%", label: "Of All Graduates", desc: "Indigenous students as a share of Ontario graduates" },
          ].map((h, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="p-5"
                style={{
                  borderLeft: `4px solid ${RED}`,
                  backgroundColor: "#fdfcf9",
                  borderRadius: 2,
                }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: RED, marginBottom: 4 }}>
                  {h.num}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>
                  {h.label}
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 14, color: STONE, lineHeight: 1.5 }}>
                  {h.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function CommunityTab() {
  return (
    <SectionCard
      title="Graduates by Community"
      subtitle="A look at the Indigenous communities represented among Ontario's 2022 postsecondary graduates."
    >
      <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8, marginBottom: "2.5rem" }}>
        First Nations students make up the largest group of Indigenous graduates, followed by Métis learners. Together, they demonstrate the breadth of Indigenous achievement in postsecondary education.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div style={{ height: 360 }}>
          <Doughnut
            data={{
              labels: COMMUNITY_DATA.labels,
              datasets: [{
                data: COMMUNITY_DATA.values,
                backgroundColor: [RED, "#d4543a", "#4a6741", "#c9c2b4"],
                borderWidth: 2,
                borderColor: "#fff",
              }],
            }}
            options={doughnutOpts("Community Breakdown")}
          />
        </div>
        <div>
          {COMMUNITY_DATA.labels.map((l, i) => {
            const total = COMMUNITY_DATA.values.reduce((a, b) => a + b, 0);
            const pct = ((COMMUNITY_DATA.values[i] / total) * 100).toFixed(1);
            return (
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #e8e4dc" }}>
                <div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: INK, fontWeight: 600 }}>{l}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: STONE, marginLeft: 8 }}>({pct}%)</span>
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: RED }}>
                  {COMMUNITY_DATA.values[i].toLocaleString()}
                </span>
              </div>
            );
          })}
          <div className="mt-4 p-4" style={{ backgroundColor: SAND, borderRadius: 4 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: STONE, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
              Total Indigenous Graduates
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: INK }}>
              {COMMUNITY_DATA.values.reduce((a, b) => a + b, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function FieldsTab() {
  return (
    <SectionCard
      title="Fields of Study"
      subtitle="Indigenous graduates are excelling across diverse fields of study."
    >
      <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8, marginBottom: "2.5rem" }}>
        Trades and Natural Resources leads, reflecting strong connections to land-based knowledge and practical skills. Health Care and Social Sciences also show significant representation.
      </p>
      <div style={{ height: 500 }}>
        <Bar
          data={{
            labels: FIELDS_DATA.labels,
            datasets: [{
              data: FIELDS_DATA.values,
              backgroundColor: CHART_COLORS,
              borderRadius: 3,
            }],
          }}
          options={barOpts(true)}
        />
      </div>
      {/* Top 3 callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {FIELDS_DATA.labels.slice(0, 3).map((label, i) => (
          <div key={i} className="p-4 text-center" style={{ backgroundColor: SAND, borderRadius: 4 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: STONE, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
              #{i + 1} Field
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: INK, marginBottom: 2 }}>
              {label}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: RED }}>
              {FIELDS_DATA.values[i].toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function CredentialsTab() {
  return (
    <SectionCard
      title="Credentials Earned"
      subtitle="Indigenous graduates are earning credentials at every level."
    >
      <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8, marginBottom: "2.5rem" }}>
        From career training certificates to doctoral degrees, the breadth of academic achievement demonstrates the determination and capability of Indigenous learners across Ontario.
      </p>
      <div style={{ height: 480 }}>
        <Bar
          data={{
            labels: CREDENTIAL_DATA.labels,
            datasets: [{
              data: CREDENTIAL_DATA.values,
              backgroundColor: CHART_COLORS,
              borderRadius: 3,
            }],
          }}
          options={barOpts(true)}
        />
      </div>
      {/* Top credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {[
          { label: "Undergraduate Degrees", value: "1,710", desc: "The most common credential earned" },
          { label: "Career Training Diplomas", value: "1,650", desc: "Strong representation in applied programs" },
        ].map((c, i) => (
          <div key={i} className="p-5" style={{ borderLeft: `4px solid ${RED}`, backgroundColor: SAND, borderRadius: 2 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: STONE, marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: RED, marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 14, color: STONE }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function ComparisonTab() {
  return (
    <SectionCard
      title="Indigenous vs. Non-Indigenous"
      subtitle="Comparing field distributions between Indigenous and non-Indigenous graduates."
    >
      <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8, marginBottom: "2.5rem" }}>
        Indigenous students show particularly strong representation in Trades, Health Care, and Education compared to their non-Indigenous peers, reflecting unique strengths and community priorities.
      </p>
      <div style={{ height: 540 }}>
        <Bar
          data={{
            labels: COMPARISON_DATA.labels,
            datasets: [
              {
                label: "Indigenous (%)",
                data: COMPARISON_DATA.indigenous_pct,
                backgroundColor: RED,
                borderRadius: 3,
              },
              {
                label: "Non-Indigenous (%)",
                data: COMPARISON_DATA.non_indigenous_pct,
                backgroundColor: "#c9c2b4",
                borderRadius: 3,
              },
            ],
          }}
          options={groupedBarOpts()}
        />
      </div>
      {/* Standout fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {[
          { field: "Trades & Natural Resources", indigenous: "22.8%", nonIndigenous: "14.1%", diff: "+8.7%" },
          { field: "Education & Teaching", indigenous: "5.8%", nonIndigenous: "4.4%", diff: "+1.4%" },
          { field: "Health Care", indigenous: "19.2%", nonIndigenous: "16.3%", diff: "+2.9%" },
        ].map((s, i) => (
          <div key={i} className="p-4" style={{ backgroundColor: SAND, borderRadius: 4 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: STONE, marginBottom: 6 }}>{s.field}</div>
            <div className="flex items-baseline gap-2">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: RED }}>{s.indigenous}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: STONE }}>vs {s.nonIndigenous}</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#4a6741", marginTop: 4 }}>{s.diff} Indigenous lead</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function DemographicsTab() {
  return (
    <div className="space-y-8">
      <SectionCard
        title="Demographics"
        subtitle="Understanding who the Indigenous graduates are."
      >
        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          The majority of Indigenous graduates are younger students (15–34), while a significant number of mature students (35–64) are also completing their postsecondary education, reflecting lifelong learning and community commitment to education at every stage of life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Gender */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: INK, marginBottom: 20 }}>
              Gender Distribution
            </h3>
            <div style={{ height: 300 }}>
              <Doughnut
                data={{
                  labels: GENDER_DATA.labels,
                  datasets: [{
                    data: GENDER_DATA.values,
                    backgroundColor: [RED, "#c9c2b4"],
                    borderWidth: 2,
                    borderColor: "#fff",
                  }],
                }}
                options={doughnutOpts("Gender")}
              />
            </div>
            <div className="mt-4 p-4" style={{ backgroundColor: SAND, borderRadius: 4, textAlign: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: STONE }}>
                Women represent <strong style={{ color: RED }}>69%</strong> of all Indigenous graduates
              </span>
            </div>
          </div>
          {/* Age */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: INK, marginBottom: 20 }}>
              Age Groups
            </h3>
            <div style={{ height: 300 }}>
              <Doughnut
                data={{
                  labels: AGE_DATA.labels,
                  datasets: [{
                    data: AGE_DATA.values,
                    backgroundColor: ["#4a6741", "#e8956e"],
                    borderWidth: 2,
                    borderColor: "#fff",
                  }],
                }}
                options={doughnutOpts("Age")}
              />
            </div>
            <div className="mt-4 p-4" style={{ backgroundColor: SAND, borderRadius: 4, textAlign: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: STONE }}>
                <strong style={{ color: "#4a6741" }}>86%</strong> are younger students aged 15–34
              </span>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ── Main Component ── */
export default function Success() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabContent: Record<string, React.ReactNode> = {
    overview: <OverviewTab />,
    community: <CommunityTab />,
    fields: <FieldsTab />,
    credentials: <CredentialsTab />,
    comparison: <ComparisonTab />,
    demographics: <DemographicsTab />,
  };

  return (
    <div style={{ backgroundColor: WARM }}>
      <SiteHeader />
      {/* ===== HERO ===== */}
      <section
        className="relative px-4 sm:px-6"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${SAND} 0%, #e8e4dc 100%)`,
          minHeight: "min(50vh, 400px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* COO Watermark — same as Strategy page */}
        <img
          src={COO_WATERMARK}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            right: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(220px, 30vw, 420px)",
            opacity: 0.12,
          }}
        />
        <div className="max-w-[1100px] mx-auto w-full relative z-10 py-12 sm:py-16">
          <FadeIn>
            <p
              className="uppercase tracking-[0.2em] mb-3 text-[11px] sm:text-[12px] font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif", color: RED }}
            >
              Chiefs of Ontario
            </p>
            <h1
              className="font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 52px)",
                color: INK,
                lineHeight: 1.1,
              }}
            >
              <em style={{ fontStyle: "italic", fontWeight: 400, display: "block", fontSize: "0.65em", color: STONE, marginBottom: 4 }}>
                Postsecondary Graduation Data
              </em>
              First Nations Students Are Succeeding
            </h1>
            <div style={{ width: 60, height: 3, backgroundColor: RED, marginBottom: "1.5rem" }} />
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "clamp(15px, 1.6vw, 18px)",
                color: STONE,
                lineHeight: 1.75,
                maxWidth: "52ch",
                fontStyle: "italic",
              }}
            >
              Exploring the achievements and pathways of Indigenous postsecondary graduates across Ontario in 2022.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <div
        className="sticky z-20 px-4 sm:px-6"
        style={{
          top: 0,
          backgroundColor: "#fff",
          borderBottom: "1px solid #e8e4dc",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-[1100px] mx-auto flex gap-1 overflow-x-auto py-2" style={{ scrollbarWidth: "none" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap px-4 py-2 transition-all"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? "#fff" : STONE,
                backgroundColor: activeTab === tab.id ? RED : "transparent",
                borderRadius: 999,
                border: activeTab === tab.id ? "none" : "1px solid transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  (e.target as HTMLButtonElement).style.backgroundColor = "#f5f0e8";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== TAB CONTENT — expanded, not condensed ===== */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn key={activeTab}>
            {tabContent[activeTab]}
          </FadeIn>
        </div>
      </section>

      {/* ===== DATA SOURCE NOTE ===== */}
      <section className="px-4 sm:px-6 py-8" style={{ backgroundColor: SAND }}>
        <div className="max-w-[1100px] mx-auto text-center">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: STONE, lineHeight: 1.6 }}>
            Data source: 2022 Postsecondary Student Information System (PSIS), Statistics Canada. Figures represent Indigenous identity graduates from Ontario postsecondary institutions.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
