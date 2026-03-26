<script lang="ts">
  import { onMount } from "svelte";
  import { mapPublicEvent, type PublicClubEvent } from "../../lib/events/mapPublicEvent";
  import EventDetail from "./EventDetail.svelte";
  import EventSummaryCard from "./EventSummaryCard.svelte";

  const API_URL = `${import.meta.env.PUBLIC_API_BASE_URL}/api/offentlig/klubb/aas-tennisklubb/arrangementer`;

  let events: PublicClubEvent[] = $state([]);
  let loading = $state(true);
  let error = $state(false);
  let selectedEvent: PublicClubEvent | null = $state(null);

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
  <p class="py-6 text-sm text-gray-500 dark:text-gray-400">Laster arrangementer…</p>
{:else if error}
  <p class="py-6 text-sm text-gray-600 dark:text-gray-400">
    Kunne ikke hente arrangementer akkurat nå. Prøv igjen litt senere.
  </p>
{:else if events.length === 0}
  <div class="py-6">
    <p class="mb-1 font-medium text-gray-800 dark:text-gray-100">Ingen kommende arrangementer</p>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Det er ingen kommende arrangementer akkurat nå. Følg med her for kurs, turneringer og
      andre aktiviteter i klubben.
    </p>
  </div>
{:else if events.length === 1}
  <EventDetail event={events[0]} />
{:else if selectedEvent}
  <div>
    <button
      type="button"
      onclick={() => (selectedEvent = null)}
      class="link mb-6 inline-flex min-h-[44px] cursor-pointer items-center gap-1 text-sm font-medium"
    >
      ← Alle arrangementer
    </button>
    <EventDetail event={selectedEvent} />
  </div>
{:else}
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Arrangementsliste">
    {#each events as event (event.id)}
      <EventSummaryCard {event} onselect={() => (selectedEvent = event)} />
    {/each}
  </div>
{/if}
