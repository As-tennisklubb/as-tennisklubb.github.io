# Komponentbibliotek

## Grunnregler

1. **Foretrekk komponenter** fremfor inline Tailwind n�r en komponent dekker behovet.
2. **Sider beskriver innhold; komponenter eier presentasjon.** En side skal lese som en innholdsstruktur, ikke som et CSS-dokument.
3. **`class` er en escape hatch, ikke hoved-API.** Bruk den for sm� layout-justeringer (margin, alignment), ikke for � omdefinere komponentens utseende.
4. **Hvis samme override dukker opp flere steder, utvid komponenten** med en prop eller variant i stedet.
5. **Bruk rollebaserte fargetokens** (`brand-*`, `accent-*`). Aldri r� `green-*` eller `orange-*`.

> Alle komponenter st�tter `class` prop for kontekstspesifikke tilpasninger.
> Klasser merges med `tailwind-merge` (via `cn()`), s� utilities kan overstyre base-verdier.
> `class` skal ikke brukes til � omdefinere komponentens grunnleggende visuelle uttrykk.

---

## N�r lage ny komponent

**Lag ny komponent n�r:**

- Samme Tailwind-m�nster gjentas 2-3+ steder
- Markup representerer et tydelig konsept med eget navn
- Styling b�r v�re konsekvent p� tvers av sider

**Lag ikke ny komponent n�r:**

- Behovet er engangsbruk
- Variasjonen er for stor til at et API gir mening
- En enkel wrapper eller eksisterende komponent er nok

---

## Tillatte class-overrides

**Vanligvis OK:**

- Margin (`mb-4`, `mt-6`)
- Alignment (`text-right`, `text-center`)
- Intern layout (`flex`, `gap-*`, `items-center`)
- Max-width (`max-w-md`, `max-w-xl`)

**B�r normalt ikke overstyres via class:**

- Farger � velg riktig variant/token
- Padding � innebygd i komponenten
- Border-radius � innebygd i komponenten
- Shadows � innebygd i komponenten
- Komponentens grunnleggende visuelle uttrykk

Hvis du gjentatte ganger overstyrer det samme, er det et signal om at komponenten trenger en ny variant.

---

## Fargetokens

Alle farger bruker rollebaserte tokens definert i `@theme` (global.css). **Ikke bruk r� `green-*` eller `orange-*`.**

| Token      | Rolle                                                            | Brukes av                                                                        |
| ---------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `brand-*`  | **Primary.** Knapper, lenker, headings, hero-bakgrunn, UI states | Button primary/outline/ghost, `.link`, SectionHeading, HeroSection, Callout info |
| `accent-*` | **Secondary.** Visuell aksent, sekund�r CTA, feature-kort        | Button secondary, LinkCard, Layout "Bli medlem"                                  |

`accent` er **sekund�r vekt** � ikke alt viktig skal bli accent. Bruk den bevisst for � skille navigasjons-CTAer og feature-elementer fra prim�r UI.

N�ytrale farger (`gray-*`, `yellow-*`) bruker Tailwind defaults.

Bytt profil ved � endre `--color-brand-*` og/eller `--color-accent-*` i `@theme` � resten f�lger automatisk.

---

## Typografihierarki

| Niv�       | Element                                     | Typisk bruk                                                                  |
| ---------- | ------------------------------------------- | ---------------------------------------------------------------------------- |
| Side-h1    | `<h1>` i HeroSection eller Layout pageTitle | �n per side. `text-3xl md:text-4xl` (standard) eller `md:text-5xl` (landing) |
| Section-h2 | SectionHeading / PageSection `title`        | `text-2xl font-bold text-brand-800 dark:text-brand-300`                      |
| Kort-h3    | `<h3>` inne i Card/NewsCard                 | `text-lg font-semibold`                                                      |
| Br�dtekst  | `<p>` i RichTextBlock                       | Styres av `prose` � ikke sett tekstst�rrelse manuelt                         |
| Metadata   | Badge, ArticleMeta, fotnoter                | `text-xs` eller `text-sm`                                                    |

---

## Tilgjengelighet

- **CTA-tekst skal starte med et verb** � "Book bane", "Se treningsplan", "Send mail"
- **Touch target minimum 44x44px** � alle Button og `.link`-elementer har `min-h-[44px]`
- **Fokus-indikator** beholdes � `focus-visible` er satt globalt i CSS
- **Klikkbare kort** (NewsCard, LinkCard) har tydelig hover- og focus-state
- **Semantisk HTML** � `<nav>`, `<main>`, `<section>`, `<article>` brukes korrekt i Layout

