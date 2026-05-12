<script lang="ts">
  import { siGithub } from 'simple-icons';

  interface Props {
    size?: number;
    strokeWidth?: number;
    class?: string;
  }

  let { size = 24, class: className = '' }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
  class={className}
>
  <path d={siGithub.path} />
</svg>
