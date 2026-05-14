import React, { useState, useEffect } from 'react';

export default function ExploratoryScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSelect = (choice) => {
    if (selectedId) return;
    setSelectedId(choice.id);
    setTimeout(() => onChoiceSelect(choice), 300);
  };

  return (
    <div className="ci-scene">
      <div className="ci-scene__stage el-explore-stage">
        {/* Office background */}
        <div className="el-office">
          <div className="el-office__desk" />
          <div className="el-office__chair" />
          <div className="el-office__lamp" />
          <div className="el-office__map">🗺️</div>
          <div className="el-office__papers">📋</div>
          <div className="el-office__phone">📱</div>
        </div>
        {/* Polling chart animation */}
        <div className="el-poll-chart">
          <div className="el-poll-bar el-poll-bar--1" />
          <div className="el-poll-bar el-poll-bar--2" />
          <div className="el-poll-bar el-poll-bar--3" />
          <span className="el-poll-label">42%</span>
        </div>
        {/* News ticker */}
        <div className="el-ticker">
          <span>📺 BREAKING: Jordan Reyes weighing 2026 presidential run</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">A candidacy begins with a question: Can I win?</h2>
        <p className="ci-story__body">
          Jordan Reyes — former mayor, two-term senator, and the party's most talked-about figure —
          is being urged to run for president. Before filing any papers, you need to decide how to
          enter the race and what message defines your candidacy from day one.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div>
          <strong>Civic Lesson: </strong>
          {stage.civicLesson}
        </div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">
          Jordan Reyes is ready to run. <em>How do you announce?</em>
        </h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${
                  selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''
                }`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#1e3a5f' }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">
                  {meta.tags?.map(t => (
                    <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {selectedId === choice.id && <div className="ci-choice__check">✓</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const choiceMeta = {
  'announce-big': {
    icon: '🎤',
    tags: [
      { label: '+Polls', color: 'green' },
      { label: '+Media', color: 'blue' },
    ],
  },
  'grassroots-announce': {
    icon: '📱',
    tags: [
      { label: '+Funds', color: 'green' },
      { label: '+Undecided', color: 'blue' },
    ],
  },
  'insider-rollout': {
    icon: '🤝',
    tags: [
      { label: '+Unity', color: 'green' },
      { label: '+Funds', color: 'green' },
    ],
  },
};
