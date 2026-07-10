<script lang="ts">
  import { getCurrentYear } from "../utils/dates";
  import { ROUTES } from "../utils/routes";
  import Icon from "./Icon.svelte";

  interface ConnectLink {
    text: string;
    url: string;
  }

  interface Props {
    email?: string;
    connectLinks?: ConnectLink[];
  }

  let { email = '', connectLinks = [] }: Props = $props();

  const navLinks = [
    { label: 'Experience', href: ROUTES.experience },
    { label: 'Education', href: ROUTES.education },
    { label: 'Projects', href: ROUTES.projects },
    { label: 'Achievements', href: ROUTES.achievements },
    { label: 'Books', href: ROUTES.books },
  ] as const;

  const currentYear = getCurrentYear();
  const startYear = 2020;
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-grid">
      <div class="footer-contact">
        <p class="name">Bartłomiej Gordon</p>
        {#if email}
          <a
            href="mailto:{email}"
            class="brand-email"
            aria-label="Send email to {email}"
          >
            <Icon name="email" size={16} />
            <span>{email}</span>
          </a>
        {/if}
        {#if connectLinks.length}
          <nav class="connect-links" aria-label="Social links">
            {#each connectLinks as link (link.url)}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit {link.text} profile"
              >
                {link.text}
              </a>
            {/each}
          </nav>
        {/if}
      </div>

      <nav class="footer-col" aria-label="Site navigation">
        <h4>Sections</h4>
        <div class="footer-col-links">
          {#each navLinks as link (link.href)}
            <a href={link.href}>{link.label}</a>
          {/each}
        </div>
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-9) var(--space-11);
    margin-bottom: var(--space-11);
    padding-bottom: var(--space-9);
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .footer-contact .name {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
  }

  .brand-email {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: var(--color-accent);
    border-radius: var(--radius-md);
    color: var(--color-bg-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
    transition: background var(--duration-fast) var(--ease-out);
  }

  .brand-email:hover {
    background: var(--color-accent-dim);
  }

  .connect-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
    margin-top: var(--space-6);
  }

  .connect-links a {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-base);
    transition: color var(--duration-normal) var(--ease-out);
  }

  .connect-links a:hover {
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
  
  .footer-col-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4) var(--space-7);
  }

  .footer-col a {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-base);
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
  
  @media (max-width: 600px) {
    .footer-bottom {
      flex-direction: column;
      gap: var(--space-3);
      text-align: center;
    }
  }
</style>
