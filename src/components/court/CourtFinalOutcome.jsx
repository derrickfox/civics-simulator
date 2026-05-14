import React from 'react';
import { votesToJustices } from '../../engine/courtEngine';

const allMetrics = [
  { key: 'legalStrength',    label: 'Legal Strength',    icon: '⚖️', colorType: 'positive' },
  { key: 'precedentSupport', label: 'Precedent Support', icon: '📚', colorType: 'positive' },
  { key: 'publicInterest',   label: 'Public Interest',   icon: '📢', colorType: 'neutral'  },
  { key: 'oppositionStrength', label: 'Opposition',      icon: '⚡', colorType: 'negative' },
  { key: 'certScore',        label: 'Cert Score',        icon: '🔑', colorType: 'positive' },
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

function buildExplanation(courtState, won, settled) {
  if (settled) {
    return "You accepted a settlement before reaching the Supreme Court. Sofia's family received compensation and the crossing was fixed — a real victory for one family. But without a Supreme Court ruling, thousands of other students at unsafe crossings across America remain without constitutional protection.";
  }

  const vp = courtState.voteProjection ?? 0;
  const justices = votesToJustices(vp);

  if (won) {
    const reasons = [];
    if (courtState.legalStrength >= 60) reasons.push('powerful legal arguments');
    if (courtState.precedentSupport >= 60) reasons.push('strong precedent support');
    if (courtState.oppositionStrength <= 35) reasons.push('weakened opposition');
    if (courtState.publicInterest >= 50) reasons.push('broad public interest');
    return `Martinez v. Riverside USD is decided in your favor, ${justices}–${9 - justices}. This happened thanks to ${reasons.length ? reasons.join(', ') : 'your careful strategic choices throughout the litigation'}. The ruling protects students' constitutional rights at school crossings across America — Sofia's tragedy became a landmark for justice.`;
  } else {
    const reasons = [];
    if (courtState.legalStrength < 40) reasons.push('weak legal arguments');
    if (courtState.oppositionStrength >= 60) reasons.push('overwhelming opposition');
    if (courtState.precedentSupport < 35) reasons.push('insufficient precedent support');
    return `The Court ruled against you, ${9 - justices}–${justices}. The case failed due to ${reasons.length ? reasons.join(' and ') : 'insufficient strength across key metrics'}. Constitutional protection for students at unsafe crossings remains out of reach — for now. Most landmark cases required multiple attempts before the Court was ready.`;
  }
}

export default function CourtFinalOutcome({ courtState, won, settled, onPlayAgain }) {
  const voteProjection = courtState.voteProjection ?? 0;
  const justiceCount = votesToJustices(voteProjection);
  const explanation = buildExplanation(courtState, won, settled);

  let bannerText, bannerClass, bannerEmoji, voteString;

  if (settled) {
    bannerText = 'CASE SETTLED';
    bannerClass = 'outcome-banner--tabled';
    bannerEmoji = '🤝';
    voteString = null;
  } else if (won) {
    bannerText = 'RULING IN YOUR FAVOR';
    bannerClass = 'outcome-banner--passed';
    bannerEmoji = '🎉';
    voteString = `${justiceCount}–${9 - justiceCount} in your favor`;
  } else {
    bannerText = 'RULING AGAINST';
    bannerClass = 'outcome-banner--failed';
    bannerEmoji = '❌';
    voteString = `${9 - justiceCount}–${justiceCount} against`;
  }

  return (
    <div className="final-outcome">
      <div className="final-outcome__content card">
        <div className={`outcome-banner ${bannerClass}`}>
          <span className="outcome-banner__emoji">{bannerEmoji}</span>
          <span className="outcome-banner__text">{bannerText}</span>
        </div>

        <h2 className="final-outcome__bill-name">Martinez v. Riverside Unified School District</h2>

        {voteString && (
          <div style={{ textAlign: 'center', margin: '8px 0 4px', fontSize: '22px', fontWeight: 800, color: won ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {voteString}
          </div>
        )}

        {settled && (
          <div style={{ textAlign: 'center', margin: '8px 0 4px', fontSize: '18px', color: 'var(--color-warning)' }}>
            Justice secured — but no precedent set
          </div>
        )}

        <p className="final-outcome__explanation">{explanation}</p>

        <div className="final-outcome__vote">
          <span className="final-outcome__vote-label">Final Vote Projection:</span>
          <div className="final-outcome__vote-bar-bg">
            <div
              className="final-outcome__vote-bar-fill"
              style={{
                width: `${voteProjection}%`,
                backgroundColor: won ? 'var(--color-success)' : 'var(--color-danger)'
              }}
            />
            <div className="final-outcome__vote-threshold" style={{ left: '55.6%' }} />
          </div>
          <span
            className="final-outcome__vote-count"
            style={{ color: won ? 'var(--color-success)' : 'var(--color-danger)' }}
          >
            {justiceCount} of 9 justices
          </span>
        </div>

        <h3 className="final-outcome__metrics-title">Final Case Metrics</h3>
        <div className="final-outcome__metrics-grid">
          {allMetrics.map(({ key, label, icon, colorType }) => {
            const value = courtState[key] ?? 0;
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
            <strong>Remember:</strong> Real constitutional change often takes decades and multiple cases.
            Even lost cases raise awareness, develop doctrine, and lay the groundwork for the landmark
            ruling that eventually comes. The Supreme Court is a process, not a single moment.
          </p>
        </div>

        <button className="btn btn--primary final-outcome__replay" onClick={onPlayAgain}>
          Play Again 🔄
        </button>
      </div>
    </div>
  );
}
