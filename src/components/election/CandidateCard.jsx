import React from 'react';
import { calculateElectoralVotes } from '../../engine/electionEngine';

const metrics = [
  { key: 'nationalPolls',    label: 'National Polls',    icon: '🗺️', barColor: '#057a55' },
  { key: 'battlegroundLead', label: 'Battleground Lead', icon: '🔵', barColor: '#057a55' },
  { key: 'partyUnity',       label: 'Party Unity',       icon: '🤝', barColor: '#057a55' },
  { key: 'undecidedWon',     label: 'Undecided Won',     icon: '💬', barColor: '#057a55' },
  { key: 'campaignFunds',    label: 'Campaign Funds',    icon: '💰', barColor: '#c27803' },
  { key: 'mediaNarrative',   label: 'Media Narrative',   icon: '📺', barColor: '#1d4ed8' },
];

function getBarColor(key, value) {
  if (key === 'campaignFunds') {
    if (value >= 60) return '#c27803';
    if (value >= 35) return '#e3a008';
    return '#e02424';
  }
  if (key === 'mediaNarrative') {
    if (value >= 60) return '#1d4ed8';
    if (value >= 35) return '#3b82f6';
    return '#e02424';
  }
  // green metrics
  if (value >= 60) return 'var(--color-success)';
  if (value >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export default function CandidateCard({ electionState, stageName }) {
  const ev = electionState.electoralVotes ?? calculateElectoralVotes(electionState);
  const isWinning = ev >= 270;
  const evPct = (ev / 538) * 100;
  const thresholdPct = (270 / 538) * 100; // ~50.19%

  return (
    <div className="bill-card card">
      <div className="bill-card__header">
        <div
          className="bill-card__badge"
          style={{ background: '#1e3a5f', color: '#fff' }}
        >
          Campaign in Progress
        </div>
        <h2 className="bill-card__title" style={{ fontSize: '15px' }}>
          Jordan Reyes for President
        </h2>
        <p className="bill-card__stage">
          Current Stage: <strong>{stageName}</strong>
        </p>
      </div>

      <div className="bill-card__metrics">
        {metrics.map(({ key, label, icon }) => {
          const value = electionState[key] ?? 0;
          const color = getBarColor(key, value);
          return (
            <div className="metric-row" key={key}>
              <span className="metric-row__icon">{icon}</span>
              <span className="metric-row__label">{label}</span>
              <div className="metric-row__bar-bg">
                <div
                  className="metric-row__bar-fill"
                  style={{ width: `${value}%`, backgroundColor: color }}
                />
              </div>
              <span className="metric-row__value">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="bill-card__vote-projection">
        <span className="vote-label">Electoral Vote Projection</span>
        <div className="vote-bar-bg" style={{ position: 'relative' }}>
          <div
            className="vote-bar-fill"
            style={{
              width: `${evPct}%`,
              backgroundColor: isWinning ? 'var(--color-success)' : 'var(--color-danger)',
            }}
          />
          {/* Threshold marker at 270/538 */}
          <div className="vote-bar__threshold" style={{ left: `${thresholdPct}%` }} />
        </div>
        <span
          className="vote-count"
          style={{ color: isWinning ? 'var(--color-success)' : 'var(--color-danger)' }}
        >
          {ev} of 538 electoral votes projected
        </span>
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            marginTop: '2px',
          }}
        >
          270 needed to win
        </p>
      </div>
    </div>
  );
}
