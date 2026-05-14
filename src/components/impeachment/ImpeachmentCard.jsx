import React from 'react';
import { estimateSenateVotes } from '../../engine/impeachmentEngine';

const metrics = [
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

export default function ImpeachmentCard({ impeachmentState, stageName }) {
  const votes = estimateSenateVotes(impeachmentState);
  const pct   = (votes / 100) * 100;
  const onTrack = votes >= 67;

  return (
    <div className="bill-card card">
      <div className="bill-card__header">
        <div className="bill-card__badge" style={{ background: '#7f1d1d', color: '#fff' }}>
          Impeachment in Progress
        </div>
        <h2 className="bill-card__title" style={{ fontSize: '15px' }}>
          Articles of Impeachment
        </h2>
        <p className="bill-card__stage">
          Current Stage: <strong>{stageName}</strong>
        </p>
      </div>

      <div className="bill-card__metrics">
        {metrics.map(({ key, label, icon }) => {
          const value = impeachmentState[key] ?? 0;
          const color = getColor(value);
          return (
            <div className="metric-row" key={key}>
              <span className="metric-row__icon">{icon}</span>
              <span className="metric-row__label">{label}</span>
              <div className="metric-row__bar-bg">
                <div className="metric-row__bar-fill" style={{ width: `${value}%`, backgroundColor: color }} />
              </div>
              <span className="metric-row__value">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="bill-card__vote-projection">
        <span className="vote-label">Projected Senate Votes</span>
        <div className="vote-bar-bg" style={{ position: 'relative' }}>
          <div
            className="vote-bar-fill"
            style={{ width: `${pct}%`, backgroundColor: onTrack ? 'var(--color-success)' : 'var(--color-danger)' }}
          />
          {/* 67/100 threshold marker */}
          <div className="vote-bar__threshold" style={{ left: '67%' }} />
        </div>
        <span className="vote-count" style={{ color: onTrack ? 'var(--color-success)' : 'var(--color-danger)' }}>
          ~{votes} of 100 senators
        </span>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
          67 votes needed to convict and remove
        </p>
      </div>
    </div>
  );
}
