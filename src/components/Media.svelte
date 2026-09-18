<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconType } from "../utils/icons";
  import { resolveMediaPath } from "../utils/media";

  interface Props {
    src?: string;
    /** Width-descriptor srcset; pairs with `sizes`. */
    srcset?: string;
    sizes?: string;
    /** Intrinsic dimensions — reserve the box so the image cannot shift the layout. */
    width?: number;
    height?: number;
    alt: string;
    fit?: 'cover' | 'contain';
    ratio?: string;            // e.g. "16 / 9"; omit to fill parent
    rounded?: boolean;
    eager?: boolean;
    fallbackIcon?: IconType;
    fallbackIconSize?: number;
    class?: string;
  }

  let {
    src,
    srcset,
    sizes,
    width,
    height,
    alt,
    fit = 'cover',
    ratio,
    rounded = false,
    eager = false,
    fallbackIcon = 'image',
    fallbackIconSize = 40,
    class: className = '',
  }: Props = $props();

  let failed = $state(false);
  const resolved = $derived(src ? resolveMediaPath(src) : undefined);
  const showImage = $derived(!!resolved && !failed);
</script>

<div
  class="media {className}"
  class:rounded
  class:is-contain={fit === 'contain'}
  style={ratio ? `aspect-ratio: ${ratio};` : undefined}
>
  {#if showImage}
    <img
      class="media-img"
      src={resolved}
      {srcset}
      {sizes}
      {width}
      {height}
      {alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      onerror={() => (failed = true)}
    />
  {:else}
    <div class="media-placeholder" role="img" aria-label={alt}>
      <Icon name={fallbackIcon} size={fallbackIconSize} strokeWidth={1.5} />
    </div>
  {/if}
</div>
