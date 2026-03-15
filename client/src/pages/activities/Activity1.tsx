import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

const Activity1 = () => {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [friends, setFriends] = useState("");
  const [community, setCommunity] = useState("");
  const [reflection, setReflection] = useState("");

  const handleDownload = () => {
    downloadAsWord("Circle of Support Map", [
      { label: "Your Name", value: name },
      { label: "Family (people you rely on)", value: family },
      { label: "Friends (people who support you)", value: friends },
      { label: "Community (teachers, elders, mentors, etc.)", value: community },
      { label: "Reflection", value: reflection },
    ], "Identify the people, programs, and supports that help you stay steady.");
  };

  const handleClear = () => {
    setName(""); setFamily(""); setFriends(""); setCommunity(""); setReflection("");
  };

  return (
    <ActivityLayout
      activityNumber={1}
      title="Circle of Support Map"
      subtitle="Every journey is easier when you know who walks beside you. This activity helps you identify the people, programs, and supports that help you stay steady — both at home and while you prepare for what comes next."
      moduleLabel="Module 1 — Before the Journey"
    >
      {/* Visual Circle Map */}
      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Your Support Circles</h2>
        <p className="text-sm text-[#7a6d60] mb-4">Write names in each circle — the people, programs, and supports in your life.</p>

        <div className="relative w-full max-w-md mx-auto aspect-square mb-6">
          {/* Community ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C2703E]/30 bg-[#C2703E]/5 flex items-start justify-center pt-3">
            <span className="text-xs font-semibold text-[#C2703E] uppercase tracking-wider">Community</span>
          </div>
          {/* Friends ring */}
          <div className="absolute inset-[18%] rounded-full border-2 border-dashed border-[#8B2332]/30 bg-[#8B2332]/5 flex items-start justify-center pt-3">
            <span className="text-xs font-semibold text-[#8B2332] uppercase tracking-wider">Friends</span>
          </div>
          {/* Family ring */}
          <div className="absolute inset-[36%] rounded-full border-2 border-dashed border-[#2C2420]/20 bg-[#2C2420]/5 flex items-start justify-center pt-2">
            <span className="text-[10px] font-semibold text-[#2C2420] uppercase tracking-wider">Family</span>
          </div>
          {/* You center */}
          <div className="absolute inset-[46%] rounded-full bg-[#8B2332] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xs sm:text-sm truncate px-1">{name || "You"}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={LABEL}>Your Name</label>
            <input className={INPUT} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>
          <div>
            <label className={LABEL}>Family — people you rely on</label>
            <textarea className={INPUT + " min-h-[80px]"} value={family} onChange={(e) => setFamily(e.target.value)} placeholder="Family members, relatives..." rows={3} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>Friends — people who support you</label>
            <textarea className={INPUT + " min-h-[80px]"} value={friends} onChange={(e) => setFriends(e.target.value)} placeholder="Friends who support you..." rows={3} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className={LABEL}>Community — teachers, elders, mentors, coaches, youth workers, program staff, cultural groups</label>
            <textarea className={INPUT + " min-h-[80px]"} value={community} onChange={(e) => setCommunity(e.target.value)} placeholder="Community supports..." rows={3} style={{ resize: "vertical" }} />
          </div>
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <textarea className={INPUT + " min-h-[120px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="What do you notice about your circle of support? Who might you reach out to more?" rows={5} style={{ resize: "vertical" }} />
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

export default Activity1;
