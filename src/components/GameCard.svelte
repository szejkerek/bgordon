<script>
  let { game } = $props();
</script>

<article class="game-card">
  <div class="card-image">
    {#if game.data.image}
      <img src={game.data.image} alt={game.data.title} />
    {:else}
      <div class="placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <circle cx="8" cy="12" r="2"></circle>
          <path d="M15 10v4M13 12h4"></path>
        </svg>
      </div>
    {/if}

    {#if game.data.featured}
      <span class="featured-badge">Featured</span>
    {/if}
  </div>

  <div class="card-content">
    <div class="card-meta">
      <span class="date">{game.data.date}</span>
      {#if game.data.jam}
        <span class="tag highlight">{game.data.jam}</span>
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
        <a href={game.data.playUrl} class="link" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Play
        </a>
      {/if}

      {#if game.data.sourceUrl}
        <a href={game.data.sourceUrl} class="link" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    will-change: transform;
  }

  .game-card:hover {
    transform: translate3d(0, -4px, 0);
    border-color: var(--border-light);
    box-shadow: var(--shadow-lg);
  }

.card-image {
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 60%,
    transparent 100%
  );
}



  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateZ(0);
    will-change: transform;
    transition: transform 0.4s ease;
  }

  .game-card:hover .card-image img {
    transform: scale(1.03) translateZ(0);
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
  }

  .featured-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.25rem 0.625rem;
    background: var(--accent);
    color: var(--bg-primary);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-radius: 4px;
    z-index: 1;
  }

.card-content {
  padding: 1.5rem;
  margin-top: -1px;
  background: var(--bg-card);
  position: relative;
  z-index: 1;
}


  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
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
