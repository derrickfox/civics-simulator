import React from 'react';

const metricDefs = [
  {
    key: 'nationalPolls',
    label: 'National Polls',
    icon: '🗺️',
    description: 'Your average in national polling',
  },
  {
    key: 'battlegroundLead',
    label: 'Battleground Lead',
    icon: '🔵',
    description: 'Performance in key swing states',
  },
  {
    key: 'partyUnity',
    label: 'Party Unity',
    icon: '🤝',
    description: 'Support within your own party',
  },
  {
    key: 'undecidedWon',
    label: 'Undecided Won',
    icon: '💬',
    description: 'Undecided voters you have won over',
  },
  {
    key: 'campaignFunds',
    label: 'Campaign Funds',
    icon: '💰',
    description: 'Fundraising health and cash on hand',
  },
  {
    key: 'mediaNarrative',
    label: 'Media Narrative',
    icon: '📺',
    description: 'Favorability of press coverage',
  },
];

function getColor(key, value) {
  if (key === 'campaignFunds') {
    if (value >= 60) return '#c27803';
    if (value >= 35) return '#e3a008';
    return 'var(--color-danger)';
  }
  if (key === 'mediaNarrative') {
    if (value >= 60) return '#1d4ed8';
    if (value >= 35) return '#3b82f6';
    return 'var(--color-danger)';
  }
  if (value >= 60) return 'var(--color-success)';
  if (value >= 35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export default function ElectionMetricsPanel({ electionState }) {
  return (
    <div className="card" style={{ padding: '16px' }}>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 700,
          marginBottom: '12px',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Campaign Metrics
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {metricDefs.map(({ key, label, icon, description }) => {
          const value = electionState[key] ?? 0;
          const color = getColor(key, value);
          return (
            <div key={key}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '4px',
                }}
              >
                <span style={{ fontSize: '14px' }}>{icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, flex: 1 }}>{label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color }}>{value}</span>
              </div>
              <div
                style={{
                  height: '6px',
                  background: 'var(--color-border)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${value}%`,
                    backgroundColor: color,
                    transition: 'width 0.4s ease, background-color 0.4s ease',
                    borderRadius: '3px',
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginTop: '3px',
                }}
              >
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