---

## Layout-komponenter

### Container

Sentrert innholdswrapper med maks-bredde og horisontal padding.

| Prop     | Type                                  | Default     | Beskrivelse                                                     |
| -------- | ------------------------------------- | ----------- | --------------------------------------------------------------- |
| `size`   | `"content"` \| `"wide"` \| `"narrow"` | `"content"` | `content` = max-w-4xl, `wide` = max-w-6xl, `narrow` = max-w-3xl |
| `padded` | `boolean`                             | `false`     | Legger til standard vertikal sidepadding (`py-12`)              |

```astro
<Container padded>...</Container>
<Container size="wide">...</Container>
```

**Bruk** for all sideinnhold som trenger sentrering og maks-bredde.
**Ikke bruk** inne i komponenter som allerede har Container (f.eks. HeroSection).

---

### HeroSection

Brand-farget hero-banner med Container inni.

| Prop   | Type                                  | Default  | Beskrivelse               |
| ------ | ------------------------------------- | -------- | ------------------------- |
| `size` | `"content"` \| `"wide"` \| `"narrow"` | `"wide"` | Bredde p� indre Container |

```astro
<HeroSection>
  <h1 class="mb-3 text-3xl font-bold md:text-5xl">Tittel</h1>
  <p class="max-w-md text-base text-brand-200 md:text-lg">Undertekst</p>
  <Button variant="ghost" href="/side" class="mt-6">Handling</Button>
</HeroSection>
```

**Bruk** for forsider, landingssider og feilsider med tilpasset hero-innhold.
**Ikke bruk** for vanlige innholdssider � de bruker Layout sin `pageTitle`/`pageDescription` prop.

---

### PageSection

Innholdsseksjon med standard bunnmargin og valgfri overskrift.

| Prop    | Type             | Default | Beskrivelse                                     |
| ------- | ---------------- | ------- | ----------------------------------------------- |
| `title` | `string`         | �       | Valgfri overskrift (rendres som SectionHeading) |
| `icon`  | Lucide-komponent | �       | Valgfritt ikon ved siden av tittelen            |
| `id`    | `string`         | �       | HTML id for ankerlinking                        |

```astro
<PageSection title="Prisliste" icon={CreditCard}>...</PageSection>
```

**Bruk** for alle innholdsseksjoner innenfor en side. Gir konsekvent `mb-12`.
**Ikke bruk** inne i layouts der parent allerede styrer vertikal spacing med `space-y-*` � bruk bare `<section>` + `<SectionHeading>` der.

---

### SectionHeading

Brand-farget h2-overskrift med valgfritt ikon. Vanligvis brukt automatisk via PageSection sin `title` prop.

| Prop    | Type             | Default     | Beskrivelse                       |
| ------- | ---------------- | ----------- | --------------------------------- |
| `title` | `string`         | **p�krevd** | Overskriftstekst                  |
| `icon`  | Lucide-komponent | �           | Ikon vist til venstre for teksten |

**Bruk direkte** bare n�r du trenger h2 uten PageSection-wrapping (f.eks. `space-y`-layouts).
**Foretrekk** PageSection sin `title` prop i de fleste tilfeller.

---

### CardGrid

Responsiv grid for kort og lignende elementer.

| Prop   | Type       | Default | Beskrivelse                                   |
| ------ | ---------- | ------- | --------------------------------------------- |
| `cols` | `2` \| `3` | `3`     | `3` gir 2 ved md, 3 ved lg. `2` gir 2 ved md. |

```astro
<CardGrid cols={3}>
  <NewsCard ... />
  <NewsCard ... />
  <NewsCard ... />
</CardGrid>
```

**Bruk** for jevne grids med kort.
**Ikke bruk** for ujevne grids � bruk Tailwind grid-klasser direkte.

---

## UI-komponenter

### Button

CTA-knapp eller -lenke med 44px minimum touch target.

| Prop      | Type                                                                      | Default     | Beskrivelse                               |
| --------- | ------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `variant` | `"primary"` \| `"secondary"` \| `"outline"` \| `"ghost"` \| `"highlight"` | `"primary"` | Se varianter                              |
| `href`    | `string`                                                                  | �           | Rendrer som `<a>` i stedet for `<button>` |

