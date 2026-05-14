import React from 'react';

const metrics = [
  { key: 'legalDefensibility', label: 'Legal Defensibility', icon: '⚖️' },
  { key: 'vraCompliance',      label: 'VRA Compliance',      icon: '📜' },
  { key: 'fairness',           label: 'Fairness',            icon: '🏛️' },
  { key: 'competitiveness',    label: 'Competitiveness',     icon: '🗳️' },
  { key: 'publicSupport',      label: 'Public Support',      icon: '📣' },
  { key: 'bipartisanSupport',  label: 'Bipartisan Support',  icon: '🤝' },
];

function barColor(v) {
  if (v >= 60) return '#15803d';
  if (v >= 35) return '#f59e0b';
  return '#dc2626';
}

export default function RedistrictingMetricsPanel({ redistrictingState }) {
  return (
    <div className="metrics-panel">
      <h3 className="metrics-panel__title">Map Metrics</h3>
      {metrics.map(({ key, label, icon }) => {
        const val = redistrictingState[key] ?? 0;
        return (
          <div className="metric-row" key={key}>
            <span className="metric-row__icon">{icon}</span>
            <span className="metric-row__label">{label}</span>
            <div className="metric-row__bar-bg">
              <div className="metric-row__bar-fill" style={{ width: `${val}%`, background: barColor(val) }}/>
            </div>
            <span className="metric-row__val" style={{ color: barColor(val) }}>{val}</span>
          </div>
        );
      })}
    </div>
  );
}
