<script>
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/szejkerek' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/bartekgordon' },
    { name: 'itch.io', url: 'https://szejkerek.itch.io' },
  ];
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-grid">
      <div class="footer-brand">
        <p class="name">Bartłomiej Gordon</p>
        <a href="mailto:bartekk.gordon@gmail.com" class="brand-email">bartekk.gordon@gmail.com</a>
      </div>
      <div class="footer-col">
        <h4>Work</h4>
        <a href="/#experience">Experience</a>
        <a href="/#projects">Projects</a>
        <a href="/#achievements">Achievements</a>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        {#each socialLinks as link}
          <a href={link.url} target="_blank" rel="noopener">{link.name}</a>
        {/each}
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2020 — 2026 Bartłomiej Gordon</p>
      <p>Gliwice / Katowice, Poland</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-subtle);
    padding: 4rem 2rem 2rem;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-subtle);
  }
  
  .footer-brand .name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  
  .brand-email {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--hover-duration) var(--ease-out);
  }
  
  .brand-email:hover {
    color: var(--accent);
  }
  
  .footer-col h4 {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .footer-col a {
    display: block;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.35rem 0;
    transition: color var(--hover-duration) var(--ease-out);
  }
  
  .footer-col a:hover {
    color: var(--accent);
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  
  @media (max-width: 900px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
  
  @media (max-width: 600px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
</style>
