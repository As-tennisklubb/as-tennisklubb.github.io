import { mapPublicEvent, type PublicClubEvent } from "./mapPublicEvent";

const API_URL =
  "https://banebooking-voyager.fly.dev/api/offentlig/klubb/aas-tennisklubb/arrangementer";

export async function getPublicEvents(): Promise<PublicClubEvent[]> {
  const response = await fetch(API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Kunne ikke hente arrangementer: ${response.status}`);
  }

  const data = await response.json();
  const events: PublicClubEvent[] = (Array.isArray(data) ? data : []).map(mapPublicEvent);

  return events.filter((e) => !e.isPast).sort((a, b) => a.startDate.localeCompare(b.startDate));
}
