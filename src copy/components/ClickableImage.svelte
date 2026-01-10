<script lang="ts">
  /**
   * ClickableImage Component
   * 
   * A single image that opens in a lightbox when clicked.
   * Used for featured images on detail pages.
   */
  import Lightbox from "./Lightbox.svelte";

  interface Props {
    src: string;
    alt: string;
    class?: string;
    allImages?: string[];  // Optional array of all images for navigation
  }

  let { src, alt, class: className = '', allImages }: Props = $props();

  let lightboxOpen = $state(false);
  
  // If allImages provided, use those. Otherwise just use the single image
  const images = $derived(allImages && allImages.length > 0 ? allImages : [src]);
  const initialIndex = $derived(allImages ? allImages.indexOf(src) : 0);

  function openLightbox() {
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
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
  <img 
    {src} 
    {alt}
    loading="eager"
    decoding="async"
  />
  <div class="zoom-overlay">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
    <span>Click to expand</span>
  </div>
</div>

<Lightbox 
  {images}
  initialIndex={initialIndex >= 0 ? initialIndex : 0}
  isOpen={lightboxOpen}
  onClose={closeLightbox}
/>

<style>
  .clickable-image {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: inherit;
  }

  .clickable-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .clickable-image:hover img {
    transform: scale(1.03);
  }

  .clickable-image:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
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
