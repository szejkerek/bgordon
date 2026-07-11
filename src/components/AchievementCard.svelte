<script lang="ts">
  import { formatDate } from "../utils/dates";
  import type { CollectionEntry } from "astro:content";

  interface Props {
    achievement: CollectionEntry<'achievements'>;
  }

  let { achievement }: Props = $props();

  const TYPE_LABEL: Record<string, string> = {
    winner: 'Winner',
    finalist: 'Finalist',
    participant: 'Participant',
    publication: 'Publication',
    organization: 'Organization',
    education: 'Education',
  };
  const label = $derived(TYPE_LABEL[achievement.data.type] ?? achievement.data.type);
</script>

<a class="node" href={`/achievements/${achievement.id}`}>
  <div class="rail" aria-hidden="true">
    <span class="dot"></span>
  </div>

  <div class="body">
    <div class="head">
      <span class="date">{formatDate(achievement.data.date)}</span>
      <span class="type">{label}</span>
    </div>
    <h3 class="title">{achievement.data.title}</h3>
    <p class="event">{achievement.data.event}{#if achievement.data.rank} · <span class="rank">{achievement.data.rank}</span>{/if}</p>
    <p class="desc">{achievement.data.description}</p>
  </div>
</a>

<style>
  .node {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-7);
    text-decoration: none;
  }

  .rail {
    position: relative;
    display: flex;
    justify-content: center;
    width: 12px;
  }
  .rail::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--color-border-light);
  }
  .dot {
    position: relative;
    z-index: 1;
    width: 11px;
    height: 11px;
    margin-top: 4px;
    border-radius: var(--radius-full);
    background: var(--color-bg-primary);
    border: 2px solid var(--color-text-muted);
    transition: border-color var(--duration-fast) var(--ease-out),
                box-shadow var(--duration-fast) var(--ease-out);
  }
  .node:hover .dot {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 4px var(--color-accent-glow);
  }

  .body { padding-bottom: var(--space-9); }

  .head {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-2);
  }
  .date {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    font-variant-numeric: tabular-nums;
  }
  .type {
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    color: var(--color-accent);
    font-weight: var(--font-weight-semibold);
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    letter-spacing: var(--letter-spacing-tight);
    margin: 0 0 var(--space-1);
    line-height: var(--line-height-tight);
    transition: color var(--duration-fast) var(--ease-out);
  }
  .node:hover .title { color: var(--color-accent); }

  .event {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0 0 var(--space-3);
  }
  .rank { color: var(--color-text-primary); }

  .desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin: 0;
    line-height: var(--line-height-base);
  }
</style>
