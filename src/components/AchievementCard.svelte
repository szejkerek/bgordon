<script lang="ts">
  import { formatDate } from "../utils/dates";
  import type { CollectionEntry } from "astro:content";

  interface Props {
    achievement: CollectionEntry<'achievements'>;
  }

  let { achievement }: Props = $props();
</script>

<a class="ach-row" href={`/achievements/${achievement.id}`}>
  <div class="ach-body">
    <h3 class="ach-title">{achievement.data.title}</h3>
    <p class="ach-desc">{achievement.data.description}</p>
  </div>
  <span class="ach-date">{formatDate(achievement.data.date)}</span>
</a>

<style>
  .ach-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-8);
    padding: var(--space-6) 0;
    border-bottom: 1px solid var(--color-border-subtle);
    text-decoration: none;
  }

  .ach-row:first-child {
    border-top: 1px solid var(--color-border-subtle);
  }

  .ach-title {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    letter-spacing: var(--letter-spacing-tight);
    margin: 0 0 var(--space-2);
    line-height: var(--line-height-tight);
    transition: color var(--duration-fast) var(--ease-out);
  }

  .ach-row:hover .ach-title {
    color: var(--color-accent);
  }

  .ach-desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin: 0;
    line-height: var(--line-height-base);
  }

  .ach-date {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
</style>
