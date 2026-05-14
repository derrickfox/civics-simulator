import React from 'react';
import { getApprovalScore } from '../../engine/redistrictingEngine';

const allMetrics = [
  { key: 'legalDefensibility', label: 'Legal Defensibility', icon: '⚖️' },
  { key: 'vraCompliance',      label: 'VRA Compliance',      icon: '📜' },
  { key: 'fairness',           label: 'Fairness',            icon: '🏛️' },
  { key: 'competitiveness',    label: 'Competitiveness',     icon: '🗳️' },
  { key: 'publicSupport',      label: 'Public Support',      icon: '📣' },
  { key: 'bipartisanSupport',  label: 'Bipartisan Support',  icon: '🤝' },
];

function getColor(v) {
  if (v >= 60) return 'var(--color-success)';
  if (v >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function buildExplanation(state, approved) {
  const score = getApprovalScore(state);
  if (approved) {
    const reasons = [];
    if (state.legalDefensibility >= 65) reasons.push('an airtight legal record');
    if (state.vraCompliance >= 60) reasons.push('strong Voting Rights Act compliance');
    if (state.bipartisanSupport >= 55) reasons.push('rare bipartisan support');
    if (state.fairness >= 60) reasons.push('a map the public recognized as fair');
    return `Your map survives legal challenge with a ${score}% court approval score. The districts take effect for the 2024 election cycle and will govern 15 congressional races for the next decade. This happened because you built ${reasons.length ? reasons.join(', ') : 'a legally defensible case across all dimensions'}. Redistricting is never perfect — but yours was defensible.`;
  } else {
    const reasons = [];
    if (state.legalDefensibility < 45) reasons.push('the legal record was too weak to withstand challenge');
    if (state.vraCompliance < 45) reasons.push('VRA compliance was insufficient');
    if (state.bipartisanSupport < 30) reasons.push('the process appeared nakedly partisan to the courts');
    return `Your map was struck down with only a ${score}% approval score. A federal court ordered a court-drawn interim map for the upcoming election. ${reasons.length ? `The case collapsed because ${reasons.join(' and ')}.` : 'The two-thirds bar proved insurmountable.'} The court-drawn map, ironically, may produce more competitive districts than any the legislature would have approved.`;
  }
}

export default function RedistrictingFinalOutcome({ redistrictingState, mapApproved, onPlayAgain }) {
  const score = getApprovalScore(redistrictingState);
  const explanation = buildExplanation(redistrictingState, mapApproved);

  return (
    <div className="final-outcome">
      <div className="final-outcome__content card">
        <div className={`outcome-banner ${mapApproved ? 'outcome-banner--passed' : 'outcome-banner--failed'}`}>
          <span className="outcome-banner__emoji">{mapApproved ? '🗺️' : '🚫'}</span>
          <span className="outcome-banner__text">{mapApproved ? 'MAP UPHELD' : 'MAP STRUCK DOWN'}</span>
        </div>

        <h2 className="final-outcome__bill-name">Congressional Redistricting Plan</h2>

        <div style={{ textAlign: 'center', margin: '8px 0 4px', fontSize: '22px', fontWeight: 800, color: mapApproved ? 'var(--color-success)' : 'var(--color-danger)' }}>
          {score}% Court Approval Score
        </div>
        <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
          {mapApproved ? `${score}% ≥ 52% — map survives challenge` : `${score}% < 52% — struck down by court`}
        </div>

        <p className="final-outcome__explanation">{explanation}</p>

        <div className="final-outcome__vote">
          <span className="final-outcome__vote-label">Court Approval Score:</span>
          <div className="final-outcome__vote-bar-bg" style={{ position: 'relative' }}>
            <div
              className="final-outcome__vote-bar-fill"
              style={{ width: `${score}%`, backgroundColor: mapApproved ? 'var(--color-success)' : 'var(--color-danger)' }}
            />
            <div className="final-outcome__vote-threshold" style={{ left: '52%' }} />
          </div>
          <span className="final-outcome__vote-count" style={{ color: mapApproved ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {score} of 100 (52 needed)
          </span>
        </div>

        <h3 className="final-outcome__metrics-title">Final Map Metrics</h3>
        <div className="final-outcome__metrics-grid">
          {allMetrics.map(({ key, label, icon }) => {
            const value = redistrictingState[key] ?? 0;
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
            <strong>Remember:</strong> Every redistricting cycle ends in litigation. The question is never whether your
            map will be sued — it always will be. The question is whether you built a process and a record strong enough
            to survive. Maps that incorporate community input, respect the VRA, and demonstrate bipartisan good faith
            almost always outlast those that don't.
          </p>
        </div>

        <button className="btn btn--primary final-outcome__replay" onClick={onPlayAgain}>
          Try Again 🔄
        </button>
      </div>
    </div>
  );
}
