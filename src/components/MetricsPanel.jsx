import React from 'react';

const allMetrics = [
  { key: 'publicSupport', label: 'Public Support', icon: '👥', colorType: 'positive', description: 'How much the public favors this bill' },
  { key: 'committeeSupport', label: 'Committee Support', icon: '🏛️', colorType: 'positive', description: 'Support among legislative committee members' },
  { key: 'budgetConcern', label: 'Budget Concern', icon: '💰', colorType: 'negative', description: 'Worry over the bill\'s cost to taxpayers' },
  { key: 'oppositionStrength', label: 'Opposition Strength', icon: '⚡', colorType: 'negative', description: 'How organized and powerful the opposition is' },
  { key: 'mediaAttention', label: 'Media Attention', icon: '📺', colorType: 'neutral', description: 'How much press coverage the bill is receiving' },
  { key: 'implementationDifficulty', label: 'Implementation Difficulty', icon: '⚙️', colorType: 'negative', description: 'How hard it will be to put the law into practice' }
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

export default function MetricsPanel({ billState }) {
  return (
    <div className="metrics-panel card">
      <h3 className="metrics-panel__title">Bill Health Dashboard</h3>
      <div className="metrics-panel__grid">
        {allMetrics.map(({ key, label, icon, colorType, description }) => {
          const value = billState[key] ?? 0;
          const color = getColor(colorType, value);
          return (
            <div className="metric-card" key={key}>
              <div className="metric-card__header">
                <span className="metric-card__icon">{icon}</span>
                <span className="metric-card__label">{label}</span>
              </div>
              <div className="metric-card__bar-bg">
                <div
                  className="metric-card__bar-fill"
                  style={{ width: `${value}%`, backgroundColor: color }}
                />
              </div>
              <div className="metric-card__footer">
                <span className="metric-card__description">{description}</span>
                <span className="metric-card__pct" style={{ color }}>{value}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
