<script lang="ts">
  import Lightbox from "./Lightbox.svelte";
  import Icon from "./Icon.svelte";
  import Media from "./Media.svelte";

  interface Props {
    src: string;
    alt: string;
    class?: string;
    allImages?: string[];  // Optional array of all images for navigation
    fit?: 'cover' | 'contain';
    ratio?: string;
  }

  let { src, alt, class: className = '', allImages, fit = 'contain', ratio = '16 / 9' }: Props = $props();

  let lightboxEl: Lightbox;

  const media = $derived(allImages && allImages.length > 0 ? allImages : [src]);

  function openLightbox() {
    lightboxEl.open(src);
  }
</script>

<div 
  class="clickable-image {className}"
  onclick={openLightbox}
  onkeydown={(e) => e.key === 'Enter' && openLightbox()}
  role="button"
  tabindex="0"
  aria-label="View {alt} in fullscreen"
>
  <Media {src} {alt} {fit} {ratio} rounded eager />
  <div class="zoom-overlay">
    <Icon name="zoom-in" size={24} />
    <span>Click to expand</span>
  </div>
</div>

<Lightbox bind:this={lightboxEl} {media} />

<style>
  .clickable-image {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: inherit;
  }

  .clickable-image:hover :global(.media-img) {
    transform: scale(1.03);
  }

  .zoom-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-out);
    pointer-events: none;
  }

  .clickable-image:hover .zoom-overlay,
  .clickable-image:focus-visible .zoom-overlay {
    opacity: 1;
  }
</style>
