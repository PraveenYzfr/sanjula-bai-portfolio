# Build brief: personal portfolio site for Sanjula Bai

You are building a personal portfolio / executive profile site for **Sanjula Bai** — a Global Risk &
Compliance Executive and Certified Independent Director (IICA, Ministry of Corporate Affairs, GoI).
This site's primary audience is different from a typical tech portfolio: **corporate boards, nomination
committees, executive search firms, and BFSI (banking/financial services/insurance) leadership** —
people deciding whether to invite her onto a board or into a senior risk/compliance role. It needs to
read as credible, governance-grade, and boardroom-appropriate — not as a startup landing page.

## FIRST — source of truth is her résumé, not your imagination

Her full résumé is attached at `source/Sanjula-Bai-Resume.pdf` in this project folder. **Every fact,
number, title, date, and company name on the site must come from that résumé or from Sanjula
directly — never invented or embellished.** This is a board-credibility document; a single wrong
figure (a date, a dollar amount, a team size) undermines the whole premise. Extract carefully and
cite nothing you can't find in the source.

That said, the résumé does not tell you everything you need to build a *site*. Ask Sanjula (or
Praveen, who is coordinating this on her behalf) for the items below before you start writing.

### Details to collect (not in the résumé)
- **Domain name** to deploy to (or: is this hosted on an existing domain, a new one, or a subdomain?)
- **Deployment target** — Cloudflare Pages is the default assumption (matches the rest of this
  family of projects) unless told otherwise
- **Professional headshot / photo** — does she have one, and does she want it on the site? A board
  bio page conventionally includes a photo; confirm rather than assume
- **Which contact details go public** — the résumé lists two phone numbers and a personal email;
  confirm whether both numbers should be public, or whether a single "for board opportunities,
  contact via LinkedIn / email" approach is preferred instead of listing a personal mobile directly
- **LinkedIn URL** — confirm `linkedin.com/in/sanjulabai` is correct and current, and whether she
  wants it linked directly or she'd prefer an inbound contact form-style approach
- **Résumé download** — should the exact attached PDF be downloadable from the site as-is, or does
  she want a version with personal phone numbers redacted for public download (recommended to ask —
  common practice for board-facing CVs published on a public site)
- Anything from the résumé she does NOT want public (e.g. she may want fewer numbers on a public
  page than on a résumé sent directly to a nominating committee)

## What's in the résumé (for your reference — verify against the actual PDF, this is a summary)

- **Name / title**: Sanjula Bai — Global Risk & Compliance Executive; Certified Independent Director
  (IICA); Committee Member, South India Chamber of Commerce & Industry (SICCI)
- **Location**: Chennai, Tamil Nadu, India
- **Headline stats**: 24+ years global banking; 800+ FTE teams led; $70M+ portfolio managed; ~30%
  sustained profitability; board-ready across 5 committee types; 2 terms as POSH Presiding Officer
- **Executive profile**: dual career as a risk/compliance executive and a certified independent
  director, 24+ years across Wells Fargo, Bank of America, Barclays, BNP Paribas, and Mizuho, across
  US/UK/Europe/Southeast Asia. Built and scaled global KYC Centres of Excellence, hub-and-satellite
  operating models, AI/GenAI-led transformation programs.
- **Board committee readiness** (5 areas, each with one line of grounding):
  Risk Management (financial crime, AML, regulatory audit) · Nomination & Remuneration (talent
  governance & compensation) · Corporate Social Responsibility (4 yrs CSR Head, Wells Fargo India) ·
  Corporate Governance (ethics, fiduciary duty, stakeholder oversight) · POSH Committee (2 terms
  Presiding Officer, POSH Act 2013)
- **Core leadership competencies** (12 items) — financial crime compliance, certified independent
  director credential, enterprise risk/controls/regulatory governance, board committee experience,
  KYC CoE setup & scaling, POSH presiding officer experience, AI/GenAI in banking ops, strategic CSR
  leadership, P&L ownership ($70M+), global delivery management (800+ FTE multi-geo), target
  operating model design (hub & satellite), GCC site leadership, stakeholder governance (CXO /
  regulators / clients), ESG/ethical leadership/D&I advocacy
