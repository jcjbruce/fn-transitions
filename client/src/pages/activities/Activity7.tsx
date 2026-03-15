import React, { useState } from "react";
import { downloadAsWord, CARD, INPUT, LABEL, H2, BTN_PRIMARY, BTN_SECONDARY, BTN_PRINT } from "./activityUtils";
import ActivityLayout from "./ActivityLayout";

interface BudgetItem { name: string; budgeted: string; actual: string; }
interface BudgetSection { title: string; items: BudgetItem[]; }

const INITIAL_SECTIONS: BudgetSection[] = [
  {
    title: "Income & Funding",
    items: [
      { name: "Band funding / Sponsorship", budgeted: "", actual: "" },
      { name: "Scholarships / Bursaries", budgeted: "", actual: "" },
      { name: "Part-time job", budgeted: "", actual: "" },
      { name: "Family support", budgeted: "", actual: "" },
      { name: "Government benefits", budgeted: "", actual: "" },
      { name: "Other income", budgeted: "", actual: "" },
    ],
  },
  {
    title: "Housing & Living",
    items: [
      { name: "Rent / Residence", budgeted: "", actual: "" },
      { name: "Utilities", budgeted: "", actual: "" },
      { name: "Internet", budgeted: "", actual: "" },
      { name: "Household supplies", budgeted: "", actual: "" },
    ],
  },
  {
    title: "Food & Daily Needs",
    items: [
      { name: "Groceries", budgeted: "", actual: "" },
      { name: "Dining out / campus food", budgeted: "", actual: "" },
      { name: "Personal care", budgeted: "", actual: "" },
      { name: "Clothing", budgeted: "", actual: "" },
    ],
  },
  {
    title: "Transportation",
    items: [
      { name: "Bus pass / transit", budgeted: "", actual: "" },
      { name: "Gas / parking", budgeted: "", actual: "" },
      { name: "Travel home", budgeted: "", actual: "" },
    ],
  },
  {
    title: "School & Supplies",
    items: [
      { name: "Textbooks / materials", budgeted: "", actual: "" },
      { name: "Technology / software", budgeted: "", actual: "" },
      { name: "Printing / supplies", budgeted: "", actual: "" },
    ],
  },
  {
    title: "Personal & Other",
    items: [
      { name: "Phone plan", budgeted: "", actual: "" },
      { name: "Entertainment / social", budgeted: "", actual: "" },
      { name: "Savings", budgeted: "", actual: "" },
      { name: "Other", budgeted: "", actual: "" },
    ],
  },
];

const Activity7 = () => {
  const [sections, setSections] = useState<BudgetSection[]>(JSON.parse(JSON.stringify(INITIAL_SECTIONS)));

  const setItem = (si: number, ii: number, field: "budgeted" | "actual", val: string) => {
    setSections((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[si].items[ii][field] = val;
      return next;
    });
  };

  const num = (v: string) => parseFloat(v) || 0;

  const sectionTotal = (si: number, field: "budgeted" | "actual") =>
    sections[si].items.reduce((a, item) => a + num(item[field]), 0);

  const totalIncome = (field: "budgeted" | "actual") => sectionTotal(0, field);
  const totalExpenses = (field: "budgeted" | "actual") =>
    sections.slice(1).reduce((a, _, i) => a + sectionTotal(i + 1, field), 0);

  const handleDownload = () => {
    const secs = sections.map((s) => ({
      label: s.title,
      value: s.items.map((i) => `${i.name}: Budgeted $${i.budgeted || "0"} | Actual $${i.actual || "0"}`).join("\n"),
    }));
    secs.push({
      label: "Summary",
      value: `Total Income: Budgeted $${totalIncome("budgeted").toFixed(2)} | Actual $${totalIncome("actual").toFixed(2)}\nTotal Expenses: Budgeted $${totalExpenses("budgeted").toFixed(2)} | Actual $${totalExpenses("actual").toFixed(2)}\nBalance: Budgeted $${(totalIncome("budgeted") - totalExpenses("budgeted")).toFixed(2)} | Actual $${(totalIncome("actual") - totalExpenses("actual")).toFixed(2)}`,
    });
    downloadAsWord("Monthly Student Budget", secs, "Plan and compare your budgeted amount with your actual spending.");
  };

  const handleClear = () => setSections(JSON.parse(JSON.stringify(INITIAL_SECTIONS)));

  const fmt = (n: number) => n.toFixed(2);

  return (
    <ActivityLayout
      activityNumber={7}
      title="Monthly Student Budget"
      subtitle="This tracker helps you plan and compare your budgeted amount with your actual spending. Fill in both columns as the month goes on."
      moduleLabel="Module 3 — Practical Skills"
    >
      {/* Summary card */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className={CARD + " text-center activity-print-clean"}>
          <p className="text-xs text-[#7a6d60] font-semibold uppercase tracking-wider mb-1">Income</p>
          <p className="text-xl font-bold text-green-700">${fmt(totalIncome("actual") || totalIncome("budgeted"))}</p>
        </div>
        <div className={CARD + " text-center activity-print-clean"}>
          <p className="text-xs text-[#7a6d60] font-semibold uppercase tracking-wider mb-1">Expenses</p>
          <p className="text-xl font-bold text-[#8B2332]">${fmt(totalExpenses("actual") || totalExpenses("budgeted"))}</p>
        </div>
        <div className={CARD + " text-center activity-print-clean"}>
          <p className="text-xs text-[#7a6d60] font-semibold uppercase tracking-wider mb-1">Balance</p>
          <p className={`text-xl font-bold ${(totalIncome("actual") - totalExpenses("actual")) >= 0 ? "text-green-700" : "text-red-600"}`}>
            ${fmt((totalIncome("actual") || totalIncome("budgeted")) - (totalExpenses("actual") || totalExpenses("budgeted")))}
          </p>
        </div>
      </div>

      {sections.map((sec, si) => (
        <div key={si} className={CARD + " mb-5 activity-print-clean"}>
          <h2 className={H2} style={{ marginTop: 0 }}>{sec.title}</h2>
          <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] gap-2 items-center mb-2">
            <span className="text-xs font-semibold text-[#7a6d60]">Item</span>
            <span className="text-xs font-semibold text-[#7a6d60] text-center">Budgeted</span>
            <span className="text-xs font-semibold text-[#7a6d60] text-center">Actual</span>
          </div>
          {sec.items.map((item, ii) => (
            <div key={ii} className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] gap-2 items-center mb-2">
              <span className="text-sm text-[#3d2e26]">{item.name}</span>
              <input className={INPUT + " text-center text-sm"} value={item.budgeted} onChange={(e) => setItem(si, ii, "budgeted", e.target.value)} placeholder="$0" />
              <input className={INPUT + " text-center text-sm"} value={item.actual} onChange={(e) => setItem(si, ii, "actual", e.target.value)} placeholder="$0" />
            </div>
          ))}
          <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] gap-2 items-center mt-3 pt-3 border-t border-[#e8ddd0]">
            <span className="text-sm font-bold text-[#2C2420]">Total</span>
            <span className="text-sm font-bold text-center text-[#2C2420]">${fmt(sectionTotal(si, "budgeted"))}</span>
            <span className="text-sm font-bold text-center text-[#2C2420]">${fmt(sectionTotal(si, "actual"))}</span>
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

export default Activity7;
