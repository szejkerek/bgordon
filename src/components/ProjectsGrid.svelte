<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import type { ProjectSummary } from "../types";

  interface Props {
    items: ProjectSummary[];
  }

  let { items }: Props = $props();
</script>

<div class="projects-grid">
  {#each items as project (project.slug)}
    <ProjectCard {project} />
  {/each}
</div>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 425px), 1fr));
    gap: var(--space-8);
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-5);
    }
  }

  @media (max-width: 420px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
