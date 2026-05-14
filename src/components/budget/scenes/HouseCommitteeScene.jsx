import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'accept-cuts':    { icon: '✂️', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Passage', color: 'blue' }] },
  'targeted-cuts':  { icon: '🎯', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Economy', color: 'blue' }] },
  'tax-loopholes':  { icon: '💼', tags: [{ label: '+Public', color: 'blue' }, { label: '−Bipartisan', color: 'red' }] },
};

export default function HouseCommitteeScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-committee">
        {/* Committee room */}
        <div className="bd-committee">
          <div className="bd-committee__table" />
          <div className="bd-committee__members">
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} className={`bd-member bd-member--${i % 3 === 0 ? 'hawk' : 'neutral'}`}>
                <div className="bd-member__head" />
                <div className="bd-member__body" />
              </div>
            ))}
          </div>
          <div className="bd-committee__sign">🏠 House Budget Committee</div>
        </div>
        {/* Cut demand */}
        <div className="bd-demand">
          <span>✂️ Deficit hawks demand: <strong>$450B in cuts</strong></span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">House deficit hawks want $450 billion in cuts.</h2>
        <p className="ci-story__body">
          The House Budget Committee chairman controls whether this bill moves forward. His bloc
          of fiscal conservatives won't advance anything without major spending cuts. You're in
          his office now, negotiating what gets cut and what survives.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The chairman wants $450B in cuts. <em>How do you negotiate?</em></h3>
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
