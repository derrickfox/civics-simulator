function clamp(v) { return Math.max(0, Math.min(100, v)); }

export function applyRedistrictingChoice(state, effects) {
  return {
    fairness:           clamp((state.fairness           ?? 0) + (effects.fairness           ?? 0)),
    competitiveness:    clamp((state.competitiveness    ?? 0) + (effects.competitiveness    ?? 0)),
    vraCompliance:      clamp((state.vraCompliance      ?? 0) + (effects.vraCompliance      ?? 0)),
    publicSupport:      clamp((state.publicSupport      ?? 0) + (effects.publicSupport      ?? 0)),
    legalDefensibility: clamp((state.legalDefensibility ?? 0) + (effects.legalDefensibility ?? 0)),
    bipartisanSupport:  clamp((state.bipartisanSupport  ?? 0) + (effects.bipartisanSupport  ?? 0)),
  };
}

export function determineApproved(state) {
  const score = getApprovalScore(state);
  return score >= 52 && state.vraCompliance >= 45 && state.legalDefensibility >= 48;
}

export function getApprovalScore(state) {
  return Math.round(
    (state.legalDefensibility * 0.40) +
    (state.vraCompliance      * 0.30) +
    (state.fairness           * 0.20) +
    (state.bipartisanSupport  * 0.10)
  );
}

export function generateRedistrictingFeedback(choice, oldState, newState) {
  const changes = [];
  const metrics = {
    fairness:           'Fairness',
    competitiveness:    'Competitiveness',
    vraCompliance:      'VRA Compliance',
    publicSupport:      'Public Support',
    legalDefensibility: 'Legal Defensibility',
    bipartisanSupport:  'Bipartisan Support',
  };
  for (const [key, label] of Object.entries(metrics)) {
    const delta = (newState[key] ?? 0) - (oldState[key] ?? 0);
    if (delta !== 0) changes.push({ label, delta });
  }
  return { text: choice.feedback, changes };
}
