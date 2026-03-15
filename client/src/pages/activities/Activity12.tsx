import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

interface SupportContact { name: string; contact: string; when: string; }

const CATEGORIES = [
  { title: "Academic Support", desc: "Tutoring, study help, academic advising, writing centres" },
  { title: "Emotional & Wellness Support", desc: "Counselling, mental health, crisis lines, traditional healing" },
  { title: "Cultural Support", desc: "Elders, Knowledge Keepers, Indigenous Student Centres, ceremony" },
  { title: "Practical & Daily-Life Support", desc: "Housing, food, transportation, childcare, finances" },
  { title: "Family & Community Support", desc: "Family members, friends, mentors, community contacts" },
];

const emptyContact = (): SupportContact => ({ name: "", contact: "", when: "" });

const Activity12 = () => {
  const [contacts, setContacts] = useState<SupportContact[][]>(CATEGORIES.map(() => [emptyContact()]));
  const [reflection, setReflection] = useState("");

  const setField = (ci: number, ri: number, field: keyof SupportContact, val: string) => {
    setContacts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[ci][ri][field] = val;
      return next;
    });
  };

  const addRow = (ci: number) => {
    setContacts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[ci].push(emptyContact());
      return next;
    });
  };

  const handleDownload = () => {
    const sections = CATEGORIES.map((cat, ci) => ({
      label: cat.title,
      value: contacts[ci]
        .filter((c) => c.name.trim())
        .map((c) => `${c.name}${c.contact ? ` | Contact: ${c.contact}` : ""}${c.when ? ` | When: ${c.when}` : ""}`)
        .join("\n") || "(none)",
    }));
    sections.push({ label: "Reflection", value: reflection });
    downloadAsWord("Who I Reach Out To — Support Pathway", sections, "Map the people, programs, and community supports you can turn to.");
  };

  const handleClear = () => {
    setContacts(CATEGORIES.map(() => [emptyContact()]));
    setReflection("");
  };

  return (
    <ActivityLayout
      activityNumber={12}
      title="Who I Reach Out To: Support Pathway"
      subtitle="You don't have to walk this journey alone. This activity helps you map the people, programs, and community supports you can turn to for academic, emotional, cultural, and practical help."
      moduleLabel="Module 4 — Wellness & Resilience"
    >
      <div className={CARD + " mb-5 activity-print-clean"} style={{ background: "#f5f0e8" }}>
        <p className="text-sm text-[#5a4d42]"><strong className="text-[#7a3420]">Tip:</strong> You don't need to fill every category right now. Start with the supports you already know, and add more as you discover them.</p>
      </div>

      {CATEGORIES.map((cat, ci) => (
        <div key={ci} className={CARD + " mb-5 activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>{cat.title}</h2>
          <p className="text-xs text-[#9a8d7f] mb-3 italic">{cat.desc}</p>
          {contacts[ci].map((c, ri) => (
            <div key={ri} className="mb-4 pb-4 border-b border-[#e8ddd0] last:border-0 last:pb-0 last:mb-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
                <div>
                  <label className={LABEL}>Name / Service</label>
                  <input className={INPUT} value={c.name} onChange={(e) => setField(ci, ri, "name", e.target.value)} placeholder="Who or what?" />
                </div>
                <div>
                  <label className={LABEL}>Contact Info</label>
                  <input className={INPUT} value={c.contact} onChange={(e) => setField(ci, ri, "contact", e.target.value)} placeholder="Phone, email, location" />
                </div>
                <div>
                  <label className={LABEL}>When to Reach Out</label>
                  <input className={INPUT} value={c.when} onChange={(e) => setField(ci, ri, "when", e.target.value)} placeholder="When would you contact them?" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addRow(ci)} className="text-xs text-[#7a3420] font-semibold hover:underline mt-1">+ Add another contact</button>
        </div>
      ))}

      <div className={CARD + " mb-6 activity-print-clean"}>
        <h2 className={H2} style={{ marginTop: 0 }}>Reflection</h2>
        <textarea className={INPUT + " min-h-[120px]"} value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Which supports feel most accessible to you? What would make it easier to reach out?" rows={5} style={{ resize: "vertical" }} />
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

export default Activity12;
