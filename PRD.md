# jaineel.dev — Portfolio PRD

Draft 01 · 2026-05-10 · Awaiting approval before implementation continues.

Sources: resume (Jaineel_Resume_Professional.pdf), GitHub profile (`github.com/jaineeldev`), in-progress build at `localhost:3000`. LinkedIn was blocked by anti-scrape; if its About/headline differ in voice from the GitHub bio, paste it in and I'll fold it in.

---

## 1. Why this site exists

To make hiring managers, security teams, and small business clients spend ninety seconds on this page and come away thinking *"this person ships, takes craft seriously, and isn't bluffing."*

Three concrete jobs:

1. **Anchor a career pivot.** Jaineel is a cybersecurity student moving toward a Computer Science degree at QUT. The site has to make that trajectory legible without sounding apologetic about being early-career.
2. **Prove the work is real.** A live local-business site (Hawthorne Corner Store), an ML-augmented IDS, a Python recon tool, and a desktop mascot. The portfolio isn't a list of intentions — it's a list of shipped or shippable artifacts. The site needs to feel that way.
3. **Be the most-considered thing on his GitHub.** Recruiters click through. The portfolio itself should be the first proof point.

---

## 2. Who it's for

| Audience | What they need to walk away with |
|---|---|
| **Hiring managers / tech leads** (primary) | "Early-career, but the work and the taste are above the line. Worth a call." |
| **Security teams considering junior analysts / SOC support** (primary) | "Real security tooling shipped — Python, log analysis, network thinking. Not just classwork." |
| **Small-business clients** (secondary) | "He shipped Hawthorne. He could ship mine." |
| **Peers and future Jaineel** (tertiary) | A canonical link he can paste anywhere without flinching. |

The site is **not** trying to land senior engineering roles. It's trying to land the *right* first/second role — junior security, junior fullstack, freelance, or contract work where someone is willing to bet on trajectory.

---

## 3. The person, in one paragraph

Jaineel Khatri is a 21-ish cybersecurity student in Brisbane studying for a Cert IV at TAFE Queensland and pointed at a Computer Science degree at QUT. He's been bartending at Pig N Whistle since 2022 — which sounds like background noise but actually shapes the voice: he's used to operating composedly in regulated, high-volume environments. He builds things that work — a real convenience-store website that takes real orders, a Python tool for security recon, an ML-augmented intrusion detection system, an Electron desktop mascot — and his GitHub bio is already the cleanest articulation of how he thinks about it: *"I build practical projects… and I learn by shipping things and iterating."* He has a remote-pilot drone licence which is irrelevant to the work and exactly the kind of detail worth mentioning. He's not pretending to be a senior engineer. He's not pretending he doesn't want to be one.

---

## 4. Voice

**Use:**
- First person, present tense. *"I build…"* not *"Jaineel builds…"*
- Specific nouns. *"A Python GUI that does multi-threaded port scanning"* — not *"Various security tools."*
- Acknowledged in-progress work without apology. *"WIP"* and *"Active"* are status, not confessions.
- The GitHub-bio cadence as the spine. Short, plain sentences. *Practical*, *shipping*, *iterating*, *across*, *real*.

**Don't use:**
- *"Passionate about…"*, *"driven to…"*, *"thrive in fast-paced environments"*, *"team player with a can-do attitude"*. Resume slop.
- *"Synergy"*, *"leverage"*, *"empower"*, *"unlock"*, *"craft"* (as a noun), *"journey"*, *"obsessed with"*.
- Self-deprecation as personality (*"just a student trying my best"*). It's the same trap as bragging — it makes the work about him, not the work.
- Third-person bio voice (*"Jaineel is a Brisbane-based developer who…"*).
- Em-dash addiction. One per paragraph max.

**Sample lines that pass:**
- *"Cybersecurity student heading into computer science — shipping real projects across web, security, and systems."* (already on Hero)
- *"Some live, some still wet paint."* (already on Work)
- *"I build practical projects, mostly around security tooling and web. I learn by shipping things and iterating."* (his own GitHub bio — fold a version of this into About)
- *"Brisbane, mostly online."*
- *"Practical projects. Real users. Honest about what's WIP."*

---

## 5. Aesthetic direction

This is locked in and partially shipped (Hero + Work). Codifying it here so the next four sections don't drift.

