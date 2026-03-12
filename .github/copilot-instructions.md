# Copilot Instructions

## Project Guidelines
- User wants git pushes done when they explicitly ask for it. They are fine with me running git add, commit, and push when requested.

## Frontend Development Guidelines
- Follow "Mobile-First, Accessible, Predictable Web Design v1.0" spec for all frontend work:
  - Always mobile-first (start at 375px, progressively enhance)
  - Breakpoints: 480px, 768px, 1024px, 1280px, 1440px
  - 12-col grid, max-width 1200-1280px, container mx-auto px-4
  - 8px spacing system (4, 8, 16, 24, 32, 48, 64, 96)
  - Visual hierarchy: Hero → Primary → Features → CTA → Footer
  - F-pattern for text, Z-pattern for landing pages
  - Gestalt principles (proximity, similarity, continuity, closure)
  - Max 5-7 top-level nav items (Hick's Law)
  - Touch targets min 44x44px
  - Line length 45-75 chars, line-height 1.4-1.6
  - WCAG 2.2: contrast min 4.5:1, alt text, keyboard nav, semantic HTML
  - Dark mode via CSS variables / prefers-color-scheme
  - Minimal JS, lazy load images, assets optimized, page load under 2s
  - Component-based: layout / navigation / form / content / feedback components
  - Tailwind: spacing follows 8px, container mx-auto px-4, mobile-first responsive utilities
  - Never create complex layouts without reason, never break UI consistency, never ignore accessibility

## Content Writing Specification for AI (v1.0)
- **Core Principles**: Always prioritize clarity, brevity, structure, readability, user needs. Never write complex text if simpler is possible.

### Rules
1. **Plain Language**: Short sentences, common words, avoid jargon, use active voice.
2. **Inverted Pyramid**: Most important info first, then explanation, then details.
3. **Scannable Content**: Short paragraphs (max 3–5 lines), clear headings, bullet lists, highlight key words.
4. **Heading Hierarchy**: One H1 per page, H2 for sections, H3 for subsections. Headings must describe content.
5. **Information Scent**: Links and buttons must be descriptive. Bad: "Les mer" / Good: "Se ledige timer".
6. **Microcopy**: UI text (buttons, errors, placeholders, tooltips) must be clear, short, helpful. Bad: "Error occurred." / Good: "E-postadressen er ugyldig."
7. **Reading Level**: Target 8th–9th grade. Short sentences, simple words, avoid passive voice.
8. **Cognitive Load**: One idea per paragraph, short paragraphs, logical structure.
9. **Content Structure**: Introduction → Explanation → Details → Action (What it is → How it works → What user can do → CTA).
10. **Accessibility**: Descriptive links (never "klikk her"), alt text on images, explain abbreviations.
11. **SEO**: One H1, logical H2 sections, natural keywords. SEO must never compromise readability.
12. **Content Chunking**: Max 3–5 lines per paragraph, use bullet lists, avoid large text blocks.
13. **Call to Action**: Start with a verb, be specific. Bad: "Submit" / Good: "Book bane".
14. **Tone of Voice**: Friendly, clear, direct. Avoid bureaucratic language and unnecessary complexity.

### AI Guidelines
- **AI Shall Always**: Write short sentences, use clear headings, structure in small blocks, use action-based language, follow heading hierarchy and accessibility rules.
- **AI Shall Never**: Write long text blocks, use unclear formulations, use generic link texts.