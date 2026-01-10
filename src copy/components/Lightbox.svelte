<script lang="ts">
  /**
   * Lightbox Component
   * 
   * Full-screen image viewer with navigation.
   * Supports keyboard controls (Escape, Arrow keys).
   */
  import { onMount } from "svelte";

  interface Props {
    images: string[];
    initialIndex?: number;
    isOpen?: boolean;
    onClose?: () => void;
  }

  let { 
    images = [], 
    initialIndex = 0, 
    isOpen = false,
    onClose = () => {}
  }: Props = $props();

  let currentIndex = $state(0);
  let isVisible = $state(false);
  let isFading = $state(false);
  let dialogEl: HTMLDivElement | undefined = $state();

  // Update currentIndex when initialIndex or isOpen changes
  $effect(() => {
    if (isOpen) {
      currentIndex = initialIndex;
      requestAnimationFrame(() => {
        isVisible = true;
        dialogEl?.focus();
      });
    }
  });

  function close() {
    isVisible = false;
    setTimeout(() => {
      onClose();
    }, 200);
  }

  function navigate(direction: 1 | -1) {
    if (isFading || images.length <= 1) return;
    isFading = true;
    
    setTimeout(() => {
      currentIndex = (currentIndex + direction + images.length) % images.length;
      setTimeout(() => {
        isFading = false;
      }, 50);
    }, 150);
  }

  function next() {
    navigate(1);
  }

  function prev() {
    navigate(-1);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowRight':
        next();
        break;
      case 'ArrowLeft':
        prev();
        break;
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('lightbox-overlay') || target.classList.contains('lightbox-content')) {
      close();
    }
  }

  // Prevent body scroll when open
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div 
    bind:this={dialogEl}
    class="lightbox-overlay" 
    class:visible={isVisible}
    onclick={handleBackdropClick}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-label="Image viewer"
    tabindex="-1"
  >
    <!-- Close button -->
    <button 
      type="button"
      class="close-btn" 
      onclick={close}
      aria-label="Close lightbox"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Main content area with image and arrows -->
    <div class="lightbox-content">
      <!-- Previous button -->
      {#if images.length > 1}
        <button 
          type="button"
          class="nav-btn prev-btn" 
          onclick={prev}
          aria-label="Previous image"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      {/if}

      <!-- Fixed size image container -->
      <div class="image-container">
        <img 
          src={images[currentIndex]} 
          alt="Gallery image {currentIndex + 1} of {images.length}"
          class="lightbox-image"
          class:fading={isFading}
        />
      </div>

      <!-- Next button -->
      {#if images.length > 1}
        <button 
          type="button"
          class="nav-btn next-btn" 
          onclick={next}
          aria-label="Next image"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      {/if}
    </div>

    <!-- Counter -->
    {#if images.length > 1}
      <div class="lightbox-counter">
        {currentIndex + 1} / {images.length}
      </div>
    {/if}
  </div>
{/if}

<style>
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease-out;
    padding: 20px;
  }

  .lightbox-overlay:focus {
    outline: none;
  }

  .lightbox-overlay.visible {
    opacity: 1;
  }

  .lightbox-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    max-width: 1400px;
    height: calc(100vh - 120px);
  }

  .image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 0;
  }

  .lightbox-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: var(--radius-lg);
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
    transition: opacity 0.15s ease-out;
  }

  .lightbox-image.fading {
    opacity: 0;
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease-out;
    z-index: 10;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  .close-btn:active {
    transform: scale(0.95);
  }

  .nav-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }

  .nav-btn:active {
    transform: scale(0.95);
  }

  .lightbox-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    .lightbox-overlay {
      padding: 12px;
    }

    .lightbox-content {
      gap: 8px;
      height: calc(100vh - 100px);
    }

    .nav-btn {
      width: 44px;
      height: 44px;
    }

    .nav-btn svg {
      width: 22px;
      height: 22px;
    }

    .close-btn {
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
    }

    .lightbox-counter {
      bottom: 12px;
      padding: 8px 16px;
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    .nav-btn {
      width: 40px;
      height: 40px;
    }
  }
</style>
