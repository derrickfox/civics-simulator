import React, { useEffect, useState } from 'react';

const stageIcons = ['💡', '🏛️', '✏️', '📋', '🔧', '🎤', '🗳️', '🔄', '✍️', '🚀'];

export default function CurrentStagePanel({ stage, stageIndex }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [stageIndex]);

  return (
    <div className={`current-stage-panel card${visible ? ' current-stage-panel--visible' : ''}`}>
      <div className="current-stage-panel__header">
        <div className="current-stage-panel__icon-wrap">
          <span className="current-stage-panel__icon">{stageIcons[stageIndex]}</span>
        </div>
        <div>
          <p className="current-stage-panel__step">Step {stageIndex + 1} of 10</p>
          <h2 className="current-stage-panel__title">{stage.title}</h2>
        </div>
      </div>
      <p className="current-stage-panel__description">{stage.shortDescription}</p>
      <div className="current-stage-panel__lesson">
        <div className="lesson-label">
          <span className="lesson-icon">📚</span> Civic Lesson
        </div>
        <p className="lesson-text">{stage.civicLesson}</p>
      </div>
    </div>
  );
}
