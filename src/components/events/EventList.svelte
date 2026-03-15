<script lang="ts">
  import { onMount } from "svelte";
  import { mapPublicEvent, type PublicClubEvent } from "../../lib/events/mapPublicEvent";
  import EventCard from "./EventCard.svelte";

  const API_URL =
    "https://banebooking-voyager.fly.dev/api/offentlig/klubb/aas-tennisklubb/arrangementer";

  let events: PublicClubEvent[] = $state([]);
  let loading = $state(true);
  let error = $state(false);

  onMount(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`${response.status}`);

      const data = await response.json();
      events = (Array.isArray(data) ? data : [])
        .map(mapPublicEvent)
        .filter((e) => !e.isPast)
        .sort((a, b) => a.startDate.localeCompare(b.startDate));
    } catch {
      error = true;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div
    class="rounded-xl border border-brand-200 bg-brand-50 p-6 text-sm text-gray-700 dark:border-brand-800 dark:bg-gray-800 dark:text-gray-300"
  >
    Laster arrangementer…
  </div>
{:else if error}
  <div
    class="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-sm text-gray-700 dark:border-yellow-700 dark:bg-gray-800 dark:text-gray-300"
  >
    Kunne ikke hente arrangementer akkurat nå. Prøv igjen litt senere.
  </div>
{:else if events.length === 0}
  <div
    class="rounded-xl border border-brand-200 bg-brand-50 p-6 text-sm text-gray-700 dark:border-brand-800 dark:bg-gray-800 dark:text-gray-300"
  >
    <p class="mb-1 font-medium text-gray-800 dark:text-gray-100">Ingen kommende arrangementer</p>
    <p>
      Det er ingen kommende arrangementer akkurat nå. Følg med her for dugnader, turneringer og
      andre aktiviteter i klubben.
    </p>
  </div>
{:else}
  <ul class="space-y-6" aria-label="Arrangementsliste">
    {#each events as event (event.id)}
      <EventCard {event} />
    {/each}
  </ul>
{/if}
