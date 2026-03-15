import React, { useState } from "react";
import { downloadChecklistAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

interface CheckSection { title: string; items: { text: string; checked: boolean }[]; extra: string; }

const INITIAL: CheckSection[] = [
  {
    title: "Physical Environment — Where I Learn Best",
    items: [
      { text: "Quiet space", checked: false },
      { text: "Background noise or music", checked: false },
      { text: "At a desk or table", checked: false },
      { text: "On the couch or bed", checked: false },
      { text: "Bright light", checked: false },
      { text: "Dim or soft light", checked: false },
      { text: "Outdoors", checked: false },
      { text: "Library or study room", checked: false },
      { text: "Coffee shop or public space", checked: false },
    ],
    extra: "",
  },
  {
    title: "Social Environment That Supports Me",
    items: [
      { text: "Studying alone", checked: false },
      { text: "Studying with one friend", checked: false },
      { text: "Study groups", checked: false },
      { text: "Having a mentor nearby", checked: false },
      { text: "Occasional check-ins", checked: false },
      { text: "Being around people but working independently", checked: false },
      { text: "Total quiet and privacy", checked: false },
    ],
    extra: "",
  },
  {
    title: "Emotional & Cultural Needs",
    items: [
      { text: "Access to cultural space or ceremony", checked: false },
      { text: "Connection to an Elder or Knowledge Keeper", checked: false },
      { text: "Regular check-ins with family", checked: false },
      { text: "Time alone to recharge", checked: false },
      { text: "Physical activity or movement", checked: false },
      { text: "Creative expression (art, music, writing)", checked: false },
      { text: "Time on the land", checked: false },
    ],
    extra: "",
  },
];

const Activity9 = () => {
  const [sections, setSections] = useState<CheckSection[]>(JSON.parse(JSON.stringify(INITIAL)));
  const [reflection, setReflection] = useState("");

  const toggle = (si: number, ii: number) => {
    setSections((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[si].items[ii].checked = !next[si].items[ii].checked;
      return next;
    });
  };

  const setExtra = (si: number, val: string) => {
    setSections((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[si].extra = val;
      return next;
    });
  };

  const handleDownload = () => {
    const data = sections.map((s) => ({ label: s.title, items: s.items, extras: s.extra }));
    downloadChecklistAsWord("My Environment for Success", data, "Understand what kind of environment helps you succeed.");
  };

  const handleClear = () => { setSections(JSON.parse(JSON.stringify(INITIAL))); setReflection(""); };

  return (
    <ActivityLayout
      activityNumber={9}
      title="My Environment for Success"
      subtitle="The spaces around you — physical, emotional, social, and cultural — all affect how well you learn, rest, and stay balanced. This activity helps you understand what kind of environment helps you succeed."
      moduleLabel="Module 3 — Practical Skills"
    >
      {sections.map((sec, si) => (
        <div key={si} className={CARD + " mb-5 activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>{sec.title}</h2>
          <p className="text-xs text-[#9a8d7f] mb-3">Check all that apply</p>
          <div className="space-y-2.5">
            {sec.items.map((item, ii) => (
              <label key={ii} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggle(si, ii)}
                  className="mt-0.5 w-5 h-5 rounded border-[#d4c8b8] text-[#5a6b3a] focus:ring-[#7a8f52] cursor-pointer"
                />
                <span className={`text-sm ${item.checked ? "text-[#5a6b3a] font-medium" : "text-[#3d2e26]"} transition`}>{item.text}</span>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <label className={LABEL}>Other preferences:</label>
            <input className={INPUT} value={sec.extra} onChange={(e) => setExtra(si, e.target.value)} placeholder="Add your own..." />
          </div>
        </div>
      ))}

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <label className={LABEL}>People who help me stay focused:</label>
        <textarea className={INPUT + " min-h-[100px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Who helps you stay on track?" rows={4} style={{ resize: "vertical" }} />
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

export default Activity9;
