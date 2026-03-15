# Course Player Redesign — Design Brainstorm

The goal: Replace the LearnDash-style course player with a completely original, fresh design that feels custom-built for this First Nations education transitions project. Must keep all content identical.

---

<response>
<text>

## Idea 1: "Pathway Journey" — Organic Wayfinding Design

**Design Movement**: Organic Modernism meets Indigenous storytelling traditions — flowing shapes, earth tones, and a sense of walking a path through the land.

**Core Principles**:
1. The course is a journey, not a checklist — visual metaphor of walking a path
2. Warm earth tones ground the learner in place and culture
3. Content breathes — generous whitespace, no cramped sidebars
4. Navigation feels like turning pages in a story, not clicking through a database

**Color Philosophy**: 
- Primary: Warm terracotta `#C2703E` — earth, warmth, grounding
- Secondary: Deep forest green `#2D5A3D` — growth, land, resilience
- Accent: Soft gold `#D4A853` — sunlight, knowledge, warmth
- Background: Warm cream `#FAF6F0` — natural paper feel
- Text: Deep charcoal brown `#2C2420` — readable, warm

**Layout Paradigm**: Full-width single-column reading experience. No persistent sidebar. Navigation lives in a top progress ribbon and a slide-out drawer. Content is the hero — wide, centered, with generous margins. Module transitions use full-width color bands.

**Signature Elements**:
1. A horizontal "pathway" progress bar at the top that shows your journey through all 16 lessons as connected dots on a winding path
2. Module color-coded sections — each of the 5 modules has a subtle earth-tone accent that carries through its lessons
3. Slide-out navigation drawer (left) with module groupings that feels like a table of contents in a book

**Interaction Philosophy**: Smooth, unhurried transitions. Pages slide in gently. The progress path animates as you complete lessons. Mark Complete feels like planting a flag on your journey.

**Animation**: Subtle fade-in for content sections as you scroll. The pathway progress bar has a gentle pulse on the current position. Page transitions use a soft horizontal slide (200ms ease-out).

**Typography System**:
- Headings: DM Sans Bold — clean, modern, confident
- Body: Overpass Regular — warm, readable, approachable
- Module labels: DM Sans Medium, small caps, letter-spaced

</text>
<probability>0.07</probability>
</response>

---

<response>
<text>

## Idea 2: "Story Circle" — Radial Navigation with Cultural Resonance

**Design Movement**: Circular/radial design inspired by medicine wheel concepts and talking circles — a non-linear, holistic approach to course navigation.

**Core Principles**:
1. Learning is circular, not linear — modules radiate from a center
2. Every lesson connects back to the whole
3. The design honors the story (Talia's Journey) as the central thread
4. Warmth and invitation over institutional coldness

**Color Philosophy**:
- Primary: Deep cranberry `#8B2252` — strength, heart, connection
- Secondary: Teal blue `#2A7B88` — water, clarity, reflection
- Accent: Warm amber `#E8A838` — light, energy, guidance
- Background: Soft stone `#F5F1EB` — neutral, grounding
- Dark: Rich charcoal `#1E1E2A` — depth for headers

**Layout Paradigm**: The course overview uses a radial/circular module selector. Individual lessons use a clean, magazine-style single-column layout with a floating mini-nav pill at the bottom. No sidebar at all — navigation is contextual and minimal.

**Signature Elements**:
1. Circular module selector on the course overview — 5 modules arranged in a circle with the course title at center
2. Floating bottom navigation pill — shows current position, prev/next, and expands to full lesson list on tap
3. Story thread indicator — a subtle vertical line on the left of story chapters connecting them visually

**Interaction Philosophy**: Tap-to-expand interactions. The bottom nav pill expands upward into a full lesson list. Modules in the circle selector pulse gently when hovered. Everything feels touchable and inviting.

**Animation**: Radial reveal animations for the module selector. Content fades in from bottom on page load. The floating nav pill has a subtle bounce when it appears. Smooth spring physics on expand/collapse.

**Typography System**:
- Headings: DM Sans Bold — strong, clear
- Body: Overpass — warm readability
- Navigation: DM Sans Medium — compact, functional
- Story chapters: Slightly larger body text with increased line-height for immersive reading

</text>
<probability>0.04</probability>
</response>

---

<response>
<text>

## Idea 3: "Open Book" — Editorial / Magazine Layout

**Design Movement**: Modern editorial design — inspired by high-quality educational publications and long-form journalism. Clean, spacious, content-first.

**Core Principles**:
1. Content is king — the design serves the reading experience
2. Clear visual hierarchy guides the eye naturally
3. Modules are chapters in a book, not tabs in an app
4. Progress is visible but never intrusive

**Color Philosophy**:
- Primary: Deep indigo `#2B3A67` — trust, depth, knowledge
- Secondary: Warm rust `#B85C38` — earth, warmth, Indigenous connection
- Accent: Sage green `#6B8F71` — growth, wellness, balance
- Background: Pure white `#FFFFFF` with warm gray sections `#F7F5F2`
- Text: Near-black `#1A1A1A` — maximum readability

**Layout Paradigm**: Two-panel asymmetric layout on desktop — narrow left panel (20%) for a minimal, elegant table of contents; wide right panel (80%) for content. On mobile, the TOC becomes a top dropdown. The content area uses a constrained reading width (680px max) centered in its panel for optimal line length.

**Signature Elements**:
1. Elegant thin-line table of contents on the left — module names as section headers, lessons as indented items, current lesson highlighted with a colored left border and dot
2. Top progress strip — a thin colored bar across the full width showing percentage complete, with module segments color-coded
3. Chapter-style lesson headers — large serif-style heading with a decorative rule underneath

**Interaction Philosophy**: Minimal, purposeful interactions. The TOC highlights smoothly on hover. Mark Complete transforms into a checkmark with a satisfying micro-animation. Page transitions are instant with a subtle content fade.

**Animation**: Content sections fade in on load (150ms stagger). The progress bar fills smoothly. Mark Complete button has a ripple effect. TOC items have a gentle slide highlight on hover.

**Typography System**:
- Lesson titles: DM Sans Bold, large (32-36px)
- Section headings: DM Sans Semibold
- Body: Overpass Regular at 17px with 1.8 line-height — optimized for long-form reading
- TOC: DM Sans Regular, smaller (14px), with medium weight for active item
- Captions/metadata: Overpass Light, small

</text>
<probability>0.06</probability>
</response>

---

## Selected Approach: Idea 1 — "Pathway Journey"

This approach best serves the course's narrative nature (Talia's Journey) and the cultural context. The organic earth tones, journey metaphor, and full-width reading experience create something that feels purposeful and unique — completely distinct from LearnDash's sidebar-heavy database feel. The pathway progress bar is a memorable signature element that reinforces the course's theme of transitions and journeys.
