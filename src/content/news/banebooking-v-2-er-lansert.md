---
title: Klubben tar i bruk Banebooking v2
date: 2026-03-13
ingress: Klubben har tatt i bruk en ny versjon av bookingsystemet for
  banereservasjon. Den nye løsningen erstatter det tidligere systemet, som etter
  mange år i drift begynte å bli teknisk utdatert og vanskelig å videreutvikle.
cover: /uploads/banebooking-v2.png
draft: false
---

Klubben har nylig tatt i bruk **Banebooking v2**, en ny versjon av bookingsystemet for reservasjon av tennisbaner. Systemet er utviklet for å erstatte den tidligere løsningen, som over tid hadde blitt vanskeligere å vedlikeholde og videreutvikle.

Den gamle løsningen hadde vært i bruk i mange år og fungerte i praksis bra, men teknologien den var bygget på begynte etter hvert å bli utdatert. Det gjorde det mer krevende å gjøre endringer, rette feil og legge til nye funksjoner. Derfor ble det besluttet å utvikle en ny løsning basert på mer moderne teknologi.

Den nye løsningen er bygget på en moderne teknologistakk. Bookingappen kjører på **Cloudflare Pages** med egendefinert domene [banebooking.aastk.no](https://banebooking.aastk.no/aas-tennisklubb). Backend-tjenestene som håndterer bookinglogikk og API-kall kjøres på [**Fly.io**](http://Fly.io), mens data som brukere, baner og reservasjoner lagres i **Supabase**, som er en skybasert databaseplattform.

Denne oppdelingen gjør systemet enklere å drifte og videreutvikle fremover. Samtidig gjør det det mulig å bygge videre på løsningen dersom klubben på sikt ønsker nye funksjoner eller integrasjoner.

Banebooking v2 vil bli videreutviklet gradvis fremover, og eventuelle forbedringer eller justeringer vil bli gjort etter hvert som systemet tas i bruk.
