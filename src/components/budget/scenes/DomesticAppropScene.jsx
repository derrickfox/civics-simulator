import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'invest-domestic': { icon: '🏗️', tags: [{ label: '+Programs', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'flat-domestic':   { icon: '➡️', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Passage', color: 'blue' }] },
  'cut-domestic':    { icon: '✂️', tags: [{ label: '+Deficit', color: 'green' }, { label: '−Public', color: 'red' }] },
};

export default function DomesticAppropScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-domestic">
        {/* School, hospital, bridge icons */}
        <div className="bd-domestic-icons">
          <div className="bd-dom-icon">
            <span className="bd-dom-icon__emoji">🏫</span>
            <span className="bd-dom-icon__label">Education</span>
          </div>
          <div className="bd-dom-icon">
            <span className="bd-dom-icon__emoji">🏥</span>
            <span className="bd-dom-icon__label">Public Health</span>
          </div>
          <div className="bd-dom-icon">
            <span className="bd-dom-icon__emoji">🌉</span>
            <span className="bd-dom-icon__label">Infrastructure</span>
          </div>
          <div className="bd-dom-icon">
            <span className="bd-dom-icon__emoji">🏠</span>
            <span className="bd-dom-icon__label">Housing</span>
          </div>
        </div>
        {/* Funding gap indicator */}
        <div className="bd-funding-gap">
          <div className="bd-gap-bar">
            <div className="bd-gap-bar__fill" />
            <div className="bd-gap-bar__label">Underfunded vs. last year</div>
          </div>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">Education, housing, health — all underfunded.</h2>
        <p className="ci-story__body">
          After defense takes its share, domestic discretionary programs are squeezed. Schools,
          hospitals, public housing, and infrastructure are all below last year's levels in the
          current draft. This is your chance to decide what kind of investments the country makes.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">Domestic programs need funding. <em>What's your call?</em></h3>
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
