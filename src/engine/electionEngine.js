/**
 * Clamp a value between min and max (inclusive)
 */
function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Apply choice effects to election state, clamping all metrics 0–100.
 * Returns a new state object (does not mutate).
 */
export function applyElectionChoice(state, effects) {
  const next = { ...state };
  const metricKeys = [
    'nationalPolls',
    'battlegroundLead',
    'partyUnity',
    'undecidedWon',
    'campaignFunds',
    'mediaNarrative',
  ];

  for (const key of metricKeys) {
    if (effects[key] !== undefined) {
      next[key] = clamp(state[key] + effects[key]);
    }
  }

  // Recalculate electoral votes after applying effects
  next.electoralVotes = calculateElectoralVotes(next);

  return next;
}

/**
 * Calculate projected electoral votes from current metrics.
 */
export function calculateElectoralVotes(state) {
  const raw =
    state.battlegroundLead * 0.40 +
    state.nationalPolls   * 0.25 +
    state.undecidedWon    * 0.20 +
    state.partyUnity      * 0.10 +
    state.mediaNarrative  * 0.05;
  return Math.round(clamp(raw, 0, 100) / 100 * 538);
}

/**
 * Determine if election is won (270+ electoral votes)
 */
export function determineWon(state) {
  return state.electoralVotes >= 270;
}

/**
 * Generate feedback after an election choice.
 * Returns { text, changes: [{key, label, delta, direction}] }
 * All 6 metrics: up is good for the campaign.
 */
export function generateElectionFeedback(choice, oldState, newState) {
  const metricLabels = {
    nationalPolls:    'National Polls',
    battlegroundLead: 'Battleground Lead',
    partyUnity:       'Party Unity',
    undecidedWon:     'Undecided Won',
    campaignFunds:    'Campaign Funds',
    mediaNarrative:   'Media Narrative',
  };

  const changes = [];
  for (const [key, label] of Object.entries(metricLabels)) {
    const delta = newState[key] - oldState[key];
    if (delta !== 0) {
      changes.push({
        key,
        label,
        delta,
        // All election metrics: up is good, down is bad
        direction: delta > 0 ? 'good' : 'bad',
      });
    }
  }

  return {
    text: choice.feedback,
    changes,
  };
}
