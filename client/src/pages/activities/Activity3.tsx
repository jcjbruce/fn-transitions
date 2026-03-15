import React, { useState } from "react";
import { downloadChecklistAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

interface Section {
  title: string;
  items: { text: string; checked: boolean }[];
  extra: string;
}

const INITIAL: Section[] = [
  {
    title: "Important Documents",
    items: [
      { text: "Status card / Government ID", checked: false },
      { text: "Funding / sponsorship letters", checked: false },
      { text: "Health card", checked: false },
      { text: "Emergency contacts list", checked: false },
      { text: "School registration or acceptance info", checked: false },
    ],
    extra: "",
  },
  {
    title: "Essentials to Pack",
    items: [
      { text: "Clothes (indoor/outdoor, seasonal)", checked: false },
      { text: "Phone + charger", checked: false },
      { text: "Toiletries", checked: false },
      { text: "Notebook or planner", checked: false },
      { text: "Medications", checked: false },
      { text: "Reusable water bottle", checked: false },
    ],
    extra: "",
  },
  {
    title: "Home & Cultural Connections",
    items: [
      { text: "Saved phone numbers for family", checked: false },
      { text: "Photos or items that keep me grounded", checked: false },
      { text: "Cultural items (cedar, beadwork, ribbon skirt/shirt, etc.)", checked: false },
      { text: "Comfort items (books, small blanket, etc.)", checked: false },
    ],
    extra: "",
  },
];

const Activity3 = () => {
  const [sections, setSections] = useState<Section[]>(JSON.parse(JSON.stringify(INITIAL)));

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
    downloadChecklistAsWord(
      "Readiness & Packing Checklist",
      sections.map((s) => ({ label: s.title, items: s.items, extras: s.extra })),
      "Make sure you have what you need emotionally, culturally, and practically."
    );
  };

  const handleClear = () => setSections(JSON.parse(JSON.stringify(INITIAL)));

  const total = sections.reduce((a, s) => a + s.items.length, 0);
  const checked = sections.reduce((a, s) => a + s.items.filter((i) => i.checked).length, 0);

  return (
    <ActivityLayout
      activityNumber={3}
      title="Readiness & Packing Checklist"
      subtitle="Preparing to leave home isn't only about packing a bag — it's about making sure you have what you need emotionally, culturally, and practically. This checklist supports you in getting ready with confidence."
      moduleLabel="Module 1 — Before the Journey"
    >
      {/* Progress */}
      <div className={CARD + " mb-6 activity-print-clean"}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[#3d2e26] font-['DM_Sans']">Progress</span>
          <span className="text-sm text-[#8B2332] font-semibold">{checked}/{total}</span>
        </div>
        <div className="w-full h-2.5 bg-[#e8ddd0] rounded-full overflow-hidden">
          <div className="h-full bg-[#8B2332] rounded-full transition-all duration-300" style={{ width: `${(checked / total) * 100}%` }} />
        </div>
      </div>

      {sections.map((sec, si) => (
        <div key={si} className={CARD + " mb-5 activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>{sec.title}</h2>
          <div className="space-y-2.5">
            {sec.items.map((item, ii) => (
              <label key={ii} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggle(si, ii)}
                  className="mt-0.5 w-5 h-5 rounded border-[#d4c8b8] text-[#8B2332] focus:ring-[#8B2332] cursor-pointer"
                />
                <span className={`text-sm ${item.checked ? "line-through text-[#b8a898]" : "text-[#3d2e26]"} transition`}>{item.text}</span>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <label className={LABEL}>Other items to add:</label>
            <input className={INPUT} value={sec.extra} onChange={(e) => setExtra(si, e.target.value)} placeholder="Add your own items..." />
          </div>
        </div>
      ))}

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

export default Activity3;