### 5.1 Palette

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#111111` | Page background. Flat. No gradient. |
| `--color-fg` | `#EDE8DD` | Primary text. Warm bone, intentionally not pure white. |
| `--color-fg-muted` | `rgba(237,232,221,0.55)` | Secondary text, descriptions, muted name-line |
| `--color-fg-dim` | `rgba(237,232,221,0.32)` | Eyebrows, indices, year stamps |
| `--color-fg-faint` | `rgba(237,232,221,0.14)` | Hairline rules, hover surface tint |
| `--color-border` | `rgba(237,232,221,0.08)` | Row dividers |
| `--color-accent` | `#C9B888` | **Single accent. Used in exactly one place: the available-for-work status dot in the Hero.** Do not extend. |

The accent is the one rule the site enforces strictly. The day a second sand-coloured pixel appears, the discipline is gone.

### 5.2 Typography

| Family | Variable | Used for |
|---|---|---|
| **Syne** (400, 500, 600, 700, 800) | `--font-syne` | Headings, names, descriptors, body |
| **Geist Mono** (variable) | `--font-geist-mono` | Eyebrows (`001 / FOLIO`), indices, status labels, location coords, year stamps, scroll cue |

Syne is doing 90% of the visual character. Geist Mono is doing all the technical signage. Nothing else.

Tracking: tight on display Syne (`-0.04em` at hero scale, `-0.02em` at row-name scale), wide on mono labels (`0.18em`–`0.24em`). Mono labels are always uppercase.

### 5.3 Layout

- Section gutter: `px-6 sm:px-10 md:px-14` — same value across every section. Same vertical rhythm reads as deliberate.
- Asymmetric, left-anchored. Content sits on a comfortable left axis with breathing room on the right. No centre-justified hero.
- Eyebrow pattern on every section: `─── 00X / NAME` (8-px rule + Geist Mono 10.5px uppercase, tracking 0.24em, dim).
- Hairline dividers: 1px at `--color-fg-faint`. No 2px borders.
- Square corners only where it earns its keep. Default to no border at all — let whitespace do the work.

### 5.4 Motion

- Library: Framer Motion only.
- Easing: `[0.16, 1, 0.3, 1]` (fluid). One easing across the whole site.
- Hero: per-letter stagger reveal on the name; orchestrated entrance with deliberate delays (top bar → status → folio → name → rule → descriptor → bottom bar).
- Sections: `whileInView` with `viewport={{ once: true, amount: 0.4 }}`, 700ms reveal, ~60ms stagger between siblings.
- Hero exit: `useScroll` + `useTransform` — content opacity 1 → 0 over [0, 0.55], y 0 → -48px over [0, 1]. Buttery, not jumpy.
- Hover transitions: 300–500ms colour, `ease-fluid`. Never snappy.
- Respect `prefers-reduced-motion` globally.

### 5.5 Anti-aesthetic (banned)

