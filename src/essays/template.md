---
title: "Essay template"
excerpt: "Frontmatter, sections, spacing, notes, and citation conventions."
date: "2026-11-20"
type: "math"
outline: false
tags: ["archive"]
---

<!--
FILENAME: kebab-case id → /essays/{id}
  e.g. philosophy-of-probability.md → /essays/philosophy-of-probability

FRONTMATTER
  title    string, required
  excerpt  short blurb for listings; "" if unused
  date     "YYYY-MM-DD"
  type     "math" | "misc" (defaults to "draft" if omitted)
  outline  true → show section outline from #### headings (optional; default false)
  tags     string[]; common: math, stat, finance, ml, phil, personal, archive
           "archive" hides the essay from listings (still reachable by URL)

BODY FLOW (full essay)
  1. Opening prose (no heading)
  2. #### Section headings for major parts (optional)
  3. &nbsp; before endmatter
  4. ### Notes  (if any footnote markers)
  5. &nbsp;
  6. ### Read   (or ### References) — bibliography

READ-ONLY / PLACEHOLDER essays may skip the body and start at ### Read.

CITATIONS IN BODY
  Prefer: [[1](#note-1)]
  (Some older essays use [[1]](#note-1); either works.)

ANCHORS
  Invisible spans for scroll targets:
    <span class="invisible absolute" id="…"></span>
  Notes: id="note-1", id="note-2", …
  Read/References list: id="read"
  Optional section wrappers: id="notes", id="references"
  Optional #### section anchors when outline: true (id matches slug)

DEFINITIONS
  **Def** (_Name_): statement with $math$ as needed.

MATH
  Inline: $x$
  Display / aligned:
    $$
    \begin{align*}
      ...
    \end{align*}
    $$

IMAGES
  ![Alt text](/images/filename.png)
  Files live under public/images/

LINKS
  External: [label](https://…)
  Internal essay: [label](/essays/essay-id)

COMMENTS
  HTML comments <!-- ... --> for drafts; not shown on the site.

BIBLIOGRAPHY STYLE (### Read)
  Bullets, sentence-final period.
  Books: Author, *Title*, Nth ed., Publisher, Year.
  Articles/posts: Author, ["Title"](url), *Venue*, Date.
  Courses/notes: [*Title*](url), Venue, Term/Year.
-->

Opening paragraph. State the main idea; link out when useful, e.g. [Wikipedia](https://en.wikipedia.org/wiki/Main_Page). Mark asides with a note. [[1](#note-1)]

Continue in short paragraphs. Prefer one idea per paragraph. Use inline math like $\varepsilon > 0$ when it clarifies.

#### Section heading

Use `####` for named sections (and set `outline: true` in frontmatter if you want a TOC). Embed images from `/images`:

![Descriptive alt text](/images/example.png)

**Def** (_Example definition_): A sequence $p_n$ in a metric space $(X, d)$ converges to $p$ iff for every $\varepsilon > 0$ there exists $N$ such that for all $n \geq N$, $d(p_n, p) < \varepsilon$.

Display math when the expression needs room:

$$
\begin{align*}
  \hat{\beta} &= (X^{\mathsf{T}} X)^{-1} X^{\mathsf{T}} y. \tag*{(1)}
\end{align*}
$$

Close the body, then separate endmatter with a blank line and `&nbsp;`.

&nbsp;

### Notes
<span class="invisible absolute" id="note-1"></span>

1. First note. Expand on asides, caveats, or pointers (including internal links like [probability](/essays/probability)).
2. Second note. For multi-note essays, add `<span class="invisible absolute" id="note-2"></span>` immediately before that item (see `risk.md` / `ai-apps.md`).

&nbsp;

### Read
<span class="invisible absolute" id="read"></span>

- Rick Durrett, *Probability: Theory and Examples*, 5th ed., Cambridge University Press, 2019.
- Terence Tao, ["The Black-Scholes equation"](https://terrytao.wordpress.com/2008/07/01/the-black-scholes-equation/), *What's new*, 1 July 2008.
- Dmitry Panchenko, [*Lecture Notes on Probability Theory*](https://www.ams.org/open-math-notes/omn-view-listing?listingId=110654), 2019.

<!--
READ-ONLY VARIANT (no body, no notes) — e.g. options.md, philosophy-of-probability.md:

### Read
<span class="invisible absolute" id="read"></span>

- …

OLDER VARIANT uses ### References with a numbered list instead of bullets
(e.g. regression.md, risk.md). Prefer ### Read + bullets for new essays.
-->
