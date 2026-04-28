# Flergrens-implementasjon: Tennis, Bordtennis og Padel

Ås Tennisklubb utvider tilbudet fra kun tennis til tre idretter:

- **Tennis** – Tre grusbaner ved Ås stadion (april–november)
- **Bordtennis** – Innendørsbane på Holstad skole (hele året)
- **Padel** – To utendørsbaner for medlemmer (klare juni/juli 2026)

Denne planen dekker endringer i tekst, visuell differensiering og datakildene på tvers av `website` og `banebooking-voyager`.

---

## Fase 1: Design-tokens for tre idretter

**Repo:** `website`  
**Fil:** `src/styles/global.css`

- [x] Definer sport-fargepaletter i `@theme`-blokken:
  - Tennis → eksisterende brand (grønn)
  - Bordtennis → ny blåfamilie (`--color-sport-blue-*`)
  - Padel → eksisterende accent (oransje)
- [x] Opprett semantiske tokens i `:root`:
  - `--aastk-sport-tennis-bg`, `--aastk-sport-tennis-text`, `--aastk-sport-tennis-border`
  - `--aastk-sport-bordtennis-bg`, `--aastk-sport-bordtennis-text`, `--aastk-sport-bordtennis-border`
  - `--aastk-sport-padel-bg`, `--aastk-sport-padel-text`, `--aastk-sport-padel-border`
- [x] Dark mode-overrides for alle sport-tokens

---

## Fase 2: SportBadge-komponent

**Repo:** `website`  
**Ny fil:** `src/components/ui/SportBadge.astro`

- [x] Opprett komponent med prop `sport: "tennis" | "bordtennis" | "padel"`
- [x] Pill-formet badge med sport-spesifikk bakgrunn/tekst fra tokens
- [x] Emoji-ikon per sport (🎾 / 🏓 / 🏸) – Lucide har ingen racket-ikoner
- [x] Støtter `class`-prop for layout-justeringer
- [x] Verifiser light + dark mode (`astro check` – 0 errors)

---

## Fase 3: Backend – eksponer gren i offentlig API

**Repo:** `banebooking-voyager`

- [x] **`Dtos/Responses/Arrangement/ArrangementResponser.cs`** – Lagt til `GrenNavn` og `GrenSlug` på `OffentligArrangementRespons`
- [x] **`Mapping/ArrangementMappingExtensions.cs`** – Mapper `arrangement.Gren.Navn` → `GrenNavn` og `arrangement.Gren.Slug` → `GrenSlug`
- [x] **`Tjenester/ArrangementService.cs`** – Lagt til `.Include(a => a.Gren)` i `HentArrangementerMedBookingerAsync`
- [x] Eksisterende tester passerer (8/8 ArrangementMapping-tester OK)
- [ ] Eventuelt legg til test for at gren-data er med i offentlig respons

---

## Fase 4: Website – konsumer gren-data fra API

**Repo:** `website`

- [x] **`src/lib/events/mapPublicEvent.ts`** – Lagt til `grenNavn` og `grenSlug` i `PublicClubEvent`-type og mapping (fallback til "Tennis"/"tennis")
- [x] **`src/components/content/EventCard.astro`** – Viser `SportBadge` basert på `event.grenSlug`
- [x] **`src/pages/arrangementer/[id].astro`** – Viser sport-badge i metadata-seksjonen ved siden av dato-pill

---

## Fase 5: Nyheter – sport-kategori med visuell differensiering

**Repo:** `website`

- [x] **`src/components/content/NewsCard.astro`** – Splitter kategorier i sport-badges og vanlig tekst, viser `SportBadge` for tennis/bordtennis/padel
- [x] **`src/components/content/ArticleMeta.astro`** – Vis sport-badge for sport-kategorier, behold vanlig tekst for øvrige
- [x] **`src/pages/nyheter/[id].astro`** – Sport-badge i artikkelvisningen (følger automatisk fra ArticleMeta-endring)
- [x] Oppdater frontmatter på eksisterende nyheter:
  - [x] `onsker-du-a-spille-bordtennis-i-vinter.md` → categories: `bordtennis`
  - [x] `2026-04-11-tennissesongen-2026-er-i-gang.md` → categories: `tennis`
  - [x] `koronavettregler-for-tennis-og-padel-per-6-april-2020.md` → categories: `tennis`, `padel`
  - [x] Gjennomgått alle nyheter: 43 tennis-artikler kategorisert, 21 generelle/admin-artikler renset for «ukategorisert»

---

## Fase 6: Oppdater sidetekster – reflekter tre idretter

**Repo:** `website`

### index.astro (forsiden)

