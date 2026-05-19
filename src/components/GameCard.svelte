<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { CollectionEntry } from "astro:content";

  interface Props {
    game: CollectionEntry<'games'>;
    thumbnailSrc?: string;
  }

  let { game, thumbnailSrc }: Props = $props();

  // Computed values
  const href = $derived(`/games/${game.id}`);
  const tags = $derived(game.data.tags || []);
</script>

<article 
	class="game-card card"
>
	<a
		href={href}
		class="card-overlay-link"
		aria-label="View {game.data.title} project details"
	>
		<span class="sr-only">View {game.data.title} project details</span>
	</a>

  <div class="card-image">
    {#if thumbnailSrc}
      <img
        src={thumbnailSrc}
        alt={game.data.title}
        loading="lazy"
        decoding="async"
        width="640"
        height="360"
      />
    {:else}
      <div class="placeholder">
        <Icon name="gamepad" size={48} strokeWidth={1.5} />
      </div>
    {/if}
  </div>

  <div class="card-content">
    <div class="card-meta">
      <span class="date">{game.data.date}</span>
      {#if game.data.jam}
        <span class="tag tag--highlight">{game.data.jam}</span>
      {/if}
      {#if game.data.teamSize}
        <span class="team-size" title="Team size">
          <Icon name="team" size={12} />
          <span>{game.data.teamSize}</span>
        </span>
      {/if}
    </div>

    <h3 class="card-title">{game.data.title}</h3>
    <p class="card-description">{game.data.description}</p>

    <div class="card-tags">
      {#each tags as tag (tag)}
        <span class="tag">{tag}</span>
      {/each}
    </div>

  </div>
</article>

<style>
  .game-card {
		position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    border-radius: var(--radius-lg);
    transition: 
      transform var(--duration-normal) var(--ease-out),
      border-color var(--duration-normal) var(--ease-out),
      box-shadow var(--duration-normal) var(--ease-out),
      background-color var(--duration-normal) var(--ease-out);
  }

  .game-card:hover {
    transform: scale(1.02);
    border-color: var(--color-border-light);
    box-shadow: var(--shadow-xl);
    background: var(--color-bg-card-hover);
    z-index: 1;
  }


	.card-overlay-link {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: block;
		border-radius: inherit;
		text-decoration: none;
	}

	.card-overlay-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

  .card-image {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--color-bg-elevated);
    flex-shrink: 0;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .game-card:hover .card-image img {
    transform: scale(1.05);
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
  }

  .card-content {
    padding: var(--space-8);
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    transition: background-color var(--duration-normal) var(--ease-out);
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    margin-bottom: var(--space-5);
    flex-wrap: wrap;
  }

  .date {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-weight: var(--font-weight-medium);
  }

  .tag {
    padding: var(--space-1) var(--space-4);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    background: var(--color-bg-elevated);
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
  }

  .tag--highlight {
    background: var(--color-accent-glow);
    color: var(--color-accent);
  }

  .team-size {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-weight: var(--font-weight-medium);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-3);
    color: var(--color-text-primary);
  }

  .card-description {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-base);
    margin-bottom: var(--space-6);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
</style>
