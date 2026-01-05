<script>
  let isMenuOpen = $state(false);
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<nav class="nav">
  <div class="nav-container">
    <a href="/" class="logo">Bartłomiej Gordon</a>
    
    <button 
      class="menu-toggle" 
      onclick={toggleMenu} 
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
    >
      <span class="bar" class:open={isMenuOpen}></span>
      <span class="bar" class:open={isMenuOpen}></span>
    </button>
    
    <ul class="nav-links" class:open={isMenuOpen}>
      <li><a href="/#experience" onclick={closeMenu}>Experience</a></li>
      <li><a href="/#education" onclick={closeMenu}>Education</a></li>
      <li><a href="/#projects" onclick={closeMenu}>Projects</a></li>
      <li><a href="/#achievements" onclick={closeMenu}>Achievements</a></li>
      <li><a href="/cv.pdf" download class="nav-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download CV
      </a></li>
    </ul>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(12, 12, 12, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    text-decoration: none;
    letter-spacing: -0.02em;
    transition: color 0.2s ease;
  }
  
  .logo:hover {
    color: var(--accent);
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  
  .nav-links a {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .nav-links a:hover {
    color: var(--text-primary);
  }
  
  .nav-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    background: var(--accent);
    border-radius: var(--radius);
    color: var(--bg-primary) !important;
    font-weight: 600;
  }
  
  .nav-btn:hover {
    background: var(--accent-dim);
    color: var(--bg-primary) !important;
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
    background: var(--text-primary);
    transition: all var(--hover-duration) var(--ease-out);
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
      padding: 1.5rem 2rem 2rem;
      gap: 1.25rem;
      border-bottom: 1px solid var(--border-subtle);
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: all var(--hover-duration) var(--ease-out);
    }
    
    .nav-links.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