St�tter alle standard HTML-attributter via rest-spread.

| Variant     | Tone                                    | N�r                                          |
| ----------- | --------------------------------------- | -------------------------------------------- |
| `primary`   | `brand` fyllt                           | Standard CTA                                 |
| `secondary` | `accent` fyllt                          | Viktig sekund�r CTA ("Bli medlem")           |
| `outline`   | `brand` kant (m/ dark mode)             | Sekund�r handling (mail, pr�vespill)         |
| `ghost`     | Transparent m/ `brand`-kant, hvit tekst | P� m�rk bakgrunn (hero)                      |
| `highlight` | `yellow` fyllt                          | Ekstra promotert handling � **bruk sjelden** |

**CTA-tekst skal starte med et verb.**
**Ikke bruk class-override for farger** � velg riktig variant.
`highlight` er reservert for sjeldne, sv�rt promoterte handlinger. Ikke bruk den som "enda en oransje knapp".

---

### Badge

Liten pille for metadata som dato og kategori.

| Prop      | Type                                    | Default     | Beskrivelse                                                         |
| --------- | --------------------------------------- | ----------- | ------------------------------------------------------------------- |
| `variant` | `"default"` \| `"date"` \| `"category"` | `"default"` | `date` = brand-tonet, `category` = gr�, `default` = n�ytral m/ kant |

**Bruk** for nyhetskort-metadata, artikkelinfo og lignende tags.

---

### Card

N�ytral innholdswrapper med hvit bakgrunn, skygge og padding. **Ikke klikkbar.**

```astro
<Card>
  <h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">Tittel</h3>
  <p class="text-sm text-gray-600 dark:text-gray-400">Beskrivelse</p>
</Card>
```

**Bruk** for frittst�ende informasjonsblokker (utstyr, fasiliteter etc.).
**Ikke bruk** for klikkbare kort � bruk NewsCard eller LinkCard.
Card er en bevisst "dum" wrapper � den eier layout, men innholdet styres av forbrukeren.

---

### Callout

Farget informasjonsboks. Innebygd `p-6`, `rounded-xl` og `text-sm`.

| Prop      | Type                                   | Default  | Beskrivelse                                                            |
| --------- | -------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `variant` | `"info"` \| `"success"` \| `"warning"` | `"info"` | `info` = brand-tone, `success` = sterkere brand, `warning` = gul/amber |

```astro
<Callout>Enkel informasjonstekst.</Callout>
<Callout class="space-y-2">
  <p>Flere avsnitt.</p>
  <p>Merk betalingen med: <em>Navn</em>.</p>
</Callout>
```

**Bruk** for betalingsinfo, viktige merknader, kontaktdetaljer.
**Ikke send inn** `rounded-xl`, `p-6` eller `text-sm` � allerede innebygd.

---

### RichTextBlock

Prose-wrapper for l�pende tekst via `@tailwindcss/typography`.

**Bruk** for all fritekst (manuell HTML eller rendret Markdown).
**Ikke bruk** rundt strukturerte elementer som tabeller, grids eller kort.

---

### BulletList

Brand-tonet punktliste. St�tter HTML i items.

| Prop    | Type       | Default     | Beskrivelse                                 |
| ------- | ---------- | ----------- | ------------------------------------------- |
| `items` | `string[]` | **p�krevd** | Kan inneholde HTML (rendres med `set:html`) |

**Bruk** for uordnede lister. **Ikke bruk** for nummererte regler � bruk RuleList.

---

### Blockquote

Venstrekant-sitat med valgfri kilde.

| Prop   | Type     | Default | Beskrivelse                   |
| ------ | -------- | ------- | ----------------------------- |
| `cite` | `string` | �       | Kildehenvisning under sitatet |

**Bruk** for ingresser, sitater og pull quotes.

---

### Divider

Stilisert horisontal skillelinje.

**Bruk** mellom seksjoner der PageSection sin `mb-12` ikke er �nsket (f.eks. `space-y`-layouts).

---

## Innholdskomponenter

### NewsCard

Klikkbart nyhetskort med dato-badge, overskrift og valgfri ingress. Bruker `brand`-toner.

