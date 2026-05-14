import React from 'react';

const allMetrics = [
  { key: 'publicSupport', label: 'Public Support', icon: '👥', colorType: 'positive' },
  { key: 'committeeSupport', label: 'Committee Support', icon: '🏛️', colorType: 'positive' },
  { key: 'budgetConcern', label: 'Budget Concern', icon: '💰', colorType: 'negative' },
  { key: 'oppositionStrength', label: 'Opposition', icon: '⚡', colorType: 'negative' },
  { key: 'mediaAttention', label: 'Media Attention', icon: '📺', colorType: 'neutral' },
  { key: 'implementationDifficulty', label: 'Impl. Difficulty', icon: '⚙️', colorType: 'negative' }
];

function getColor(colorType, value) {
  if (colorType === 'positive') {
    if (value >= 60) return 'var(--color-success)';
    if (value >= 35) return 'var(--color-warning)';
    return 'var(--color-danger)';
  }
  if (colorType === 'negative') {
    if (value >= 60) return 'var(--color-danger)';
    if (value >= 35) return 'var(--color-warning)';
    return 'var(--color-success)';
  }
  return 'var(--color-primary)';
}

function buildExplanation(billState, passed, tabled) {
  if (tabled) {
    return 'You chose to table the bill for the next session. Sometimes strategic retreats preserve a bill for a stronger push later — but momentum was lost, and the bill never came back to a vote this term.';
  }

  const reasons = [];

  if (passed) {
    if (billState.publicSupport >= 60) reasons.push('strong public support');
    if (billState.committeeSupport >= 60) reasons.push('solid committee backing');
    if (billState.oppositionStrength <= 35) reasons.push('weak opposition');
    if (billState.mediaAttention >= 50) reasons.push('favorable media coverage');
    return `Your bill passed! This happened thanks to ${reasons.length ? reasons.join(', ') : 'your careful coalition-building'}. The Safe Crosswalks Near Schools Act is now law — students across the district will be safer when school resumes.`;
  } else {
    if (billState.committeeSupport < 40) reasons.push('insufficient committee support');
    if (billState.oppositionStrength >= 60) reasons.push('overwhelming opposition');
    if (billState.budgetConcern >= 60) reasons.push('unresolved budget concerns');
    if (billState.publicSupport < 40) reasons.push('low public support');
    return `Your bill failed due to ${reasons.length ? reasons.join(' and ') : 'insufficient support across key metrics'}. In real legislatures, most bills don't pass on the first try — many successful laws required multiple sessions and persistent advocacy.`;
  }
}

export default function FinalOutcome({ billState, passed, tabled, onPlayAgain }) {
  const voteCount = billState.voteCount ?? 0;
  const explanation = buildExplanation(billState, passed, tabled);

  let bannerText, bannerClass;
  if (tabled) {
    bannerText = 'TABLED';
    bannerClass = 'outcome-banner--tabled';
  } else if (passed) {
    bannerText = 'PASSED!';
    bannerClass = 'outcome-banner--passed';
  } else {
    bannerText = 'VETOED / FAILED';
    bannerClass = 'outcome-banner--failed';
  }

  return (
    <div className="final-outcome">
      <div className="final-outcome__content card">
        <div className={`outcome-banner ${bannerClass}`}>
          <span className="outcome-banner__emoji">
            {tabled ? '📋' : passed ? '🎉' : '❌'}
          </span>
          <span className="outcome-banner__text">{bannerText}</span>
        </div>

        <h2 className="final-outcome__bill-name">Safe Crosswalks Near Schools Act</h2>

        <p className="final-outcome__explanation">{explanation}</p>

        <div className="final-outcome__vote">
          <span className="final-outcome__vote-label">Final Vote Projection:</span>
          <div className="final-outcome__vote-bar-bg">
            <div
              className="final-outcome__vote-bar-fill"
              style={{
                width: `${voteCount}%`,
                backgroundColor: voteCount >= 50 ? 'var(--color-success)' : 'var(--color-danger)'
              }}
            />
            <div className="final-outcome__vote-threshold" />
          </div>
          <span
            className="final-outcome__vote-count"
            style={{ color: voteCount >= 50 ? 'var(--color-success)' : 'var(--color-danger)' }}
          >
            {voteCount}% support
          </span>
        </div>

        <h3 className="final-outcome__metrics-title">Final Metrics</h3>
        <div className="final-outcome__metrics-grid">
          {allMetrics.map(({ key, label, icon, colorType }) => {
            const value = billState[key] ?? 0;
            const color = getColor(colorType, value);
            return (
              <div className="final-metric" key={key}>
                <span className="final-metric__icon">{icon}</span>
                <span className="final-metric__label">{label}</span>
                <div className="final-metric__bar-bg">
                  <div
                    className="final-metric__bar-fill"
                    style={{ width: `${value}%`, backgroundColor: color }}
                  />
                </div>
                <span className="final-metric__value" style={{ color }}>{value}%</span>
              </div>
            );
          })}
        </div>

        <div className="final-outcome__lesson">
          <p>
            <strong>Remember:</strong> Real civic change often takes persistence. Even failed bills raise awareness,
            build coalitions, and lay the groundwork for future success. Democracy is a process, not a single moment.
          </p>
        </div>

        <button className="btn btn--primary final-outcome__replay" onClick={onPlayAgain}>
          Play Again 🔄
        </button>
      </div>
    </div>
  );
}
