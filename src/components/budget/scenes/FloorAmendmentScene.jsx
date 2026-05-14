import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'support-amendment':   { icon: '👍', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Passage', color: 'blue' }] },
  'oppose-amendment':    { icon: '🛑', tags: [{ label: '+Deficit', color: 'green' }, { label: '−Passage', color: 'red' }] },
  'compromise-amendment':{ icon: '⚖️', tags: [{ label: '+Bipartisan', color: 'blue' }, { label: '+Passage', color: 'green' }] },
};

export default function FloorAmendmentScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-floor">
        {/* Senate floor */}
        <div className="bd-floor-chamber">
          <div className="bd-floor__presiding">👨‍⚖️</div>
          <div className="bd-floor__aisle">
            <div className="bd-floor__side bd-floor__side--left">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="bd-floor-senator">
                  <div className="bd-floor-senator__head" />
                  <div className="bd-floor-senator__body bd-floor-senator__body--blue" />
                </div>
              ))}
            </div>
            <div className="bd-floor__side bd-floor__side--right">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="bd-floor-senator">
                  <div className="bd-floor-senator__head" />
                  <div className="bd-floor-senator__body bd-floor-senator__body--red" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Amendment alert */}
        <div className="bd-amendment-alert">
          ⚠️ Amendment Filed: +$200B Defense (off-budget)
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">A surprise amendment could change everything.</h2>
        <p className="ci-story__body">
          The bill is on the Senate floor when a defense hawk files an amendment adding $200 billion
          in emergency military spending — designated "off-budget" so it doesn't count against the
          deficit limits. The vote is tomorrow. This is a test of your strategy.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The amendment vote is tomorrow. <em>How do you respond?</em></h3>
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
