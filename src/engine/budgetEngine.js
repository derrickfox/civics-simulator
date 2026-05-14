function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function applyBudgetChoice(state, effects) {
  const next = { ...state };
  const metricKeys = [
    'publicSupport',
    'bipartisanSupport',
    'deficitControl',
    'programFunding',
    'economicOutlook',
    'passageChance',
  ];

  for (const key of metricKeys) {
    if (effects[key] !== undefined) {
      next[key] = clamp(state[key] + effects[key]);
    }
  }

  return next;
}

export function determinePassed(state) {
  const voteStrength = (state.passageChance + state.bipartisanSupport) / 2;
  return voteStrength >= 45 && state.deficitControl >= 28;
}

export function generateBudgetFeedback(choice, oldState, newState) {
  const metricLabels = {
    publicSupport:    'Public Support',
    bipartisanSupport:'Bipartisan Support',
    deficitControl:   'Deficit Control',
    programFunding:   'Program Funding',
    economicOutlook:  'Economic Outlook',
    passageChance:    'Passage Chance',
  };

  const changes = [];
  for (const [key, label] of Object.entries(metricLabels)) {
    const delta = newState[key] - oldState[key];
    if (delta !== 0) {
      let direction;
      if (key === 'deficitControl') {
        direction = delta > 0 ? 'good' : 'bad';
      } else if (key === 'programFunding') {
        direction = delta > 0 ? 'good' : 'bad';
      } else {
        direction = delta > 0 ? 'good' : 'bad';
      }
      changes.push({ key, label, delta, direction });
    }
  }

  return { text: choice.feedback, changes };
}
