<script lang="ts">
  import Lightbox from "./Lightbox.svelte";
  import Icon from "./Icon.svelte";
  import { getMediaType } from "../utils/media";

  interface Props {
    items: string[];
    title: string;
    columns?: 2 | 3;
  }

  let { items = [], title, columns = 2 }: Props = $props();

  let lightboxEl: Lightbox;
</script>

{#if items && items.length > 0}
  <section class="gallery-section">
    <h2>Gallery</h2>
    <div class="gallery-grid" data-columns={columns}>
      {#each items as media, index (media)}
        {@const mediaType = getMediaType(media)}
        {@const isVideo = mediaType === 'video'}
        
        {#if isVideo}
          <div class="gallery-item is-video">
            <video 
              src={media} 
              autoplay 
              loop 
              muted 
              playsinline
              preload="metadata"
            >
              <track kind="captions" />
            </video>
            <div class="video-indicator">
              <Icon name="play" size={16} />
            </div>
          </div>
        {:else}
          <button 
            type="button"
            class="gallery-item"
            onclick={() => lightboxEl.open(media)}
            aria-label="View {title} image {index + 1} in fullscreen"
          >
            <img
              src={media}
              alt={`${title} - ${mediaType === 'gif' ? 'GIF' : 'Image'} ${index + 1}`}
              loading="lazy"
              decoding="async"
              width="800"
              height="500"
            />
            <div class="zoom-indicator">
              <Icon name="zoom-in" size={32} />
            </div>
          </button>
        {/if}
      {/each}
    </div>
  </section>
{/if}

<Lightbox bind:this={lightboxEl} media={items} />

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
  
  .gallery-grid[data-columns="3"] {
    grid-template-columns: repeat(2, 1fr);
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

  .gallery-item:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  
  .gallery-item img,
  .gallery-item video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .gallery-item.is-video {
    cursor: default;
  }

  .gallery-item.is-video:hover {
    transform: none;
    box-shadow: none;
  }
  
  .video-indicator {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: var(--radius-full);
    color: white;
    pointer-events: none;
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
