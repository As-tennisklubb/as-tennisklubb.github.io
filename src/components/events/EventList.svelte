<script lang="ts">
  import { onMount } from "svelte";
  import { mapPublicEvent, type PublicClubEvent } from "../../lib/events/mapPublicEvent";
  import EventCard from "./EventCard.svelte";

  const API_URL = `${import.meta.env.PUBLIC_API_BASE_URL}/api/offentlig/klubb/aas-tennisklubb/arrangementer`;

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
{:else}
  <ul class="divide-y divide-gray-100 dark:divide-gray-700" aria-label="Arrangementsliste">
    {#each events as event (event.id)}
      <EventCard {event} />
    {/each}
  </ul>
{/if}
