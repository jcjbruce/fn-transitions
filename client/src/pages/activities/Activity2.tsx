import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const Activity2 = () => {
  const [excited, setExcited] = useState("");
  const [nervous, setNervous] = useState("");
  const [willMiss, setWillMiss] = useState("");
  const [values, setValues] = useState("");
  const [message, setMessage] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const handleDownload = () => {
    downloadAsWord("Preparing to Leave Reflection", [
      { label: "What I'm excited about", value: excited },
      { label: "What I'm nervous about", value: nervous },
      { label: "What I will miss most", value: willMiss },
      { label: "Values I want to bring with me", value: values },
      { label: "A message to myself when things feel overwhelming", value: message },
      { label: "Responsibilities I'm balancing", value: responsibilities },
    ], "Leaving home brings up a lot of feelings. Name what you're feeling and what you want to carry forward.");
  };

  const handleClear = () => {
    setExcited(""); setNervous(""); setWillMiss(""); setValues(""); setMessage(""); setResponsibilities("");
  };

  const TA = INPUT + " min-h-[100px]";

  return (
    <ActivityLayout
      activityNumber={2}
      title="Preparing to Leave Reflection"
      subtitle="Leaving home — even temporarily — brings up a lot of feelings. This journal activity gives you space to name what you're feeling, what matters to you, and what you want to carry forward."
      moduleLabel="Module 1 — Before the Journey"
    >
      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Journal Prompts</h2>
        <div className="space-y-5">
          <div>
            <label className={LABEL}>What I'm excited about:</label>
            <textarea className={TA} value={excited} onChange={(e) => setExcited(e.target.value)} placeholder="Write about what excites you..." rows={4} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>What I'm nervous about:</label>
            <textarea className={TA} value={nervous} onChange={(e) => setNervous(e.target.value)} placeholder="Write about what makes you nervous..." rows={4} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>What I will miss most:</label>
            <textarea className={TA} value={willMiss} onChange={(e) => setWillMiss(e.target.value)} placeholder="What will you miss from home..." rows={4} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>Values I want to bring with me:</label>
            <textarea className={TA} value={values} onChange={(e) => setValues(e.target.value)} placeholder="What values, teachings, or ways of being do you want to carry..." rows={4} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>A message to myself when things feel overwhelming:</label>
            <p className="text-xs text-[#9a8d7f] mb-2 italic">Example: "Remember how far you've come."</p>
            <textarea className={TA} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message to your future self..." rows={4} style={{ resize: "vertical" }} />
          </div>
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Extended Reflection <span className="text-sm font-normal text-[#9a8d7f]">(optional — for mature learners or returning students)</span></h2>
        <div>
          <label className={LABEL}>What responsibilities or commitments am I balancing as I leave home?</label>
          <textarea className={TA} value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} placeholder="Describe any responsibilities you're managing..." rows={4} style={{ resize: "vertical" }} />
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

export default Activity2;
