<script lang="ts">
  /**
   * GameCard Component
   * 
   * Card component for displaying game projects.
   * Clickable with accessible keyboard support.
   */
  import Icon from "./Icon.svelte";
  import type { GameEntry } from "../types";

  interface Props {
    game: GameEntry;
  }

  let { game }: Props = $props();
  
  // Computed values
  const href = $derived(`/games/${game.slug}`);
  const hasImage = $derived(!!game.data.image);
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
    {#if hasImage}
      <img 
        src={game.data.image} 
        alt={game.data.title} 
        loading="lazy" 
        decoding="async" 
      />
    {:else}
      <div class="placeholder">
        <Icon name="gamepad" size={48} strokeWidth={1.5} />
      </div>
    {/if}
    <div class="click-hint">
      <Icon name="external" size={16} />
      <span>Click to view details</span>
    </div>
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

    <div class="card-links">
      {#if game.data.playUrl}
        <a 
          href={game.data.playUrl} 
          class="external-link link" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Play {game.data.title}"
        >
          <Icon name="play" size={14} />
          <span>Play</span>
        </a>
      {/if}

      {#if game.data.sourceUrl}
        <a 
          href={game.data.sourceUrl} 
          class="external-link link" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="View source code for {game.data.title}"
        >
          <Icon name="github" size={14} />
          <span>Source</span>
        </a>
      {/if}
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
    height: 200px;
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
  
  .click-hint {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    padding: var(--space-5);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    opacity: 0;
    transform: translateY(100%);
    transition: 
      opacity var(--duration-normal) var(--ease-out), 
      transform var(--duration-normal) var(--ease-out);
  }
  
  .game-card:hover .click-hint,
	.card-overlay-link:focus-visible + .card-image .click-hint {
    opacity: 1;
    transform: translateY(0);
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
    background: var(--color-bg-card);
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
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
    margin-bottom: var(--space-7);
  }

  .card-links {
    display: flex;
    gap: var(--space-7);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border-subtle);
    margin-top: auto;
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .link:hover {
    color: var(--color-accent);
  }
  
  .external-link {
    position: relative;
		z-index: 4;
  }
</style>
