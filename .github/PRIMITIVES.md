# PRIMITIVES.md

# Ås Tennisklubb – Layout primitives inspirert av Aksel

## Formål
Dette prosjektet bruker et lettvekts, Aksel-inspirert layoutsystem bygget i Astro og Tailwind. Målet er å gjøre layout konsistent, forutsigbar, enkel å vedlikeholde og enkel for Copilot å forstå, samtidig som vi fjerner behovet for spacing-hacks.

## Grunnprinsipp
Vi bygger sider med primitives, ikke med tilfeldige wrappers, marginer og spesialkomponenter. Vi følger Aksel sine begreper 1:1 så langt Astro tillater det, slik at vi enkelt kan bruke Aksel-dokumentasjon og eksempler direkte.

## Tillatte layout-primitives
De eneste primitives som skal brukes til layout er: Page, PageBlock, HGrid, HStack, VStack og Box. Andre layout-komponenter skal ikke introduseres uten sterk grunn.

## Hvorfor vi gjør dette
Den gamle løsningen hadde inkonsistent spacing, overlappende komponentansvar, layout styrt av margin/padding hacks, dårlig desktop-opplevelse og uforutsigbare endringer. Copilot fikk også uklare signaler. Rotårsaken er manglende layout-primitives.

## Arkitekturregel
Layout styres kun av primitives. UI-komponenter styrer kun sitt eget innhold og visuelle stil. Semantiske HTML-elementer brukes for struktur. All spacing styres av parent, ikke av child.

## Primitive-definisjoner

### Page
Ansvar: Top-level wrapper for hele siden. Brukes til å etablere side-ramme og overordnet struktur. Skal ikke brukes til lokal spacing eller layout-fikser. Brukes alltid som ytterste komponent.

Eksempel:
<Page>...</Page>

### PageBlock
Ansvar: Max-width, sentrering og horisontale gutters. Dette er vår versjon av Aksel Page.Block. Brukes til å kontrollere hvor bredt innholdet er.

Skal brukes til: begrense bredde, sentrere innhold, gi jevn side-padding.
Skal ikke brukes til: vertikal spacing eller intern layout.

Eksempel:
<section>
  <PageBlock width="xl">
    ...
  </PageBlock>
</section>

### HGrid
Ansvar: Grid-basert layout for kolonner og større struktur. Erstatter CardGrid og lignende.

Skal brukes til: kolonner, kort-grid, todelte/tredelte layouts.
Skal ikke brukes til: enkel stacking.

Eksempel:
<HGrid cols={3} gap="6">
  <Card />
  <Card />
  <Card />
</HGrid>

### VStack
Ansvar: Vertikal grouping med konsistent spacing mellom elementer.

Skal brukes til: stacking av elementer i kolonne, intern rytme i seksjoner.
Skal ikke brukes til: hele side-layouten eller som erstatning for grid.

Eksempel:
<VStack gap="6">
  <Heading />
  <Text />
  <Button />
</VStack>

### HStack
Ansvar: Horisontal grouping av elementer.

Skal brukes til: knapper, actions, inline elementer.
Skal ikke brukes til: større layout (bruk HGrid i stedet).

Eksempel:
<HStack gap="4" justify="center">
  <Button />
  <Button />
</HStack>

### Box
Ansvar: Enkel wrapper for visuell styling.

Skal brukes til: padding, bakgrunn, border, radius, paneler.
Skal ikke brukes til: layout-struktur eller spacing mellom seksjoner.

Eksempel:
<Box padding="6" background="surface-subtle">
  ...
</Box>

## Viktige regler

1. All spacing styres av parent (VStack, HStack, HGrid).
2. Ikke bruk mt-*, mb-*, pt-*, pb-* for layout.
3. section er semantikk, ikke layout-motor.
4. UI-komponenter (Card, Button osv.) skal ikke styre layout.
5. Hvis noe ser feil ut, juster primitive – ikke siden.
6. Ikke lag nye layout-komponenter uten sterk grunn.
7. Ikke miks gammel og ny layout.

## Hva som er fjernet

Følgende skal fases ut og ikke brukes i ny kode:
- Container
- PageSection
- CardGrid
- CTASection
- wrapper-divs for spacing
- margin/padding hacks for layout

## Standard side-struktur

Eksempel på hvordan en side skal bygges:

<Page>
  <section>
    <PageBlock width="xl">
      <VStack gap="8">
        <Heading />
        <HGrid cols={3} gap="6">
          <Card />
          <Card />
          <Card />
        </HGrid>
        <HStack justify="center" gap="4">
          <Button />
        </HStack>
      </VStack>
    </PageBlock>
  </section>
</Page>

## Copilot-regler

Copilot skal:
- bruke kun Page, PageBlock, HGrid, HStack, VStack, Box
- bruke VStack for vertikal rytme
- bruke HGrid for kolonner
- holde UI og layout separert

Copilot skal ikke:
- bruke mt-*, mb-*, pt-*, pb-* for layout
- lage wrappers kun for spacing
- introdusere gamle komponenter
- legge layoutansvar i Card/Button

## Definisjon av suksess

Refactoren er vellykket når:
- layout er konsistent
- spacing er forutsigbar
- desktop ser riktig ut (ikke flytende)
- mobil fungerer godt
- kodebasen er enklere
- Copilot foreslår riktige mønstre
- vi ikke trenger hacks for å få ting til å se riktig ut

## Kort oppsummert

Vi går fra komponent-basert layout med blandet ansvar til primitive-basert layout med tydelig ansvar.

Dette er en strukturell refaktor, ikke bare en visuell forbedring.