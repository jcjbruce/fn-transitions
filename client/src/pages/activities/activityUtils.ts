// Shared utilities for all activity pages
// Word document generation via docx library + shared design tokens

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, TabStopPosition, TabStopType } from "docx";
import { saveAs } from "file-saver";

// ─── Word Document Download ───────────────────────────────────────────

interface DocSection {
  label: string;
  value: string;
}

interface DocChecklistSection {
  label: string;
  items: { text: string; checked: boolean }[];
  extras?: string;
}

const COO_RED = "8B2332";
const COO_DARK = "2C2420";

function makeDocHeader(title: string, subtitle?: string): Paragraph[] {
  const paras: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({ text: "CHIEFS OF ONTARIO", bold: true, size: 16, font: "Arial", color: COO_RED }),
        new TextRun({ text: "  •  ", size: 16, font: "Arial", color: "999999" }),
        new TextRun({ text: "FIRST NATIONS EDUCATION TRANSITIONS", bold: true, size: 16, font: "Arial", color: COO_RED }),
      ],
      spacing: { after: 80 },
    }),
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COO_RED } },
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: title, bold: true, size: 36, font: "Georgia", color: COO_DARK })],
      spacing: { after: 80 },
    }),
  ];
  if (subtitle) {
    paras.push(
      new Paragraph({
        children: [new TextRun({ text: subtitle, italics: true, size: 22, font: "Georgia", color: "666666" })],
        spacing: { after: 200 },
      })
    );
  }
  paras.push(
    new Paragraph({
      children: [new TextRun({ text: `Completed: ${new Date().toLocaleDateString("en-CA")}`, size: 18, font: "Arial", color: "999999" })],
      spacing: { after: 300 },
    })
  );
  return paras;
}

export async function downloadAsWord(title: string, sections: DocSection[], subtitle?: string) {
  const children: Paragraph[] = [...makeDocHeader(title, subtitle)];

  for (const section of sections) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: section.label, bold: true, size: 22, font: "Arial", color: COO_RED })],
        spacing: { before: 240, after: 80 },
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" } },
        spacing: { after: 80 },
      })
    );
    if (section.value.trim()) {
      // Split multiline values
      const lines = section.value.split("\n");
      for (const line of lines) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: line, size: 22, font: "Georgia", color: COO_DARK })],
            spacing: { after: 60 },
          })
        );
      }
    } else {
      // Empty field — add blank line for writing space
      children.push(
        new Paragraph({
          children: [new TextRun({ text: "(not completed)", italics: true, size: 20, font: "Georgia", color: "AAAAAA" })],
          spacing: { after: 120 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [{ properties: { page: { margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 } } }, children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title.replace(/\s+/g, "_")}.docx`);
}

export async function downloadChecklistAsWord(title: string, sections: DocChecklistSection[], subtitle?: string) {
  const children: Paragraph[] = [...makeDocHeader(title, subtitle)];

  for (const section of sections) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: section.label, bold: true, size: 22, font: "Arial", color: COO_RED })],
        spacing: { before: 240, after: 80 },
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" } },
        spacing: { after: 80 },
      })
    );
    for (const item of section.items) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: item.checked ? "☑ " : "☐ ", size: 22, font: "Arial", color: item.checked ? COO_RED : "999999" }),
            new TextRun({ text: item.text, size: 22, font: "Georgia", color: COO_DARK }),
          ],
          spacing: { after: 40 },
          indent: { left: 200 },
        })
      );
    }
    if (section.extras?.trim()) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Notes: ", bold: true, size: 20, font: "Arial", color: "666666" }),
            new TextRun({ text: section.extras, size: 20, font: "Georgia", color: COO_DARK }),
          ],
          spacing: { before: 80, after: 80 },
          indent: { left: 200 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [{ properties: { page: { margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 } } }, children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title.replace(/\s+/g, "_")}.docx`);
}

// ─── Legacy text download (keep for backwards compat) ─────────────────

export function downloadAsText(filename: string, sections: { label: string; value: string }[]) {
  const lines = sections
    .filter((s) => s.value.trim())
    .map((s) => `${s.label}\n${"─".repeat(40)}\n${s.value}\n`)
    .join("\n");
  const header = `${filename}\nCompleted: ${new Date().toLocaleDateString("en-CA")}\n${"═".repeat(50)}\n\n`;
  const blob = new Blob([header + lines], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename.replace(/\s+/g, "_")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadChecklist(filename: string, sections: { label: string; items: { text: string; checked: boolean }[]; extras?: string }[]) {
  const lines = sections
    .map((s) => {
      const items = s.items.map((i) => `  ${i.checked ? "[✓]" : "[ ]"} ${i.text}`).join("\n");
      const extra = s.extras?.trim() ? `  Additional: ${s.extras}` : "";
      return `${s.label}\n${"─".repeat(40)}\n${items}${extra ? "\n" + extra : ""}`;
    })
    .join("\n\n");
  const header = `${filename}\nCompleted: ${new Date().toLocaleDateString("en-CA")}\n${"═".repeat(50)}\n\n`;
  const blob = new Blob([header + lines], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename.replace(/\s+/g, "_")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Common Tailwind class sets (enhanced design) ─────────────────────

export const CARD = "bg-white rounded-xl shadow-sm border border-[#e8ddd0] p-5 sm:p-6";
export const INPUT = "w-full rounded-lg border border-[#d4c8b8] bg-[#fdfcf9] px-3 py-2 text-[#2C2420] placeholder:text-[#b8a898] focus:border-[#8B2332] focus:ring-1 focus:ring-[#8B2332]/30 outline-none transition text-sm";
export const TEXTAREA = "w-full rounded-lg border border-[#d4c8b8] bg-[#fdfcf9] px-3 py-2.5 text-[#2C2420] placeholder:text-[#b8a898] focus:border-[#8B2332] focus:ring-1 focus:ring-[#8B2332]/30 outline-none transition text-sm resize-none leading-relaxed";
export const LABEL = "block text-sm font-semibold text-[#3d2e26] mb-1.5 font-['DM_Sans']";
export const H2 = "text-lg sm:text-xl font-bold text-[#2C2420] mt-6 mb-3 font-['DM_Sans']";
export const H3 = "text-base font-bold text-[#3d2e26] mt-4 mb-2 font-['DM_Sans']";
export const BTN_PRIMARY = "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B2332] text-white font-semibold text-sm hover:bg-[#6d1b27] transition shadow-sm";
export const BTN_SECONDARY = "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#d4c8b8] text-[#3d2e26] font-semibold text-sm hover:bg-[#f0ebe3] transition";
export const BTN_PRINT = "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#d4c8b8] text-[#3d2e26] font-semibold text-sm hover:bg-[#f0ebe3] transition";