- **Professional experience** (reverse chronological):
  1. **Group Manager – Risk & Compliance, IBM** (Mar 2022–Present) — enterprise KYC transformation
     and CoEs for Mizuho (ASEAN), Barclays (UK), BNP Paribas (Europe); 800+ FTEs across India and
     Malaysia; architected hub-and-satellite KYC models across India/Malaysia/Thailand/Hong
     Kong/UK/Europe; AI/GenAI transformation delivering ~30% cost reduction, 45% faster turnaround;
     $70M+ TCV portfolio at ~30% gross margin; zero major audit findings. Metrics: Right First Time
     65%→96%, QA score 70%→99%, processing turnaround 45% faster.
  2. **Vice President / Senior Delivery Leader, Accenture** (Mar 2021–Mar 2022) — KYC onboarding/due
     diligence for Bank of America across Chennai/Bangalore/NCR, 300+ FTE teams.
  3. **Assistant Vice President – Business Support Manager, Wells Fargo** (Feb 2011–Feb 2021,
     10 years) — KYC for Financial Institutions Group in Wholesale Banking / Global Banking &
     Markets; high-risk correspondent banking & FIG client due diligence; enterprise LIBOR
     transition program. Concurrent leadership roles at Wells Fargo: Strategic CSR India Head
     (4 years — education, environment, women's empowerment, disaster relief), POSH Presiding
     Officer (2 consecutive terms), GCC Site Leadership (site strategy, business expansion,
     cross-functional governance).
  - **Early career** (list briefly, less emphasis): Synaptris Decisions (Asst. Manager, 2008–2010),
    Scope e-Knowledge Center (Sr. Executive, 2005–2008), HCL Technologies (Customer Support
    Executive, 2004–2005), Domex Technical Information (Technical Editor, 1999–2002)
- **Education**: MBA, Alagappa University (2008–2012); B.E. Mechanical Engineering, Bharathidasan
  University (1995–1999)
- **Certifications**: Certified Independent Director (IICA, MCA/GoI) · Anti-Money Laundering (AML) ·
  AI & Generative AI · Trustworthy AI & AI Ethics
- **Executive value statement** (closing paragraph in the résumé — good candidate for an About-section
  pull-quote, verify wording against the PDF rather than retyping from this summary)
- **Contact**: sanjulabai@gmail.com · +91 98414 91960 / 98844 91960 · linkedin.com/in/sanjulabai

## Content structure

This is a board/executive bio site, not a project portfolio — structure it accordingly:

1. **Hero** — name, title line (Global Risk & Compliance Executive · Certified Independent Director),
   one-line positioning. The headline stat strip (24+ years, 800+ FTE, $70M+, etc.) works well as a
   compact banner right under the hero, similar to the résumé's own layout.
2. **Executive profile** — the dual-career narrative (risk/compliance executive + certified
   independent director), 2–3 short paragraphs, not a wall of text.
3. **Board committee readiness** — a clear grid/card layout, one card per committee (Risk Management,
   Nomination & Remuneration, CSR, Corporate Governance, POSH), each with its one-line grounding.
   This is arguably the single most important section for this audience — make it unmissable, not
   buried below a fold of unrelated content.
4. **Professional experience** — reverse-chronological, company/title/dates/impact bullets, with the
   IBM-role metrics (RFT score, QA score, turnaround) presented as a visual stat row like the résumé
   does, not buried in prose.
5. **Core competencies** — grouped, scannable (the résumé's 12-item list groups naturally into
   ~4 clusters: Risk & Compliance / Governance & Board / People & Culture / Commercial & Delivery —
   propose a grouping and confirm rather than dumping all 12 as a flat list).
6. **Education & certifications**.
7. **Contact** — LinkedIn, email, résumé download, and (pending her confirmation above) whether to
   surface a phone number directly or funnel to LinkedIn/email instead.

## Design direction

**Boardroom-credible, not startup-flashy.** This is the opposite audience from a software engineer's
portfolio — err toward the register of a serious institutional bio page (think: how a bank or a
listed company presents its board members), not a personal-brand landing page.

- **Palette**: her résumé already has a deliberate navy + gold/amber brand (dark navy header bands,
  gold accent text and rules, cream/tan highlight panels). Propose carrying that through directly —
  it signals continuity with the printed CV a nominating committee may already have seen — but
  confirm the exact direction with her rather than assuming.
- **Typography-led, restrained.** A confident serif or a clean institutional sans for headings (the
  résumé uses a bold sans for headers) — one or two typefaces, generous whitespace, no gradients, no
  glassmorphism, no animated decoration. This audience penalizes anything that reads as "startup
  template."
  the same standing rule as her portfolio's sibling project applies well here.
- **Light and dark**, via `prefers-color-scheme`, both deliberately designed — but if time-constrained,
  a single well-executed light theme (matching the résumé's white/navy/gold look) is more important
  to get right than dark-mode parity for this particular audience.
- **Evidence over adjectives** — the numbers (24+ years, 800+ FTE, $70M+, ~30%, zero major audit
  findings, RFT 65%→96%) are unusually strong; let them carry the credibility rather than adding
  marketing language on top of them.
- Scannable by a board secretary skimming a director shortlist in under a minute; substantive enough
  for a nominating committee doing real diligence afterward.

## Technical requirements

- **Static site, no build step**, deployed to Cloudflare Pages from `main` (confirm domain — see
  "Details to collect" above). Plain HTML/CSS/JS, matching the approach used for this project family.
- **No external CDNs, no Google Fonts** — self-host or use a system font stack.
- **Responsive, mobile-first.**
- **Accessible**: semantic HTML, real landmarks, WCAG AA contrast in both themes, keyboard navigable,
  alt text, visible focus states.
- **Fast**: target Lighthouse 95+ across the board.
- **SEO/social**: `<title>`, meta description, Open Graph + Twitter card with a preview image,
  canonical URL, JSON-LD `Person` schema (include her credentials/affiliations in the schema —
  this genuinely helps how search and AI systems represent her professionally).
- Favicon.
- `README.md` covering local dev and deploy.

## Repo and deployment

- **A brand-new, separate repository** — do not fold this into any other project. Recommended:
  private repo under Sanjula's own GitHub account if she has one, or under a dedicated account for
  her, rather than mixed into Praveen's personal repos.
- If Praveen is hosting/managing deployment on her behalf temporarily, note that clearly in the
  README along with a plan for handing over ownership (domain, repo, Cloudflare project) to her.

## Definition of done

- Every fact on the page traces back to `source/Sanjula-Bai-Resume.pdf` or to something she confirmed
  directly — nothing invented
- Both themes (or the one theme, if dark is deferred per her preference) reviewed at 375px, 768px,
  1440px
- Résumé download works, using whichever version (as-is or redacted) she confirmed
- Every link works
- Lighthouse ≥95 on performance, accessibility, best practices, SEO
- README covers local dev, deploy, and (if applicable) the ownership handover plan

## Working style

Ask your questions from "Details to collect" up front, in one batch, before writing content. Show her
a draft of the copy — especially the Executive Profile and Board Committee Readiness sections — before
building the full site. This is her professional identity and her voice; get the words right before
the CSS.
