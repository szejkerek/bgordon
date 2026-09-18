<script lang="ts">
  import Icon from "./Icon.svelte";

  interface Props {
    media: string[];
  }

  let { media = [] }: Props = $props();

  const images = $derived(media);

  let dialogEl: HTMLDialogElement | undefined = $state();
  let currentIndex = $state(0);

  /**
   * Opens as a native modal dialog, which is what provides the focus trap, the
   * inert background, Escape-to-close and focus restoration to whatever opened
   * it. Hand-rolling those is how the previous version let Tab walk behind the
   * overlay and dropped focus entirely on close.
   */
  export function open(src: string) {
    const index = images.indexOf(src);
    currentIndex = index >= 0 ? index : 0;
    dialogEl?.showModal();
    lockScroll();
  }

  function close() {
    dialogEl?.close();
  }

  function navigate(direction: 1 | -1) {
    if (images.length <= 1) return;
    currentIndex = (currentIndex + direction + images.length) % images.length;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') navigate(1);
    else if (event.key === 'ArrowLeft') navigate(-1);
  }

  // Clicks that land on the dialog itself rather than on its content box are
  // backdrop clicks.
  function handleClick(event: MouseEvent) {
    if (event.target === dialogEl) close();
  }

  // Scroll lock lives on a class, not on an inline style, so it cannot clobber
  // an overflow value set elsewhere. Unlocking hangs off the dialog's `close`
  // event, which fires for the close button, a backdrop click and Escape alike.
  function lockScroll() {
    document.documentElement.classList.add('has-modal');
  }

  function unlockScroll() {
    document.documentElement.classList.remove('has-modal');
  }
</script>

<dialog
  bind:this={dialogEl}
  class="lightbox"
  aria-label="Image viewer"
  onkeydown={handleKeydown}
  onclick={handleClick}
  onclose={unlockScroll}
>
  <button type="button" class="close-btn" onclick={close} aria-label="Close lightbox">
    <Icon name="x" size={20} strokeWidth={2.5} />
  </button>

  <div class="lightbox-content">
    {#if images.length > 1}
      <button type="button" class="nav-btn" onclick={() => navigate(-1)} aria-label="Previous image">
        <Icon name="chevron-left" size={28} strokeWidth={2.5} />
      </button>
    {/if}

    <div class="image-container">
      <img
        src={images[currentIndex]}
        alt="Gallery image {currentIndex + 1} of {images.length}"
        class="lightbox-image"
      />
    </div>

    {#if images.length > 1}
      <button type="button" class="nav-btn" onclick={() => navigate(1)} aria-label="Next image">
        <Icon name="chevron-right" size={28} strokeWidth={2.5} />
      </button>
    {/if}
  </div>

  {#if images.length > 1}
    <p class="lightbox-counter" aria-live="polite">
      {currentIndex + 1} / {images.length}
    </p>
  {/if}
</dialog>

<style>
  .lightbox {
    /* Reset the UA dialog box: this one fills the viewport and paints nothing
       itself — the backdrop does. */
    width: 100%;
    max-width: 100vw;
    height: 100%;
    max-height: 100vh;
    margin: 0;
    padding: 20px;
    border: none;
    background: transparent;
    color: var(--color-text-primary);
    overflow: hidden;
  }

  .lightbox:not([open]) {
    display: none;
  }

  .lightbox[open] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .lightbox::backdrop {
    background: var(--color-overlay-scrim);
  }

  /* Fade in from the top layer; browsers without @starting-style just show it. */
  @starting-style {
    .lightbox[open],
    .lightbox[open]::backdrop {
      opacity: 0;
    }
  }

  .lightbox[open],
  .lightbox[open]::backdrop {
    opacity: 1;
    transition: opacity var(--duration-fast) var(--ease-out);
  }

  .lightbox-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    max-width: 1400px;
    height: calc(100% - 60px);
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
    background: var(--color-overlay-control);
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-out),
                transform var(--duration-fast) var(--ease-out);
    z-index: 10;
  }

  .close-btn:hover {
    background: var(--color-overlay-control-hover);
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
    background: var(--color-overlay-control);
    border: 2px solid var(--color-overlay-border);
    border-radius: var(--radius-full);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-out),
                border-color var(--duration-fast) var(--ease-out),
                transform var(--duration-fast) var(--ease-out);
  }

  .nav-btn:hover {
    background: var(--color-overlay-control-hover);
    border-color: var(--color-overlay-border-hover);
    transform: scale(1.1);
  }

  .nav-btn:active {
    transform: scale(0.95);
  }

  .lightbox-counter {
    margin: 16px 0 0;
    padding: 10px 20px;
    background: var(--color-overlay-control);
    border-radius: var(--radius-full);
    color: var(--color-text-primary);
    font-size: 14px;
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    .lightbox {
      padding: 12px;
    }

    .lightbox-content {
      gap: 8px;
    }

    .nav-btn {
      width: 44px;
      height: 44px;
    }

    .close-btn {
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
    }

    .lightbox-counter {
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

  @media (prefers-reduced-motion: reduce) {
    .close-btn:hover,
    .close-btn:active,
    .nav-btn:hover,
    .nav-btn:active {
      transform: none;
    }
  }
</style>
