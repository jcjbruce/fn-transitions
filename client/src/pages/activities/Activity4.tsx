import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const PROMPTS = [
  "My roles (child, sibling, student, worker, teammate)",
  "My community or Nation",
  "My language(s)",
  "My strengths",
  "My values",
  "My interests or hobbies",
  "My goals or dreams",
  "My cultural connections (teachings, practices, groups, land ties)",
];

const Activity4 = () => {
  const [name, setName] = useState("");
  const [branches, setBranches] = useState<string[]>(Array(8).fill(""));
  const [reflection, setReflection] = useState("");

  const setBranch = (i: number, v: string) => setBranches((p) => { const n = [...p]; n[i] = v; return n; });

  const handleDownload = () => {
    downloadAsWord("Who I Am - Identity Web", [
      { label: "Your Name", value: name },
      ...branches.map((b, i) => ({ label: PROMPTS[i], value: b })),
      { label: "Reflection", value: reflection },
    ], "Explore the parts of yourself that you carry into new spaces.");
  };

  const handleClear = () => { setName(""); setBranches(Array(8).fill("")); setReflection(""); };

  return (
    <ActivityLayout
      activityNumber={4}
      title={'"Who I Am" Identity Web'}
      subtitle="You bring a whole identity with you — your relationships, values, strengths, roles, culture, and experiences. This activity helps you explore the parts of yourself that you carry into new spaces."
      moduleLabel="Module 2 — Identity & Belonging"
    >
      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Your Identity Web</h2>
        <p className="text-sm text-[#7a6d60] mb-5">Write your name in the centre, then fill in the branches with parts of who you are.</p>

        <div className="mb-5">
          <label className={LABEL}>Your Name (centre of the web)</label>
          <input className={INPUT} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROMPTS.map((prompt, i) => (
            <div key={i} className="relative">
              <div className="absolute left-0 top-0 w-1 h-full rounded-full bg-[#C2703E]/30" />
              <div className="pl-4">
                <label className="block text-xs font-semibold text-[#7a3420] mb-1 font-['DM_Sans']">{prompt}</label>
                <input className={INPUT} value={branches[i]} onChange={(e) => setBranch(i, e.target.value)} placeholder="..." />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <label className={LABEL}>What do you notice about yourself? What stands out?</label>
        <textarea className={INPUT + " min-h-[120px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Reflect on what you've written..." rows={5} style={{ resize: "vertical" }} />
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

export default Activity4;
