import React from 'react';

const metricDefs = [
  {
    key: 'legalStrength',
    label: 'Legal Strength',
    icon: '⚖️',
    colorType: 'positive',
    description: 'Quality of your legal arguments'
  },
  {
    key: 'precedentSupport',
    label: 'Precedent Support',
    icon: '📚',
    colorType: 'positive',
    description: 'How much existing case law supports you'
  },
  {
    key: 'publicInterest',
    label: 'Public Interest',
    icon: '📢',
    colorType: 'neutral',
    description: 'Media and public attention on the case'
  },
  {
    key: 'oppositionStrength',
    label: 'Opposition Strength',
    icon: '⚡',
    colorType: 'negative',
    description: 'How strong the opposing arguments are'
  },
  {
    key: 'certScore',
    label: 'Cert Score',
    icon: '🔑',
    colorType: 'positive',
    description: 'Likelihood the Court accepted (or will accept) your case'
  }
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

export default function CourtMetricsPanel({ courtState }) {
  return (
    <div className="card" style={{ padding: '16px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Case Metrics
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {metricDefs.map(({ key, label, icon, colorType, description }) => {
          const value = courtState[key] ?? 0;
          const color = getColor(colorType, value);
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
