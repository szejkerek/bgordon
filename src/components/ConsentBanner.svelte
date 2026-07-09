<script lang="ts">
  /**
   * Slim GDPR/RODO consent banner.
   * Google Consent Mode v2 defaults to "denied" (set in Layout head).
   * On accept, updates consent to "granted" and persists the choice.
   * On reject, keeps consent denied and persists the choice.
   */
  const STORAGE_KEY = 'consent-choice';

  let visible = $state(false);

  $effect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted') {
      updateConsent('granted');
    } else if (stored !== 'denied') {
      visible = true;
    }
  });

  function updateConsent(state: 'granted' | 'denied') {
    const gtag = (window as any).gtag;
    if (typeof gtag !== 'function') return;
    gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'granted');
    updateConsent('granted');
    visible = false;
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'denied');
    updateConsent('denied');
    visible = false;
  }
</script>

{#if visible}
  <div class="consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
    <p class="consent__text">
      I use Google Analytics to track which projects make the biggest splash with
      recruiters. Clicking “Accept” means you consent to processing your personal data
      for this purpose. Wanna help out?
    </p>
    <div class="consent__actions">
      <button type="button" class="consent__btn consent__btn--ghost" onclick={reject}>
        No thanks
      </button>
      <button type="button" class="consent__btn consent__btn--accent" onclick={accept}>
        Accept
      </button>
    </div>
  </div>
{/if}

<style>
  .consent {
    position: fixed;
    bottom: var(--space-5);
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-max);
    width: calc(100% - var(--space-8));
    max-width: 720px;
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: var(--space-5) var(--space-6);
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-md);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .consent__text {
    margin: 0;
    flex: 1;
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--color-text-secondary);
  }

  .consent__actions {
    display: flex;
    gap: var(--space-4);
    flex-shrink: 0;
  }

  .consent__btn {
    padding: var(--space-4) var(--space-7);
    border-radius: var(--radius-sm);
    font-weight: var(--font-weight-semibold);
    font-size: 0.8125rem;
    cursor: pointer;
    white-space: nowrap;
    border: 1px solid transparent;
    transition: opacity var(--duration-fast, 150ms) ease;
  }

  .consent__btn--accent {
    background: var(--color-accent);
    color: var(--color-bg-primary);
  }

  .consent__btn--ghost {
    background: transparent;
    color: var(--color-text-secondary);
    border-color: var(--color-border-light);
  }

  .consent__btn:hover {
    opacity: 0.85;
  }

  @media (max-width: 560px) {
    .consent {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-5);
    }

    .consent__actions {
      justify-content: flex-end;
    }
  }
</style>
