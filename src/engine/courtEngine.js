/**
 * Clamp a value between min and max (inclusive)
 */
function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Apply choice effects to court state, clamping all metrics 0-100.
 * Returns a new state object (does not mutate).
 */
export function applyCourtChoice(state, effects) {
  const next = { ...state };
  const metricKeys = [
    'legalStrength',
    'precedentSupport',
    'publicInterest',
    'oppositionStrength',
    'certScore'
  ];

  for (const key of metricKeys) {
    if (effects[key] !== undefined) {
      next[key] = clamp(state[key] + effects[key]);
    }
  }

  // Recalculate voteProjection after applying effects
  next.voteProjection = calculateVoteProjection(next);

  return next;
}

/**
 * Calculate projected vote projection from current metrics.
 * voteProjection = clamp(legalStrength * 0.35 + precedentSupport * 0.30 - oppositionStrength * 0.25 + publicInterest * 0.10, 0, 100)
 */
export function calculateVoteProjection(state) {
  const raw =
    state.legalStrength * 0.35 +
    state.precedentSupport * 0.30 -
    state.oppositionStrength * 0.25 +
    state.publicInterest * 0.10;
  return clamp(Math.round(raw));
}

/**
 * Scale voteProjection (0-100) to justice count (0-9)
 */
export function votesToJustices(voteProjection) {
  return Math.round(voteProjection / 100 * 9);
}

/**
 * Determine if case is won (voteProjection >= 56, i.e. 5 of 9 justices)
 */
export function determineWon(state) {
  return state.voteProjection >= 56;
}

/**
 * Generate feedback after a court choice.
 * Returns { text, changes }
 */
export function generateCourtFeedback(choice, oldState, newState) {
  const metricLabels = {
    legalStrength: 'Legal Strength',
    precedentSupport: 'Precedent Support',
    publicInterest: 'Public Interest',
    oppositionStrength: 'Opposition Strength',
    certScore: 'Cert Score'
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
