<script lang="ts">
  import { formatDate } from "../utils/dates";
  import { resolveMediaPath } from "../utils/media";
  import type { CollectionEntry } from "astro:content";

  interface Props {
    achievement: CollectionEntry<'achievements'>;
  }

  let { achievement }: Props = $props();

  const image = $derived(
    achievement.data.image ? resolveMediaPath(achievement.data.image) : undefined,
  );
</script>

<a class="node" href={`/achievements/${achievement.id}`}>
  {#if image}
    <div class="media" aria-hidden="true">
      <img src={image} alt="" loading="lazy" decoding="async" />
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
  /* Centered zig-zag timeline node: [ half ] [ spine ] [ half ].
     Odd rows: photo left / text right. Even rows: swapped. Both hug the spine. */
  .node {
    display: grid;
    grid-template-columns: 1fr 28px 1fr;
    column-gap: var(--space-8);
    align-items: center;
    text-decoration: none;
    padding-bottom: var(--space-10);
  }

  /* All three share one grid row — explicit grid-row:1 stops the auto-placement
     algorithm from pushing items onto new rows when even-row columns run in
     reverse source order (which was stacking photo above text). */
  .media {
    grid-row: 1;
    grid-column: 1;
    justify-self: end;
    display: flex;
    justify-content: flex-end;
  }
  .body {
    grid-row: 1;
    grid-column: 3;
    justify-self: start;
    text-align: left;
    max-width: 62ch;
  }
  .rail {
    grid-row: 1;
    grid-column: 2;
  }

  /* --- even rows: mirror --- */
  .node:nth-child(even) .media {
    grid-column: 3;
    justify-self: start;
    justify-content: flex-start;
  }
  .node:nth-child(even) .body {
    grid-column: 1;
    justify-self: end;
    text-align: right;
  }
  .node:nth-child(even) .head {
    justify-content: flex-end;
  }

  /* Event photo — natural aspect, fills its half up to a sane height cap. */
  .media img {
    display: block;
    max-width: 75%;
    max-height: 330px;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--radius-md);
    opacity: 0.9;
    transition: opacity var(--duration-fast) var(--ease-out);
  }
  .node:hover .media img { opacity: 1; }

  /* Dot sits centered in the middle column; the continuous line is drawn by
     the parent (.achievements-list) so it never breaks across node gaps. */
  .rail {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dot {
    position: relative;
    z-index: 1;
    width: 13px;
    height: 13px;
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

  /* Narrow screens: zig-zag can't breathe — stack photo over text, no spine. */
  @media (max-width: 768px) {
    .node {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-4);
      padding-bottom: var(--space-8);
    }
    .rail { display: none; }
    .media,
    .node:nth-child(even) .media {
      justify-content: flex-start;
    }
    .media img { max-height: 300px; }
    .body,
    .node:nth-child(even) .body {
      max-width: none;
      text-align: left;
    }
    .node:nth-child(even) .head {
      justify-content: flex-start;
    }
  }
</style>
