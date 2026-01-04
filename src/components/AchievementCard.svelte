<script>
  let { achievement } = $props();

  const iconMap = {
    trophy: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>`,
    medal: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="17" r="5"></circle>
      <path d="M12 12V2"></path>
      <path d="M8 2h8"></path>
    </svg>`,
    star: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`,
    award: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="8" r="6"></circle>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
    </svg>`,
    book: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      <line x1="8" y1="6" x2="16" y2="6"></line>
      <line x1="8" y1="10" x2="14" y2="10"></line>
    </svg>`,
    users: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`
  };

  const isWinner = achievement?.data?.type === "winner";
  const href = `/achievements/${achievement?.slug}`;
  const iconSvg = iconMap[achievement?.data?.icon] || iconMap.trophy;
</script>

<a class="achievement-card-link" href={href}>
  <article class="achievement-card card hover-surface" class:winner={isWinner}>
    {#if achievement?.data?.image}
      <div class="ach-image">
        <img src={achievement.data.image} alt={achievement.data.title} loading="lazy" />
      </div>
    {:else}
      <div class="ach-icon" class:winner={isWinner}>
        {@html iconSvg}
      </div>
    {/if}

    <div class="ach-content">
      <div class="ach-header">
        <span class="tag" class:highlight={isWinner}>
          {isWinner ? "Winner" : achievement.data.type}
        </span>
        <span class="date">{achievement.data.date}</span>
      </div>

      <h3 class="ach-title">{achievement.data.title}</h3>
      <p class="ach-event">{achievement.data.event}</p>
      <p class="ach-desc">{achievement.data.description}</p>

      <span class="ach-link">View Details →</span>
    </div>
  </article>
</a>

<style>
  .achievement-card-link {
    text-decoration: none;
    display: block;
  }

  .achievement-card {
    display: flex;
    gap: 1.25rem;
    padding: 1.5rem;
    overflow: hidden;

    transition: transform var(--hover-duration) var(--ease-out),
      box-shadow var(--hover-duration) var(--ease-out),
      background var(--hover-duration) var(--ease-out),
      border-color var(--hover-duration) var(--ease-out);
    will-change: transform;
  }

  .achievement-card.winner {
    background: linear-gradient(
      135deg,
      var(--bg-card) 0%,
      rgba(110, 231, 183, 0.05) 100%
    );
    border-color: rgba(110, 231, 183, 0.2);
  }

  .achievement-card-link:hover .achievement-card {
    border-color: var(--border-light);
    transform: translate3d(0, var(--hover-lift), 0);
    box-shadow: var(--hover-shadow);
  }

  .achievement-card-link:hover .achievement-card:not(.winner) {
    background: var(--bg-card-hover);
  }

  .achievement-card-link:hover .achievement-card.winner {
    background: linear-gradient(
      135deg,
      var(--bg-card) 0%,
      rgba(110, 231, 183, 0.08) 100%
    );
    border-color: rgba(110, 231, 183, 0.25);
  }

  .ach-image {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg-elevated);
  }

  .ach-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--hover-duration) var(--ease-out);
  }

  .achievement-card-link:hover .ach-image img {
    transform: scale(1.05);
  }

  .ach-icon {
    flex-shrink: 0;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-elevated);
    border-radius: var(--radius);
    color: var(--text-muted);
  }

  .ach-icon.winner {
    background: var(--accent-glow);
    color: var(--accent);
  }

  .ach-content {
    flex: 1;
    min-width: 0;
  }

  .ach-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
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

  .date {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .ach-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .ach-event {
    font-size: 0.85rem;
    color: var(--accent);
    margin-bottom: 0.375rem;
    font-weight: 500;
  }

  .ach-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .ach-link {
    display: inline-block;
    margin-top: 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--accent);
    transition: color var(--hover-duration) var(--ease-out);
  }

  .achievement-card-link:hover .ach-link {
    color: var(--accent-dim);
  }

  @media (max-width: 600px) {
    .achievement-card {
      flex-direction: column;
      gap: 1rem;
    }

    .ach-image {
      width: 100%;
      height: 140px;
    }

    .ach-icon {
      width: 44px;
      height: 44px;
    }
  }
</style>
