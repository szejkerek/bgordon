<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import Media from "./Media.svelte";
  import type { HeroData, SocialLink } from "../types";
  import { resolveMediaPath } from "../utils/media";

  interface Props {
    heroData?: HeroData;
  }

  let { heroData = {} }: Props = $props();

  let visible = $state(false);

  // Default values
  const defaults = {
    label: 'Unity Developer',
    name: 'Bartłomiej Gordon',
    bio: 'Computer Science graduate with 5 years of experience in game development.',
    photo: '/images/profilePicture.png',
  };

  // Merged data with defaults
  const data = $derived({
    label: heroData.label || defaults.label,
    name: heroData.name || defaults.name,
    bio: heroData.bio || defaults.bio,
    photo: resolveMediaPath(heroData.photo || defaults.photo),
    primaryLink: heroData.primaryLink,
    socialLinks: heroData.socialLinks || [],
  });

  // Check if link is external
  function isExternalLink(url: string): boolean {
    return url.startsWith('http');
  }

  // Check if link is a download
  function isDownloadLink(link: SocialLink): boolean {
    return link.type === 'download' || link.url.endsWith('.pdf');
  }

  onMount(() => {
    visible = true;
  });
</script>

<section class="hero" class:visible aria-label="Hero section">
  <div class="hero-bg" aria-hidden="true"></div>

  <div class="hero-grid">
    <div class="hero-content">
      <p class="hero-label">{data.label}</p>
      <h1 class="hero-name">{data.name}</h1>
      <p class="hero-bio">{data.bio}</p>

      <nav class="hero-links" aria-label="Primary links">
        <div class="hero-social-links">
          {#each data.socialLinks as link (link.url)}
            {@const isExternal = isExternalLink(link.url)}
            {@const isDownload = isDownloadLink(link)}
            <a
              href={link.url}
              class="hero-link"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              download={isDownload ? "" : undefined}
              aria-label={link.text}
            >
              <Icon name={link.type} size={16} />
              <span>{link.text}</span>
            </a>
          {/each}
        </div>
      </nav>
    </div>

    <div class="hero-photo" aria-label="Profile photo">
      <div class="photo-wrapper">
        <div class="photo-frame">
          <Media
            src={data.photo}
            alt={data.name}
            fit="cover"
            eager
            fallbackIcon="users"
          />
        </div>
      </div>
    </div>
  </div>

  {#if data.primaryLink}
    <a href={data.primaryLink.url} class="scroll-cue" aria-label={data.primaryLink.text}>
      <span class="scroll-cue-text">{data.primaryLink.text}</span>
      <span class="scroll-cue-icon" aria-hidden="true">
        <Icon name="chevron-down" size={22} />
      </span>
    </a>
  {/if}
</section>

<style>
  .hero {
    min-height: 100vh;
    min-height: 100dvh;
    position: relative;
    display: flex;
    align-items: center;
    padding: 8rem 2rem 4rem;
    max-width: var(--container-max-width);
    margin: 0 auto;
    opacity: 0;
    transform: translateY(16px);
    transition: 
      opacity 0.65s var(--ease-spring),
      transform 0.65s var(--ease-spring);
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
    background-color: var(--color-bg-primary);
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 72px 72px;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-12);
    align-items: center;
    width: 100%;
  }

  .hero-content {
    max-width: 560px;
  }

  .hero-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.14em;
    color: var(--color-accent);
    margin-bottom: var(--space-7);
    text-transform: uppercase;
    opacity: 0.95;
  }

  .hero-name {
    font-size: var(--font-size-4xl);
    line-height: 1.05;
    margin-bottom: var(--space-7);
  }

  .hero-bio {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-9);
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-5);
  }

  .hero-social-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-5);
  }

  .hero-link {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.45rem var(--space-5);
    text-decoration: none;
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-light);
    background: rgba(255, 255, 255, 0.03);
    transform: translate3d(0, 0, 0);
    transition: 
      transform var(--duration-normal) var(--ease-spring),
      box-shadow var(--duration-normal) var(--ease-spring),
      border-color var(--duration-normal) var(--ease-spring),
      background var(--duration-normal) var(--ease-spring);
    will-change: transform;
  }

  .hero-link:hover {
    transform: translate3d(0, -3px, 0);
    border-color: var(--color-border-subtle);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
    background: rgba(255, 255, 255, 0.05);
  }

  .hero-link:active {
    transform: translate3d(0, -1px, 0);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
  }

  .hero-link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  .scroll-cue {
    position: absolute;
    left: 50%;
    bottom: 6rem;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0;
    transition:
      color var(--duration-normal) var(--ease-out),
      opacity 0.65s var(--ease-spring) 0.4s;
  }

  .hero.visible .scroll-cue {
    opacity: 0.85;
  }

  .scroll-cue:hover {
    color: var(--color-accent);
  }

  .scroll-cue-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full, 999px);
    border: 1px solid var(--color-border-light);
    background: rgba(255, 255, 255, 0.03);
    animation: scroll-bounce 2s var(--ease-out) infinite;
  }

  .scroll-cue:hover .scroll-cue-icon {
    border-color: var(--color-accent);
  }

  @keyframes scroll-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }

  .scroll-cue:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }

  .hero-photo {
    position: relative;
  }

  .photo-wrapper {
    width: 380px;
    height: 470px;
    position: relative;
  }

  .photo-wrapper::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: translate(16px, 16px);
    border: 2px solid var(--color-accent);
    border-radius: var(--radius-lg);
    opacity: 0.28;
    pointer-events: none;
  }

  .photo-frame {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-light);
    background: var(--color-bg-card);
    position: relative;
    z-index: 1;
    transform: translate3d(0, 0, 0);
    transition: transform var(--duration-slower) var(--ease-spring);
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

    .photo-wrapper::before {
      transform: translate(10px, 10px);
    }

    .hero-links {
      justify-content: center;
    }

    .hero-social-links {
      justify-content: center;
    }

    .scroll-cue {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero,
    .hero-link,
    .photo-frame {
      transition: none;
    }

    .hero-link:hover,
    .hero-link:active,
    .photo-wrapper:hover .photo-frame {
      transform: none;
      box-shadow: none;
    }

    .scroll-cue-icon {
      animation: none;
    }
  }
</style>
