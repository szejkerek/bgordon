<script lang="ts">
  import { iconComponents } from '../utils/icons';
  import type { IconType } from '../utils/icons';

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
    class: className = '',
  }: Props = $props();

  const Component = $derived(iconComponents[name]);
</script>

{#if Component}
  <Component {size} {strokeWidth} class={className} />
{/if}
