# Copilot Instructions – Ås Tennisklubb Frontend (v3)

This document defines how AI assistants (Copilot, ChatGPT, etc.) must behave when generating
frontend code or content for this project.

The objective is:

consistent, accessible, mobile‑first UI built using the project's component system.

Nothing in this document overrides the component system.  
Design theory exists to guide decisions when implementing components and content.

---

# 1. Project Guidelines

AI assistants must **never perform git operations unless explicitly requested** by the user.

Allowed when explicitly requested:

- git add
- git commit
- git push

---

# 2. Source of Truth

The project uses an Aksel-inspired component system with two layers:

- **Primitives** (`src/components/primitives/`): Layout building blocks (Page, PageBlock, VStack, HStack, HGrid, Box)
- **UI components** (`src/components/ui/`): General presentation components (Button, Link, Heading, BodyLong, Card, DataTable, etc.)
- **Content components** (`src/components/content/`): Domain/content components (NewsCard, EventCard, ArticleMeta, etc.)
- **Layout components** (`src/components/layout/`): Page-level layout components (PageHeader)

AI must always check these component folders before generating markup.

If a component exists it **must be used instead of recreating the pattern with Tailwind.**

---

# 3. UI Decision Hierarchy

When generating UI follow this order strictly.

1. Use an existing component from `src/components/`
2. Use documented utility classes from global.css
3. Reuse an existing layout pattern used elsewhere in the project
4. Only then write minimal Tailwind markup

Never recreate a component pattern inline.

If a pattern is repeated more than once, suggest extending the component system instead.

---

# 4. Component Usage Rules

Prefer these components when applicable.

Purpose → Component

Page width constraint → <PageBlock>
Vertical stacking → <VStack>
Horizontal stacking → <HStack>
Responsive grid → <HGrid>
Surface/container → <Box>
Page header/hero → <PageHeader>
Buttons → <Button>
Links → <Link>
Headings → <Heading>
Body text → <BodyLong>
Rich text content → <Prose>
Highlight box → <Callout>
Data tables → <DataTable>
Info cards → <InfoCard>
News items → <NewsCard>
Navigation cards → <LinkCard>
Event cards → <EventCard>
Map embed → <LazyMap>
Step process → <Process> + <ProcessEvent>
Ordered/unordered lists → <List> + <ListItem>

Do not recreate these patterns using raw Tailwind markup.

---

# 5. Utility Classes

The following utilities may be used directly in markup.

.text-heading / .text-body / .text-muted
Semantic text-color classes mapped to design tokens.

These utilities should be preferred over manually reproducing the same styling.

---

# 6. Component Overrides

Components support a class prop for **small layout adjustments only**.

Allowed overrides

spacing (mb-4, mt-6)
layout (flex, gap-_)
alignment (items-center, text-right)
width (max-w-_)

Avoid overriding

colors
padding
border radius
typography hierarchy
shadow system

If repeated overrides are required the component should be extended instead.

---

# 7. Component Extension Rule

If a component almost fits but requires repeated overrides:

Do NOT recreate it inline.

Instead extend the component with

additional props
variants
layout options

---

# 8. Preferred Astro Page Structure

Pages should follow this hierarchy.

PageHeader (optional, variant="compact" or full)

PageBlock width="lg" gutters
VStack gap="…"
Heading / BodyLong
Content (Prose / HGrid / DataTable)

CTA section (Button)

Footer (handled by Layout)

Avoid inventing new layout hierarchies if existing components already express the structure.

---

# 9. Core Design Principles

Frontend must always prioritize

clarity
simplicity
accessibility
performance
consistency
predictability

If multiple solutions exist choose the **simplest and most consistent one**.

Never introduce visual complexity without a clear purpose.

Sources

Mobile First — Luke Wroblewski
Nielsen Norman Group UX research
Material Design layout system
WCAG 2.2 accessibility guidelines
Gestalt principles of visual perception
Atomic Design — Brad Frost

---

# 10. Mobile‑First Layout

Always design mobile first.

Start layout at

375px viewport width

Enhance progressively for larger screens.

Breakpoints

480px
768px
1024px
1280px
1440px

---

# 11. Grid System

Desktop layouts conceptually follow a 12 column grid.

Implementation should rely on project primitives:

