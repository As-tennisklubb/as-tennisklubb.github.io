<script lang="ts">
  import type { PublicClubEvent } from "../../lib/events/mapPublicEvent";
  import {
    formatDateRange,
    formatSignupStatus,
    formatNaturalList,
    formatScheduleLine,
  } from "../../lib/events/formatEvent";

  let { event }: { event: PublicClubEvent } = $props();

  const dateRange = $derived(formatDateRange(event.startDate, event.endDate));
  const showCategory = $derived(event.category !== event.title);
  const slotMinutes = $derived(event.courtGroups[0]?.slotLengthMinutes ?? null);
  const allTimes = $derived([...new Set(event.courtGroups.flatMap((g) => g.times))]);
  const allCourtNames = $derived([...new Set(event.courtGroups.flatMap((g) => g.courtNames))]);
  const scheduleLine = $derived(formatScheduleLine(event.weekdays, allTimes));
  const courtLine = $derived(formatNaturalList(allCourtNames));
  const signupStatus = $derived(formatSignupStatus(event.allowsSignup, event.signupCount));
</script>

<li>
  <div
    class="flex flex-col gap-3 rounded-xl border border-brand-100 bg-brand-50 px-6 py-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
  >
    <div>
      <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
        {event.title}
        {#if slotMinutes}
          <span class="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400"
            >({slotMinutes} min)</span
          >
        {/if}
      </h3>
      <p class="mt-1 text-sm text-brand-700 dark:text-brand-400">
        {dateRange}{showCategory ? ` · ${event.category}` : ""}
      </p>
    </div>

    {#if event.description}
      <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{event.description}</p>
    {/if}

    {#if scheduleLine || courtLine}
      <div class="space-y-0.5 text-sm text-gray-700 dark:text-gray-300">
        {#if scheduleLine}
          <p>{scheduleLine}</p>
        {/if}
        {#if courtLine}
          <p class="text-gray-500 dark:text-gray-400">{courtLine}</p>
        {/if}
      </div>
    {/if}

    <p class="text-xs text-gray-500 dark:text-gray-400">{signupStatus}</p>
  </div>
</li>
