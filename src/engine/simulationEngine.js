/**
 * Clamp a value between min and max (inclusive)
 */
function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Apply choice effects to bill state, clamping all metrics 0-100.
 * Returns a new state object (does not mutate).
 */
export function applyChoice(billState, effects) {
  const next = { ...billState };
  const metricKeys = [
    'publicSupport',
    'budgetConcern',
    'committeeSupport',
    'oppositionStrength',
    'mediaAttention',
    'implementationDifficulty'
  ];

  for (const key of metricKeys) {
    if (effects[key] !== undefined) {
      next[key] = clamp(billState[key] + effects[key]);
    }
  }

  // Recalculate voteCount after applying effects
  next.voteCount = calculateVoteCount(next);

  return next;
}

/**
 * Calculate projected vote count from current metrics.
 * voteCount = clamp((publicSupport * 0.4 + committeeSupport * 0.4 - oppositionStrength * 0.3 + mediaAttention * 0.1), 0, 100)
 */
export function calculateVoteCount(billState) {
  const raw =
    billState.publicSupport * 0.4 +
    billState.committeeSupport * 0.4 -
    billState.oppositionStrength * 0.3 +
    billState.mediaAttention * 0.1;
  return clamp(Math.round(raw));
}

/**
 * Determine if bill passes (voteCount >= 50)
 */
export function determinePassed(billState) {
  return calculateVoteCount(billState) >= 50;
}

/**
 * Generate feedback text after a choice.
 * Returns an object with { text, changes } where changes is an array of { key, delta, direction }
 */
export function generateFeedback(choice, oldState, newState) {
  const metricLabels = {
    publicSupport: 'Public Support',
    budgetConcern: 'Budget Concern',
    committeeSupport: 'Committee Support',
    oppositionStrength: 'Opposition Strength',
    mediaAttention: 'Media Attention',
    implementationDifficulty: 'Implementation Difficulty'
  };

  const changes = [];
  for (const [key, label] of Object.entries(metricLabels)) {
    const delta = newState[key] - oldState[key];
    if (delta !== 0) {
      changes.push({
        key,
        label,
        delta,
        direction: delta > 0 ? 'up' : 'down'
      });
    }
  }

  return {
    text: choice.feedback,
    changes
  };
}
