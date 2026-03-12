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