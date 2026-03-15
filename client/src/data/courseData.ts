// FNT Course Data - Supporting First Nations Learner Transitions
// LearnDash-style course structure

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  type: 'intro' | 'overview' | 'chapter' | 'activities';
  moduleId: string | null;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseData {
  title: string;
  slug: string;
  intro: Lesson;
  modules: Module[];
}

export const COURSE: CourseData = {
  title: 'Supporting First Nations Learner Transitions',
  slug: 'transitions',
  intro: {
    id: 'before-you-begin',
    slug: 'before-you-begin-context-for-the-path-forward',
    title: 'Before You Begin: Context for the Path Forward',
    type: 'intro',
    moduleId: null,
  },
  modules: [
    {
      id: 'module-1',
      title: 'MODULE 1 — BEFORE THE JOURNEY',
      lessons: [
        { id: 'lesson-1-1', slug: 'lesson-1-1-module-overview', title: 'Lesson 1.1 — Module Overview', type: 'overview', moduleId: 'module-1' },
        { id: 'lesson-1-2', slug: 'lesson-1-2-preface-chapter-1-the-road-out', title: 'Lesson 1.2 — Preface + Chapter 1: The Road Out', type: 'chapter', moduleId: 'module-1' },
        { id: 'lesson-1-3', slug: 'lesson-1-3-activities-tools-readiness-and-supports', title: 'Lesson 1.3 — Activities & Tools: Readiness and Supports', type: 'activities', moduleId: 'module-1' },
      ],
    },
    {
      id: 'module-2',
      title: 'MODULE 2 — ARRIVING & EXPLORING',
      lessons: [
        { id: 'lesson-2-1', slug: 'lesson-2-1-module-overview', title: 'Lesson 2.1 — Module Overview', type: 'overview', moduleId: 'module-2' },
        { id: 'lesson-2-2', slug: 'lesson-2-2-chapter-2-the-first-day', title: 'Lesson 2.2 — Chapter 2: The First Day', type: 'chapter', moduleId: 'module-2' },
        { id: 'lesson-2-3', slug: 'lesson-2-3-activities-tools-belonging-and-identity', title: 'Lesson 2.3 — Activities & Tools: Belonging and Identity', type: 'activities', moduleId: 'module-2' },
      ],
    },
    {
      id: 'module-3',
      title: 'MODULE 3 — LIFE SKILLS IN MOTION',
      lessons: [
        { id: 'lesson-3-1', slug: 'lesson-3-1-module-overview', title: 'Lesson 3.1 — Module Overview', type: 'overview', moduleId: 'module-3' },
        { id: 'lesson-3-2', slug: 'lesson-3-2-chapter-3-the-middle-space-2', title: 'Lesson 3.2 — Chapter 3: Finding Steady Ground', type: 'chapter', moduleId: 'module-3' },
        { id: 'lesson-3-3', slug: 'lesson-3-3-activities-tools-life-skills-and-independence', title: 'Lesson 3.3 — Activities & Tools: Life Skills and Independence', type: 'activities', moduleId: 'module-3' },
      ],
    },
    {
      id: 'module-4',
      title: 'MODULE 4 — WELLNESS, BALANCE & REAL TALK',
      lessons: [
        { id: 'lesson-4-1', slug: 'lesson-4-1-module-overview', title: 'Lesson 4.1 — Module Overview', type: 'overview', moduleId: 'module-4' },
        { id: 'lesson-4-2', slug: 'lesson-4-2-chapter-4-real-talk', title: 'Lesson 4.2 — Chapter 4: Real Talk', type: 'chapter', moduleId: 'module-4' },
        { id: 'lesson-4-3', slug: 'lesson-4-3-activities-tools-wellness-coping-support', title: 'Lesson 4.3 — Activities & Tools: Wellness, Coping & Support', type: 'activities', moduleId: 'module-4' },
      ],
    },
    {
      id: 'module-5',
      title: 'MODULE 5 — MOVING FORWARD WITH PURPOSE',
      lessons: [
        { id: 'lesson-5-1', slug: 'lesson-5-1-module-overview', title: 'Lesson 5.1 — Module Overview', type: 'overview', moduleId: 'module-5' },
        { id: 'lesson-5-2', slug: 'lesson-5-2-chapter-5-the-way-back', title: 'Lesson 5.2 — Chapter 5: The Way Back', type: 'chapter', moduleId: 'module-5' },
        { id: 'lesson-5-3', slug: 'lesson-5-3-activities-tools-planning-your-pathway', title: 'Lesson 5.3 — Activities & Tools: Planning Your Pathway', type: 'activities', moduleId: 'module-5' },
      ],
    },
    {
      id: 'module-6',
      title: 'MODULE 6 — EDUCATOR & LEARNER RESOURCES',
      lessons: [
        { id: 'lesson-6-1', slug: 'lesson-6-1-educator-accountability', title: 'Lesson 6.1 — Educator Accountability', type: 'overview', moduleId: 'module-6' },
        { id: 'lesson-6-2', slug: 'lesson-6-2-community-engagement-strategies', title: 'Lesson 6.2 — First Nations Community Engagement Strategies', type: 'overview', moduleId: 'module-6' },
        { id: 'lesson-6-3', slug: 'lesson-6-3-disabilities-and-accommodations', title: 'Lesson 6.3 — Disabilities & Accommodations', type: 'overview', moduleId: 'module-6' },
        { id: 'lesson-6-4', slug: 'lesson-6-4-budgeting-and-financial-literacy', title: 'Lesson 6.4 — Budgeting & Financial Literacy', type: 'overview', moduleId: 'module-6' },
        { id: 'lesson-6-5', slug: 'lesson-6-5-finding-funding', title: 'Lesson 6.5 — Finding Funding: Building Your Bursary Basket', type: 'overview', moduleId: 'module-6' },
      ],
    },
  ],
};

// Flat list of all lessons in order
export const ALL_LESSONS: Lesson[] = [
  COURSE.intro,
  ...COURSE.modules.flatMap(m => m.lessons),
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return ALL_LESSONS.find(l => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return ALL_LESSONS.findIndex(l => l.slug === slug);
}

export function getPrevLesson(slug: string): Lesson | undefined {
  const idx = getLessonIndex(slug);
  return idx > 0 ? ALL_LESSONS[idx - 1] : undefined;
}

export function getNextLesson(slug: string): Lesson | undefined {
  const idx = getLessonIndex(slug);
  return idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : undefined;
}
