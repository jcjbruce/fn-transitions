import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

interface Zone { name: string; comfort: string; notes: string; }

const ZONES_INIT: Zone[] = [
  { name: "Cafeteria / Food Spaces / Eating Area", comfort: "", notes: "" },
  { name: "Indigenous Student Centre / Cultural Space", comfort: "", notes: "" },
  { name: "Classrooms / Meeting Rooms / Learning Spaces", comfort: "", notes: "" },
  { name: "Library / Quiet Space / Study Area", comfort: "", notes: "" },
  { name: "Outdoor or Land-Based Spaces", comfort: "", notes: "" },
];

const COMFORT_OPTIONS = ["Comfortable", "Curious", "Unsure"];
const COLORS: Record<string, string> = {
  Comfortable: "bg-green-100 border-green-400 text-green-800",
  Curious: "bg-amber-100 border-amber-400 text-amber-800",
  Unsure: "bg-red-100 border-red-400 text-red-800",
};

const Activity5 = () => {
  const [zones, setZones] = useState<Zone[]>(JSON.parse(JSON.stringify(ZONES_INIT)));
  const [otherName, setOtherName] = useState("");
  const [otherComfort, setOtherComfort] = useState("");
  const [otherNotes, setOtherNotes] = useState("");
  const [reflection, setReflection] = useState("");

  const setZone = (i: number, field: keyof Zone, val: string) => {
    setZones((prev) => { const n = JSON.parse(JSON.stringify(prev)); n[i][field] = val; return n; });
  };

  const handleDownload = () => {
    const sections = zones.map((z) => ({
      label: z.name,
      value: `Comfort: ${z.comfort || "Not selected"}\nNotes: ${z.notes || "(none)"}`,
    }));
    if (otherName.trim()) {
      sections.push({ label: `Other: ${otherName}`, value: `Comfort: ${otherComfort || "Not selected"}\nNotes: ${otherNotes || "(none)"}` });
    }
    sections.push({ label: "Reflection", value: reflection });
    downloadAsWord("Belonging Map", sections, "Explore where you feel comfortable, curious, or unsure in a new environment.");
  };

  const handleClear = () => {
    setZones(JSON.parse(JSON.stringify(ZONES_INIT)));
    setOtherName(""); setOtherComfort(""); setOtherNotes(""); setReflection("");
  };

  return (
    <ActivityLayout
      activityNumber={5}
      title="Belonging Map"
      subtitle="Belonging isn't automatic. It grows through people, places, and experiences. This activity helps you explore where you feel comfortable, curious, or unsure in a new environment."
      moduleLabel="Module 2 — Identity & Belonging"
    >
      <div className="space-y-4 mb-6">
        {zones.map((zone, i) => (
          <div key={i} className={CARD + " activity-print-clean"}>
            <h3 className="text-base font-bold text-[#2C2420] mb-3 font-['DM_Sans']">{zone.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {COMFORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setZone(i, "comfort", zone.comfort === opt ? "" : opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${zone.comfort === opt ? COLORS[opt] : "bg-white border-[#d4c8b8] text-[#7a6d60] hover:bg-[#f5f0e8]"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <input className={INPUT} value={zone.notes} onChange={(e) => setZone(i, "notes", e.target.value)} placeholder="Notes about this space..." />
          </div>
        ))}

        <div className={CARD + " activity-print-clean"}>
          <h3 className="text-base font-bold text-[#2C2420] mb-3 font-['DM_Sans']">Other Places <span className="text-sm font-normal text-[#9a8d7f]">(add your own)</span></h3>
          <input className={INPUT + " mb-3"} value={otherName} onChange={(e) => setOtherName(e.target.value)} placeholder="Name this space..." />
          <div className="flex flex-wrap gap-2 mb-3">
            {COMFORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setOtherComfort(otherComfort === opt ? "" : opt)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${otherComfort === opt ? COLORS[opt] : "bg-white border-[#d4c8b8] text-[#7a6d60] hover:bg-[#f5f0e8]"}`}
              >
                {opt}
              </button>
            ))}
          </div>
          <input className={INPUT} value={otherNotes} onChange={(e) => setOtherNotes(e.target.value)} placeholder="Notes..." />
        </div>
      </div>

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <label className={LABEL}>Where do you feel most welcome? Where might you want to explore more?</label>
        <textarea className={INPUT + " min-h-[120px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Reflect on your belonging..." rows={5} style={{ resize: "vertical" }} />
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

export default Activity5;
