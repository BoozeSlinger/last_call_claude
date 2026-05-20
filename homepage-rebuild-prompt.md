# Last Call Collective — Homepage Rebuild Prompt

> Reference site analyzed: [Devil's Dozen](https://devils-dozen.com)
> > Target site: [lccclaude.vercel.app](https://lccclaude.vercel.app)
> > > Stack: Next.js 14 (App Router) · Tailwind CSS · GSAP + ScrollTrigger
> > >
> > > ---
> > >
> > > ## Design Philosophy
> > >
> > > Devil's Dozen works because it feels like one continuous atmospheric environment, not a series of stacked sections. The page is one dark background that breathes — illustrated characters float in from edges, video smoke drifts, content materializes as you scroll. Key patterns to replicate:
> > >
> > > - **One unified background** — no section borders, no cards, no boxes. Content floats over a single atmospheric layer. Use a dark gradient canvas (`#111009` → `#0a0906`) as the base.
> > > - - **Oversized display type** — section labels are huge (80–120px), distressed or weighted, used as anchors not headers.
> > >   - - **Illustrated/decorative floaters** — Devil's Dozen uses devil mascots drifting at parallax speeds. For LCC, use floating cocktail glass outlines, bar tool silhouettes, or abstract ink-wash shapes in gold/amber at low opacity (0.06–0.15), parallaxed at different speeds with GSAP.
> > >     - - **GSAP ScrollTrigger for everything** — not CSS transitions. Each content block uses `gsap.from()` with `scrollTrigger: { trigger, start: "top 80%", toggleActions: "play none none reverse" }`. Text lines stagger in from `y:60, opacity:0`. Images drift in from `x:±80`. Section labels scale from 1.1 to 1.
> > >       - - **Content lives on top of background, not inside sections** — use `position: relative` blocks with generous padding (min 120px top/bottom), no visible section dividers, no background color changes between blocks.
> > >         - - **Negative space is content** — Devil's Dozen uses massive whitespace between elements. Same here. Let the background show. Don't fill every pixel.
> > >           - - **Animated section label reveals** — when each block enters viewport, the big section label word clips in letter by letter or fades up with a slight Y offset.
> > >             - - **Horizontal scrolling marquees** for social proof and trust signals (like the existing "Trusted by bars" ticker).
> > >               - - **Cursor-reactive parallax** on the hero — background particles or floating elements subtly shift on mousemove (already partially implemented — keep and enhance).
> > >                
> > >                 - ---
> > >
> > > ## Page Structure
> > >
> > > All in `app/page.tsx`. One file. Import GSAP and ScrollTrigger at top, register in `useEffect`. Keep the existing canvas particle system, header, and footer imports.
> > >
> > > ---
> > >
> > > ### 1. Hero *(keep existing, enhance)*
> > >
> > > - Full viewport dark starfield canvas with gold dust particles (keep existing)
> > > - - Center eyebrow: `DIGITAL AGENCY · BAR & HOSPITALITY` — spaced caps, gold
> > >   - - Animated headline: **"High Proof Design & AI That Works the Late Shift."** — Big Shoulders Display, each word staggers in on load (not scroll)
> > >     - - Subhead fades in after: *"The digital partner for hospitality brands that play to win."*
> > >       - - CTA button: `LET'S BUILD` — ghost border, gold text, hover fills gold, square corners
> > >         - - Bottom: `SCROLL ↓` pulses gently
> > >           - - Floating decorative elements: two faint cocktail glass line-art SVGs — one bottom-left drifting up slowly, one top-right — both at 8% opacity, parallaxed on scroll
> > >            
> > >             - ---
> > >
> > > ### 2. What We're Pouring *(Services)*
> > >
> > > **Section label:** `WHAT WE'RE POURING` — 100px+, spaced, animates in from `opacity:0, y:40` on scroll
> > > **Sub-label:** *"What we pour."* — smaller italic underneath
> > >
> > > Layout: NOT a grid. A staggered list like a bar menu — service name left-aligned in large type, short punchy description right-aligned, thin gold rule between each. Number prefix in tiny spaced caps.
> > >
> > > | # | Service | Description |
> > > |---|---------|-------------|
> > > | 01 | AI Truth Audit | Find out how AI sees your bar. A $97 diagnostic. |
> > > | 02 | The House Line | Your full digital presence, built from the floor up. |
> > > | 03 | Back Bar Signal | AI visibility strategy. Show up when someone asks ChatGPT where to drink. |
> > > | 04 | The Guest List | CRM, SMS, email. Own your customers. Yelp can't touch this. |
> > > | 05 | Web Design | Sites that close. Not portfolios that sit there. |
> > > | 06 | Brand & Retainers | The ongoing partner. Monthly strategy, content, presence. |
> > >
> > > Each row animates in from `x: -60, opacity: 0`, staggered 0.15s apart on scroll entry.
> > >
> > > ---
> > >
> > > ### 3. Tabs of the Night *(Select Projects)*
> > >
> > > **Section label:** `TABS OF THE NIGHT` — oversized, animates in
> > > **Sub-label:** *"Five bars. Five stories."* — small, spaced, gold
> > >
> > > Layout: NOT a grid of cards. Full-width stacked reveal — each project is a horizontal band that slides in from right. Left: large project number + name. Right: three inline tag labels + one-liner + arrow link. Thin horizontal gold line between each.
> > >
> > > | # | Client | Type | One-liner |
> > > |---|--------|------|-----------|
> > > | 01 | Gra Pow Riverside | Thai Fusion Sports Bar, Riverside CA | Zero to #1 on ChatGPT. |
> > > | 02 | Killer Queens | Social House, Inland Empire CA | Dead nights don't exist anymore. |
> > > | 03 | Happy Dad | Beer Brand, Los Angeles CA | Built for the shelf and the scroll. |
> > > | 04 | Proabition | Bar & Lounge, Inland Empire CA | 8,000 guests. Zero Yelp dependency. |
> > > | 05 | Armen Z Legacy | Event & Tournament, Southern CA | Sponsors felt like they backed the Masters. |
> > >
> > > On hover: project name shifts `x: +8px`, gold accent line animates width `0 → 100%`, full opacity.
> > >
> > > ---
> > >
> > > ### 4. Last Round *(Testimonials)*
> > >
> > > **Section label:** `LAST ROUND` — oversized, animates up on scroll
> > > **Sub-label:** *"What the regulars say."* — small italic
> > >
> > > Layout: NOT a slider. A continuous horizontal auto-scroll marquee — two rows moving in opposite directions. Each testimonial: initials in gold-bordered circle, quote, name + bar. Marquee pauses on hover. The block fades in on scroll entry; marquee moves immediately.
> > >
> > > ```
> > > "We went from zero online presence to ranking #1 on ChatGPT for Thai food in our city. The phone doesn't stop."
> > > — Isaac Sura, Gra Pow Riverside
> > >
> > > "Wednesday nights used to be dead. Now we turn people away. That's the only stat that matters."
> > > — Michael Lopez, Killer Queens Social House
> > >
> > > "I own 8,000 customer contacts now. Yelp doesn't hold me hostage anymore. That is power."
> > > — Derek Matos, Proabition Bar
> > >
> > > "They built a tournament site that made our sponsors feel like they were backing the Masters. Exceeded every expectation."
> > > — Kiko Zennedjian, Armen Z Legacy Foundation
> > > ```
> > >
> > > ---
> > >
> > > ### 5. In the Weeds *(About)*
> > >
> > > **Section label:** `IN THE WEEDS` — huge, distressed weight, animates in
> > > **Sub-label:** *"Built from the floor up."*
> > >
> > > Layout: Two-column asymmetric.
> > > - **Left (60%):** Existing about copy split into two paragraphs, each fading in with 0.3s stagger.
> > > - - **Right (40%):** Four stats arranged vertically as large number + label, each counting up with GSAP on scroll enter.
> > >  
> > >   - | Stat | Label |
> > >   - |------|-------|
> > >   - | 25+ | Combined years in the industry |
> > >   - | IE + East LA | Territory covered |
> > >   - | $0 | Templates used |
> > >   - | 5 | Active client builds |
> > >  
> > >   - Decorative: faint bar-stool or shaker silhouette SVG in the background at 6% opacity, parallaxed.
> > >  
> > >   - ---
> > >
> > > ### 6. Last Call *(CTA)*
> > >
> > > **Section label:** `LAST CALL` — the biggest type on the page, nearly full width, gold, animates in as a clipPath reveal (mask slides left to right)
> > > **Body:** *"The tab closes. The question is whether your bar is on it."*
> > > **CTA:** Large ghost button `START A PROJECT →` — hover fills amber/gold, scales 1.02, square corners
> > > **Below:** `lastcall.marketing` in small spaced caps
> > > **Ambient:** Same particle canvas from hero but more concentrated intensity — feels like energy is building
> > >
> > > ---
> > >
> > > ## GSAP Animation System
> > >
> > > ```tsx
> > > // In useEffect after component mounts:
> > > gsap.registerPlugin(ScrollTrigger);
> > >
> > > // Section labels — scale + fade
> > > gsap.from(".section-label", {
> > >   scale: 1.08,
> > >   opacity: 0,
> > >   duration: 1.1,
> > >   ease: "expo.out",
> > >   scrollTrigger: {
> > >     trigger: ".section-label",
> > >     start: "top 85%",
> > >     toggleActions: "play none none reverse",
> > >   },
> > > });
> > >
> > > // Service rows — staggered left slide
> > > gsap.from(".service-row", {
> > >   x: -70,
> > >   opacity: 0,
> > >   duration: 0.8,
> > >   ease: "power2.out",
> > >   stagger: 0.13,
> > >   scrollTrigger: { trigger: ".services-block", start: "top 75%" },
> > > });
> > >
> > > // Project rows — staggered right slide
> > > gsap.from(".project-row", {
> > >   x: 70,
> > >   opacity: 0,
> > >   duration: 0.8,
> > >   ease: "power2.out",
> > >   stagger: 0.15,
> > >   scrollTrigger: { trigger: ".projects-block", start: "top 75%" },
> > > });
> > >
> > > // Stats — count up
> > > document.querySelectorAll(".stat-number").forEach((el) => {
> > >   const target = parseInt(el.getAttribute("data-target") || "0");
> > >   gsap.from(
> > >     { val: 0 },
> > >     {
> > >       val: target,
> > >       duration: 1.8,
> > >       ease: "power1.inOut",
> > >       scrollTrigger: { trigger: el, start: "top 80%" },
> > >       onUpdate: function () {
> > >         el.textContent = Math.round(this.targets()[0].val) + "+";
> > >       },
> > >     }
> > >   );
> > > });
> > >
> > > // CTA label — clipPath mask reveal
> > > gsap.from(".cta-label", {
> > >   clipPath: "inset(0 100% 0 0)",
> > >   duration: 1.4,
> > >   ease: "expo.inOut",
> > >   scrollTrigger: { trigger: ".cta-block", start: "top 70%" },
> > > });
> > >
> > > // Parallax floaters
> > > gsap.to(".floater-left", {
> > >   y: -120,
> > >   ease: "none",
> > >   scrollTrigger: {
> > >     trigger: "body",
> > >     start: "top top",
> > >     end: "bottom bottom",
> > >     scrub: 1.5,
> > >   },
> > > });
> > > gsap.to(".floater-right", {
> > >   y: -60,
> > >   ease: "none",
> > >   scrollTrigger: {
> > >     trigger: "body",
> > >     start: "top top",
> > >     end: "bottom bottom",
> > >     scrub: 2.2,
> > >   },
> > > });
> > > ```
> > >
> > > ---
> > >
> > > ## Styling Tokens
> > >
> > > | Token | Value |
> > > |-------|-------|
> > > | Background | `#111009` |
> > > | Gold (primary) | `#C9A84C` |
> > > | Gold (hover) | `#E8C96A` |
> > > | Cream text | `#F0EBD8` |
> > > | Muted text | `rgba(240, 235, 216, 0.45)` |
> > > | Section divider | `rgba(201, 168, 76, 0.2)` — 1px |
> > > | Heading font | Big Shoulders Display, weight 900 |
> > > | Body font | Space Grotesk |
> > > | Number labels | Space Grotesk, `letter-spacing: 0.2em` |
> > >
> > > ---
> > >
> > > ## What NOT to Do
> > >
> > > - No section background color changes — all one canvas
> > > - - No card borders or box shadows
> > >   - - No CSS `transition` for scroll animations — GSAP only
> > >     - - No grid-gap card layouts for projects or services
> > >       - - No standard Tailwind `animate-` classes for entrance animations
> > >         - - Do not re-implement the header/footer — keep existing components
> > >           - - Do not use Framer Motion
> > >             - - Do not put everything in a grid — use stacked, full-width horizontal bands with asymmetric layouts
> > >              
> > >               - ---
> > >
> > > ## The Goal
> > >
> > > Someone lands on this page and it feels like walking into a well-run bar at 11pm — atmospheric, intentional, every element has a reason to be there. Not a website. An experience.
