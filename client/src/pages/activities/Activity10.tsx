import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

interface Scale { label: string; low: string; high: string; value: number; }

const INITIAL_SCALES: Scale[] = [
  { label: "My stress level today", low: "Low", high: "High", value: 0 },
  { label: "My energy level today", low: "Very low", high: "Very high", value: 0 },
  { label: "My confidence today", low: "Low", high: "High", value: 0 },
  { label: "My sense of belonging", low: "Disconnected", high: "Connected", value: 0 },
  { label: "My cultural connection", low: "Distant", high: "Strong", value: 0 },
];

const Activity10 = () => {
  const [scales, setScales] = useState<Scale[]>(JSON.parse(JSON.stringify(INITIAL_SCALES)));
  const [bodyFeel, setBodyFeel] = useState("");
  const [mindFeel, setMindFeel] = useState("");
  const [spiritFeel, setSpiritFeel] = useState("");
  const [needToday, setNeedToday] = useState("");

  const setScale = (i: number, val: number) => {
    setScales((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[i].value = val;
      return next;
    });
  };

  const handleDownload = () => {
    const sections = scales.map((s) => ({
      label: s.label,
      value: s.value ? `${s.value}/5 (${s.value <= 2 ? s.low : s.value >= 4 ? s.high : "Moderate"})` : "Not rated",
    }));
    sections.push(
      { label: "How does my body feel?", value: bodyFeel },
      { label: "What is on my mind?", value: mindFeel },
      { label: "How does my spirit feel?", value: spiritFeel },
      { label: "One thing I need today", value: needToday },
    );
    downloadAsWord("Stress & Wellness Check-In", sections, "Pause and check in with yourself — emotionally, mentally, physically, and spiritually.");
  };

  const handleClear = () => {
    setScales(JSON.parse(JSON.stringify(INITIAL_SCALES)));
    setBodyFeel(""); setMindFeel(""); setSpiritFeel(""); setNeedToday("");
  };

  return (
    <ActivityLayout
      activityNumber={10}
      title="Stress & Wellness Check-In"
      subtitle="Transitions bring new routines, new expectations, and new feelings. This activity helps you pause and check in with yourself — emotionally, mentally, physically, and spiritually."
      moduleLabel="Module 4 — Wellness & Resilience"
    >
      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Wellness Check-In Scale</h2>
        <p className="text-sm text-[#7a6d60] mb-5">Rate each area honestly. There are no right or wrong responses.</p>

        <div className="space-y-6">
          {scales.map((scale, i) => (
            <div key={i}>
              <label className={LABEL}>{scale.label}</label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#9a8d7f] w-16 text-right">{scale.low}</span>
                <div className="flex gap-1.5 flex-1 justify-center">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setScale(i, n)}
                      className={`w-10 h-10 rounded-full font-bold text-sm transition border-2 cursor-pointer ${
                        scale.value === n
                          ? "bg-[#4a5a6b] text-white border-[#4a5a6b] shadow-md"
                          : "bg-white text-[#3d2e26] border-[#d4c8b8] hover:border-[#5a7a8f]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-[#9a8d7f] w-16">{scale.high}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Open Reflection</h2>
        <div className="space-y-4">
          <div>
            <label className={LABEL}>How does my body feel right now?</label>
            <textarea className={INPUT + " min-h-[80px]"} value={bodyFeel} onChange={(e) => setBodyFeel(e.target.value)} placeholder="Tired, energized, tense, relaxed..." rows={3} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>What is on my mind?</label>
            <textarea className={INPUT + " min-h-[80px]"} value={mindFeel} onChange={(e) => setMindFeel(e.target.value)} placeholder="Worries, plans, thoughts..." rows={3} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>How does my spirit feel?</label>
            <textarea className={INPUT + " min-h-[80px]"} value={spiritFeel} onChange={(e) => setSpiritFeel(e.target.value)} placeholder="Connected, lost, hopeful, searching..." rows={3} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>One thing I need today:</label>
            <input className={INPUT} value={needToday} onChange={(e) => setNeedToday(e.target.value)} placeholder="Rest, connection, movement, quiet..." />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 activity-no-print">
        <button className={BTN_PRIMARY} onClick={handleDownload}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download as Word
        </button>
        <button className={BTN_PRINT} onClick={() => window.print()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print
        </button>
        <button className={BTN_SECONDARY} onClick={handleClear}>Clear All</button>
      </div>
    </ActivityLayout>
  );
};

export default Activity10;
