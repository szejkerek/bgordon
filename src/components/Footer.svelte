<script lang="ts">
  /**
   * Footer Component
   * 
   * Site footer with navigation and social links.
   */
  import { getCurrentYear } from "../utils/dates";
  
  // Configuration
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/szejkerek' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/bartekgordon' },
    { name: 'itch.io', url: 'https://szejkerek.itch.io' },
  ] as const;
  
  const navLinks = [
    { label: 'Experience', href: '/#experience' },
    { label: 'Education', href: '/#education' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Achievements', href: '/#achievements' },
  ] as const;

  const currentYear = getCurrentYear();
  const startYear = 2020;
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-grid">
      <div class="footer-brand">
        <p class="name">Bartłomiej Gordon</p>
        <a 
          href="mailto:bartekk.gordon@gmail.com" 
          class="brand-email" 
          aria-label="Send email to bartekk.gordon@gmail.com"
        >
          bartekk.gordon@gmail.com
        </a>
      </div>
      
      <nav class="footer-col" aria-label="Site navigation">
        <h4>Work</h4>
        {#each navLinks as link (link.href)}
          <a href={link.href}>{link.label}</a>
        {/each}
      </nav>
      
      <nav class="footer-col" aria-label="Social links">
        <h4>Connect</h4>
        {#each socialLinks as link (link.url)}
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit {link.name} profile"
          >
            {link.name}
          </a>
        {/each}
      </nav>
    </div>
    
    <div class="footer-bottom">
      <p><small>© {startYear} — {currentYear} Bartłomiej Gordon</small></p>
      <p><small>Gliwice / Katowice, Poland</small></p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border-subtle);
    padding: var(--space-12) var(--container-padding) var(--space-9);
  }
  
  .footer-content {
    max-width: var(--container-max-width);
    margin: 0 auto;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: var(--space-11);
    margin-bottom: var(--space-11);
    padding-bottom: var(--space-9);
    border-bottom: 1px solid var(--color-border-subtle);
  }
  
  .footer-brand .name {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
  }
  
  .brand-email {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--duration-normal) var(--ease-out);
  }
  
  .brand-email:hover {
    color: var(--color-accent);
  }
  
  .footer-col h4 {
    font-family: var(--font-body);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    color: var(--color-text-primary);
    margin-bottom: var(--space-6);
  }
  
  .footer-col a {
    display: block;
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-base);
    padding: var(--space-2) 0;
    transition: color var(--duration-normal) var(--ease-out);
  }
  
  .footer-col a:hover {
    color: var(--color-accent);
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }
  
  @media (max-width: 900px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-9);
    }
  }
  
  @media (max-width: 600px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: var(--space-3);
      text-align: center;
    }
  }
</style>
