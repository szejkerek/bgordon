<script lang="ts">
  /**
   * Icon Component
   * 
   * Renders SVG icons from the centralized icon registry.
   * Usage: <Icon name="github" size={24} />
   */
  import { getIcon, hasIcon } from '../utils/icons';
  import type { IconType } from '../types';
  
  interface Props {
    name: IconType;
    size?: number;
    strokeWidth?: number;
    class?: string;
  }
  
  let { 
    name, 
    size = 16, 
    strokeWidth = 2,
    class: className = ''
  }: Props = $props();
  
  const iconHtml = $derived(
    hasIcon(name) 
      ? getIcon(name, { size, strokeWidth, className }) 
      : ''
  );
</script>

{#if iconHtml}
  {@html iconHtml}
{:else}
  <span class="icon-placeholder" style="width: {size}px; height: {size}px;"></span>
{/if}

<style>
  .icon-placeholder {
    display: inline-block;
    background: var(--color-bg-elevated);
    border-radius: 2px;
  }
</style>
