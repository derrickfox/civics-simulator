import React from 'react';
import StageNode from './StageNode';

export default function ProcessMap({ stages, currentStage, completedStages, onStageClick }) {
  return (
    <div className="process-map" aria-label="Bill progress map">
      <div className="process-map__track">
        {stages.map((stage, index) => {
          let status = 'upcoming';
          if (completedStages.includes(index)) status = 'completed';
          else if (index === currentStage) status = 'current';

          return (
            <React.Fragment key={stage.id}>
              <StageNode
                stage={stage}
                index={index}
                status={status}
                onClick={() => status === 'completed' && onStageClick(index)}
              />
              {index < stages.length - 1 && (
                <div
                  className={`process-map__connector${
                    completedStages.includes(index) ? ' process-map__connector--filled' : ''
                  }`}
                />
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
