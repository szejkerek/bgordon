<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import Media from "./Media.svelte";
  import type { HeroData, HeroStat, SocialLink } from "../types";
  import type { IconType } from "../utils/icons";
  import { resolveMediaPath } from "../utils/media";

  interface Props {
    heroData?: HeroData;
    stats?: HeroStat[];
    age?: number;
  }

  let { heroData = {}, stats = [], age }: Props = $props();

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
    location: heroData.location,
    locationUrl: heroData.locationUrl,
    photo: resolveMediaPath(heroData.photo || defaults.photo),
    primaryLink: heroData.primaryLink,
    socialLinks: heroData.socialLinks || [],
  });

  // Engine names that get an inline icon + comic marker highlight in the bio.
  // Longest pattern first so "Unreal Engine" wins over a bare "Unreal".
  const ENGINE_TERMS: { pattern: string; icon: IconType }[] = [
    { pattern: 'Unreal Engine', icon: 'unreal' },
    { pattern: 'Unity', icon: 'unity' },
  ];

  type BioSegment = { text: string; icon?: IconType };

  // Split bio into plain-text and engine segments without touching whitespace.
  function markEngines(text: string): BioSegment[] {
    const segments: BioSegment[] = [];
    let i = 0;
    while (i < text.length) {
      const term = ENGINE_TERMS.find((t) => text.startsWith(t.pattern, i));
      if (term) {
        segments.push({ text: term.pattern, icon: term.icon });
        i += term.pattern.length;
      } else {
        const last = segments[segments.length - 1];
        if (last && !last.icon) last.text += text[i];
        else segments.push({ text: text[i] });
        i++;
      }
    }
    return segments;
  }

  const bioSegments = $derived(markEngines(data.bio));

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
      {#if data.location || age}
        <p class="hero-location">
          {#if data.location}
            {#if data.locationUrl}
              <a
                class="hero-location-place hero-location-place--link"
                href={data.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="{data.location} on Google Maps"
              >
                <Icon name="location" size={15} />
                <span>{data.location}</span>
              </a>
            {:else}
              <span class="hero-location-place">
                <Icon name="location" size={15} />
                <span>{data.location}</span>
              </span>
            {/if}
          {/if}
          {#if age}<span class="hero-age">{age} years old</span>{/if}
        </p>
      {/if}
      <p class="hero-bio">{#each bioSegments as seg, i (i)}{#if seg.icon}<span class="engine-mark engine-mark--{seg.icon}"><Icon name={seg.icon} size={21} /><span class="engine-name">{seg.text}</span></span>{:else}{seg.text}{/if}{/each}</p>

      <nav class="hero-links" aria-label="Primary links">
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

    {#if stats.length}
      <dl class="hero-stats" aria-label="Career stats">
        {#each stats as stat (stat.label)}
          <div class="hero-stat">
            <dt class="hero-stat-label">{stat.label}</dt>
            <dd class="hero-stat-value">{stat.value}</dd>
          </div>
        {/each}
      </dl>
    {/if}
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

  .hero-location {
    display: inline-flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-7);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }

  .hero-location-place {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }

  .hero-location-place--link {
    text-decoration: none;
    color: inherit;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .hero-location-place--link:hover {
    color: var(--color-accent);
  }

  .hero-location-place--link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }

  .hero-location :global(svg) {
    color: var(--color-accent);
    flex-shrink: 0;
  }

  /* Static chip sharing the site button frame (border-light + radius-md +
     translucent fill), matching hero links and ActionButton. */
  .hero-age {
    padding: 0.3em 0.7em;
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.03);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    line-height: 1;
    color: var(--color-text-primary);
    white-space: nowrap;
  }

  .hero-bio {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-9);
    text-align: justify;
    hyphens: auto;
  }

  .hero-stats {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-6);
    margin: var(--space-4) 0 0;
    padding: var(--space-8) 0 0;
    border-top: 1px solid var(--color-border-subtle);
  }

  .hero-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    text-align: center;
  }

  .hero-stat-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .hero-stat-value {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
  }

  .engine-mark {
    position: relative;
    z-index: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0 0.14em;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    white-space: nowrap;
  }

  /* Icon keeps its own (brand) color — inherits text color, not the accent. */
  .engine-mark :global(svg) {
    flex-shrink: 0;
  }

  /* Comic highlighter block: spans icon + name, irregular rounded ends,
     slight tilt, swiped in vertically when the hero reveals.
     Unity fills bottom→top, Unreal fills top→bottom. */
  .engine-mark::before {
    content: "";
    position: absolute;
    inset: -0.12em -0.26em -0.08em;
    z-index: -1;
    background: var(--color-accent);
    opacity: 0.26;
    transform: rotate(-1.8deg) scaleY(0);
    transition: transform 0.55s var(--ease-spring);
  }

  /* Unity: careless marker swipe — wobbly edges, ragged ends.
     Fills bottom -> top. */
  .engine-mark--unity::before {
    transform-origin: center bottom;
    clip-path: polygon(
      1% 22%, 8% 5%, 23% 12%, 40% 3%, 58% 10%, 75% 2%, 91% 9%, 100% 15%,
      96% 35%, 100% 59%, 94% 83%, 99% 96%,
      83% 91%, 65% 100%, 47% 92%, 30% 100%, 13% 93%, 3% 99%,
      0% 73%, 5% 49%, 0% 38%
    );
  }

  /* Unreal: different careless swipe — offset waves, heavier tail.
     Fills top -> bottom. */
  .engine-mark--unreal::before {
    transform-origin: center top;
    clip-path: polygon(
      3% 13%, 19% 4%, 35% 12%, 53% 2%, 69% 11%, 86% 3%, 100% 13%,
      94% 31%, 100% 51%, 93% 71%, 100% 89%,
      87% 97%, 70% 89%, 53% 99%, 36% 90%, 19% 100%, 5% 92%,
      0% 71%, 6% 51%, 1% 33%, 4% 21%
    );
  }

  .hero.visible .engine-mark::before {
    transform: rotate(-1.8deg) scaleY(1);
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
    transition:
      transform var(--duration-normal) var(--ease-spring),
      box-shadow var(--duration-normal) var(--ease-spring),
      border-color var(--duration-normal) var(--ease-spring),
      background var(--duration-normal) var(--ease-spring);
  }

  .hero-link:hover {
    transform: translateY(-3px);
    border-color: var(--color-border-subtle);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
    background: rgba(255, 255, 255, 0.05);
  }

  .hero-link:active {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
  }

  .hero-link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  .scroll-cue {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-11);
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
    border-radius: var(--radius-full);
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
    transition: transform var(--duration-slower) var(--ease-spring);
  }

  .photo-wrapper:hover .photo-frame {
    transform: translateY(-4px);
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

    .hero-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-7) var(--space-6);
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

    .engine-mark::before {
      transition: none;
      transform: rotate(-1.8deg) scaleY(1);
    }
  }
</style>
