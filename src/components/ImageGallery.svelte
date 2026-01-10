<script lang="ts">
  /**
   * ImageGallery Component
   * 
   * Interactive gallery for displaying images with lightbox support.
   * Click any image to view in fullscreen with navigation.
   */
  import Lightbox from "./Lightbox.svelte";

  interface Props {
    items: string[];
    title: string;
    columns?: 2 | 3;
  }

  let { items = [], title, columns = 2 }: Props = $props();

  let lightboxOpen = $state(false);
  let lightboxIndex = $state(0);

  // Filter out videos - lightbox only supports images
  const imageItems = $derived(
    items.filter(item => {
      const ext = item.split('.').pop()?.toLowerCase() || '';
      return !['mp4', 'webm', 'ogg'].includes(ext);
    })
  );

  // Get media type for rendering
  function getMediaType(src: string): 'image' | 'video' | 'gif' {
    const ext = src.split('.').pop()?.toLowerCase() || '';
    if (['mp4', 'webm', 'ogg'].includes(ext)) return 'video';
    if (ext === 'gif') return 'gif';
    return 'image';
  }

  function openLightbox(index: number) {
    // Find the correct index in imageItems array
    const item = items[index];
    const imageIndex = imageItems.indexOf(item);
    if (imageIndex !== -1) {
      lightboxIndex = imageIndex;
      lightboxOpen = true;
    }
  }

  function closeLightbox() {
    lightboxOpen = false;
  }
</script>

{#if items && items.length > 0}
  <section class="gallery-section">
    <h2>Gallery</h2>
    <div class="gallery-grid" data-columns={columns}>
      {#each items as media, index (media)}
        {@const mediaType = getMediaType(media)}
        {@const isVideo = mediaType === 'video'}
        
        <div 
          class="gallery-item" 
          class:is-video={isVideo}
          onclick={() => !isVideo && openLightbox(index)}
          onkeydown={(e) => e.key === 'Enter' && !isVideo && openLightbox(index)}
          role={isVideo ? undefined : "button"}
          tabindex={isVideo ? undefined : 0}
          aria-label={isVideo ? undefined : `View ${title} image ${index + 1} in fullscreen`}
        >
          {#if isVideo}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          {:else}
            <img 
              src={media} 
              alt={`${title} - ${mediaType === 'gif' ? 'GIF' : 'Image'} ${index + 1}`} 
              loading="lazy"
              decoding="async" 
            />
            <div class="zoom-indicator">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </section>
{/if}

<Lightbox 
  images={imageItems} 
  initialIndex={lightboxIndex}
  isOpen={lightboxOpen}
  onClose={closeLightbox}
/>

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
  }
  
  .gallery-item:hover {
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

  .gallery-item:hover .zoom-indicator,
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
