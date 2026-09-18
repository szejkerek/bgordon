<script lang="ts">
  import Lightbox from "./Lightbox.svelte";
  import Icon from "./Icon.svelte";
  import Media from "./Media.svelte";
  import type { MediaSource } from "../types";

  interface Props {
    /** Responsive source for the inline thumbnail. */
    image: MediaSource;
    /** Full-size URL the lightbox opens. */
    full: string;
    alt: string;
    class?: string;
    /** All full-size URLs, when the lightbox should navigate a set. */
    allImages?: string[];
    fit?: 'cover' | 'contain';
    ratio?: string;
  }

  let {
    image,
    full,
    alt,
    class: className = '',
    allImages,
    fit = 'contain',
    ratio = '16 / 9',
  }: Props = $props();

  let lightboxEl: Lightbox;

  const media = $derived(allImages && allImages.length > 0 ? allImages : [full]);

  function openLightbox() {
    lightboxEl.open(full);
  }
</script>

<!-- A real button rather than a div with role="button": the faked version only
     handled Enter, while a button also activates on Space. -->
<button
  type="button"
  class="clickable-image {className}"
  onclick={openLightbox}
  aria-label="View {alt} in fullscreen"
>
  <Media {...image} {alt} {fit} {ratio} rounded eager />
  <span class="zoom-overlay">
    <Icon name="zoom-in" size={24} />
    <span>Click to expand</span>
  </span>
</button>

<Lightbox bind:this={lightboxEl} {media} />

<style>
  .clickable-image {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
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
    background: var(--color-overlay-hover);
    color: var(--color-text-primary);
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
