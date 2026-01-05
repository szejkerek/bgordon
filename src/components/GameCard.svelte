<script>
  let { game } = $props();
</script>

<article class="game-card card hover-surface">
  <div class="card-image">
    {#if game.data.image}
      <img src={game.data.image} alt={game.data.title} loading="lazy" decoding="async" />
    {:else}
      <div class="placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <circle cx="8" cy="12" r="2"></circle>
          <path d="M15 10v4M13 12h4"></path>
        </svg>
      </div>
    {/if}
  </div>

  <div class="card-content">
    <div class="card-meta">
      <span class="date">{game.data.date}</span>
      {#if game.data.jam}
        <span class="tag highlight">{game.data.jam}</span>
      {/if}
      {#if game.data.teamSize}
        <span class="team-size" title="Team size">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {game.data.teamSize}
        </span>
      {/if}
    </div>

    <h3 class="card-title">{game.data.title}</h3>
    <p class="card-description">{game.data.description}</p>

    <div class="card-tags">
      {#each game.data.tags || [] as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>

    <div class="card-links">
      {#if game.data.playUrl}
        <a href={game.data.playUrl} class="link" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Play
        </a>
      {/if}

      {#if game.data.sourceUrl}
        <a href={game.data.sourceUrl} class="link" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Source
        </a>
      {/if}

      <a href={`/games/${game.slug}`} class="link link-primary">
        Details →
      </a>
    </div>
  </div>
</article>

<style>
  .game-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }


  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: var(--bg-elevated);
    flex-shrink: 0;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateZ(0);
    will-change: transform;
    transition: transform var(--hover-duration) var(--ease-out);
  }

  .game-card:hover .card-image img {
    transform: scale(1.05) translateZ(0);
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
  }

  .card-content {
    padding: 1.5rem;
    background: var(--bg-card);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .date {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .tag {
    padding: 0.25rem 0.625rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--bg-elevated);
    border-radius: 4px;
    color: var(--text-secondary);
  }

  .tag.highlight {
    background: var(--accent-glow);
    color: var(--accent);
  }

  .team-size {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .team-size svg {
    opacity: 0.7;
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .card-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 1.25rem;
  }

  .card-links {
    display: flex;
    gap: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-subtle);
    margin-top: auto;
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .link:hover {
    color: var(--text-primary);
  }

  .link-primary {
    margin-left: auto;
    color: var(--accent);
  }

  .link-primary:hover {
    color: var(--accent-dim);
  }
</style>
