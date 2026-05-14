import React from 'react';

const metricDefs = [
  { key: 'evidenceStrength',    label: 'Evidence Strength',    icon: '📁', description: 'Quality and weight of documented evidence' },
  { key: 'publicSupport',       label: 'Public Support',       icon: '📣', description: 'Public approval of the impeachment process' },
  { key: 'bipartisanSupport',   label: 'Bipartisan Support',   icon: '🤝', description: 'Cross-party votes you can count on' },
  { key: 'legalGrounding',      label: 'Legal Grounding',      icon: '📜', description: 'Constitutional strength of the articles' },
  { key: 'senateSentiment',     label: 'Senate Sentiment',     icon: '🏛️', description: "Senate's inclination to convict" },
  { key: 'proceduralIntegrity', label: 'Procedural Integrity', icon: '⚖️', description: 'Fairness and legitimacy of the process' },
];

function getColor(value) {
  if (value >= 60) return 'var(--color-success)';
  if (value >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export default function ImpeachmentMetricsPanel({ impeachmentState }) {
  return (
    <div className="card" style={{ padding: '16px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Case Metrics
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {metricDefs.map(({ key, label, icon, description }) => {
          const value = impeachmentState[key] ?? 0;
          const color = getColor(value);
          return (
            <div key={key}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px' }}>{icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, flex: 1 }}>{label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color }}>{value}</span>
              </div>
              <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${value}%`, backgroundColor: color, transition: 'width 0.4s ease, background-color 0.4s ease', borderRadius: '3px' }} />
              </div>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '3px' }}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
