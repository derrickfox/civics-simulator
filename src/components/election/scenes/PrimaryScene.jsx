import React, { useState, useEffect } from 'react';

export default function PrimaryScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage el-primary-stage">
        {/* Iowa diner setting */}
        <div className="el-diner">
          <div className="el-diner__building">
            <div className="el-diner__sign">🍽️ Main St. Diner — Iowa</div>
            <div className="el-diner__window el-diner__window--1" />
            <div className="el-diner__window el-diner__window--2" />
          </div>
        </div>
        {/* Voter figures */}
        <div className="el-crowd">
          {[0,1,2,3,4,5].map(i => (
            <div key={i} className={`el-crowd__person el-crowd__person--${i % 3}`}>
              <div className="el-crowd__head" />
              <div className="el-crowd__body" />
            </div>
          ))}
        </div>
        {/* Primary map */}
        <div className="el-primary-map">
          <div className="el-primary-map__state el-primary-map__state--ia">IA</div>
          <div className="el-primary-map__state el-primary-map__state--nh">NH</div>
          <div className="el-primary-map__arrow">→</div>
          <div className="el-primary-map__label">Super Tuesday</div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Iowa votes first. Everything rides on this.</h2>
        <p className="ci-story__body">
          Six candidates are fighting for the nomination. Iowa's caucuses and New Hampshire's primary
          will define who survives to Super Tuesday. A strong showing here can clear the field;
          a stumble here can end everything.
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
          The primary field is set. <em>What's your Iowa strategy?</em>
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
  'retail-politics': {
    icon: '🤝',
    tags: [
      { label: '+Unity', color: 'green' },
      { label: '+Undecided', color: 'blue' },
    ],
  },
  'tv-air-war': {
    icon: '📺',
    tags: [
      { label: '+Polls', color: 'green' },
      { label: '−Funds', color: 'red' },
    ],
  },
  'skip-iowa': {
    icon: '🗺️',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '−Unity', color: 'red' },
    ],
  },
};
