import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'full-defense':    { icon: '🛡️', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '−Deficit', color: 'red' }] },
  'inflation-only':  { icon: '📊', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Programs', color: 'blue' }] },
  'reform-defense':  { icon: '🔧', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Public', color: 'blue' }] },
};

export default function DefenseAppropScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-defense">
        {/* Pentagon */}
        <div className="bd-pentagon">
          <div className="bd-pentagon__shape">⬠</div>
          <div className="bd-pentagon__label">🛡️ Pentagon</div>
        </div>
        {/* Budget bars */}
        <div className="bd-defense-bars">
          <div className="bd-def-bar-wrap">
            <div className="bd-def-bar bd-def-bar--last">Last Year</div>
            <div className="bd-def-bar bd-def-bar--request">+8% Request</div>
          </div>
          <div className="bd-def-label">$62B increase requested</div>
        </div>
        {/* Jet */}
        <div className="bd-jet">✈️</div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The Pentagon wants $62 billion more — an 8% increase.</h2>
        <p className="ci-story__body">
          Defense appropriations set the tone for everything else. Hawkish members of both parties
          say the full increase is necessary for modernization and readiness. Progressives say
          half the increase is waste. You're casting the decisive vote.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The Pentagon's request is on the table. <em>How much do you fund?</em></h3>
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
