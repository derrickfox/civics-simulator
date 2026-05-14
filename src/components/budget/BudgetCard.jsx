import React from 'react';

const metrics = [
  { key: 'publicSupport',     label: 'Public Support',     icon: '📣' },
  { key: 'bipartisanSupport', label: 'Bipartisan Support', icon: '🤝' },
  { key: 'deficitControl',    label: 'Deficit Control',    icon: '📉' },
  { key: 'programFunding',    label: 'Program Funding',    icon: '🏫' },
  { key: 'economicOutlook',   label: 'Economic Outlook',   icon: '📈' },
  { key: 'passageChance',     label: 'Passage Chance',     icon: '🗳️' },
];

function getColor(key, value) {
  if (value >= 60) return 'var(--color-success)';
  if (value >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export default function BudgetCard({ budgetState, stageName }) {
  const passageStrength = Math.round(
    (budgetState.passageChance + budgetState.bipartisanSupport) / 2
  );
  const isOnTrack = passageStrength >= 45 && budgetState.deficitControl >= 28;

  return (
    <div className="bill-card card">
      <div className="bill-card__header">
        <div
          className="bill-card__badge"
          style={{ background: '#065f46', color: '#fff' }}
        >
          Budget in Progress
        </div>
        <h2 className="bill-card__title" style={{ fontSize: '15px' }}>
          Federal Budget Resolution — FY 2027
        </h2>
        <p className="bill-card__stage">
          Current Stage: <strong>{stageName}</strong>
        </p>
      </div>

      <div className="bill-card__metrics">
        {metrics.map(({ key, label, icon }) => {
          const value = budgetState[key] ?? 0;
          const color = getColor(key, value);
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
        <span className="vote-label">Passage Strength</span>
        <div className="vote-bar-bg" style={{ position: 'relative' }}>
          <div
            className="vote-bar-fill"
            style={{
              width: `${passageStrength}%`,
              backgroundColor: isOnTrack ? 'var(--color-success)' : 'var(--color-danger)',
            }}
          />
          <div className="vote-bar__threshold" style={{ left: '45%' }} />
        </div>
        <span
          className="vote-count"
          style={{ color: isOnTrack ? 'var(--color-success)' : 'var(--color-danger)' }}
        >
          {passageStrength}% — {isOnTrack ? 'On track to pass' : 'At risk of failure'}
        </span>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
          Needs 45%+ passage strength and deficit control ≥ 28
        </p>
      </div>
    </div>
  );
}
