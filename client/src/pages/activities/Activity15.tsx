import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const Activity15 = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [letter, setLetter] = useState("");
  const [reminders] = useState([
    "You have already overcome things you once thought were impossible.",
    "Asking for help is strength.",
    "You deserve stability, culture, connection, and belonging.",
    "Your journey is yours — not anyone else's timeline.",
  ]);
  const [customReminders, setCustomReminders] = useState("");
  const [commitment, setCommitment] = useState("");

  const handleDownload = () => {
    downloadAsWord("Letter to Myself — Commitment Card", [
      { label: "Date", value: date },
      { label: "Dear Future Me", value: letter },
      { label: "Reminders", value: reminders.join("\n") + (customReminders ? `\n${customReminders}` : "") },
      { label: "My Commitment", value: commitment },
    ], "A moment to pause, reflect, and speak to your future self with honesty and hope.");
  };

  const handleClear = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setLetter(""); setCustomReminders(""); setCommitment("");
  };

  return (
    <ActivityLayout
      activityNumber={15}
      title="Commitment Card — Letter to Myself"
      subtitle="This is your final activity — a moment to pause, reflect, and speak to your future self with honesty, hope, and strength. Your letter is a reminder that you are not starting from scratch — you are carrying everything you learned, everything you've survived, and everything you dream of."
      moduleLabel="Module 5 — Looking Forward"
    >
      <div className={CARD + " mb-5 activity-print-clean"} style={{ background: "#f5f0e8" }}>
        <p className="text-sm text-[#5a4d42]"><strong className="text-[#7a3420]">Note:</strong> This letter is for you only — no one else needs to read it. Be honest, kind, and realistic.</p>
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <div className="mb-4">
          <label className={LABEL}>Date</label>
          <input type="date" className={INPUT + " max-w-[200px]"} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <h2 className={H2} style={{ marginTop: 0 }}>Dear Future Me,</h2>
        <textarea
          className="w-full min-h-[300px] p-4 bg-white border border-[#d4c8b8] rounded-lg text-[#3d2e26] text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#C2703E]/40 focus:border-[#C2703E] transition"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          placeholder="Write your letter here... What do you want your future self to know? What are you proud of? What are you working toward?"
          rows={12}
          style={{ resize: "vertical", fontFamily: "'Georgia', serif", fontSize: "1rem", lineHeight: "1.8" }}
        />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>A Few Things I Want You to Remember</h2>
        <div className="space-y-3 mb-4">
          {reminders.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#7a3420] mt-0.5 text-lg">•</span>
              <p className="text-sm text-[#3d2e26] italic">{r}</p>
            </div>
          ))}
        </div>
        <div>
          <label className={LABEL}>More reminders to myself:</label>
          <textarea className={INPUT + " min-h-[100px]"} value={customReminders} onChange={(e) => setCustomReminders(e.target.value)} placeholder="Add your own reminders..." rows={4} style={{ resize: "vertical" }} />
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>My Commitment</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">What do you commit to? A promise to yourself, a value you want to live by, or a goal you're working toward.</p>
        <textarea className={INPUT + " min-h-[100px]"} value={commitment} onChange={(e) => setCommitment(e.target.value)} placeholder="I commit to..." rows={4} style={{ resize: "vertical" }} />
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

export default Activity15;
