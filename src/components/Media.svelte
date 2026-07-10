<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconType } from "../utils/icons";
  import { resolveMediaPath } from "../utils/media";

  interface Props {
    src?: string;
    alt: string;
    fit?: 'cover' | 'contain';
    ratio?: string;            // e.g. "16 / 9"; omit to fill parent
    rounded?: boolean;
    eager?: boolean;
    fallbackIcon?: IconType;
    fallbackIconSize?: number;
    fill?: boolean;            // blurred backdrop behind contain; defaults on for contain
    class?: string;
  }

  let {
    src,
    alt,
    fit = 'cover',
    ratio,
    rounded = false,
    eager = false,
    fallbackIcon = 'image',
    fallbackIconSize = 40,
    fill,
    class: className = '',
  }: Props = $props();

  let failed = $state(false);
  const resolved = $derived(src ? resolveMediaPath(src) : undefined);
  const showImage = $derived(!!resolved && !failed);
  const showFill = $derived(fit === 'contain' && (fill ?? true));
</script>

<div
  class="media {className}"
  class:rounded
  class:is-contain={fit === 'contain'}
  style={ratio ? `aspect-ratio: ${ratio};` : undefined}
>
  {#if showImage}
    {#if showFill}
      <!-- blurred backdrop fills the frame so contain never shows dead-color bars -->
      <img
        class="media-fill"
        src={resolved}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    {/if}
    <img
      class="media-img"
      src={resolved}
      {alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onerror={() => (failed = true)}
    />
  {:else}
    <div class="media-placeholder" role="img" aria-label={alt}>
      <Icon name={fallbackIcon} size={fallbackIconSize} strokeWidth={1.5} />
    </div>
  {/if}
</div>

<style>
  .media {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
    background: var(--color-bg-elevated);
  }

  .media.rounded {
    border-radius: var(--radius-lg);
  }

  .media-img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .is-contain .media-img {
    object-fit: contain;
  }

  .media-fill {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(28px) saturate(1.3);
    transform: scale(1.2);
    opacity: 0.5;
    pointer-events: none;
  }

  .media-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-text-muted);
  }

  @media (prefers-reduced-motion: reduce) {
    .media-img {
      transition: none;
    }
  }
</style>
