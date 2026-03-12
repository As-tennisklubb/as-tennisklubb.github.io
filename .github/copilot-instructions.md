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

---

## Ås Tennisklubb – Spesifikke Design-regler (Astro + Tailwind)

Disse reglene gjelder for alle sider og komponenter i dette prosjektet. Alle nye sider og seksjoner MÅ følge disse mønstrene eksakt.

### Layout
| Element | Klasser |
|---------|---------|
| Side-wrapper (innersider) | `max-w-4xl mx-auto px-4 py-12` |
| Side-wrapper (forside / wide) | `max-w-6xl mx-auto px-4` |
| Hero-seksjon | `bg-green-800 dark:bg-green-700 text-white py-10 md:py-14 px-4` |
| Seksjon-avstand (alle unntatt siste) | `mb-12` på `<section>` |

### Typografi
| Element | Klasser |
|---------|---------|
| H2 uten ikon | `text-2xl font-bold text-green-800 dark:text-green-300 mb-4` |
| H2 med ikon – wrapper | `<div class="flex items-center gap-3 mb-4">` |
| H2 ikon | `w-6 h-6 text-green-700 dark:text-green-400 shrink-0` |
| H3 plain | `font-semibold text-gray-900 dark:text-gray-100 mb-2` |
| H3 i info-boks – wrapper | `<div class="flex items-center gap-2 mb-4">` |
| H3 ikon (info-boks) | `w-5 h-5 text-green-700 dark:text-green-400 shrink-0` |
| Prose-seksjon | `prose prose-green dark:prose-invert max-w-none` |

### Kort og bokser
| Element | Klasser |
|---------|---------|
| Grønn info-boks | `bg-green-50 dark:bg-gray-800 border border-green-100 dark:border-gray-700 rounded-xl p-6` |
| Hvit feature-kort | `bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm` |
| Hvit mobil-kort (tabeller) | `bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4` |
| Mobil-kort liste-wrapper | `flex flex-col gap-3 md:hidden` |

### Tabeller
| Element | Klasser |
|---------|---------|
| Desktop-wrapper | `hidden md:block overflow-x-auto` |
| `<table>` | `w-full text-sm` |
| `<thead> <tr>` | `border-b-2 border-green-200 dark:border-green-800` |
| `<th>` | `py-3 pr-6 text-left font-semibold text-gray-700 dark:text-gray-300` |
| `<tbody> <tr>` | `border-b border-gray-100 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors` |

### Knapper og lenker
| Element | Klasser |
|---------|---------|
| Primær CTA (fylt) | `inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors min-h-[44px]` |
| Sekundær CTA (outline) | `inline-flex items-center gap-2 border border-green-700 dark:border-green-500 text-green-700 dark:text-green-400 font-semibold px-5 py-3 rounded-full hover:bg-green-50 dark:hover:bg-green-900 transition-colors min-h-[44px] text-sm` |
| Inline tekstlenke | `text-green-700 dark:text-green-400 font-semibold hover:underline` |
| Bullet-liste item | `<li class="flex gap-2"><span class="text-green-600 dark:text-green-400 shrink-0">•</span>{tekst}</li>` |

### Regler
- **Touch targets**: alltid `min-h-[44px]` på alle klikkbare elementer
- **Dark mode**: alltid `dark:` klasser på alle bakgrunner, tekster og borders – ingen unntak
- **CTA-tekst**: start alltid med verb (f.eks. "Book bane", "Se treningsplan", "Send mail")
- **Siste seksjon**: skal aldri ha `mb-12`