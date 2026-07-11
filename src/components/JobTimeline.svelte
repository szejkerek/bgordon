<script lang="ts">
  import Media from "./Media.svelte";
  import type { WorkExperience, Education } from "../types";
  import type { IconType } from "../utils/icons";
  import { SECTION_IDS } from "../utils/routes";

  interface Props {
    workExperience?: WorkExperience[];
    education?: Education[];
  }

  type TimelineEntry = {
    title: string;
    subtitle: string;
    period: string;
    description: string;
    skills: string[];
    logo?: string;
    url?: string;
  };

  let { workExperience = [], education = [] }: Props = $props();

  const workItems = $derived<TimelineEntry[]>(
    workExperience.map((job) => ({
      title: job.company,
      subtitle: job.role,
      period: job.period,
      description: job.description,
      skills: job.skills,
      logo: job.logo,
      url: job.url,
    }))
  );

  const eduItems = $derived<TimelineEntry[]>(
    education.map((edu) => ({
      title: edu.institution,
      subtitle: edu.degree,
      period: edu.period,
      description: edu.description,
      skills: edu.skills,
      logo: edu.logo,
    }))
  );

</script>

<section
  id={SECTION_IDS.experience}
  class="timeline-section"
>
  <div class="timeline-container">
    <div class="two-column-grid">
      {@render column("Work Experience", "briefcase", workItems)}
      {@render column("Education", "graduation", eduItems, SECTION_IDS.education)}
    </div>
  </div>
</section>

{#snippet jobHeaderInner(item: TimelineEntry, fallbackIcon: IconType)}
  <div class="company-logo">
    <Media src={item.logo} alt={item.title} fit="cover" fallbackIcon={fallbackIcon} fallbackIconSize={30} />
  </div>

  <div class="job-info">
    <h3 class="company-name">{item.title}</h3>
    <p class="job-role">{item.subtitle}</p>
  </div>
{/snippet}

{#snippet timelineItem(item: TimelineEntry, fallbackIcon: IconType)}
  <article class="timeline-item">
    <div class="timeline-content card">
      {#if item.url}
        <a
          class="job-header job-header--link"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="{item.title} website"
        >
          {@render jobHeaderInner(item, fallbackIcon)}
        </a>
      {:else}
        <div class="job-header">
          {@render jobHeaderInner(item, fallbackIcon)}
        </div>
      {/if}

      <div class="job-meta">
        <span class="job-period">{item.period}</span>
      </div>

      <p class="job-description">{item.description}</p>

      <div class="job-skills">
        {#each item.skills as skill (skill)}
          <span class="tag tag--skill">{skill}</span>
        {/each}
      </div>
    </div>
  </article>
{/snippet}

{#snippet column(heading: string, headerIcon: IconType, items: TimelineEntry[], columnId?: string)}
  <div class="timeline-column" id={columnId}>
    <header class="column-header">
      <h2 class="column-title">{heading}</h2>
    </header>

    <div class="timeline">
      {#each items as item (item.title + item.subtitle)}
        {@render timelineItem(item, headerIcon)}
      {/each}
    </div>
  </div>
{/snippet}

<style>
  .timeline-section {
    padding: var(--section-padding) 0;
    background: var(--color-bg-secondary);
  }

  .timeline-container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  .two-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-11);
  }

  .timeline-column {
    display: flex;
    flex-direction: column;
  }

  .column-header {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    margin-bottom: var(--space-9);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .column-title {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    letter-spacing: var(--letter-spacing-tight);
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .timeline-item {
    display: flex;
  }

  .timeline-content {
    flex: 1;
    padding: var(--space-8);
    transition: 
      border-color var(--duration-normal) var(--ease-out),
      background-color var(--duration-normal) var(--ease-out);
  }

  .timeline-content:hover {
    border-color: var(--color-border-light);
    background: var(--color-bg-card-hover);
  }

  .job-header {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    margin-bottom: var(--space-5);
  }

  .job-header--link {
    text-decoration: none;
    color: inherit;
  }

  .job-header--link .company-name {
    transition: color var(--duration-fast) var(--ease-out);
  }

  .job-header--link:hover .company-name {
    color: var(--color-accent);
  }

  .job-header--link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }

  .company-logo {
    width: 56px;
    height: 56px;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-md);
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: var(--color-accent);
  }

  .job-info {
    flex: 1;
    min-width: 0;
  }

  .company-name {
    font-family: var(--font-display);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: 0.125rem;
    line-height: 1.3;
  }

  .job-role {
    font-size: var(--font-size-sm);
    color: var(--color-accent);
    font-weight: var(--font-weight-medium);
  }

  .job-meta {
    display: flex;
    gap: var(--space-6);
    margin-bottom: var(--space-5);
    flex-wrap: wrap;
  }

  .job-period {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }

  .job-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-base);
    margin-bottom: var(--space-5);
    text-align: justify;
    hyphens: auto;
  }

  .job-skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }


  @media (max-width: 900px) {
    .two-column-grid {
      grid-template-columns: 1fr;
      gap: var(--space-11);
    }
  }

  @media (max-width: 600px) {
    .timeline-section {
      padding: var(--section-padding-mobile) 0;
    }

    .column-header {
      gap: var(--space-5);
    }
  }
</style>
