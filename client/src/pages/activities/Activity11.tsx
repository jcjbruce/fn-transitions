import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const CALMING_STRATEGIES = [
  "Deep breathing",
  "Going for a walk",
  "Smudging or ceremony",
  "Talking to someone I trust",
  "Listening to music",
  "Journaling or drawing",
  "Physical activity / exercise",
  "Being in nature / on the land",
  "Praying or meditating",
  "Spending time with animals",
  "Cooking or preparing food",
  "Beading, crafting, or creating",
  "Taking a break / resting",
  "Watching something comforting",
];

const Activity11 = () => {
  const [bodySignals, setBodySignals] = useState("");
  const [checked, setChecked] = useState<boolean[]>(CALMING_STRATEGIES.map(() => false));
  const [otherStrategy, setOtherStrategy] = useState("");
  const [strategy1, setStrategy1] = useState("");
  const [strategy2, setStrategy2] = useState("");
  const [strategy3, setStrategy3] = useState("");
  const [emergencyName1, setEmergencyName1] = useState("");
  const [emergencyContact1, setEmergencyContact1] = useState("");
  const [emergencyName2, setEmergencyName2] = useState("");
  const [emergencyContact2, setEmergencyContact2] = useState("");
  const [reflection, setReflection] = useState("");

  const toggle = (i: number) => setChecked((p) => { const n = [...p]; n[i] = !n[i]; return n; });

  const handleDownload = () => {
    const selectedStrategies = CALMING_STRATEGIES.filter((_, i) => checked[i]);
    downloadAsWord("Coping Strategies Planner", [
      { label: "How stress shows up in my body", value: bodySignals },
      { label: "Calming strategies that work for me", value: selectedStrategies.join(", ") + (otherStrategy ? `\nOther: ${otherStrategy}` : "") },
      { label: "My Go-To Strategy 1", value: strategy1 },
      { label: "My Go-To Strategy 2", value: strategy2 },
      { label: "My Go-To Strategy 3", value: strategy3 },
      { label: "Emergency Contact 1", value: `${emergencyName1} — ${emergencyContact1}` },
      { label: "Emergency Contact 2", value: `${emergencyName2} — ${emergencyContact2}` },
      { label: "Reflection", value: reflection },
    ], "Recognize how stress shows up and build a personal coping plan.");
  };

  const handleClear = () => {
    setBodySignals(""); setChecked(CALMING_STRATEGIES.map(() => false)); setOtherStrategy("");
    setStrategy1(""); setStrategy2(""); setStrategy3("");
    setEmergencyName1(""); setEmergencyContact1(""); setEmergencyName2(""); setEmergencyContact2("");
    setReflection("");
  };

  return (
    <ActivityLayout
      activityNumber={11}
      title="Coping Strategies Planner"
      subtitle="Stress is a natural part of life — especially during transitions. This activity helps you recognize how stress shows up in your body, explore what calms you, and build a personal coping plan you can use anytime."
      moduleLabel="Module 4 — Wellness & Resilience"
    >
      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>How Stress Shows Up in My Body</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">Examples: tight shoulders, racing heart, trouble sleeping, headaches, upset stomach, feeling numb, irritability</p>
        <textarea className={INPUT + " min-h-[100px]"} value={bodySignals} onChange={(e) => setBodySignals(e.target.value)} placeholder="What do you notice in your body when you're stressed?" rows={4} style={{ resize: "vertical" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>What Helps Me Feel Calm or Grounded</h2>
        <p className="text-xs text-[#9a8d7f] mb-3">Check all that apply — and add your own.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CALMING_STRATEGIES.map((strat, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="mt-0.5 w-5 h-5 rounded border-[#d4c8b8] text-[#4a5a6b] focus:ring-[#5a7a8f] cursor-pointer"
              />
              <span className={`text-sm ${checked[i] ? "text-[#4a5a6b] font-medium" : "text-[#3d2e26]"}`}>{strat}</span>
            </label>
          ))}
        </div>
        <div className="mt-3">
          <label className={LABEL}>Other strategies:</label>
          <input className={INPUT} value={otherStrategy} onChange={(e) => setOtherStrategy(e.target.value)} placeholder="Add your own..." />
        </div>
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>My Personal Coping Plan</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">Choose your top 3 go-to strategies.</p>
        <div className="space-y-3">
          {[
            { label: "Strategy 1", value: strategy1, set: setStrategy1 },
            { label: "Strategy 2", value: strategy2, set: setStrategy2 },
            { label: "Strategy 3", value: strategy3, set: setStrategy3 },
          ].map((s, i) => (
            <div key={i}>
              <label className={LABEL}>{s.label}</label>
              <input className={INPUT} value={s.value} onChange={(e) => s.set(e.target.value)} placeholder={`My #${i + 1} go-to when I'm stressed...`} />
            </div>
          ))}
        </div>
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Emergency Contacts</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">People or services you can reach out to when things feel overwhelming.</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Contact 1 — Name</label>
              <input className={INPUT} value={emergencyName1} onChange={(e) => setEmergencyName1(e.target.value)} placeholder="Name or service" />
            </div>
            <div>
              <label className={LABEL}>Phone / Email</label>
              <input className={INPUT} value={emergencyContact1} onChange={(e) => setEmergencyContact1(e.target.value)} placeholder="How to reach them" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Contact 2 — Name</label>
              <input className={INPUT} value={emergencyName2} onChange={(e) => setEmergencyName2(e.target.value)} placeholder="Name or service" />
            </div>
            <div>
              <label className={LABEL}>Phone / Email</label>
              <input className={INPUT} value={emergencyContact2} onChange={(e) => setEmergencyContact2(e.target.value)} placeholder="How to reach them" />
            </div>
          </div>
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <textarea className={INPUT + " min-h-[120px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="What did you notice about yourself? What strategy do you want to try first?" rows={5} style={{ resize: "vertical" }} />
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

export default Activity11;
