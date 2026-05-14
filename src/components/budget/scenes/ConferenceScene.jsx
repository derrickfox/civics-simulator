import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'accept-house-number': { icon: '🏠', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Passage', color: 'blue' }] },
  'accept-senate-number':{ icon: '🏛️', tags: [{ label: '+Programs', color: 'green' }, { label: '+Public', color: 'blue' }] },
  'split-with-offsets':  { icon: '⚖️', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Passage', color: 'blue' }] },
};

export default function ConferenceScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-conference">
        {/* Conference room */}
        <div className="bd-conf-room">
          <div className="bd-conf-table" />
          {/* House side */}
          <div className="bd-conf-side bd-conf-side--house">
            <div className="bd-conf-label">🏠 House</div>
            {[0,1,2].map(i => (
              <div key={i} className="bd-conf-member">
                <div className="bd-conf-member__head" />
                <div className="bd-conf-member__body" style={{ background: '#b45309' }} />
              </div>
            ))}
          </div>
          {/* Senate side */}
          <div className="bd-conf-side bd-conf-side--senate">
            <div className="bd-conf-label">🏛️ Senate</div>
            {[0,1,2].map(i => (
              <div key={i} className="bd-conf-member">
                <div className="bd-conf-member__head" />
                <div className="bd-conf-member__body" style={{ background: '#065f46' }} />
              </div>
            ))}
          </div>
        </div>
        {/* Gap display */}
        <div className="bd-conf-gap">
          <span>🏠 House: Lower · 🏛️ Senate: Higher · Gap: <strong>$320B</strong></span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">House and Senate versions differ by $320 billion.</h2>
        <p className="ci-story__body">
          The conference committee is the last chance to produce a single bill both chambers will
          vote on. Whatever you negotiate here goes back for an up-or-down vote — no amendments
          allowed. The House wants cuts. The Senate wants programs. Something has to give.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">$320B separates the two chambers. <em>How do you bridge the gap?</em></h3>
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
