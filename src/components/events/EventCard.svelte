<script lang="ts">
  import type { PublicClubEvent } from "../../lib/events/mapPublicEvent";
  import {
    formatSignupStatus,
    formatPresentation,
  } from "../../lib/events/formatEvent";

  let { event }: { event: PublicClubEvent } = $props();

  const pLines = $derived(formatPresentation(event.presentation));
  const showCategory = $derived(event.category !== event.title);
  const signupStatus = $derived(formatSignupStatus(event.allowsSignup, event.signupCount));
</script>

<li>
  <article class="flex flex-col gap-4 py-6">
    <div>
      <h3 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">
        {event.title}
      </h3>
      {#if showCategory}
        <span
          class="mt-1.5 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400"
        >
          {event.category}
        </span>
      {/if}
    </div>

    <div class="space-y-0.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      <p class="font-medium text-gray-900 dark:text-gray-100">{pLines.date}</p>
      {#if pLines.schedule}
        <p class="flex items-center gap-1.5">
          <svg class="size-3.5 shrink-0 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>{pLines.schedule}{#if event.presentation.hasDeviatingSlots}{' '}<span class="text-gray-400 dark:text-gray-500">(varierer)</span>{/if}</span>
        </p>
      {/if}
      {#if pLines.courts}
        <p class="flex items-center gap-1.5">
          <svg class="size-3.5 shrink-0 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{pLines.courts}</span>
        </p>
      {/if}
      {#if event.allowsSignup}
        <a
          href={event.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-400"
        >
          <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>{signupStatus}</span>
        </a>
      {:else}
        <p class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
          <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>{signupStatus}</span>
        </p>
      {/if}
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
