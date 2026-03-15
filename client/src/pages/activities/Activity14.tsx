import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const SOLUTIONS = [
  "Asking for help early",
  "Getting help with technology",
  "Talking to an education counsellor",
  "Accessing housing or childcare programs",
  "Meeting with a financial advisor / funding officer",
  "Connecting with an Elder or cultural support",
  "Joining a peer support group",
  "Reaching out to family or community",
  "Using campus mental health services",
  "Applying for emergency funding",
];

const Activity14 = () => {
  const [barrier1, setBarrier1] = useState("");
  const [barrier2, setBarrier2] = useState("");
  const [howShows, setHowShows] = useState("");
  const [strengths, setStrengths] = useState("");
  const [checked, setChecked] = useState<boolean[]>(SOLUTIONS.map(() => false));
  const [otherSolution, setOtherSolution] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [whoHelps, setWhoHelps] = useState("");
  const [reflection, setReflection] = useState("");

  const toggle = (i: number) => setChecked((p) => { const n = [...p]; n[i] = !n[i]; return n; });

  const handleDownload = () => {
    const selectedSolutions = SOLUTIONS.filter((_, i) => checked[i]);
    downloadAsWord("Barriers & Solutions Builder", [
      { label: "Barrier 1", value: barrier1 },
      { label: "Barrier 2 (optional)", value: barrier2 },
      { label: "How This Barrier Shows Up in My Life", value: howShows },
      { label: "Strengths I Already Have", value: strengths },
      { label: "Solutions & Supports Selected", value: selectedSolutions.join(", ") + (otherSolution ? `\nOther: ${otherSolution}` : "") },
      { label: "My Next Step", value: nextStep },
      { label: "Who Can Help", value: whoHelps },
      { label: "Reflection", value: reflection },
    ], "Name your barriers, understand where they come from, and build real solutions.");
  };

  const handleClear = () => {
    setBarrier1(""); setBarrier2(""); setHowShows(""); setStrengths("");
    setChecked(SOLUTIONS.map(() => false)); setOtherSolution("");
    setNextStep(""); setWhoHelps(""); setReflection("");
  };

  return (
    <ActivityLayout
      activityNumber={14}
      title="Barriers & Solutions Builder"
      subtitle="Everyone faces barriers — transportation, stress, money, confidence, housing, family responsibilities, or even not knowing where to start. This activity helps you name your barriers, understand where they come from, and build real, practical solutions."
      moduleLabel="Module 5 — Looking Forward"
    >
      <div className={CARD + " mb-5 activity-print-clean"} style={{ background: "#f5f0e8" }}>
        <p className="text-sm text-[#5a4d42]"><strong className="text-[#7a3420]">Remember:</strong> You are not meant to solve everything alone — this activity helps you identify supports too.</p>
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>What Barrier Am I Facing?</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">Examples: funding, transportation, fear of leaving home, mental health, time, housing, childcare</p>
        <div className="space-y-3">
          <div>
            <label className={LABEL}>Barrier 1</label>
            <textarea className={INPUT + " min-h-[70px]"} value={barrier1} onChange={(e) => setBarrier1(e.target.value)} placeholder="Describe your main barrier..." rows={2} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>Barrier 2 (optional)</label>
            <textarea className={INPUT + " min-h-[70px]"} value={barrier2} onChange={(e) => setBarrier2(e.target.value)} placeholder="A second barrier, if applicable..." rows={2} style={{ resize: "vertical" }} />
          </div>
        </div>
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>How This Barrier Shows Up</h2>
        <label className={LABEL}>What does it look like or feel like? How does it affect your plans?</label>
        <textarea className={INPUT + " min-h-[100px]"} value={howShows} onChange={(e) => setHowShows(e.target.value)} placeholder="Describe how this barrier impacts your daily life..." rows={4} style={{ resize: "vertical" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Strengths I Already Have</h2>
        <textarea className={INPUT + " min-h-[100px]"} value={strengths} onChange={(e) => setStrengths(e.target.value)} placeholder="Resilience, planning skills, family support, cultural grounding, determination..." rows={4} style={{ resize: "vertical" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Possible Solutions or Supports</h2>
        <p className="text-xs text-[#9a8d7f] mb-3">Check any that could help — add your own too.</p>
        <div className="space-y-2.5">
          {SOLUTIONS.map((sol, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="mt-0.5 w-5 h-5 rounded border-[#d4c8b8] text-[#3a5a4a] focus:ring-[#4a7a5a] cursor-pointer"
              />
              <span className={`text-sm ${checked[i] ? "text-[#3a5a4a] font-medium" : "text-[#3d2e26]"}`}>{sol}</span>
            </label>
          ))}
        </div>
        <div className="mt-3">
          <label className={LABEL}>Other solutions:</label>
          <input className={INPUT} value={otherSolution} onChange={(e) => setOtherSolution(e.target.value)} placeholder="Add your own..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div className={CARD + " activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>My Next Step</h2>
          <textarea className={INPUT + " min-h-[100px]"} value={nextStep} onChange={(e) => setNextStep(e.target.value)} placeholder="What's one thing you can do this week?" rows={4} style={{ resize: "vertical" }} />
        </div>
        <div className={CARD + " activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>Who Can Help</h2>
          <textarea className={INPUT + " min-h-[100px]"} value={whoHelps} onChange={(e) => setWhoHelps(e.target.value)} placeholder="People, services, programs..." rows={4} style={{ resize: "vertical" }} />
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <textarea className={INPUT + " min-h-[120px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="What did you learn about yourself? What feels more manageable now?" rows={5} style={{ resize: "vertical" }} />
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

export default Activity14;
