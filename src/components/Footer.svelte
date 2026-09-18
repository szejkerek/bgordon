<script lang="ts">
  import { getCurrentYear } from "../utils/dates";
  import { ROUTES } from "../utils/routes";
  import type { IconType } from "../utils/icons";
  import Icon from "./Icon.svelte";

  interface ConnectLink {
    text: string;
    url: string;
    type?: IconType;
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
  <div class="inner">
    <div class="col">
      <h2>Get in touch</h2>
      {#if email}
        <a href="mailto:{email}">
          <Icon name="email" size={16} />
          <span>{email}</span>
        </a>
      {/if}
    </div>

    <div class="cols">
      <nav class="col" aria-label="Site navigation">
        <h2>Explore</h2>
        {#each navLinks as link (link.href)}
          <a href={link.href}>{link.label}</a>
        {/each}
      </nav>

      {#if connectLinks.length}
        <nav class="col" aria-label="Social links">
          <h2>Elsewhere</h2>
          {#each connectLinks as link (link.url)}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit {link.text} profile"
            >
              {#if link.type}<Icon name={link.type} size={16} />{/if}
              <span>{link.text}</span>
            </a>
          {/each}
        </nav>
      {/if}
    </div>
  </div>

  <div class="bottom">
    <p class="name-line">
      <span class="name">Bartłomiej Gordon</span>
      <small>© {startYear}—{currentYear}</small>
    </p>
    <p class="loc">
      <Icon name="location" size={14} />
      <span>Katowice/Gliwice, Poland</span>
    </p>
  </div>
</footer>

<style>
  .footer {
    position: relative;
    overflow: hidden;
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border-subtle);
    padding: var(--space-12) var(--container-padding) var(--space-8);
  }

  .inner {
    position: relative;
    max-width: var(--container-max-width);
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-11) var(--space-12);
    padding-bottom: var(--space-10);
  }

  /* Link columns */
  .cols {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-11);
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  /* Footer groups sit at the top level of the document outline, so they are h2
     regardless of what the page body used; the small-caps look is styling. */
  .col h2 {
    font-family: var(--font-body);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    color: var(--color-text-muted);
    margin: 0 0 var(--space-2);
  }

  .col a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-base);
    width: fit-content;
    transition:
      color var(--duration-normal) var(--ease-out),
      transform var(--duration-normal) var(--ease-out);
  }

  .col a:hover {
    color: var(--color-accent);
    transform: translateX(3px);
  }

  /* Bottom bar */
  .bottom {
    position: relative;
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding-top: var(--space-7);
    border-top: 1px solid var(--color-border-subtle);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
    color: var(--color-text-muted);
  }

  .name-line {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-4);
  }

  .name-line .name {
    font-family: var(--font-display);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
  }

  .name-line small {
    font-size: var(--font-size-sm);
    font-variant-numeric: tabular-nums;
  }

  .loc {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--font-size-sm);
  }

  .loc :global(svg) {
    color: var(--color-accent);
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    .bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .col a {
      transition: color var(--duration-fast) var(--ease-out);
    }

    .col a:hover {
      transform: none;
    }
  }
</style>
