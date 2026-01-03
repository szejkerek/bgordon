<script>
  import { onMount } from "svelte";

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<section class="hero" class:visible={visible}>
  <div class="hero-content">
    <div class="hero-badge">
      <span class="pulse"></span>
      Available for hire
    </div>

    <h1 class="hero-title">
      <span class="line">Game</span>
      <span class="line highlight">Developer</span>
      <span class="line">&amp; Designer</span>
    </h1>

    <p class="hero-description">
      Creating memorable gaming experiences through code, art, and passion.
      Specializing in indie games, game jams, and interactive experiences.
    </p>

    <div class="hero-actions">
      <a href="#games" class="btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        View Games
      </a>
      <a href="/cv" class="btn btn-secondary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        View CV
      </a>
    </div>

    <div class="hero-stats">
      <div class="stat">
        <span class="stat-value">10+</span>
        <span class="stat-label">Games Shipped</span>
      </div>
      <div class="stat">
        <span class="stat-value">5</span>
        <span class="stat-label">Jam Wins</span>
      </div>
      <div class="stat">
        <span class="stat-value">3+</span>
        <span class="stat-label">Years Exp</span>
      </div>
    </div>
  </div>

  <div class="hero-visual">
    <div class="terminal">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="terminal-title">portfolio.exe</span>
      </div>
      <div class="terminal-body">
        <p><span class="prompt">$</span> loading_skills...</p>
        <p class="indent"><span class="key">unity</span>: <span class="value">████████░░</span> 80%</p>
        <p class="indent"><span class="key">godot</span>: <span class="value">███████░░░</span> 70%</p>
        <p class="indent"><span class="key">c#</span>: <span class="value">█████████░</span> 90%</p>
        <p class="indent"><span class="key">pixel_art</span>: <span class="value">██████░░░░</span> 60%</p>
        <p><span class="prompt">$</span> status: <span class="success">ready_to_create</span></p>
        <p class="cursor"><span class="prompt">$</span> <span class="blink">_</span></p>
      </div>
    </div>
  </div>
</section>
