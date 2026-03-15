// FNT Design: Homepage replica of fntransitions.ca
// Colors: H1 red (rgb(187,10,18)), buttons purple (rgb(91,32,107)), footer dark (rgb(36,30,26))
// Fonts: DM Sans for headings/buttons, Overpass for body text

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FntButton from "@/components/FntButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Section 1: Hero - White background */}
        <section className="bg-white px-4 sm:px-6 py-10 sm:py-16 text-center">
          <div className="max-w-[900px] mx-auto">
            <h1
              className="font-bold leading-[1.15] mb-6 sm:mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(28px, 5vw, 65px)",
                color: "rgb(187, 10, 18)",
              }}
            >
              Chiefs of Ontario – Supporting Education Transitions for First Nations Learners in Ontario Research Project
            </h1>

            <h2
              className="font-bold mb-5 sm:mb-7"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(18px, 3vw, 28px)",
                color: "rgb(36, 30, 26)",
              }}
            >
              Draft Version – For Review &amp; Feedback
            </h2>

            <p
              className="mx-auto max-w-[820px] text-[15px] sm:text-[17px]"
              style={{
                fontFamily: "'Overpass', sans-serif",
                color: "rgb(65, 63, 60)",
                lineHeight: 1.7,
              }}
            >
              The 2023 Chiefs of Ontario Post-Secondary Education Engagement Report outlined 41 recommendations to improve post-secondary outcomes for First Nation learners. Some recommendations indicated the importance of supporting education transitions throughout the lifelong learning cycle. In response, COO is developing a First Nations Education Transitions toolkit. This will include findings from community engagement around transition supports and resources that learners, educators and administrators can use to maneuver through various transition points.
            </p>
          </div>
        </section>

        {/* Section 2: Gray background with feedback sections */}
        <section
          className="px-4 sm:px-6 py-10 sm:py-16"
          style={{ backgroundColor: "rgba(224, 223, 217, 0.38)" }}
        >
          <div className="max-w-[900px] mx-auto text-center">
            <p
              className="mb-8 sm:mb-12 text-[15px] sm:text-[17px]"
              style={{
                fontFamily: "'Overpass', sans-serif",
                color: "rgb(65, 63, 60)",
                lineHeight: 1.7,
              }}
            >
              We welcome your feedback as we continue to refine and ensure the resources reflect the needs of First Nation learners. There are two sections to review.
            </p>

            {/* Education Transitions Program */}
            <div className="mb-10 sm:mb-16">
              <h2
                className="font-bold mb-4 sm:mb-5"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: "rgb(36, 30, 26)",
                }}
              >
                The Education Transitions Program &amp; Materials
              </h2>

              <p
                className="mb-6 sm:mb-8 text-[15px] sm:text-[17px]"
                style={{
                  fontFamily: "'Overpass', sans-serif",
                  color: "rgb(65, 63, 60)",
                  lineHeight: 1.7,
                }}
              >
                The <em>Strengthening Pathways for First Nations Learners</em> program consists of five self-directed modules. Within each module, there is a chapter story, a video, guided discussion questions, and three ready-to-use activities and tools.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
                <FntButton href="/course">
                  REVIEW THE EDUCATION TRANSITIONS COURSE
                </FntButton>
                <FntButton
                  href="https://qualtricsxm2byv8fx2j.qualtrics.com/jfe/form/SV_0NVS54g9mILIMfA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SUBMIT FEEDBACK ON THE COURSE
                </FntButton>
              </div>
            </div>

            {/* Programs and Resources */}
            <div>
              <h2
                className="font-bold mb-4 sm:mb-5"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: "rgb(36, 30, 26)",
                }}
              >
                Programs and Resources Document
              </h2>

              <p
                className="mb-6 sm:mb-8 text-[15px] sm:text-[17px]"
                style={{
                  fontFamily: "'Overpass', sans-serif",
                  color: "rgb(65, 63, 60)",
                  lineHeight: 1.7,
                }}
              >
                The programs and resources document is a living document that includes information on career exploration, courses and handbooks, community supports, financial literacy, orientation events &amp; activities, post-secondary pathways, skills training initiatives, transition guides and wellness and holistic supports.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
                <FntButton
                  href="https://fntransitions.ca/wp-content/uploads/2026/02/Programs-Resources-FNET-DRAFT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  REVIEW THE PROGRAMS &amp; RESOURCES DOCUMENT
                </FntButton>
                <FntButton
                  href="https://qualtricsxm2byv8fx2j.qualtrics.com/jfe/form/SV_blpRwhmx5pMIu7I"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SUBMIT FEEDBACK ON RESOURCES
                </FntButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
