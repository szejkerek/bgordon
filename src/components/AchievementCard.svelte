<script lang="ts">
  /**
   * AchievementCard Component
   * 
   * Card component for displaying achievements.
   * Uses centralized icons and proper TypeScript types.
   */
  import Icon from "./Icon.svelte";
  import type { AchievementEntry, IconType } from "../types";

  interface Props {
    achievement: AchievementEntry;
  }

  let { achievement }: Props = $props();

  // Computed values
  const isWinner = $derived(achievement?.data?.type === "winner");
  const href = $derived(`/achievements/${achievement?.slug}`);
  const iconName = $derived<IconType>(
    (achievement?.data?.icon as IconType) || 'trophy'
  );
</script>

<a 
  class="achievement-card-link" 
  href={href} 
  aria-label="View {achievement?.data?.title} achievement details"
>
  <article class="achievement-card card" class:winner={isWinner}>
    <div class="ach-icon" class:winner={isWinner}>
      <Icon name={iconName} size={26} strokeWidth={1.5} />
    </div>

    <div class="ach-content">
      <div class="ach-header">
        <span class="tag" class:tag--highlight={isWinner}>
          {isWinner ? "Winner" : achievement.data.type}
        </span>
        <span class="date">{achievement.data.date}</span>
      </div>

      <h3 class="ach-title">{achievement.data.title}</h3>
      <p class="ach-event">{achievement.data.event}</p>
      <p class="ach-desc">{achievement.data.description}</p>
      
      <div class="ach-cta">
        <Icon name="external" size={16} />
        <span>Click to view</span>
      </div>
    </div>
  </article>
</a>

<style>
  .achievement-card-link {
    text-decoration: none;
    display: block;
  }

  .achievement-card {
    display: flex;
    gap: var(--space-7);
    padding: var(--space-8);
    overflow: hidden;
    transition: 
      transform var(--duration-normal) var(--ease-out),
      box-shadow var(--duration-normal) var(--ease-out),
      background var(--duration-normal) var(--ease-out),
      border-color var(--duration-normal) var(--ease-out);
  }

  .achievement-card.winner {
    background: linear-gradient(
      135deg,
      var(--color-bg-card) 0%,
      rgba(110, 231, 183, 0.05) 100%
    );
    border-color: rgba(110, 231, 183, 0.2);
  }

  .achievement-card-link:hover .achievement-card,
  .achievement-card-link:focus-visible .achievement-card {
    border-color: var(--color-border-light);
    box-shadow: var(--shadow-xl);
    transform: scale(1.02);
  }

  .achievement-card-link:hover .achievement-card:not(.winner) {
    background: var(--color-bg-card-hover);
  }

  .achievement-card-link:hover .achievement-card.winner {
    background: linear-gradient(
      135deg,
      var(--color-bg-card) 0%,
      rgba(110, 231, 183, 0.08) 100%
    );
    border-color: rgba(110, 231, 183, 0.25);
  }

  .ach-icon {
    flex-shrink: 0;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-elevated);
    border-radius: var(--radius-md);
    color: var(--color-text-muted);
  }

  .ach-icon.winner {
    background: var(--color-accent-glow);
    color: var(--color-accent);
  }

  .ach-content {
    flex: 1;
    min-width: 0;
  }

  .ach-header {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    margin-bottom: var(--space-3);
  }

  .tag {
    padding: var(--space-1) var(--space-4);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    background: var(--color-bg-elevated);
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
  }

  .tag--highlight {
    background: var(--color-accent-glow);
    color: var(--color-accent);
  }

  .date {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }

  .ach-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-1);
  }

  .ach-event {
    font-size: var(--font-size-sm);
    color: var(--color-accent);
    margin-bottom: var(--space-2);
    font-weight: var(--font-weight-medium);
  }

  .ach-desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  .ach-cta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-5);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-muted);
    opacity: 0;
    transform: translateY(4px);
    transition: 
      opacity var(--duration-normal) var(--ease-out),
      transform var(--duration-normal) var(--ease-out),
      color var(--duration-normal) var(--ease-out);
  }

  .achievement-card-link:hover .ach-cta,
  .achievement-card-link:focus-visible .ach-cta {
    opacity: 1;
    transform: translateY(0);
    color: var(--color-accent);
  }
  
  @media (max-width: 600px) {
    .achievement-card {
      flex-direction: column;
      gap: var(--space-6);
    }

    .ach-icon {
      width: 44px;
      height: 44px;
    }
  }
</style>
