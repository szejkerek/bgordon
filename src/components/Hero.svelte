<script>
  import { onMount } from "svelte";

  let { heroData = {} } = $props();

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  // SVG icons for social links
  const icons = {
    email: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>`
  };
</script>

<section class="hero" class:visible={visible} aria-label="Hero section">
  <div class="hero-bg" aria-hidden="true"></div>

  <div class="hero-grid">
    <div class="hero-content">
      <p class="hero-label">{heroData.label || 'Unity Developer'}</p>

      <h1 class="hero-name">{heroData.name || 'Bartłomiej Gordon'}</h1>

      <p class="hero-bio">
        {heroData.bio || 'Computer Science graduate with 5 years of experience in game development.'}
      </p>

      <nav class="hero-links" aria-label="Primary links">
        {#if heroData.primaryLink}
          <a href={heroData.primaryLink.url} class="hero-link primary">
            <span>{heroData.primaryLink.text}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        {/if}

        {#each heroData.socialLinks || [] as link}
          {@const isExternal = link.url.startsWith('http')}
          <a 
            href={link.url} 
            class="hero-link"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {@html icons[link.type] || ''}
            <span>{link.text}</span>
          </a>
        {/each}
      </nav>
    </div>

    <div class="hero-photo" aria-label="Profile photo">
      <div class="photo-wrapper">
        <img
          src={heroData.photo || 'images/profilePicture.jpg'}
          alt={heroData.name || 'Bartłomiej Gordon'}
          class="photo-frame"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    padding: 8rem 2rem 4rem;
    max-width: 1200px;
    margin: 0 auto;

    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.65s cubic-bezier(0.2, 0.8, 0.2, 1),
      transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .hero.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100vw;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1;
    background-color: var(--bg-primary);
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4rem;
    align-items: center;
    width: 100%;
  }

  .hero-content {
    max-width: 560px;
  }

  .hero-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: var(--accent);
    margin-bottom: 1.25rem;
    text-transform: uppercase;
    opacity: 0.95;
  }

  .hero-name {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    line-height: 1.05;
    margin-bottom: 1.25rem;
  }

  .hero-bio {
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .hero-link {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.68rem 1.25rem;

    text-decoration: none;
    font-size: 0.86rem;
    color: var(--text-primary);

    border-radius: var(--radius);
    border: 1px solid var(--border-light);

    background: rgba(255, 255, 255, 0.03);

    transform: translate3d(0, 0, 0);
    transition:
      transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1),
      box-shadow 0.22s cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 0.22s cubic-bezier(0.2, 0.8, 0.2, 1),
      background 0.22s cubic-bezier(0.2, 0.8, 0.2, 1),
      color 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform;
  }

  .hero-link :global(svg) {
    opacity: 0.92;
    transition: opacity 0.22s ease, transform 0.22s ease;
  }

  .hero-link:hover {
    transform: translate3d(0, -3px, 0);
    border-color: var(--border-subtle);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
    background: rgba(255, 255, 255, 0.05);
  }

  .hero-link:hover :global(svg) {
    opacity: 1;
    transform: rotate(-2deg);
  }

  .hero-link:active {
    transform: translate3d(0, -1px, 0);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
  }

  .hero-link:focus-visible {
    outline: 2px solid rgba(110, 231, 183, 0.55);
    outline-offset: 3px;
  }

  .hero-link.primary {
    background: rgba(110, 231, 183, 0.92);
    color: #0b1210;
    border-color: rgba(110, 231, 183, 0.9);
  }

  .hero-link.primary:hover {
    background: rgba(110, 231, 183, 0.98);
    border-color: rgba(110, 231, 183, 1);
  }

  .hero-photo {
    position: relative;
  }

  .photo-wrapper {
    width: 320px;
    height: 400px;
    position: relative;
  }

  .photo-wrapper::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: translate(16px, 16px);
    border: 2px solid var(--accent);
    border-radius: var(--radius-lg);
    opacity: 0.28;
    pointer-events: none;
  }

  .photo-frame {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-light);
    background: var(--bg-card);
    position: relative;
    z-index: 1;
    display: block;
    transform: translate3d(0, 0, 0);
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .photo-wrapper:hover .photo-frame {
    transform: translate3d(0, -4px, 0);
  }

  @media (max-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 2.75rem;
    }

    .hero-photo {
      order: -1;
      display: flex;
      justify-content: center;
    }

    .photo-wrapper {
      width: 200px;
      height: 250px;
    }

    .hero-links {
      justify-content: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero,
    .hero-link,
    .hero-link :global(svg),
    .photo-frame {
      transition: none;
    }

    .hero-link:hover,
    .hero-link:active,
    .photo-wrapper:hover .photo-frame {
      transform: none;
      box-shadow: none;
    }
  }
</style>
