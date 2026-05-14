import React from 'react';
import { estimateSenateVotes } from '../../engine/impeachmentEngine';

const allMetrics = [
  { key: 'evidenceStrength',    label: 'Evidence Strength',    icon: '📁' },
  { key: 'publicSupport',       label: 'Public Support',       icon: '📣' },
  { key: 'bipartisanSupport',   label: 'Bipartisan Support',   icon: '🤝' },
  { key: 'legalGrounding',      label: 'Legal Grounding',      icon: '📜' },
  { key: 'senateSentiment',     label: 'Senate Sentiment',     icon: '🏛️' },
  { key: 'proceduralIntegrity', label: 'Procedural Integrity', icon: '⚖️' },
];

function getColor(value) {
  if (value >= 60) return 'var(--color-success)';
  if (value >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

function buildExplanation(state, convicted) {
  const votes = estimateSenateVotes(state);
  if (convicted) {
    const reasons = [];
    if (state.bipartisanSupport >= 60) reasons.push('rare bipartisan coalition across party lines');
    if (state.evidenceStrength >= 65) reasons.push('overwhelming documentary evidence');
    if (state.legalGrounding >= 60) reasons.push('airtight constitutional articles');
    if (state.proceduralIntegrity >= 60) reasons.push('a process the Senate respected');
    return `The Senate votes ${votes}–${100 - votes} to convict. The President is removed from office — the first conviction in American history. This happened because you built ${reasons.length ? reasons.join(', ') : 'a compelling case across all dimensions'}. The Vice President is sworn in as President. The constitutional process worked exactly as the Founders designed it.`;
  } else {
    const reasons = [];
    if (state.bipartisanSupport < 40) reasons.push('the process never broke through partisan lines');
    if (state.legalGrounding < 40) reasons.push('the articles were legally vulnerable');
    if (state.proceduralIntegrity < 40) reasons.push('process concerns undermined the case\'s legitimacy');
    if (state.senateSentiment < 40) reasons.push('Senate sentiment never reached critical mass');
    return `The Senate votes ${votes}–${100 - votes} — short of the 67 needed. The President is acquitted and remains in office. ${reasons.length ? `The case fell short because ${reasons.join(' and ')}.` : 'The two-thirds bar proved insurmountable.'} This is how it has ended every time in American history. The constitutional record of the conduct — the testimony, the evidence, the vote — is now permanent.`;
  }
}

export default function ImpeachmentFinalOutcome({ impeachmentState, convicted, onPlayAgain }) {
  const votes = estimateSenateVotes(impeachmentState);
  const explanation = buildExplanation(impeachmentState, convicted);

  return (
    <div className="final-outcome">
      <div className="final-outcome__content card">
        <div className={`outcome-banner ${convicted ? 'outcome-banner--passed' : 'outcome-banner--failed'}`}>
          <span className="outcome-banner__emoji">{convicted ? '🔨' : '🚫'}</span>
          <span className="outcome-banner__text">{convicted ? 'CONVICTED & REMOVED' : 'ACQUITTED'}</span>
        </div>

        <h2 className="final-outcome__bill-name">Presidential Impeachment Trial</h2>

        <div style={{ textAlign: 'center', margin: '8px 0 4px', fontSize: '22px', fontWeight: 800, color: convicted ? 'var(--color-success)' : 'var(--color-danger)' }}>
          {votes}–{100 - votes} Senate Vote
        </div>
        <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
          {convicted ? `${votes} ≥ 67 — conviction threshold reached` : `${votes} < 67 — fell short of two-thirds`}
        </div>

        <p className="final-outcome__explanation">{explanation}</p>

        <div className="final-outcome__vote">
          <span className="final-outcome__vote-label">Final Senate Vote:</span>
          <div className="final-outcome__vote-bar-bg" style={{ position: 'relative' }}>
            <div
              className="final-outcome__vote-bar-fill"
              style={{ width: `${votes}%`, backgroundColor: convicted ? 'var(--color-success)' : 'var(--color-danger)' }}
            />
            <div className="final-outcome__vote-threshold" style={{ left: '67%' }} />
          </div>
          <span className="final-outcome__vote-count" style={{ color: convicted ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {votes} of 100 senators (67 needed)
          </span>
        </div>

        <h3 className="final-outcome__metrics-title">Final Case Metrics</h3>
        <div className="final-outcome__metrics-grid">
          {allMetrics.map(({ key, label, icon }) => {
            const value = impeachmentState[key] ?? 0;
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
            <strong>Remember:</strong> No president has ever been convicted by the Senate in American history.
            Whether that reflects the strength of presidential legitimacy, the impossibility of the two-thirds bar,
            or the partisan nature of modern politics — scholars disagree. What's certain is that the impeachment
            process itself, win or lose, permanently shapes a presidency and the historical record.
          </p>
        </div>

        <button className="btn btn--primary final-outcome__replay" onClick={onPlayAgain}>
          Try Again 🔄
        </button>
      </div>
    </div>
  );
}
