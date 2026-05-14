import React from 'react';

const metrics = [
  {
    key: 'publicSupport',
    label: 'Public Support',
    colorType: 'positive',
    icon: '👥'
  },
  {
    key: 'committeeSupport',
    label: 'Committee Support',
    colorType: 'positive',
    icon: '🏛️'
  },
  {
    key: 'budgetConcern',
    label: 'Budget Concern',
    colorType: 'negative',
    icon: '💰'
  },
  {
    key: 'oppositionStrength',
    label: 'Opposition',
    colorType: 'negative',
    icon: '⚡'
  },
  {
    key: 'mediaAttention',
    label: 'Media Attention',
    colorType: 'neutral',
    icon: '📺'
  },
  {
    key: 'implementationDifficulty',
    label: 'Impl. Difficulty',
    colorType: 'negative',
    icon: '⚙️'
  }
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
  // neutral
  return 'var(--color-primary)';
}

export default function BillCard({ billState, stageName }) {
  const voteCount = billState.voteCount ?? 0;

  return (
    <div className="bill-card card">
      <div className="bill-card__header">
        <div className="bill-card__badge">Bill in Progress</div>
        <h2 className="bill-card__title">Safe Crosswalks Near Schools Act</h2>
        <p className="bill-card__stage">Current Stage: <strong>{stageName}</strong></p>
      </div>

      <div className="bill-card__metrics">
        {metrics.map(({ key, label, colorType, icon }) => {
          const value = billState[key] ?? 0;
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
        <div className="vote-bar-bg">
          <div
            className="vote-bar-fill"
            style={{
              width: `${voteCount}%`,
              backgroundColor: voteCount >= 50 ? 'var(--color-success)' : 'var(--color-danger)'
            }}
          />
          <div className="vote-bar__threshold" />
        </div>
        <span
          className="vote-count"
          style={{ color: voteCount >= 50 ? 'var(--color-success)' : 'var(--color-danger)' }}
        >
          {voteCount}% projected
        </span>
      </div>
    </div>
  );
}
