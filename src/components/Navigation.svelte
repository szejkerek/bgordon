<script>
  let isMenuOpen = $state(false);
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="nav">
  <div class="nav-container">
    <a href="/" class="logo">
      <span class="logo-bracket">[</span>
      <span class="logo-text">DEV</span>
      <span class="logo-bracket">]</span>
    </a>
    
    <button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
      <span class="bar" class:open={isMenuOpen}></span>
      <span class="bar" class:open={isMenuOpen}></span>
      <span class="bar" class:open={isMenuOpen}></span>
    </button>
    
    <ul class="nav-links" class:open={isMenuOpen}>
      <li><a href="/#games">Games</a></li>
      <li><a href="/#achievements">Achievements</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/cv" class="nav-btn">View CV</a></li>
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
    background: rgba(10, 10, 15, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .logo-bracket {
    color: var(--accent-primary);
    animation: glow 2s ease-in-out infinite;
  }
  
  .logo-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @keyframes glow {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
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
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .nav-links a:not(.nav-btn)::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width 0.3s ease;
  }
  
  .nav-links a:not(.nav-btn):hover {
    color: var(--accent-primary);
  }
  
  .nav-links a:not(.nav-btn):hover::after {
    width: 100%;
  }
  
  .nav-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--accent-primary);
    border-radius: 4px;
    color: var(--accent-primary) !important;
  }
  
  .nav-btn:hover {
    background: var(--accent-primary);
    color: var(--bg-primary) !important;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
  
  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
  }
  
  .bar {
    width: 25px;
    height: 2px;
    background: var(--accent-primary);
    transition: all 0.3s ease;
  }
  
  .bar.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .bar.open:nth-child(2) {
    opacity: 0;
  }
  
  .bar.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
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
      background: rgba(10, 10, 15, 0.98);
      padding: 2rem;
      gap: 1.5rem;
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }
    
    .nav-links.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
