import React from 'react';
import { votesToJustices } from '../../engine/courtEngine';

const metrics = [
  { key: 'legalStrength',    label: 'Legal Strength',    icon: '⚖️', colorType: 'positive' },
  { key: 'precedentSupport', label: 'Precedent Support', icon: '📚', colorType: 'positive' },
  { key: 'publicInterest',   label: 'Public Interest',   icon: '📢', colorType: 'neutral'  },
  { key: 'oppositionStrength', label: 'Opposition',      icon: '⚡', colorType: 'negative' },
  { key: 'certScore',        label: 'Cert Score',        icon: '🔑', colorType: 'positive' },
];

function getBarColor(colorType, value) {
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

export default function CaseCard({ courtState, stageName }) {
  const voteProjection = courtState.voteProjection ?? 0;
  const justiceCount = votesToJustices(voteProjection);
  const isWinning = justiceCount >= 5;

  return (
    <div className="bill-card card">
      <div className="bill-card__header">
        <div className="bill-card__badge" style={{ background: '#7f1d1d', color: '#fff' }}>Case in Progress</div>
        <h2 className="bill-card__title" style={{ fontSize: '15px' }}>Martinez v. Riverside USD</h2>
        <p className="bill-card__stage">Current Stage: <strong>{stageName}</strong></p>
      </div>

      <div className="bill-card__metrics">
        {metrics.map(({ key, label, colorType, icon }) => {
          const value = courtState[key] ?? 0;
          const color = getBarColor(colorType, value);
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
        <span className="vote-label">Vote Projection</span>
        <div className="vote-bar-bg" style={{ position: 'relative' }}>
          <div
            className="vote-bar-fill"
            style={{
              width: `${voteProjection}%`,
              backgroundColor: isWinning ? 'var(--color-success)' : 'var(--color-danger)'
            }}
          />
          {/* Threshold at 5/9 = ~55.6% */}
          <div className="vote-bar__threshold" style={{ left: '55.6%' }} />
        </div>
        <span
          className="vote-count"
          style={{ color: isWinning ? 'var(--color-success)' : 'var(--color-danger)' }}
        >
          {justiceCount} of 9 justices projected
        </span>
      </div>
    </div>
  );
}
