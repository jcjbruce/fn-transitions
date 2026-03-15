import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const DIRECTIONS = [
  "Continue or return to education",
  "Start a training or apprenticeship program",
  "Enter or re-enter the workforce",
  "Focus on wellness, healing, or personal growth",
  "Explore cultural learning or community involvement",
  "Support my family or community",
];

const Activity13 = () => {
  const [dirChecked, setDirChecked] = useState<boolean[]>(DIRECTIONS.map(() => false));
  const [otherDirection, setOtherDirection] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [whyMatters, setWhyMatters] = useState("");
  const [actions, setActions] = useState([
    { action: "", deadline: "" },
    { action: "", deadline: "" },
    { action: "", deadline: "" },
  ]);
  const [whoHelps, setWhoHelps] = useState("");
  const [barriers, setBarriers] = useState("");
  const [reflection, setReflection] = useState("");

  const toggleDir = (i: number) => setDirChecked((p) => { const n = [...p]; n[i] = !n[i]; return n; });

  const setAction = (i: number, field: "action" | "deadline", val: string) => {
    setActions((prev) => {
      const next = [...prev.map((a) => ({ ...a }))];
      next[i][field] = val;
      return next;
    });
  };

  const handleDownload = () => {
    const selectedDirs = DIRECTIONS.filter((_, i) => dirChecked[i]);
    downloadAsWord("My Next Step Plan", [
      { label: "Direction(s) I want to move toward", value: selectedDirs.join(", ") + (otherDirection ? `\nOther: ${otherDirection}` : "") },
      { label: "My Next Step", value: nextStep },
      { label: "Why This Matters to Me", value: whyMatters },
      ...actions.map((a, i) => ({ label: `Action ${i + 1}`, value: `${a.action || "(not set)"}${a.deadline ? ` — Deadline: ${a.deadline}` : ""}` })),
      { label: "Who Can Help", value: whoHelps },
      { label: "What Might Get in the Way", value: barriers },
      { label: "Reflection", value: reflection },
    ], "Choose a direction and break it into small, realistic actions.");
  };

  const handleClear = () => {
    setDirChecked(DIRECTIONS.map(() => false)); setOtherDirection("");
    setNextStep(""); setWhyMatters("");
    setActions([{ action: "", deadline: "" }, { action: "", deadline: "" }, { action: "", deadline: "" }]);
    setWhoHelps(""); setBarriers(""); setReflection("");
  };

  return (
    <ActivityLayout
      activityNumber={13}
      title="My Next Step Plan"
      subtitle="This activity helps you choose one direction you want to move toward — whether it's education, training, work, wellness, or personal growth — and break it into small, realistic actions."
      moduleLabel="Module 5 — Looking Forward"
    >
      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Choose a Direction</h2>
        <p className="text-xs text-[#9a8d7f] mb-3">Check all that apply to where you want to head next.</p>
        <div className="space-y-2.5">
          {DIRECTIONS.map((dir, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dirChecked[i]}
                onChange={() => toggleDir(i)}
                className="mt-0.5 w-5 h-5 rounded border-[#d4c8b8] text-[#3a5a4a] focus:ring-[#4a7a5a] cursor-pointer"
              />
              <span className={`text-sm ${dirChecked[i] ? "text-[#3a5a4a] font-medium" : "text-[#3d2e26]"}`}>{dir}</span>
            </label>
          ))}
        </div>
        <div className="mt-3">
          <label className={LABEL}>Other direction:</label>
          <input className={INPUT} value={otherDirection} onChange={(e) => setOtherDirection(e.target.value)} placeholder="Add your own..." />
        </div>
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>My Next Step</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">What is one specific step you want to take in the next 1–3 months?</p>
        <textarea className={INPUT + " min-h-[80px]"} value={nextStep} onChange={(e) => setNextStep(e.target.value)} placeholder="Describe your next step..." rows={3} style={{ resize: "vertical" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Why This Matters to Me</h2>
        <textarea className={INPUT + " min-h-[80px]"} value={whyMatters} onChange={(e) => setWhyMatters(e.target.value)} placeholder="Why is this step important? Who does it impact?" rows={3} style={{ resize: "vertical" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Three Actions I Can Take</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">Break your next step into 3 small, realistic actions.</p>
        {actions.map((a, i) => (
          <div key={i} className="mb-4 pb-4 border-b border-[#e8ddd0] last:border-0 last:pb-0 last:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-[#3a5a4a] text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <span className="text-sm font-semibold text-[#3d2e26]">Action {i + 1}</span>
            </div>
            <textarea className={INPUT + " min-h-[60px] mb-2"} value={a.action} onChange={(e) => setAction(i, "action", e.target.value)} placeholder="What will you do?" rows={2} style={{ resize: "vertical" }} />
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#7a6d60] font-semibold">Deadline:</label>
              <input type="date" className={INPUT + " max-w-[200px]"} value={a.deadline} onChange={(e) => setAction(i, "deadline", e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div className={CARD + " activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>Who Can Help</h2>
          <textarea className={INPUT + " min-h-[100px]"} value={whoHelps} onChange={(e) => setWhoHelps(e.target.value)} placeholder="People, programs, services..." rows={4} style={{ resize: "vertical" }} />
        </div>
        <div className={CARD + " activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>What Might Get in the Way</h2>
          <textarea className={INPUT + " min-h-[100px]"} value={barriers} onChange={(e) => setBarriers(e.target.value)} placeholder="Barriers, challenges, concerns..." rows={4} style={{ resize: "vertical" }} />
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <textarea className={INPUT + " min-h-[120px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="How does it feel to have a plan? What's the first thing you'll do this week?" rows={5} style={{ resize: "vertical" }} />
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

export default Activity13;