| Prop           | Type             | Default     | Beskrivelse                                          |
| -------------- | ---------------- | ----------- | ---------------------------------------------------- |
| `href`         | `string`         | **p�krevd** | Lenke til nyhetsartikkel                             |
| `title`        | `string`         | **p�krevd** | Overskrift                                           |
| `date`         | `string`         | **p�krevd** | Formatert dato                                       |
| `categories`   | `string[]`       | `[]`        | Kategoribadges                                       |
| `excerpt`      | `string`         | �           | Ingress/beskrivelse                                  |
| `headingLevel` | `"h2"` \| `"h3"` | `"h3"`      | `h2` p� listesider, `h3` n�r nyheter er underseksjon |
| `clampLines`   | `2` \| `3`       | `2`         | Maks linjer for excerpt                              |

---

### LinkCard

Klikkbart navigasjonskort med `accent`-tone. Tittel, beskrivelse og CTA-lenketekst.

| Prop          | Type     | Default     | Beskrivelse       |
| ------------- | -------- | ----------- | ----------------- |
| `href`        | `string` | **p�krevd** | Destinasjonslenke |
| `title`       | `string` | **p�krevd** | Korttittel        |
| `description` | `string` | **p�krevd** | Kort beskrivelse  |
| `linkText`    | `string` | **p�krevd** | CTA-tekst nederst |

**Bruk** for navigasjonskort p� forsiden.

---

### ArticleMeta

Metadata-rad for nyhetsartikler. **Bruk** kun i `nyheter/[id].astro`.

### AttachmentList

Nedlastingslenker for vedlegg. **Bruk** kun i `nyheter/[id].astro`.

### ResponsiveDataList

Veksler mellom mobil-kort (`slot="mobile"`) og desktop-tabell (`slot="desktop"`) ved `md`. Bruk `.data-card` for mobilkort og `.data-table` for tabeller.

### RuleList

Nummerert regelliste med brand-tonede nummerbadges. `rules: string[]`.

### LazyMap

Google Maps-embed som lastes ved klikk (ytelse/personvern). **Bruk** kun p� banesiden.

---

## CSS-klasser (global.css)

| Klasse            | Beskrivelse                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| `.link`           | Brand-lenke (`brand-700`, hover-underline, `brand-400` i dark)          |
| `.link-accent`    | Aksentlenke (`accent-700`, hover-underline) � for feature-flater        |
| `.surface-brand`  | Brand-bakgrunnsflate                                                    |
| `.surface-accent` | Aksent-bakgrunnsflate                                                   |
| `.data-table`     | Komplett tabellstyling � legg p� `<table>`, alt under styles automatisk |
| `.data-card`      | Kompakt kort for mobile data-visninger i ResponsiveDataList             |

---

## Spacing-referanse

| Form�l                | Verdi            | Kontrollert av       |
| --------------------- | ---------------- | -------------------- |
| Side vertikal padding | `py-12`          | `<Container padded>` |
| Seksjonsavstand       | `mb-12`          | `<PageSection>`      |
| Kortgrid gap          | `gap-6`          | `<CardGrid>`         |
| Hero padding          | `py-10 md:py-14` | `<HeroSection>`      |

---

## Regler for sidemarkup

### Skal alltid bruke komponenter

| Behov            | Komponent                | Ikke skriv inline                 |
| ---------------- | ------------------------ | --------------------------------- |
| Sidecontainer    | `<Container padded>`     | `max-w-4xl mx-auto px-4 py-12`    |
| Seksjonsdeling   | `<PageSection>`          | `<section class="mb-12">`         |
| CTA-knapper      | `<Button variant="...">` | Inline knapp-klasser              |
| Prose-innhold    | `<RichTextBlock>`        | `prose prose-brand ...`           |
| Punktliste       | `<BulletList>`           | `<ul>` med manuell bullet-styling |
| Informasjonsboks | `<Callout>`              | Inline alert/info-styling         |
| Kort-grid        | `<CardGrid>`             | `grid gap-6 md:grid-cols-*`       |

### OK � style inline

- Sm�skala-spacing (`mb-2`, `mb-4`, `mt-6`)
- Intern flex-layout (`flex`, `gap-*`, `items-center`)
- Tekstvarianter (`font-semibold`, `text-xs`)
- Dark-mode inline for sm�, lokale unntak � flytt inn i komponent hvis det gjentas

### Ikke OK inline

- Brand-farger for seksjoner � bruk HeroSection eller Callout
- Knapp-styling � bruk Button med riktig variant
- Callout-overrides (`rounded-xl`, `p-6`, `text-sm`) � allerede innebygd
- Tabellstyling � bruk `.data-table`
- Lenkefarger � bruk `.link` eller `.link-accent`