- No bento grid. No mosaic of cards.
- No purple-pink gradients. No glassmorphism. No glow.
- No Inter, Roboto, or system sans. No Press Start 2P (deliberately retired from previous build).
- No emoji in UI.
- No fake terminals, no fake CRT scanlines, no fake noise overlay.
- No custom cursor.
- No typewriter effect on body copy. (The Hero's letter stagger is reveal, not typewriter — different beast.)
- No 3D / WebGL hero scene.
- No "scroll down" cues that are giant arrows. The thin pulsing line is enough.
- No light mode. Dark only.

---

## 6. Information architecture

Five sections, in order. The whole page is a single scrollable narrative — no nav-driven SPA feel.

| # | Section | Purpose | Anchor |
|---|---|---|---|
| 001 | **Hero** | Identity + trajectory in one screen. *Already shipped.* | `#home` |
| 002 | **Work** | Six shipped or shipping projects. *Already shipped (v1).* | `#work` |
| 003 | **Stack** | What he reaches for. Honest about levels. | `#stack` |
| 004 | **About** | Voice section — story, education, distinctive details. | `#about` |
| 005 | **Contact** | Email, links, and one clean CTA. | `#contact` |

Optional later: a **"Now"** section (a single line: *"Currently learning C and finishing my Cert IV"*). Defer to v2 unless the user wants it.

A persistent fixed nav is **not** in scope for v1. The Hero's top-bar nav links + the bottom-bar Scroll cue do the wayfinding. If we add a sticky nav, it shows up only after scrolling past the Hero (≥ 100vh), and uses the same Geist Mono uppercase styling.

---

## 7. Section briefs

### 7.1 Hero (shipped)

**State:** v1 live. Current copy:
- Eyebrow: `001 / FOLIO`
- Name: **Jaineel** / **Khatri.**
- Descriptor: *"Cybersecurity student heading into computer science — shipping real projects across web, security, and systems."*
- Top bar: `JK — STUDIO` + status dot `Available for work · 2026` + nav links
- Bottom bar: `BNE · −27.4698° / 153.0251°` + `Scroll`

**Locked unless flagged.** The descriptor was just updated to your wording.

### 7.2 Work (shipped)

**State:** v1 live. Six rows, indexed, with hover state and per-row entrance animation.

**Open issues to address before v2:**
- **Order of projects.** Currently Hawthorne, Portfolio, NIDS-ML, System Fingerprint, DesktopBuddy, Cybersecurity Assessments. Recommend leading with Hawthorne (real customers) and Portfolio v2 (the meta-flex).
- **Add `project-velo`?** It's the most recent push on GitHub — *"A client workflow platform for freelance developers and dev agencies."* If active, it deserves a row. Need a status from you.
- **GitHub URLs** — currently four projects point at `github.com/jaineeldev` as a placeholder. Update to real repo URLs:
  - NIDS-ML → `github.com/jaineeldev/nids-ml`
  - System Fingerprint → `github.com/jaineeldev/system-fingerprint-tool`
  - DesktopBuddy → `github.com/jaineeldev/desktop_buddy`
  - Cybersecurity Assessments → `github.com/jaineeldev/cybersecurity-assessments`
- **Description tightening.** Two of the six descriptions could be more specific. e.g. System Fingerprint Tool: *"Python GUI for security recon — host info + multi-threaded port scan, exports CSV."*
- **`lostastr0` / `lostastro-site`** — what are these? Worth surfacing or skip?

### 7.3 Stack (to build)

**Purpose:** Make the toolset legible at a glance without being a tag-cloud.

**Layout:** A vertical compact list. Category label pinned left in Geist Mono dim, items running across in Syne separated by `·`. Hairline border between rows. Subtle "currently learning" row at the bottom in muted italics.

**Rows (proposed):**

| Category | Items |
|---|---|
| **Frontend** | TypeScript · React · Next.js · Tailwind CSS · Framer Motion |
| **Backend & data** | Node · Python · CSV / JSON pipelines · REST |
| **Security** | Network security · Threat detection · Vulnerability assessment · Pen testing fundamentals · Log analysis |
| **Systems** | Python · Bash · C *(learning)* · Electron |
| **Tools** | Git / GitHub · Vercel · VS Code |
| **Currently learning** | C · ML for network IDS · Electron app architecture |

The "currently learning" row is the personality move — it admits the edges. No proficiency bars, no percentages, no skill ratings. The list itself is the claim.

**Voice:** No flourish. Just labels, items, and the rule between rows. The whole section is one block.

### 7.4 About (to build)

**Purpose:** Voice. The one section that earns first-person.

**Structure (proposed):**

1. **Eyebrow:** `─── 004 / About`
2. **Lead paragraph** (Syne, 18–20px, fg-muted), 2–3 sentences. Honest, plain, in his voice. Draft:
   > *"I'm Jaineel — a cybersecurity student in Brisbane heading toward a CS degree at QUT. I build practical projects, mostly across security tooling and web, and I learn by shipping them and iterating. The portfolio is the receipts."*
3. **Three short blocks** stacked or two-column:
   - **Right now** — what he's actively doing. *"Finishing my Cert IV in Cybersecurity at TAFE Queensland (Sep 2026). Building NIDS-ML and DesktopBuddy. Learning C."*
   - **Before this** — pre-uni context. *"Five years at Balmoral State High School. Subjects in Maths, Physics, Aerospace, and Digital Solutions. Two years bartending nights at Pig N Whistle — composure in regulated environments isn't a buzzword if you've worked the bar at 11pm."*
   - **Off-the-record** — flavour. *"AVI30316 remote-pilot licence (drones, visual line of sight). Brisbane local. Coffee-funded via [Ko-fi](https://ko-fi.com/jaineeldev) if anything here makes you smile."*
4. **Education timeline** (visual, not a heading-heavy block). Three rows max:
   - `Oct 2025 – Sep 2026` · TAFE Queensland · *Cert IV in Cybersecurity*
   - `2027 – ` · QUT · *Bachelor of Computer Science (intended)*
   - `2016 – 2021` · Balmoral State High School · *QCE*

Order: 1 → 2 (right now) → 4 (timeline) → 2 (before this) → 2 (off-the-record). Or whatever reads best — finalise on draft.

**Voice notes:**
- First person throughout.
- *"Composure in regulated environments isn't a buzzword if you've worked the bar at 11pm"* — exactly the kind of line that turns hospitality background from cliche into differentiator. Use lines like this sparingly (one or two), not as a pattern.
- The drone licence stays. It's the most-memorable detail that costs nothing to include.

**What NOT to include:**
- No "passionate about", "driven by curiosity", or "constantly learning".
- No "originally from…" backstory unless it's directly relevant.
- No skills list (Stack already does that).
- No timeline of hospitality jobs — just *"two years bartending"* gets the point across.

### 7.5 Contact (to build)

**Purpose:** A single, clean exit. One CTA, two or three links, no form.

**Layout:** A wide, restrained block. Big Syne line *"Let's build something."* (or similar — see voice options below), short supporting line, email-as-button or just a large mailto link, then a row of secondary links.

**Voice options for the headline (pick one in approval pass):**
- *"Let's build something."* (already in legacy claude.md — solid, slightly familiar)
- *"Got something to ship?"*
- *"Open to junior security and fullstack roles. And good problems."*
- *"Email is the fastest way."*

**Content:**
- **Primary CTA:** `jaineelk.dev@gmail.com` — clickable, with a copy-to-clipboard affordance on hover. Maybe a quiet "Copied" toast.
- **Links row** (Geist Mono uppercase, 11px):
  - GitHub → `github.com/jaineeldev`
  - LinkedIn → `linkedin.com/in/jaineel-khatri`
  - Ko-fi → `ko-fi.com/jaineeldev` *(optional — flag for confirmation)*
- **Phone** — on resume but **not** on site by default. Flag for confirmation.
- Footer line under everything: `Brisbane, AU · Available for work · 2026`. Closes the loop with the Hero status.

**Motion:** Email link gets a subtle underline-grow on hover. Copy affordance plays a tiny check icon swap.

---

## 8. Success criteria

If a recruiter, peer, or potential client opens the site cold and walks away with these reactions, it's working:

1. *"This loads fast and looks like someone cared."*
2. *"They built that for a real corner store?"* (Hawthorne is the moment.)
3. *"I can tell what they actually do, what they're learning, and where they're going. In thirty seconds."*
4. *"The site itself is the work sample."*
5. *"I want to email them."*

Anti-success:
- *"Cool animation."* (We failed if motion is the takeaway. Motion is the host, not the guest.)
- *"Generic dev portfolio."*
- *"Why is the bartender thing on a tech site?"* (Means the framing didn't land — needs reworking.)

---

## 9. Open questions for approval

Please react inline. I won't write code until 1–4 are settled.

1. **QUT CS** — confirmed via GitHub bio. OK to mention as *"intended 2027"* in About and as a future-arrow on the timeline?
2. **`project-velo`** — add as Project 02 (above Portfolio v2)? Or hold for v2 of the site?
3. **`lostastr0` / `lostastro-site`** — what are these and do they belong on the public portfolio?
4. **Phone, Ko-fi, drone licence** — keep all three on the public site? Drop any?
5. **Hawthorne first?** Move Hawthorne to Project 01 of Work, ahead of Portfolio v2?
6. **Voice for Contact headline** — pick one of the four options or write a fifth.
7. **Sticky nav after Hero** — yes / no for v1?
8. **Legacy code cleanup** — `src/components/{Navbar,Hero,Projects,Skills,About,Contact,Footer,Preloader,NowPlaying,CustomCursor,Logo,SectionDivider,ThemeProvider,ThemeToggle}.tsx` and `src/components/ui/*` are unused but still in the repo (and the `ui/*` files block production builds). OK to delete in the same PR that lands About + Contact?
9. **`CLAUDE.md`** — currently describes the old pixel aesthetic. Rewrite to match this PRD as part of the same approval.

---

## 10. Out of scope (v1)

- Blog / writing index
- CTF write-ups index page
- Per-project case-study pages
- Light mode
- Internationalisation
- A `/now` page
- Spotify or other "currently listening" widgets
- Custom cursor
- Page transitions between routes (this is one page)

---

## 11. What approval triggers

Once you sign off:

1. I rewrite `CLAUDE.md` to match this PRD (atomic, 1 commit).
2. I update Work to address open questions 2–5.
3. I build Stack (smallest section first — fastest feedback loop).
4. I build About.
5. I build Contact.
6. I delete the legacy components, fix the production build, and verify Vercel deploys clean.
7. We do one polish pass — copy, spacing, hover states, scroll behaviour at edge cases (very tall and very short viewports, mobile).

---

*End of PRD draft 01.*
