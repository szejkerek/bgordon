<script lang="ts">
  import Lightbox from "./Lightbox.svelte";
  import Icon from "./Icon.svelte";
  import Media from "./Media.svelte";
  import type { MediaSource } from "../types";

  /** A gallery tile: a small responsive thumbnail plus the full-size URL the lightbox opens. */
  export interface GalleryItem {
    thumbnail: MediaSource;
    full: string;
  }

  interface Props {
    items: GalleryItem[];
    title: string;
    columns?: 2 | 3;
  }

  let { items = [], title, columns = 2 }: Props = $props();

  const fullSizes = $derived(items.map((item) => item.full));

  let lightboxEl: Lightbox;
</script>

{#if items && items.length > 0}
  <section class="gallery-section">
    <h2>Gallery</h2>
    <div class="gallery-grid" data-columns={columns}>
      {#each items as item, index (item.full)}
        <button
          type="button"
          class="gallery-item"
          onclick={() => lightboxEl.open(item.full)}
          aria-label="View {title} image {index + 1} in fullscreen"
        >
          <Media
            {...item.thumbnail}
            alt={`${title} - Image ${index + 1}`}
            fit="cover"
          />
          <div class="zoom-indicator">
            <Icon name="zoom-in" size={32} />
          </div>
        </button>
      {/each}
    </div>
  </section>
{/if}

<Lightbox bind:this={lightboxEl} media={fullSizes} />

<style>
  .gallery-section {
    margin-bottom: var(--space-11);
  }
  
  .gallery-section h2 {
    font-family: var(--font-display);
    font-size: 1.375rem;
    color: var(--color-text-primary);
    margin-bottom: var(--space-7);
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }

  @media (min-width: 900px) {
    .gallery-grid[data-columns="3"] {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .gallery-item {
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-bg-card);
    cursor: pointer;
    transition: transform var(--duration-normal) var(--ease-out),
                box-shadow var(--duration-normal) var(--ease-out);
    position: relative;
    aspect-ratio: 16 / 10;
    border: none;
    padding: 0;
    display: block;
    width: 100%;
  }
  
  button.gallery-item:hover {
    transform: scale(1.03);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .zoom-indicator {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-out);
    pointer-events: none;
  }

  button.gallery-item:hover .zoom-indicator,
  .gallery-item:focus-visible .zoom-indicator {
    opacity: 1;
  }
  
  @media (max-width: 600px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
    
    .gallery-grid[data-columns="3"] {
      grid-template-columns: 1fr;
    }
  }
</style>
