import React from 'react';

const allMetrics = [
  { key: 'publicSupport',     label: 'Public Support',     icon: '📣' },
  { key: 'bipartisanSupport', label: 'Bipartisan Support', icon: '🤝' },
  { key: 'deficitControl',    label: 'Deficit Control',    icon: '📉' },
  { key: 'programFunding',    label: 'Program Funding',    icon: '🏫' },
  { key: 'economicOutlook',   label: 'Economic Outlook',   icon: '📈' },
  { key: 'passageChance',     label: 'Passage Chance',     icon: '🗳️' },
];

function getColor(value) {
  if (value >= 60) return 'var(--color-success)';
  if (value >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function buildExplanation(budgetState, passed) {
  const passageStrength = Math.round((budgetState.passageChance + budgetState.bipartisanSupport) / 2);
  if (passed) {
    const wins = [];
    if (budgetState.deficitControl >= 60) wins.push('strong fiscal discipline');
    if (budgetState.programFunding >= 60) wins.push('robust program funding');
    if (budgetState.bipartisanSupport >= 60) wins.push('rare bipartisan coalition');
    if (budgetState.economicOutlook >= 60) wins.push('positive economic projections');
    return `The FY 2027 federal budget is signed into law. With a passage strength of ${passageStrength}% and deficit control at ${budgetState.deficitControl}, your choices built ${wins.length ? wins.join(', ') : 'a viable governing budget'}. Agencies have their appropriations. The government stays open. This is what functional democracy looks like.`;
  } else {
    const problems = [];
    if (budgetState.deficitControl < 28) problems.push('deficit control collapsed below the threshold needed to satisfy fiscal hawks');
    if (passageStrength < 45) problems.push(`passage strength of ${passageStrength}% wasn't enough to guarantee votes`);
    return `The budget failed to pass — Congress fell short, and the government operates on a continuing resolution. ${problems.length ? problems.join('; ') : 'The coalition fell apart in the final stages'}. A continuing resolution funds the government at last year's levels with no new priorities. Real governing requires another attempt.`;
  }
}

export default function BudgetFinalOutcome({ budgetState, passed, onPlayAgain }) {
  const passageStrength = Math.round((budgetState.passageChance + budgetState.bipartisanSupport) / 2);
  const explanation = buildExplanation(budgetState, passed);

  return (
    <div className="final-outcome">
      <div className="final-outcome__content card">
        <div className={`outcome-banner ${passed ? 'outcome-banner--passed' : 'outcome-banner--failed'}`}>
          <span className="outcome-banner__emoji">{passed ? '🎉' : '❌'}</span>
          <span className="outcome-banner__text">{passed ? 'BUDGET SIGNED INTO LAW' : 'CONTINUING RESOLUTION'}</span>
        </div>

        <h2 className="final-outcome__bill-name">Federal Budget — FY 2027</h2>

        <div style={{ textAlign: 'center', margin: '8px 0 4px', fontSize: '20px', fontWeight: 800, color: passed ? 'var(--color-success)' : 'var(--color-danger)' }}>
          Passage Strength: {passageStrength}% {passed ? '✓' : '✗'}
        </div>

        <p className="final-outcome__explanation">{explanation}</p>

        <div className="final-outcome__vote">
          <span className="final-outcome__vote-label">Final Passage Strength:</span>
          <div className="final-outcome__vote-bar-bg" style={{ position: 'relative' }}>
            <div
              className="final-outcome__vote-bar-fill"
              style={{ width: `${passageStrength}%`, backgroundColor: passed ? 'var(--color-success)' : 'var(--color-danger)' }}
            />
            <div className="final-outcome__vote-threshold" style={{ left: '45%' }} />
          </div>
          <span className="final-outcome__vote-count" style={{ color: passed ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {passageStrength}% (45% needed to pass)
          </span>
        </div>

        <h3 className="final-outcome__metrics-title">Final Budget Metrics</h3>
        <div className="final-outcome__metrics-grid">
          {allMetrics.map(({ key, label, icon }) => {
            const value = budgetState[key] ?? 0;
            const color = getColor(value);
            return (
              <div className="final-metric" key={key}>
                <span className="final-metric__icon">{icon}</span>
                <span className="final-metric__label">{label}</span>
                <div className="final-metric__bar-bg">
                  <div className="final-metric__bar-fill" style={{ width: `${value}%`, backgroundColor: color }} />
                </div>
                <span className="final-metric__value" style={{ color }}>{value}</span>
              </div>
            );
          })}
        </div>

        <div className="final-outcome__lesson">
          <p>
            <strong>Remember:</strong> The federal budget process is the most consequential annual act
            of American governance. Every line item is a choice about national priorities — who gets
            funding, who pays taxes, and what kind of country we want to be. It rarely goes smoothly,
            and continuing resolutions have become the norm rather than the exception.
          </p>
        </div>

        <button className="btn btn--primary final-outcome__replay" onClick={onPlayAgain}>
          Try Again 🔄
        </button>
      </div>
    </div>
  );
}
