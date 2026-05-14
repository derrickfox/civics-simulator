import React, { useState, useEffect } from 'react';

export default function ConventionScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2100),
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
      <div className="ci-scene__stage el-convention-stage">
        {/* Convention hall */}
        <div className="el-convention">
          <div className="el-convention__stage">
            <div className="el-convention__podium">🎤</div>
            <div className="el-convention__banner el-convention__banner--1">🇺🇸</div>
            <div className="el-convention__banner el-convention__banner--2">🇺🇸</div>
          </div>
          <div className="el-convention__crowd">
            {[0,1,2,3,4,5,6,7].map(i => (
              <div key={i} className={`el-conv-person el-conv-person--${i % 4}`}>
                <div className="el-conv-person__head" />
                <div className="el-conv-person__sign">🎉</div>
              </div>
            ))}
          </div>
        </div>
        {/* Balloons */}
        <div className="el-balloon el-balloon--1">🎈</div>
        <div className="el-balloon el-balloon--2">🎈</div>
        <div className="el-balloon el-balloon--3">🎈</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">You've won the nomination. Now comes the VP pick.</h2>
        <p className="ci-story__body">
          The convention hall is packed. Delegates from all 50 states are here to formally nominate
          you for president. The biggest decision of the week — who stands beside you on that stage —
          will dominate every news cycle for days.
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
          70 million people are watching. <em>Who's your running mate?</em>
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
  'unity-vp': {
    icon: '🤝',
    tags: [
      { label: '+Unity', color: 'green' },
      { label: '+Polls', color: 'green' },
    ],
  },
  'battleground-vp': {
    icon: '🗺️',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '+Funds', color: 'green' },
    ],
  },
  'bold-vp': {
    icon: '⚡',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Polls', color: 'green' },
    ],
  },
};