- [x] Hero-tittel: «Tennis, bordtennis og padel i Ås»
- [x] Hero-beskrivelse: «Grusbaner, bordtennis innendørs og padelbaner – for alle nivåer.»
- [x] Ingress under «Nytt fra klubben»: «Siste nytt om tennis, bordtennis og padel i klubben.»

### baner.astro

- [x] PageHeader oppdatert: «Tennis, bordtennis og padel – både ute og inne.»
- [x] «Utenom sesongen» → «Utenom tennissesongen» med info om bordtennis hele året
- [ ] Se **Fase 7** for full omstrukturering med dedikerte seksjoner

### medlemskap.astro

- [x] Meta-description oppdatert med alle tre idretter
- [x] «Hva får du som medlem?»-tekst: Tre punkter for tennis, bordtennis og padel
- [x] Padel spesifisert: «Bruk to utendørs padelbaner fritt i sommerhalvåret.»

### om-klubben.astro

- [x] Meta-description og PageHeader oppdatert
- [x] «Om oss»: Nevner grusbaner, bordtennis på Holstad og padelbaner
- [x] «Klubbmiljø»: «bredden – både i alder og idretter»
- [x] «Aktiviteter gjennom året»: Bordtennis hele året, padel i sommerhalvåret
- [x] «Bli med»: «spill tennis, bordtennis eller padel fra kr 500,-»

### arrangementer.astro

- [x] Meta-description, PageHeader og ingress oppdatert med alle tre idretter

### english.astro

- [x] Meta-description og PageHeader: «Tennis, table tennis and padel – for all ages and levels.»
- [x] «About the club»: Indoor table tennis year-round, two outdoor padel courts in summer
- [x] Membership: «use the facilities» i stedet for «use the courts»
- [x] Events: «across tennis, table tennis and padel»
- [x] Contact: «facilities» i stedet for «courts»

### kontakt.astro

- [x] «Generelle henvendelser»: Lagt til «baner» i spørsmålslisten

---

## Fase 7: Baner – oversiktsside med undersider per idrett

**Repo:** `website`

Omstrukturert fra én lang side til oversikt + tre undersider.

### Navigasjon:

- [x] Menylenke endret fra «Spill tennis» → «Baner og anlegg» (nav + footer i Layout.astro)

### `/baner` – oversiktsside:

- [x] `src/pages/baner.astro` – Kompakt side med tre SportBadge-merkede kort (HGrid)
- [x] Hvert kort lenker til dedikert underside
- [x] Felles «Bli medlem»-knapp

### `/baner/tennis` – detaljside:

- [x] `src/pages/baner/tennis.astro` – Baneoversikt, booking, praktisk info, reglement, kart
- [x] SportBadge i PageHeader actions-slot
- [x] Lenke til bordtennis under «Utenom sesongen»

### `/baner/bordtennis` – detaljside:

- [x] `src/pages/baner/bordtennis.astro` – Om tilbudet, tilgang (Rolf Otto Østenstad), kart
- [x] Holstad skole, hele året, krever medlemskap

### `/baner/padel` – detaljside:

- [x] `src/pages/baner/padel.astro` – Om tilbudet, DataTable med status
- [x] «Klare juni/juli 2026» – kan oppdateres til normal info når klare

---

## Fase 8: Filtrering/gruppering (valgfritt, fase 2)

Utvidelser som kan vurderes etter at grunnarbeidet er ferdig:

- [ ] Filtrer arrangementer per idrett (tab-bar eller select-komponent)
- [ ] Filtrer nyheter per sport-kategori
- [ ] Sport-ikon eller -indikator i navigasjon/header
- [ ] Egen landingsside per idrett (`/tennis`, `/bordtennis`, `/padel`)

---

## Avhengigheter mellom fasene

```
Fase 1 (tokens) ──→ Fase 2 (SportBadge) ──→ Fase 4 (events) + Fase 5 (nyheter)
                                                    ↑
Fase 3 (backend) ──────────────────────────────────┘

Fase 6 (tekst) og Fase 7 (baner) kan gjøres uavhengig av øvrige faser.
```

**Parallelt arbeid:**

- Fase 1 + 2 (frontend tokens/komponent) og Fase 3 (backend) kan gjøres samtidig
- Fase 6 (tekst) kan startes når som helst
- Fase 4 + 5 krever at Fase 1–3 er ferdige

---

## Notater

- Eksisterende arrangementer i backend har allerede `Gren`-kobling, men offentlig API eksponerer ikke gren-data ennå
- Nyheter bruker i dag stort sett `ukategorisert` – sport-kategorier må settes manuelt i frontmatter
- Padelbaner er ikke klare ennå (juni/juli 2026) – tekst bør reflektere dette som «kommende»
- Bordtennis-samarbeid med Ås Bordtennisklubb – avklar om dette er permanent eller sesongbasert
