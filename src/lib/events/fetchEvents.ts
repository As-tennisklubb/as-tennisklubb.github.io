import { mapPublicEvent, type PublicClubEvent } from "./mapPublicEvent";

const API_URL = `${import.meta.env.PUBLIC_API_BASE_URL}/api/offentlig/klubb/aas-tennisklubb/arrangementer`;

export async function fetchUpcomingEvents(): Promise<PublicClubEvent[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return [];

    const data = await response.json();
    return (Array.isArray(data) ? data : [])
      .map(mapPublicEvent)
      .filter((e) => !e.isPast)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
  } catch {
    console.warn(`[fetchEvents] Kunne ikke nå API (${API_URL}) – returnerer tom liste.`);
    return [];
  }
}
