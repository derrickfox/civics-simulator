import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'win-moderates':       { icon: '🤝', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Passage', color: 'blue' }] },
  'reconciliation-only': { icon: '⚡', tags: [{ label: '+Programs', color: 'green' }, { label: '−Bipartisan', color: 'red' }] },
  'delay-negotiate':     { icon: '⏳', tags: [{ label: '+Bipartisan', color: 'blue' }, { label: '+Passage', color: 'green' }] },
};

export default function SenateResolutionScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-senate">
        {/* Senate chamber */}
        <div className="bd-senate-chamber">
          <div className="bd-senate__dome">🏛️</div>
          <div className="bd-senate__floor">
            <div className="bd-senate__desks">
              {[0,1,2,3,4,5,6,7,8,9].map(i => (
                <div key={i} className={`bd-senator bd-senator--${i < 5 ? 'dem' : 'rep'}`}>
                  <div className="bd-senator__head" />
                  <div className="bd-senator__body" />
                </div>
              ))}
            </div>
          </div>
          <div className="bd-vote-count">
            <span className="bd-vote-count__have">51</span>
            <span className="bd-vote-count__sep">/</span>
            <span className="bd-vote-count__need">60 needed</span>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">You have 51 votes. You need 60.</h2>
        <p className="ci-story__body">
          The Senate is evenly divided and the filibuster requires 60 votes. Three moderate senators
          from the other party are genuinely persuadable — but getting them means making deals.
          Or you can use reconciliation and cut them out entirely.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">Nine votes short of 60. <em>How do you get them?</em></h3>
        <div className="ci-choices__grid">
          {stage.choices.map((choice, i) => {
            const meta = choiceMeta[choice.id] || {};
            return (
              <button
                key={choice.id}
                className={`ci-choice${selectedId === choice.id ? ' ci-choice--selected' : ''}${selectedId && selectedId !== choice.id ? ' ci-choice--faded' : ''}`}
                style={{ animationDelay: `${i * 100}ms`, '--choice-accent': '#065f46' }}
                onClick={() => handleSelect(choice)}
                disabled={!!selectedId}
              >
                <div className="ci-choice__icon">{meta.icon}</div>
                <div className="ci-choice__body">
                  <div className="ci-choice__label">{choice.label}</div>
                  <div className="ci-choice__desc">{choice.description}</div>
                </div>
                <div className="ci-choice__tags">
                  {meta.tags?.map(t => <span key={t.label} className={`ci-tag ci-tag--${t.color}`}>{t.label}</span>)}
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
