<script>
  let { achievement } = $props();
  
  const iconMap = {
    trophy: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>`,
    medal: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="17" r="5"></circle>
      <path d="M12 12V2"></path>
      <path d="M8 2h8"></path>
    </svg>`,
    star: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`,
    award: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="8" r="6"></circle>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
    </svg>`
  };
</script>

<article class="achievement-card" class:winner={achievement.data.type === 'winner'}>
  <div class="card-icon">
    {@html iconMap[achievement.data.icon] || iconMap.trophy}
  </div>
  
  <div class="card-content">
    <div class="card-header">
      <span class="tag" class:winner={achievement.data.type === 'winner'}>
        {achievement.data.type === 'winner' ? '🏆 Winner' : achievement.data.type}
      </span>
      <span class="date">{achievement.data.date}</span>
    </div>
    
    <h3 class="card-title">{achievement.data.title}</h3>
    <p class="card-event">{achievement.data.event}</p>
    <p class="card-description">{achievement.data.description}</p>
    
    {#if achievement.data.url}
      <a href={achievement.data.url} class="card-link" target="_blank" rel="noopener">
        View Details →
      </a>
    {/if}
  </div>
</article>

<style>
  .achievement-card {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .achievement-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--accent-tertiary);
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  .achievement-card.winner::before {
    background: var(--accent-yellow);
    opacity: 1;
    box-shadow: 0 0 20px rgba(255, 204, 0, 0.4);
  }
  
  .achievement-card:hover {
    transform: translateX(8px);
    background: var(--bg-card-hover);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .achievement-card:hover::before {
    opacity: 1;
  }
  
  .card-icon {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 212, 255, 0.1);
    border-radius: 12px;
    color: var(--accent-tertiary);
  }
  
  .winner .card-icon {
    background: rgba(255, 204, 0, 0.1);
    color: var(--accent-yellow);
    animation: glow 2s ease-in-out infinite;
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.2); }
    50% { box-shadow: 0 0 20px rgba(255, 204, 0, 0.4); }
  }
  
  .card-content {
    flex: 1;
    min-width: 0;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .tag {
    padding: 0.2rem 0.6rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(0, 212, 255, 0.1);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 4px;
    color: var(--accent-tertiary);
  }
  
  .tag.winner {
    background: rgba(255, 204, 0, 0.15);
    border-color: rgba(255, 204, 0, 0.4);
    color: var(--accent-yellow);
  }
  
  .date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  .card-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
  }
  
  .card-event {
    font-size: 0.875rem;
    color: var(--accent-primary);
    margin-bottom: 0.5rem;
  }
  
  .card-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  
  .card-link {
    display: inline-block;
    margin-top: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--accent-primary);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .card-link:hover {
    transform: translateX(4px);
  }
  
  @media (max-width: 600px) {
    .achievement-card {
      flex-direction: column;
      gap: 1rem;
    }
    
    .card-icon {
      width: 50px;
      height: 50px;
    }
  }
</style>
