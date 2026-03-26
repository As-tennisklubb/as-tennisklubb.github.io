<script lang="ts">
  import type { PublicClubEvent } from "../../lib/events/mapPublicEvent";
  import {
    formatSignupStatus,
    formatPresentation,
  } from "../../lib/events/formatEvent";
  import { sanitizeTiptapHtml } from "../../lib/events/sanitizeTiptapHtml";

  let { event }: { event: PublicClubEvent } = $props();

  const pLines = $derived(formatPresentation(event.presentation));
  const showCategory = $derived(event.category !== event.title);
  const signupStatus = $derived(formatSignupStatus(event.allowsSignup, event.signupCount));
  const cleanDescription = $derived(
    event.description ? sanitizeTiptapHtml(event.description) : "",
  );
</script>

<article>
  <h2 class="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
    {event.title}
  </h2>

  <!-- Metadata -->
  <div class="mb-6 border-b border-gray-100 pb-6 dark:border-gray-700">
    <div class="mb-3 flex flex-wrap items-center gap-3">
      <span class="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
        {pLines.date}
      </span>
      {#if showCategory}
        <span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
          {event.category}
        </span>
      {/if}
    </div>
    <div class="space-y-0.5 text-sm text-gray-600 dark:text-gray-400">
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
        <p class="flex items-center gap-1.5 text-brand-600 dark:text-brand-400">
          <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>{signupStatus}</span>
        </p>
      {:else}
        <p class="flex items-center gap-1.5">
          <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>{signupStatus}</span>
        </p>
      {/if}
    </div>
  </div>

  <!-- Beskrivelse -->
  {#if cleanDescription}
    <div class="prose-brand prose max-w-none dark:prose-invert">
      {@html cleanDescription}
    </div>
  {/if}

  <!-- CTA -->
  {#if event.allowsSignup}
    <div class="mt-8 border-t border-gray-100 pt-6 dark:border-gray-700">
      <a
        href={event.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
      >
        Meld deg på
      </a>
    </div>
  {/if}
</article>