PageBlock (width constraint + gutters)
HGrid (responsive column grid)
VStack / HStack (flex stacking)

Avoid manually recreating container patterns.

---

# 12. Spacing System

Spacing follows an 8px scale.

Allowed values

4
8
16
24
32
48
64
96

Primary spacing is controlled by primitives such as

PageBlock
VStack / HStack (gap prop)
HGrid (gap prop)

Do not introduce new spacing systems.

---

# 13. Visual Hierarchy

Pages must follow predictable structure.

Hero
Primary message
Supporting content
CTA
Footer

Whitespace and contrast guide the user.

Reference
Nielsen Norman Group — Visual Hierarchy

---

# 14. Reading Patterns

Users scan pages using established reading patterns.

Text heavy pages

F‑pattern

Landing pages

Z‑pattern

Important information should appear

near the top
left aligned
before scroll

Reference
Nielsen Norman Group

---

# 15. Gestalt Principles

UI composition should respect

proximity
similarity
continuity
closure

Elements that belong together must appear visually grouped.

---

# 16. Navigation Rules

Maximum 5–7 top‑level navigation items.

Reference
Hick’s Law

Navigation must be

visible
predictable
consistent

---

# 17. Interaction Rules

Touch targets must be at least

44 × 44 px

Reference

Fitts’s Law
Apple Human Interface Guidelines

---

# 18. Typography Rules

Readable text is mandatory.

Line length

45–75 characters

Line height

1.4–1.6

Heading hierarchy

H1 page title
H2 sections
H3 subsections

Only one H1 per page.

---

# 19. Accessibility (WCAG 2.2)

Requirements

contrast ≥ 4.5:1
keyboard navigation must work
semantic HTML must be used
images require alt text

Recommended semantic elements

nav
main
section
header
footer

Reference
WCAG 2.2 — W3C Web Accessibility Initiative

---

# 20. Accessibility in Text

Rules

use descriptive links
avoid "click here"
always include alt text on images
explain abbreviations when first used

Reference
WCAG 2.2

---

# 21. Dark Mode

Dark mode must always be supported.

Implementation

CSS variables
prefers-color-scheme

Every color must have a dark mode equivalent.

---

# 22. Performance

Frontend must remain lightweight.

Rules

minimal JavaScript
lazy loading images
optimized images (WebP / AVIF)
avoid blocking scripts

Target

page load under 2 seconds

Reference
Google Web Performance Guidelines

---

# 23. Content Writing Specification

Based on

Plain Language Guidelines
Nielsen Norman Group research
GOV.UK Content Design
Information Foraging Theory
Cognitive Load Theory

AI must prioritize

clarity
brevity
structure
readability
user needs

Use

short sentences
simple words
active voice

Paragraph length

maximum 3–5 lines

---

# 24. Content Structure

Recommended page structure

Introduction
Explanation
Details
Action

Example

What this is
How it works
What the user can do
Call to action

Most important information should appear first.

Reference
Nielsen Norman Group — Inverted Pyramid

---

# 25. Scannable Content

Users scan pages rather than read them line by line.

Use

short paragraphs
headings
bullet lists
highlighted key information

---

# 26. Microcopy

UI text must be

clear
short
helpful

Example

Bad
Error occurred

Good
E‑postadressen er ugyldig

Reference
Google UX Writing

---

# 27. Call‑to‑Action Writing

CTA text must start with a verb.

Bad

Submit
Learn more

Good

Book bane
Se treningsplan
Kontakt klubben

---

# 28. Tone of Voice

Tone must be

friendly
clear
direct

Avoid bureaucratic language.

Reference
GOV.UK Tone of Voice Guidelines

---

# 29. Content vs UI Rule

UI structure must follow the **component system**.

Text and content must follow the **content writing rules**.

These systems must not conflict.

Layout decisions should never override accessibility or readability.

---

# 30. AI Guardrails

AI must always

follow mobile‑first layout
reuse existing components
follow spacing scale
respect accessibility rules
support dark mode
keep markup simple

AI must never

invent new layout systems
break spacing rules
ignore accessibility
recreate existing components inline
introduce unnecessary complexity

---

# Final Rules

Touch targets must always be

Dark mode must exist for all colors.

CTA text must start with a verb.

Always prefer **existing components over new markup.**
