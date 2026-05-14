import React, { useState, useEffect } from 'react';

export default function GotvScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage el-gotv-stage">
        {/* Neighborhood canvassing scene */}
        <div className="el-neighborhood">
          <div className="el-house el-house--1">
            <div className="el-house__roof" />
            <div className="el-house__body">
              <div className="el-house__door" />
              <div className="el-house__window" />
            </div>
          </div>
          <div className="el-house el-house--2">
            <div className="el-house__roof" />
            <div className="el-house__body">
              <div className="el-house__door" />
              <div className="el-house__window" />
            </div>
          </div>
        </div>
        {/* Canvassers */}
        <div className="el-canvassers">
          {[0,1,2].map(i => (
            <div key={i} className={`el-canvasser el-canvasser--${i}`}>
              <div className="el-canvasser__head" />
              <div className="el-canvasser__body" />
              <div className="el-canvasser__clipboard">📋</div>
            </div>
          ))}
        </div>
        {/* 2 weeks badge */}
        <div className="el-countdown">
          <span>⏰ 2 weeks to Election Day</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Persuasion is over. Now it's pure turnout.</h2>
        <p className="ci-story__body">
          Polls show a tight race in three critical battleground states. Your lead is real, but leads
          evaporate when supporters don't show up. The final two weeks are all about mobilization —
          getting every identified supporter to actually cast a ballot.
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
          The final sprint. <em>How do you mobilize your voters?</em>
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
  'ground-game': {
    icon: '🚪',
    tags: [
      { label: '+Battleground', color: 'blue' },
      { label: '+Undecided', color: 'green' },
    ],
  },
  'digital-blitz': {
    icon: '📱',
    tags: [
      { label: '+Undecided', color: 'blue' },
      { label: '+Polls', color: 'green' },
    ],
  },
  'celebrity-push': {
    icon: '🎤',
    tags: [
      { label: '+Media', color: 'blue' },
      { label: '+Unity', color: 'green' },
    ],
  },
};
