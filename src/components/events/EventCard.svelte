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
  const allTimes = $derived([...new Set(event.courtGroups.flatMap((g) => g.times))]);
  const allCourtNames = $derived([...new Set(event.courtGroups.flatMap((g) => g.courtNames))]);
  const scheduleLine = $derived(formatScheduleLine(event.weekdays, allTimes));
  const courtLine = $derived(formatNaturalList(allCourtNames));
  const signupStatus = $derived(formatSignupStatus(event.allowsSignup, event.signupCount));
</script>

<li>
  <article class="flex flex-col gap-5 py-8">
    <div>
      <h3 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">
        {event.title}
      </h3>
      <div class="mt-2 flex flex-wrap items-center gap-2">
        <span
          class="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400"
        >
          {dateRange}
        </span>
        {#if showCategory}
          <span
            class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          >
            {event.category}
          </span>
        {/if}
      </div>
    </div>

    <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
      {#if scheduleLine}
        <p>{scheduleLine}</p>
      {/if}
      {#if courtLine}
        <p class="text-gray-500 dark:text-gray-400">{courtLine}</p>
      {/if}
      <p class="text-gray-500 dark:text-gray-400">{signupStatus}</p>
    </div>

    {#if event.description}
      <div class="event-description">
        {@html event.description}
      </div>
    {/if}
  </article>
</li>

<style>
  .event-description :global(*:first-child) {
    margin-top: 0;
  }

  .event-description :global(*:last-child) {
    margin-bottom: 0;
  }

  .event-description :global(h1),
  .event-description :global(h2),
  .event-description :global(h3),
  .event-description :global(h4) {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    color: #111827;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
  }

  .event-description :global(p) {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: #4b5563;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .event-description :global(ul),
  .event-description :global(ol) {
    padding-left: 1.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .event-description :global(ul) {
    list-style-type: disc;
  }

  .event-description :global(ol) {
    list-style-type: decimal;
  }

  .event-description :global(li) {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: #4b5563;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .event-description :global(li > p) {
    margin: 0;
  }

  .event-description :global(blockquote) {
    border-left: 4px solid var(--color-brand-600);
    padding-left: 1.25rem;
    color: #374151;
    font-size: 1.125rem;
    font-style: italic;
    line-height: 1.625;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .event-description :global(strong) {
    font-weight: 600;
    color: #1f2937;
  }

  @media (prefers-color-scheme: dark) {
    .event-description :global(h1),
    .event-description :global(h2),
    .event-description :global(h3),
    .event-description :global(h4) {
      color: #f3f4f6;
    }

    .event-description :global(p) {
      color: #9ca3af;
    }

    .event-description :global(li) {
      color: #9ca3af;
    }

    .event-description :global(blockquote) {
      border-left-color: var(--color-brand-500);
      color: #d1d5db;
    }

    .event-description :global(strong) {
      color: #e5e7eb;
    }
  }
</style>
