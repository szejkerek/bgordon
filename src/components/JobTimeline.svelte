<script lang="ts">
  /**
   * JobTimeline Component
   * 
   * Two-column timeline for work experience and education.
   * Uses intersection observer for animation.
   */
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import type { WorkExperience, Education } from "../types";

  interface Props {
    workExperience?: WorkExperience[];
    education?: Education[];
  }

  let { workExperience = [], education = [] }: Props = $props();

  let sectionEl: HTMLElement | undefined;
  let hydrated = $state(false);
  let inView = $state(false);
  let logoErrors = $state<Record<string, boolean>>({});

  function handleLogoError(kind: 'work' | 'edu', index: number): void {
    const key = `${kind}_${index}`;
    logoErrors = { ...logoErrors, [key]: true };
  }

  function hasLogoError(kind: 'work' | 'edu', index: number): boolean {
    return logoErrors[`${kind}_${index}`] || false;
  }

  function computeInView(el: HTMLElement | null): boolean {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.9 && r.bottom > 0;
  }

  onMount(() => {
    if (!sectionEl) return;
    
    inView = computeInView(sectionEl);
    hydrated = true;

    if (typeof IntersectionObserver === "undefined") {
      inView = true;
      return;
    }

    if (inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inView = true;
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  });
</script>

<section
  id="experience"
  bind:this={sectionEl}
  class="timeline-section"
  class:hydrated
  class:visible={inView}
>
  <div class="timeline-container">
    <div class="two-column-grid">
      <!-- Work Experience Column -->
      <div class="timeline-column">
        <header class="column-header">
          <div class="header-icon" aria-hidden="true">
            <Icon name="briefcase" size={24} />
          </div>
          <h2 class="column-title">Work Experience</h2>
        </header>

        <div class="timeline">
          {#each workExperience as job, index (job.company + job.role)}
            <article class="timeline-item" style="--delay: {index * 0.15}s">
              <div class="timeline-content card">
                <div class="job-header">
                  <div class="company-logo">
                    {#if job.logo && !hasLogoError('work', index)}
                      <img
                        src={job.logo}
                        alt={job.company}
                        loading="lazy"
                        decoding="async"
                        onerror={() => handleLogoError("work", index)}
                      />
                    {:else}
                      <div class="logo-placeholder" aria-hidden="true">
                        <Icon name="briefcase" size={24} strokeWidth={1.5} />
                      </div>
                    {/if}
                  </div>

                  <div class="job-info">
                    <h3 class="company-name">{job.company}</h3>
                    <p class="job-role">{job.role}</p>
                  </div>
                </div>

                <div class="job-meta">
                  <span class="job-period">{job.period}</span>
                </div>

                <p class="job-description">{job.description}</p>

                <div class="job-skills">
                  {#each job.skills as skill (skill)}
                    <span class="skill-tag">{skill}</span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>

      <!-- Education Column -->
      <div class="timeline-column" id="education">
        <header class="column-header">
          <div class="header-icon" aria-hidden="true">
            <Icon name="graduation" size={24} />
          </div>
          <h2 class="column-title">Education</h2>
        </header>

        <div class="timeline">
          {#each education as edu, index (edu.institution + edu.degree)}
            <article class="timeline-item" style="--delay: {(index + 2) * 0.15}s">
              <div class="timeline-content card">
                <div class="job-header">
                  <div class="company-logo">
                    {#if edu.logo && !hasLogoError('edu', index)}
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        loading="lazy"
                        decoding="async"
                        onerror={() => handleLogoError("edu", index)}
                      />
                    {:else}
                      <div class="logo-placeholder" aria-hidden="true">
                        <Icon name="graduation" size={24} strokeWidth={1.5} />
                      </div>
                    {/if}
                  </div>

                  <div class="job-info">
                    <h3 class="company-name">{edu.institution}</h3>
                    <p class="job-role">{edu.degree}</p>
                  </div>
                </div>

                <div class="job-meta">
                  <span class="job-period">{edu.period}</span>
                </div>

                <p class="job-description">{edu.description}</p>

                <div class="job-skills">
                  {#each edu.skills as skill (skill)}
                    <span class="skill-tag">{skill}</span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .timeline-section {
    padding: var(--section-padding) 0;
    background: var(--color-bg-secondary);
  }

  .timeline-section.hydrated {
    opacity: 0;
    transform: translateY(24px);
    transition: all 0.8s var(--ease-spring);
  }

  .timeline-section.hydrated.visible {
    opacity: 1;
    transform: translateY(0);
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

  .header-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-accent-glow);
    border-radius: var(--radius-md);
    color: var(--color-accent);
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

  .timeline-section.hydrated .timeline-item {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s var(--ease-spring);
    transition-delay: var(--delay);
  }

  .timeline-section.hydrated.visible .timeline-item {
    opacity: 1;
    transform: translateY(0);
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

  .company-logo {
    width: 40px;
    height: 40px;
    background: var(--color-bg-elevated);
    border-radius: var(--radius-md);
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    box-sizing: border-box;
  }

  .company-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .logo-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-text-muted);
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
  }

  .job-skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .skill-tag {
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: var(--color-bg-elevated);
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
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
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-5);
    }

    .header-icon {
      width: 40px;
      height: 40px;
    }
  }
</style>
