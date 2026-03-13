# Copilot Instructions

## Project Guidelines
* Do not perform git operations unless explicitly requested by the user.
* When requested it is acceptable to run:

  * `git add`
  * `git commit`
  * `git push`


# Frontend Development Specification (AI)

All frontend work must follow:

**Mobile-First, Accessible, Predictable Web Design v1.0**

These guidelines are based on established research and design systems.

Sources:

* Mobile First — Luke Wroblewski
* Nielsen Norman Group UX research
* Material Design layout system
* WCAG 2.2 accessibility guidelines
* Gestalt principles of visual perception
* Atomic Design — Brad Frost



# Core Design Principles

Frontend must always prioritize:

* clarity
* simplicity
* accessibility
* performance
* consistency
* predictability

If multiple solutions exist choose the **simplest and most consistent one**.

Never introduce visual complexity without a clear purpose.



# Mobile-First Layout

Always design **mobile-first**.

Start layout at:

375px viewport width

Enhance progressively for larger screens.

## Breakpoints

480px
768px
1024px
1280px
1440px



# Grid System

Use a **12 column grid on desktop**.

Container rules

`max-w-6xl mx-auto px-4`

For inner pages use

`max-w-4xl mx-auto px-4`



# Spacing System

Spacing must follow the **8px scale**.

Allowed values:

4
8
16
24
32
48
64
96

Reference
Material Design spacing system



# Visual Hierarchy

Pages must follow predictable structure.

Standard flow:

Hero
Primary message
Supporting content
CTA
Footer

Use whitespace and contrast to guide the user.

Reference
Nielsen Norman Group — Visual Hierarchy



# Reading Patterns

Use established reading patterns.

Text pages:

**F-pattern**

Landing pages:

**Z-pattern**

Important information should appear:

* near the top
* left aligned
* before scroll

Reference
Nielsen Norman Group — How Users Read on the Web



# Gestalt Principles

UI composition must respect

* proximity
* similarity
* continuity
* closure

Elements that belong together must appear visually grouped.

Reference
Gestalt Principles of Visual Perception



# Navigation Rules

Maximum **5–7 top-level navigation items**.

Reference
Hick’s Law

Navigation must be

* visible
* predictable
* consistent



# Interaction Rules

Touch targets must be at least

**44 × 44 px**

Reference

Fitts’s Law
Apple Human Interface Guidelines



# Typography Rules

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



# Accessibility (WCAG 2.2)

Requirements

* contrast ≥ 4.5:1
* keyboard navigation must work
* semantic HTML must be used
* images require alt text

Recommended semantic elements

nav
main
section
header
footer

Reference
WCAG 2.2 — W3C Web Accessibility Initiative



# Dark Mode

Dark mode must always be supported.

Implementation

* CSS variables
* prefers-color-scheme

Every color must have a dark mode equivalent.



# Performance

Frontend must be optimized.

Rules

* minimal JavaScript
* lazy loading images
* optimized images (WebP / AVIF)
* avoid blocking scripts

Target

page load under 2 seconds

Reference
Google Web Performance Guidelines



# Component Architecture

Use component-based architecture.

Component types

layout
navigation
form
content
feedback

Components must be

* reusable
* predictable
* consistent

Reference
Atomic Design — Brad Frost



# AI Guardrails

AI must always follow these rules.

AI shall always

* follow mobile-first layout
* reuse existing layout patterns
* follow spacing scale
* follow accessibility rules
* implement dark mode
* use existing Tailwind classes

AI shall never

* invent new layout structures
* break spacing system
* ignore accessibility
* introduce complex layouts without reason



# Mandatory UI Patterns

AI must reuse the following patterns when generating UI.

Do not invent new patterns unless explicitly requested.



## Standard Section Pattern

All sections must follow this structure.

<section class="max-w-4xl mx-auto px-4 mb-12">

H2 heading

Content block

Optional CTA or list

</section>



## Standard Hero Pattern

Hero sections must follow this pattern.

<section class="bg-green-800 dark:bg-green-700 text-white py-10 md:py-14 px-4">

<div class="max-w-6xl mx-auto">

H1 headline
Short intro text
Primary CTA

</div>

</section>



## Standard Card Grid

Used for feature blocks.

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

cards

</div>

Card component

<div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm">

card content

</div>



## Standard CTA Button

Primary CTA

<a class="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full min-h-[44px]">

CTA text

</a>

CTA text must start with a verb.

Examples

Book bane
Se treningstilbud
Kontakt klubben



# Content Writing Specification for AI

Based on

Plain Language Guidelines
Nielsen Norman Group research
GOV.UK Content Design
Information Foraging Theory
Cognitive Load Theory



# Core Writing Principles

AI must prioritize

clarity
brevity
structure
readability
user needs

If a sentence can be simpler simplify it.



# Plain Language

Use simple language.

Rules

* short sentences
* common words
* avoid jargon
* active voice

Example

Bad
Det anbefales at brukeren gjennomfører autentisering før systemets funksjonalitet tas i bruk.

Good
Logg inn før du bruker tjenesten.

Reference
Plain Language Guidelines



# Inverted Pyramid

Most important information first.

Structure

key information
explanation
details

Reference
Nielsen Norman Group



# Scannable Content

Users scan pages.

Rules

* short paragraphs
* headings
* bullet lists
* highlight key information

Paragraph length

max 3–5 lines



# Heading Hierarchy

H1 page title
H2 sections
H3 subsections

Only one H1 per page.

Reference
W3C semantics



# Information Scent

Links must describe action.

Bad
Les mer

Good
Se ledige timer

Reference
Information Foraging Theory — Peter Pirolli



# Microcopy

UI text must be

* clear
* short
* helpful

Example

Bad
Error occurred

Good
E-postadressen er ugyldig

Reference
Google UX Writing



# Reading Level

Target readability

8–9th grade level

Use

* short sentences
* simple words

Reference
Flesch readability research



# Cognitive Load

Reduce mental effort.

Rules

* one idea per paragraph
* short paragraphs
* logical structure

Reference
Cognitive Load Theory — John Sweller



# Content Structure

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



# Accessibility in Text

Rules

* descriptive links
* avoid “click here”
* alt text on images
* explain abbreviations

Reference
WCAG 2.2



# Call-to-Action Writing

CTA text must start with a verb.

Bad
Submit

Good
Book bane



# Tone of Voice

Tone must be

* friendly
* clear
* direct

Avoid bureaucratic language.

Reference
GOV.UK Tone of Voice Guidelines




# Final Rules

Touch targets must always be

`min-h-[44px]`

Dark mode must exist for **all colors**.

CTA text must start with a verb.

Examples

Book bane
Se treningsplan
Send mail
