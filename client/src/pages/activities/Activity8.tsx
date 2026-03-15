import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

interface Task { title: string; hint: string; fields: { label: string; placeholder: string }[]; }

const TASKS: Task[] = [
  {
    title: "Find the nearest grocery store or food source",
    hint: "Look for affordable options, student discounts, or places you can walk to.",
    fields: [
      { label: "Location", placeholder: "Name and address..." },
      { label: "How I would get there", placeholder: "Walking, bus route, etc..." },
      { label: "Notes", placeholder: "Hours, discounts, tips..." },
    ],
  },
  {
    title: "Identify a safe walking or bus route to school/campus",
    hint: "Include crosswalks, lighting, bus numbers, or timing.",
    fields: [
      { label: "Route or Bus #", placeholder: "Bus number or route name..." },
      { label: "Where it starts and ends", placeholder: "From... to..." },
      { label: "Notes", placeholder: "Timing, frequency, safety notes..." },
    ],
  },
  {
    title: "Locate one free or low-cost student resource",
    hint: "Library, Indigenous Student Centre, tutoring, study space, community centre.",
    fields: [
      { label: "Place", placeholder: "Name of the resource..." },
      { label: "What it offers", placeholder: "Services available..." },
      { label: "Notes", placeholder: "Hours, how to access..." },
    ],
  },
  {
    title: "Find a cultural or community space nearby",
    hint: "Friendship centre, ceremony space, Indigenous gathering place, land-based area.",
    fields: [
      { label: "Place", placeholder: "Name and location..." },
      { label: "What happens there", placeholder: "Activities, events..." },
      { label: "Notes", placeholder: "How to connect..." },
    ],
  },
  {
    title: "Locate the nearest laundromat or laundry facility",
    hint: "Check for campus facilities, nearby laundromats, or shared building laundry.",
    fields: [
      { label: "Location", placeholder: "Name and address..." },
      { label: "Cost & hours", placeholder: "Price per load, hours..." },
      { label: "Notes", placeholder: "Tips, busy times..." },
    ],
  },
];

const Activity8 = () => {
  const [answers, setAnswers] = useState<string[][]>(TASKS.map((t) => t.fields.map(() => "")));
  const [completed, setCompleted] = useState<boolean[]>(TASKS.map(() => false));

  const setAnswer = (ti: number, fi: number, val: string) => {
    setAnswers((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[ti][fi] = val;
      return next;
    });
  };

  const toggleComplete = (ti: number) => {
    setCompleted((prev) => { const n = [...prev]; n[ti] = !n[ti]; return n; });
  };

  const handleDownload = () => {
    const sections = TASKS.map((task, ti) => ({
      label: `Task: ${task.title}`,
      value: task.fields.map((f, fi) => `${f.label}: ${answers[ti][fi] || "(not filled)"}`).join("\n"),
    }));
    downloadAsWord("City Navigation Challenge", sections, "Complete at least three challenges to learn your new environment.");
  };

  const handleClear = () => {
    setAnswers(TASKS.map((t) => t.fields.map(() => "")));
    setCompleted(TASKS.map(() => false));
  };

  const done = completed.filter(Boolean).length;

  return (
    <ActivityLayout
      activityNumber={8}
      title="City Navigation Challenge"
      subtitle="Complete at least three of the challenges below. You can do them in real life, with a mentor, or by researching online/maps. Use the fields to record what you learned."
      moduleLabel="Module 3 — Practical Skills"
    >
      <div className={CARD + " mb-6 activity-print-clean"}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[#3d2e26] font-['DM_Sans']">Challenges Completed</span>
          <span className="text-sm text-[#5a6b3a] font-semibold">{done}/{TASKS.length}</span>
        </div>
        <div className="w-full h-2.5 bg-[#e8ddd0] rounded-full overflow-hidden">
          <div className="h-full bg-[#7a8f52] rounded-full transition-all duration-300" style={{ width: `${(done / TASKS.length) * 100}%` }} />
        </div>
        {done >= 3 && <p className="text-xs text-green-700 font-semibold mt-2">Minimum 3 challenges reached!</p>}
      </div>

      {TASKS.map((task, ti) => (
        <div key={ti} className={`${CARD} mb-5 activity-print-clean ${completed[ti] ? "ring-2 ring-green-400/50" : ""}`}>
          <div className="flex items-start gap-3 mb-3">
            <input
              type="checkbox"
              checked={completed[ti]}
              onChange={() => toggleComplete(ti)}
              className="mt-1 w-5 h-5 rounded border-[#d4c8b8] text-[#5a6b3a] focus:ring-[#7a8f52] cursor-pointer"
            />
            <div>
              <h3 className="text-base font-bold text-[#2C2420] font-['DM_Sans']">{ti + 1}. {task.title}</h3>
              <p className="text-xs text-[#9a8d7f] italic mt-0.5">Hint: {task.hint}</p>
            </div>
          </div>
          <div className="space-y-3 pl-8">
            {task.fields.map((field, fi) => (
              <div key={fi}>
                <label className={LABEL}>{field.label}</label>
                <input className={INPUT} value={answers[ti][fi]} onChange={(e) => setAnswer(ti, fi, e.target.value)} placeholder={field.placeholder} />
              </div>
            ))}
          </div>
        </div>
      ))}

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

export default Activity8;
