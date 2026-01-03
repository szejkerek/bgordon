<script>
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'twitter' },
    { name: 'itch.io', url: 'https://yourusername.itch.io', icon: 'itch' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
  ];
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-main">
      <div class="footer-brand">
        <a href="/" class="logo">
          <span class="bracket">[</span>DEV<span class="bracket">]</span>
        </a>
        <p class="tagline">Crafting games, one pixel at a time.</p>
      </div>
      
      <nav class="footer-nav">
        <div class="nav-column">
          <h4>Portfolio</h4>
          <a href="/#games">Games</a>
          <a href="/#achievements">Achievements</a>
          <a href="/#about">About</a>
        </div>
        <div class="nav-column">
          <h4>Connect</h4>
          {#each socialLinks as link}
            <a href={link.url} target="_blank" rel="noopener">{link.name}</a>
          {/each}
        </div>
        <div class="nav-column">
          <h4>More</h4>
          <a href="/cv">View CV</a>
          <a href="mailto:your@email.com">Contact</a>
        </div>
      </nav>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">© {currentYear} Your Name. All rights reserved.</p>
      <p class="built-with">
        Built with 
        <span class="heart">♥</span> 
        using Astro + Svelte
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--bg-secondary);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    margin-top: auto;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem 2rem;
  }
  
  .footer-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .logo {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
  }
  
  .bracket {
    color: var(--accent-primary);
  }
  
  .tagline {
    margin-top: 0.75rem;
    color: var(--text-muted);
    font-size: 0.9rem;
  }
  
  .footer-nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  .nav-column h4 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .nav-column a {
    display: block;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.3rem 0;
    transition: all 0.3s ease;
  }
  
  .nav-column a:hover {
    color: var(--accent-primary);
    transform: translateX(4px);
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  
  .built-with {
    font-family: 'JetBrains Mono', monospace;
  }
  
  .heart {
    color: var(--accent-secondary);
    animation: heartbeat 1.5s ease-in-out infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @media (max-width: 768px) {
    .footer-main {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .footer-nav {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .footer-nav {
      grid-template-columns: 1fr;
    }
  }
</style>
