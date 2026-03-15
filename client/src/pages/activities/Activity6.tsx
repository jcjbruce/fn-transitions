import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const Activity6 = () => {
  const [seen, setSeen] = useState("");
  const [unsure, setUnsure] = useState("");
  const [shifted, setShifted] = useState("");
  const [grounded, setGrounded] = useState("");
  const [freeWrite, setFreeWrite] = useState("");

  const handleDownload = () => {
    downloadAsWord("Journal — Where Do I Feel Seen", [
      { label: "A time I felt noticed, welcomed, or valued", value: seen },
      { label: "A time I felt unsure, invisible, or out of place", value: unsure },
      { label: "What helped shift my comfort", value: shifted },
      { label: "What could help me feel more grounded", value: grounded },
      { label: "Free writing / additional thoughts", value: freeWrite },
    ], "Reflect on moments where your identity, voice, or presence was honoured.");
  };

  const handleClear = () => {
    setSeen(""); setUnsure(""); setShifted(""); setGrounded(""); setFreeWrite("");
  };

  return (
    <ActivityLayout
      activityNumber={6}
      title='Journal: "Where Do I Feel Seen?"'
      subtitle="Feeling seen — truly noticed, valued, and acknowledged — is one of the most important parts of belonging. This journal invites you to reflect on moments where your identity, voice, or presence was honoured, and moments where it wasn't."
      moduleLabel="Module 2 — Identity & Belonging"
    >
      <div className={CARD + " mb-5 activity-print-clean"} style={{ background: "#f5f0e8" }}>
        <p className="text-sm text-[#5a4d42]"><strong className="text-[#7a3420]">Note:</strong> There are no right or wrong answers. Write as much or as little as feels comfortable. This journal is for you.</p>
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Think of a time you felt noticed, welcomed, or valued.</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">Where were you? Who was there? What happened? How did it feel?</p>
        <textarea className={INPUT + " min-h-[140px]"} value={seen} onChange={(e) => setSeen(e.target.value)} placeholder="Write about a moment when you felt truly seen..." rows={6} style={{ resize: "vertical", fontFamily: "'Georgia', serif", lineHeight: "1.8" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Think of a time you felt unsure, invisible, or out of place.</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">What was happening? What made it hard? How did you respond?</p>
        <textarea className={INPUT + " min-h-[140px]"} value={unsure} onChange={(e) => setUnsure(e.target.value)} placeholder="Write about a moment when you felt unseen or uncomfortable..." rows={6} style={{ resize: "vertical", fontFamily: "'Georgia', serif", lineHeight: "1.8" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>What helped shift your comfort?</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">A person, a space, a conversation, a cultural connection, something small that made a difference...</p>
        <textarea className={INPUT + " min-h-[120px]"} value={shifted} onChange={(e) => setShifted(e.target.value)} placeholder="What helped you feel more at ease?" rows={5} style={{ resize: "vertical", fontFamily: "'Georgia', serif", lineHeight: "1.8" }} />
      </div>

      <div className={CARD + " mb-5 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>What could help you feel more grounded going forward?</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">Think about what you need from people, spaces, or yourself to feel safe and seen in new environments.</p>
        <textarea className={INPUT + " min-h-[120px]"} value={grounded} onChange={(e) => setGrounded(e.target.value)} placeholder="What would help you feel more grounded?" rows={5} style={{ resize: "vertical", fontFamily: "'Georgia', serif", lineHeight: "1.8" }} />
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Free Writing Space</h2>
        <p className="text-xs text-[#9a8d7f] mb-3 italic">Use this space for anything else you want to express.</p>
        <textarea className={INPUT + " min-h-[160px]"} value={freeWrite} onChange={(e) => setFreeWrite(e.target.value)} placeholder="Write freely..." rows={7} style={{ resize: "vertical", fontFamily: "'Georgia', serif", lineHeight: "1.8" }} />
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

export default Activity6;
