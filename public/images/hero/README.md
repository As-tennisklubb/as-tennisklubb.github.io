# Hero-bilder

Legg hero-bilder her. Et tilfeldig bilde velges ved hvert sidebesøk (kun på desktop, md: 768px+).

## Slik legger du til et nytt bilde

1. Legg bildefilen her: `public/images/hero/4.jpg` (eller .webp)
2. Legg til stien i arrayen i `src/pages/index.astro`:
   ```js
   const heroImages = [
     `${base}images/hero/1.jpg`,
     `${base}images/hero/2.jpg`,
     `${base}images/hero/3.jpg`,
     `${base}images/hero/4.jpg`,  // ← nytt bilde
   ];
   ```

## Bildeanbefalinger

- **Format**: WebP anbefales (minst filstørrelse). JPEG fungerer fint.
- **Størrelse**: 1600×900px eller bredere. Optimer til maks ~250 KB på squoosh.app
- **Motiv**: Tennisbane, spill, utemiljø – helst i godt lys
- **Komposisjon**: Motiv gjerne til høyre – gradienten dekker venstre side for tekst

## Hvorfor ser ulike bilder like «merkevaredige» ut?

Et gradient-overlay (`from-green-900/90 → to-green-900/30`) legger seg over bildet.
Alle bilder får samme grønne tone → helhetlig stil uansett fotograf eller lysforhold.
