import React from 'react';

const stageIcons = ['💡', '🏛️', '✏️', '📋', '🔧', '🎤', '🗳️', '🔄', '✍️', '🚀'];

export default function StageNode({ stage, index, status, onClick }) {
  return (
    <div
      className={`stage-node stage-node--${status}`}
      onClick={status !== 'upcoming' ? onClick : undefined}
      title={stage.title}
      role={status !== 'upcoming' ? 'button' : undefined}
      aria-label={`Stage ${index + 1}: ${stage.title} — ${status}`}
      tabIndex={status !== 'upcoming' ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && status !== 'upcoming') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="stage-node__circle">
        <span className="stage-node__icon">{stageIcons[index]}</span>
        {status === 'current' && <span className="stage-node__pulse" />}
      </div>
      <span className="stage-node__label">{stage.title}</span>
    </div>
  );
}
