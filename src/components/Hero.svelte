<script>
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    visible = true;
  });
</script>

<section class="hero" class:visible={visible}>
  <div class="hero-content">
    <div class="hero-badge">
      <span class="pulse"></span>
      Available for hire
    </div>
    
    <h1 class="hero-title">
      <span class="line">Game</span>
      <span class="line highlight">Developer</span>
      <span class="line">&amp; Designer</span>
    </h1>
    
    <p class="hero-description">
      Creating memorable gaming experiences through code, art, and passion.
      Specializing in indie games, game jams, and interactive experiences.
    </p>
    
    <div class="hero-actions">
      <a href="#games" class="btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        View Games
      </a>
      <a href="/cv" class="btn btn-secondary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        View CV
      </a>
    </div>
    
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-value">10+</span>
        <span class="stat-label">Games Shipped</span>
      </div>
      <div class="stat">
        <span class="stat-value">5</span>
        <span class="stat-label">Jam Wins</span>
      </div>
      <div class="stat">
        <span class="stat-value">3+</span>
        <span class="stat-label">Years Exp</span>
      </div>
    </div>
  </div>
  
  <div class="hero-visual">
    <div class="terminal">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="terminal-title">portfolio.exe</span>
      </div>
      <div class="terminal-body">
        <p><span class="prompt">$</span> loading_skills...</p>
        <p class="indent"><span class="key">unity</span>: <span class="value">████████░░</span> 80%</p>
        <p class="indent"><span class="key">godot</span>: <span class="value">███████░░░</span> 70%</p>
        <p class="indent"><span class="key">c#</span>: <span class="value">█████████░</span> 90%</p>
        <p class="indent"><span class="key">pixel_art</span>: <span class="value">██████░░░░</span> 60%</p>
        <p><span class="prompt">$</span> status: <span class="success">ready_to_create</span></p>
        <p class="cursor"><span class="prompt">$</span> <span class="blink">_</span></p>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding: 8rem 2rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
  }
  
  .hero.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 50px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-primary);
    margin-bottom: 1.5rem;
  }
  
  .pulse {
    width: 8px;
    height: 8px;
    background: var(--accent-primary);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
  
  .hero-title {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  
  .hero-title .line {
    display: block;
  }
  
  .hero-title .highlight {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    max-width: 500px;
    margin-bottom: 2rem;
    line-height: 1.7;
  }
  
  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 2px solid var(--accent-primary);
    border-radius: 8px;
    background: transparent;
    color: var(--accent-primary);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .btn:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
    transform: translateY(-2px);
  }
  
  .btn-secondary {
    border-color: var(--accent-secondary);
    color: var(--accent-secondary);
  }
  
  .btn-secondary:hover {
    background: var(--accent-secondary);
    box-shadow: 0 0 30px rgba(255, 51, 102, 0.4);
  }
  
  .hero-stats {
    display: flex;
    gap: 3rem;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-primary);
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .terminal {
    width: 100%;
    max-width: 400px;
    background: var(--bg-card);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  .terminal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .dot.red { background: #ff5f57; }
  .dot.yellow { background: #febc2e; }
  .dot.green { background: #28c840; }
  
  .terminal-title {
    margin-left: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  .terminal-body {
    padding: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.8;
  }
  
  .terminal-body p {
    margin: 0;
  }
  
  .prompt {
    color: var(--accent-primary);
  }
  
  .indent {
    padding-left: 1rem;
  }
  
  .key {
    color: var(--accent-tertiary);
  }
  
  .value {
    color: var(--accent-primary);
    letter-spacing: -2px;
  }
  
  .success {
    color: var(--accent-primary);
  }
  
  .cursor {
    margin-top: 0.5rem;
  }
  
  .blink {
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  @media (max-width: 968px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
      padding-top: 6rem;
    }
    
    .hero-description {
      margin-left: auto;
      margin-right: auto;
    }
    
    .hero-actions {
      justify-content: center;
    }
    
    .hero-stats {
      justify-content: center;
    }
    
    .hero-visual {
      order: -1;
    }
    
    .terminal {
      max-width: 350px;
    }
  }
  
  @media (max-width: 480px) {
    .hero-stats {
      gap: 1.5rem;
    }
    
    .stat-value {
      font-size: 1.5rem;
    }
    
    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
