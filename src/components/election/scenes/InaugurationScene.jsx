import React, { useState, useEffect } from 'react';

export default function InaugurationScene({ stage, onChoiceSelect }) {
  const [phase, setPhase] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2200),
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
      <div className="ci-scene__stage el-inaug-stage">
        {/* Capitol steps */}
        <div className="el-inaug-capitol">
          <div className="el-inaug-dome">🏛️</div>
          <div className="el-inaug-steps">
            <div className="el-inaug-step el-inaug-step--1" />
            <div className="el-inaug-step el-inaug-step--2" />
            <div className="el-inaug-step el-inaug-step--3" />
            {/* President figure at podium */}
            <div className="el-inaug-podium">
              <div className="el-inaug-figure">
                <div className="el-inaug-figure__head" />
                <div className="el-inaug-figure__body" />
              </div>
              🎤
            </div>
          </div>
        </div>
        {/* Crowd on the mall */}
        <div className="el-mall-crowd">
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className={`el-mall-person el-mall-person--${i % 5}`}>
              <div className="el-mall-person__head" />
              <div className="el-mall-person__flag">🇺🇸</div>
            </div>
          ))}
        </div>
        {/* Fireworks */}
        <div className="el-firework el-firework--1">✨</div>
        <div className="el-firework el-firework--2">🎆</div>
        <div className="el-firework el-firework--3">✨</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">January 20th. The Capitol steps. The world is watching.</h2>
        <p className="ci-story__body">
          Hundreds of thousands fill the National Mall. The Chief Justice holds the Bible.
          Jordan Reyes is about to take the oath of office and become the next President
          of the United States. What you say next will be remembered for generations.
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
          The oath is sworn. <em>What does your inaugural address say?</em>
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
  'unity-address': {
    icon: '🤝',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Undecided', color: 'green' },
    ],
  },
  'bold-agenda': {
    icon: '📋',
    tags: [
      { label: '+Unity', color: 'green' },
      { label: '+Polls', color: 'blue' },
    ],
  },
  'historical-moment': {
    icon: '🌟',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Unity', color: 'green' },
    ],
  },
};
