<script lang="ts">
  import { onMount } from "svelte";
  import { ROUTES } from "../utils/routes";

  const navLinks = [
    { href: ROUTES.experience, label: "Experience" },
    { href: ROUTES.education, label: "Education" },
    { href: ROUTES.projects, label: "Projects" },
    { href: ROUTES.achievements, label: "Achievements" },
    { href: ROUTES.books, label: "Books" },
  ] as const;
  
  let isMenuOpen = $state(false);
  
  function toggleMenu(): void {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu(): void {
    isMenuOpen = false;
  }
  
  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  }
  
  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });
</script>

<nav class="nav" aria-label="Main navigation">
  <div class="nav-container">
    <a href="/" class="logo" aria-label="Bartłomiej Gordon - Home">
      Bartłomiej Gordon
    </a>
    
    <button 
      class="menu-toggle" 
      onclick={toggleMenu} 
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMenuOpen}
      aria-controls="nav-links"
      type="button"
    >
      <span class="bar" class:open={isMenuOpen}></span>
      <span class="bar" class:open={isMenuOpen}></span>
    </button>
    
    <!-- A list of links, not an application menu: role="menubar"/"menuitem"
         promises arrow-key navigation this does not implement, and replaces the
         list semantics screen readers use to announce how many links there are. -->
    <ul id="nav-links" class="nav-links" class:open={isMenuOpen}>
      {#each navLinks as link (link.href)}
        <li>
          <a href={link.href} onclick={closeMenu}>
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-fixed);
    background: var(--color-nav-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--color-border-subtle);
  }
  
  .nav-container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: var(--space-6) var(--space-9);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    text-decoration: none;
    letter-spacing: var(--letter-spacing-tight);
    transition: color var(--duration-fast) var(--ease-out);
  }
  
  .logo:hover {
    color: var(--color-accent);
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    gap: var(--space-9);
    align-items: center;
    margin: 0;
    padding: 0;
  }
  
  .nav-links a {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out);
  }
  
  .nav-links a:hover {
    color: var(--color-text-primary);
  }
  
  /* 44x44 hit area: the bars themselves add up to 34x22, under the 24x24
     minimum a pointer target needs (WCAG 2.5.8). */
  .menu-toggle {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 44px;
    height: 44px;
    margin-right: calc(var(--space-3) * -1);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .bar {
    width: 22px;
    height: 2px;
    background: var(--color-text-primary);
    transition: transform var(--duration-normal) var(--ease-out);
    border-radius: 2px;
  }
  
  .bar.open:nth-child(1) {
    transform: rotate(45deg) translate(3px, 3px);
  }
  
  .bar.open:nth-child(2) {
    transform: rotate(-45deg) translate(3px, -3px);
  }
  
  @media (max-width: 900px) {
    .menu-toggle {
      display: flex;
    }
    
    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background: var(--color-nav-bg-solid);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: var(--space-8) var(--space-9) var(--space-9);
      gap: var(--space-7);
      border-bottom: 1px solid var(--color-border-subtle);
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      /* visibility, not just opacity: a transparent off-screen menu still keeps
         its links in the tab order, so keyboard users fall into a menu they
         cannot see. Its transition is delayed to 0s only on the way out, so the
         links stay visible for the length of the slide. */
      visibility: hidden;
      transition:
        transform var(--duration-normal) var(--ease-out),
        opacity var(--duration-normal) var(--ease-out),
        visibility 0s linear var(--duration-normal);
    }

    .nav-links.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
      transition:
        transform var(--duration-normal) var(--ease-out),
        opacity var(--duration-normal) var(--ease-out),
        visibility 0s;
    }
  }
</style>
