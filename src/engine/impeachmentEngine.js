function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function applyImpeachmentChoice(state, effects) {
  const next = { ...state };
  const metricKeys = [
    'evidenceStrength',
    'publicSupport',
    'bipartisanSupport',
    'legalGrounding',
    'senateSentiment',
    'proceduralIntegrity',
  ];
  for (const key of metricKeys) {
    if (effects[key] !== undefined) {
      next[key] = clamp(state[key] + effects[key]);
    }
  }
  return next;
}

// Conviction requires a two-thirds Senate supermajority (67 of 100).
// senateSentiment and bipartisanSupport drive the vote count; legalGrounding
// and evidenceStrength provide the floor — even great politics can't overcome
// a weak case, and even a strong case needs enough Senate support.
export function determineConvicted(state) {
  const voteStrength = (state.senateSentiment * 0.45) + (state.bipartisanSupport * 0.35) + (state.proceduralIntegrity * 0.2);
  return voteStrength >= 48 && state.evidenceStrength >= 42 && state.legalGrounding >= 38;
}

export function estimateSenateVotes(state) {
  const raw = (state.senateSentiment * 0.45) + (state.bipartisanSupport * 0.35) + (state.proceduralIntegrity * 0.2);
  // Map 0–100 score to ~40–80 senate votes range
  return Math.round(40 + (raw / 100) * 40);
}

export function generateImpeachmentFeedback(choice, oldState, newState) {
  const metricLabels = {
    evidenceStrength:    'Evidence Strength',
    publicSupport:       'Public Support',
    bipartisanSupport:   'Bipartisan Support',
    legalGrounding:      'Legal Grounding',
    senateSentiment:     'Senate Sentiment',
    proceduralIntegrity: 'Procedural Integrity',
  };
  const changes = [];
  for (const [key, label] of Object.entries(metricLabels)) {
    const delta = newState[key] - oldState[key];
    if (delta !== 0) {
      changes.push({ key, label, delta, direction: delta > 0 ? 'good' : 'bad' });
    }
  }
  return { text: choice.feedback, changes };
}
