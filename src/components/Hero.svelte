<script>
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    visible = true;
  });
</script>

<section class="hero" class:visible={visible}>
  <div class="hero-grid">
    <div class="hero-content">
      <p class="hero-label">Game Developer</p>
      <h1 class="hero-name">Crafting games with intention and care.</h1>
      <p class="hero-bio">
        I design and build interactive experiences — from roguelikes to cozy sims. 
        Focused on creating games that feel good to play and leave a lasting impression.
      </p>
      
      <div class="hero-links">
        <a href="#projects" class="hero-link primary">
          View Projects
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </a>
        <a href="mailto:your@email.com" class="hero-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Email
        </a>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener" class="hero-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          GitHub
        </a>
      </div>
    </div>
    
    <div class="hero-photo">
      <div class="photo-wrapper">
        <div class="photo-frame">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Your Photo</span>
        </div>
        <!-- Replace the placeholder div above with:
        <img src="/your-photo.jpg" alt="Bartłomiej Gordon" class="photo-frame" />
        -->
      </div>
    </div>
  </div>
  
  <a href="#projects" class="scroll-hint">
    <span>Scroll</span>
    <div class="scroll-arrow"></div>
  </a>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8rem 2rem 3rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    opacity: 0;
    transform: translateY(16px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .hero.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4rem;
    align-items: center;
  }
  
  .hero-content {
    max-width: 560px;
  }
  
  .hero-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.25rem;
  }
  
  .hero-label::before {
    content: '';
    width: 24px;
    height: 2px;
    background: var(--accent);
  }
  
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }
  
  .hero-bio {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.75;
    margin-bottom: 2rem;
  }
  
  .hero-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .hero-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-primary);
    text-decoration: none;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    transition: all 0.2s ease;
  }
  
  .hero-link:hover {
    background: var(--bg-elevated);
    border-color: var(--accent);
  }
  
  .hero-link.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg-primary);
  }
  
  .hero-link.primary:hover {
    background: var(--accent-dim);
    border-color: var(--accent-dim);
  }
  
  .hero-photo {
    position: relative;
  }
  
  .photo-wrapper {
    width: 320px;
    height: 400px;
    position: relative;
  }
  
  .photo-wrapper::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: -20px;
    bottom: -20px;
    border: 2px solid var(--accent);
    border-radius: var(--radius-lg);
    opacity: 0.3;
  }
  
  .photo-frame {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: var(--text-muted);
    object-fit: cover;
  }
  
  .photo-frame span {
    font-size: 0.85rem;
  }
  
  .scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--text-muted);
    transition: color 0.2s ease;
  }
  
  .scroll-hint:hover {
    color: var(--accent);
  }
  
  .scroll-hint span {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .scroll-arrow {
    width: 24px;
    height: 40px;
    border: 2px solid currentColor;
    border-radius: 12px;
    position: relative;
  }
  
  .scroll-arrow::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: currentColor;
    border-radius: 2px;
    animation: scrollDown 1.5s ease-in-out infinite;
  }
  
  @keyframes scrollDown {
    0%, 100% { opacity: 1; top: 8px; }
    50% { opacity: 0.3; top: 18px; }
  }
  
  @media (max-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }
    
    .hero-content {
      max-width: none;
    }
    
    .hero-label {
      justify-content: center;
    }
    
    .hero-label::before {
      display: none;
    }
    
    .hero-links {
      justify-content: center;
    }
    
    .hero-photo {
      order: -1;
      display: flex;
      justify-content: center;
    }
    
    .photo-wrapper {
      width: 200px;
      height: 250px;
    }
    
    .scroll-hint {
      position: relative;
      bottom: auto;
      left: auto;
      transform: none;
      margin-top: 3rem;
    }
  }
</style>
