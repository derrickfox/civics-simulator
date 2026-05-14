import React from 'react';

const stageIcons = ['📊','📐','✏️','⚖️','🎤','🗺️','🏛️','✍️','⚖️','🔨'];

export default function RedistrictingProcessMap({ stages, currentStage, completedStages }) {
  return (
    <div className="process-map">
      {stages.map((stage, i) => {
        const isDone    = completedStages.includes(i);
        const isCurrent = i === currentStage && !completedStages.includes(i);
        return (
          <React.Fragment key={stage.id}>
            <div className={`process-step${isDone ? ' process-step--done' : ''}${isCurrent ? ' process-step--current' : ''}`}>
              <div className="process-step__bubble">
                {isDone ? '✓' : stageIcons[i]}
              </div>
              <div className="process-step__label">{stage.title}</div>
            </div>
            {i < stages.length - 1 && <div className="process-step__connector"/>}
          </React.Fragment>
        );
      })}
      <div className="process-map__legend">
        <span><span className="legend-dot legend-dot--done"/>Completed</span>
        <span><span className="legend-dot legend-dot--current"/>Current</span>
        <span><span className="legend-dot legend-dot--upcoming"/>Upcoming</span>
      </div>
    </div>
  );
}
