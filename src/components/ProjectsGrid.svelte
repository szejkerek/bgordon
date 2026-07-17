<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import ProjectCard from "./ProjectCard.svelte";
  import { orderedTags } from "../utils/tags";

  interface Item {
    project: CollectionEntry<'projects'> & { slug: string };
    thumbnailSrc?: string;
  }

  interface Props {
    items: Item[];
  }

  let { items }: Props = $props();

  const tags = $derived(orderedTags(items.map((item) => item.project)));

  let activeTag = $state<string | null>(null);

  const visible = $derived(
    activeTag === null
      ? items
      : items.filter((item) => (item.project.data.tags ?? []).includes(activeTag!))
  );
</script>

<div class="filters" role="group" aria-label="Filter projects by tag">
  <button
    type="button"
    class="filter-btn"
    class:active={activeTag === null}
    aria-pressed={activeTag === null}
    onclick={() => (activeTag = null)}
  >
    All
  </button>
  {#each tags as tag (tag)}
    <button
      type="button"
      class="filter-btn"
      class:active={activeTag === tag}
      aria-pressed={activeTag === tag}
      onclick={() => (activeTag = tag)}
    >
      {tag}
    </button>
  {/each}
</div>

<div class="projects-grid">
  {#each visible as item (item.project.slug)}
    <ProjectCard project={item.project} thumbnailSrc={item.thumbnailSrc} />
  {/each}
</div>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-9);
  }

  .filter-btn {
    font-family: inherit;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    background: var(--color-bg-card);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-full);
    padding: var(--space-2) var(--space-5);
    cursor: pointer;
    transition:
      color var(--duration-fast) var(--ease-out),
      border-color var(--duration-fast) var(--ease-out),
      background-color var(--duration-fast) var(--ease-out);
  }

  .filter-btn:hover {
    color: var(--color-text-primary);
    border-color: var(--color-border-light);
  }

  .filter-btn.active {
    color: var(--color-bg-primary);
    background: var(--color-accent);
    border-color: var(--color-accent);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
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
