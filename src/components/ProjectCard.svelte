<script lang="ts">
  import Icon from "./Icon.svelte";
  import Media from "./Media.svelte";
  import { formatDate } from "../utils/dates";
  import type { CollectionEntry } from "astro:content";

  interface Props {
    project: CollectionEntry<'projects'>;
    thumbnailSrc?: string;
  }

  let { project, thumbnailSrc }: Props = $props();

  // Computed values
  const href = $derived(`/projects/${project.id}`);
  const tags = $derived(project.data.tags || []);
</script>

<article
	class="project-card card"
>
	<a
		href={href}
		class="card-overlay-link"
		aria-label="View {project.data.title} project details"
	>
		<span class="sr-only">View {project.data.title} project details</span>
	</a>

  <div class="card-image">
    <Media
      src={thumbnailSrc}
      alt={project.data.title}
      fit="cover"
      ratio="16 / 9"
    />
  </div>

  <div class="card-content">
    <div class="card-meta">
      <span class="date">{formatDate(project.data.date)}</span>
      {#if project.data.teamSize}
        <span class="team-size" title="Team size">
          <Icon name="team" size={12} />
          <span>{project.data.teamSize}</span>
        </span>
      {/if}
    </div>

    <h3 class="card-title">{project.data.title}</h3>
    <p class="card-description">{project.data.description}</p>

    <div class="card-tags">
      {#each tags as tag (tag)}
        <span class="tag">{tag}</span>
      {/each}
    </div>

  </div>
</article>

<style>
  /* extends global .card — only the scale-on-hover is unique here */
  .project-card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    transition: var(--transition-colors), var(--transition-transform), var(--transition-shadow);
  }

  .project-card:hover {
    transform: scale(1.02);
    z-index: 1;
  }

	.card-overlay-link {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: block;
		border-radius: inherit;
		text-decoration: none;
	}

  .card-image {
    position: relative;
    flex-shrink: 0;
  }

  .project-card:hover .card-image :global(.media-img) {
    transform: scale(1.05);
  }

  .card-content {
    padding: var(--space-8);
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    transition: background-color var(--duration-normal) var(--ease-out);
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    margin-bottom: var(--space-5);
    flex-wrap: wrap;
  }

  .team-size {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-weight: var(--font-weight-medium);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-3);
    color: var(--color-text-primary);
  }

  .card-description {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-base);
    margin-bottom: var(--space-6);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
</style>
