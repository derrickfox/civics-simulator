import React from 'react';

const stageIcons = ['📊','📐','✏️','⚖️','🎤','🗺️','🏛️','✍️','⚖️','🔨'];
const RD_COLOR = '#14532d';

export default function RedistrictingProcessMap({ stages, currentStage, completedStages }) {
  return (
    <div className="process-map" aria-label="Redistricting process progress map">
      <div className="process-map__track">
        {stages.map((stage, index) => {
          let status = 'upcoming';
          if (completedStages.includes(index)) status = 'completed';
          else if (index === currentStage) status = 'current';
          const icon = stageIcons[index] || '🗺️';
          return (
            <React.Fragment key={stage.id}>
              <div
                className={`stage-node stage-node--${status}`}
                title={stage.title}
                aria-label={`Stage ${index + 1}: ${stage.title} — ${status}`}
              >
                <div
                  className="stage-node__circle"
                  style={status === 'current' ? { background: '#f0fdf4', borderColor: RD_COLOR, boxShadow: `0 0 0 3px rgba(20,83,45,0.2)` } : {}}
                >
                  <span className="stage-node__icon">{status === 'completed' ? '✓' : icon}</span>
                  {status === 'current' && <span className="stage-node__pulse" style={{ borderColor: RD_COLOR }} />}
                </div>
                <span className="stage-node__label" style={status === 'current' ? { color: RD_COLOR } : {}}>
                  {stage.title}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div className={`process-map__connector${completedStages.includes(index) ? ' process-map__connector--filled' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="process-map__legend">
        <span className="legend-item legend-item--completed">Completed</span>
        <span className="legend-item legend-item--current">Current</span>
        <span className="legend-item legend-item--upcoming">Upcoming</span>
      </div>
    </div>
  );
}
