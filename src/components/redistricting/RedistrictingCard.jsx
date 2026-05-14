import React from 'react';
import { getApprovalScore } from '../../engine/redistrictingEngine';

export default function RedistrictingCard({ redistrictingState, stageName }) {
  const score = getApprovalScore(redistrictingState);
  const approved = score >= 52 && redistrictingState.vraCompliance >= 45 && redistrictingState.legalDefensibility >= 48;
  const pct = Math.min(100, score);

  return (
    <div className="rd-card">
      <div className="rd-card__header">
        <span className="rd-card__badge">REDISTRICTING</span>
        <span className="rd-card__title">Congressional Map</span>
      </div>
      <div className="rd-card__stage">Current Stage: {stageName}</div>

      <div className="rd-card__metrics">
        {[
          { label: 'Legal Defense', val: redistrictingState.legalDefensibility },
          { label: 'VRA Compliance', val: redistrictingState.vraCompliance },
          { label: 'Fairness', val: redistrictingState.fairness },
          { label: 'Bipartisan', val: redistrictingState.bipartisanSupport },
        ].map(({ label, val }) => (
          <div className="rd-card__metric" key={label}>
            <span className="rd-card__metric-label">{label}</span>
            <span className="rd-card__metric-val">{val}</span>
          </div>
        ))}
      </div>

      <div className="rd-card__vote-label">Projected Court Approval</div>
      <div className="rd-vote-bar">
        <div className="rd-vote-bar__fill" style={{ width: `${pct}%`, background: approved ? '#15803d' : '#dc2626' }}/>
        <div className="rd-vote-bar__threshold"/>
      </div>
      <div style={{ fontSize: 11, color: approved ? '#15803d' : '#dc2626', fontWeight: 700, marginTop: 2 }}>
        ~{score}% approval {approved ? '✓ Map survives' : '✗ Legal risk'}
      </div>
      <div style={{ fontSize: 10, color: '#6b7280', marginTop: 1 }}>52% needed to survive challenge</div>
    </div>
  );
}
