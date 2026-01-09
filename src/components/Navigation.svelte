<script lang="ts">
  /**
   * Navigation Component
   * 
   * Responsive navigation with mobile menu support.
   * Uses centralized icons and improved accessibility.
   */
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  
  // Navigation links configuration
  const navLinks = [
    { href: "/#experience", label: "Experience" },
    { href: "/#education", label: "Education" },
    { href: "/#projects", label: "Projects" },
    { href: "/#achievements", label: "Achievements" },
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
    
    <ul id="nav-links" class="nav-links" class:open={isMenuOpen} role="menubar">
      {#each navLinks as link}
        <li role="none">
          <a 
            href={link.href} 
            onclick={closeMenu} 
            role="menuitem"
          >
            {link.label}
          </a>
        </li>
      {/each}
      
      <li role="none">
        <a 
          href="/cv.pdf" 
          download 
          class="nav-btn" 
          role="menuitem"
          aria-label="Download CV as PDF"
        >
          <Icon name="download" size={14} />
          <span>Download CV</span>
        </a>
      </li>
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
    background: rgba(12, 12, 12, 0.8);
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
  
  .nav-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-7);
    background: var(--color-accent);
    border-radius: var(--radius-md);
    color: var(--color-bg-primary) !important;
    font-weight: var(--font-weight-semibold);
    transition: background var(--duration-fast) var(--ease-out);
  }
  
  .nav-btn:hover {
    background: var(--color-accent-dim);
    color: var(--color-bg-primary) !important;
  }
  
  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
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
  
  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }
    
    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background: rgba(12, 12, 12, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: var(--space-8) var(--space-9) var(--space-9);
      gap: var(--space-7);
      border-bottom: 1px solid var(--color-border-subtle);
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: all var(--duration-normal) var(--ease-out);
    }
    
    .nav-links.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
