<script lang="ts">
  import { formatDate } from "../utils/dates";
  import { resolveMediaPath } from "../utils/media";
  import type { CollectionEntry } from "astro:content";

  interface Props {
    achievement: CollectionEntry<'achievements'>;
  }

  let { achievement }: Props = $props();

  const logo = $derived(
    achievement.data.image ? resolveMediaPath(achievement.data.image) : undefined,
  );
</script>

<a class="node" href={`/achievements/${achievement.id}`}>
  {#if logo}
    <div class="logo" aria-hidden="true">
      <img src={logo} alt="" loading="lazy" decoding="async" />
    </div>
  {/if}

  <div class="rail" aria-hidden="true">
    <span class="dot"></span>
  </div>

  <div class="body">
    <div class="head">
      <span class="date">{formatDate(achievement.data.date)}</span>
    </div>
    <h3 class="title">{achievement.data.title}</h3>
    <p class="event">{achievement.data.event}{#if achievement.data.rank} · <span class="rank">{achievement.data.rank}</span>{/if}</p>
    <p class="desc">{achievement.data.description}</p>
  </div>
</a>

<style>
  /* Fixed logo gutter on every card keeps all rails vertically aligned,
     whether or not a given achievement has a logo. */
  .node {
    display: grid;
    grid-template-columns: 140px auto 1fr;
    gap: var(--space-6);
    text-decoration: none;
  }

  /* Event logo — arbitrary proportions, contained in the gutter box. */
  .logo {
    grid-column: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
  .logo img {
    width: 100%;
    height: auto;
    max-height: 140px;
    object-fit: contain;
    border-radius: var(--radius-sm);
    opacity: 0.9;
    transition: opacity var(--duration-fast) var(--ease-out);
  }
  .node:hover .logo img { opacity: 1; }

  .rail {
    grid-column: 2;
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

  .body {
    grid-column: 3;
    max-width: 62ch;
    padding-bottom: var(--space-7);
  }

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

  .title {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    letter-spacing: var(--letter-spacing-tight);
    margin: 0 0 var(--space-1);
    line-height: var(--line-height-tight);
    transition: color var(--duration-fast) var(--ease-out);
  }
  .node:hover .title { color: var(--color-accent); }

  .event {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    margin: 0 0 var(--space-3);
  }
  .rank { color: var(--color-text-primary); }

  .desc {
    font-size: var(--font-size-md);
    color: var(--color-text-muted);
    margin: 0;
    line-height: var(--line-height-base);
  }
</style>
