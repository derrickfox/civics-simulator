import React, { useState, useEffect } from 'react';

const choiceMeta = {
  'accept-framework':        { icon: '🤝', tags: [{ label: '+Programs', color: 'green' }, { label: '+Support', color: 'blue' }] },
  'counter-budget':          { icon: '📋', tags: [{ label: '+Deficit', color: 'green' }, { label: '+Bipartisan', color: 'blue' }] },
  'bipartisan-working-group':{ icon: '🫱🫲', tags: [{ label: '+Bipartisan', color: 'green' }, { label: '+Passage', color: 'blue' }] },
};

export default function PresidentRequestScene({ stage, onChoiceSelect }) {
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
      <div className="ci-scene__stage bg-budget-wh">
        {/* White House */}
        <div className="bd-whitehouse">
          <div className="bd-wh__roof" />
          <div className="bd-wh__body">
            <div className="bd-wh__columns">
              {[0,1,2,3,4].map(i => <div key={i} className="bd-wh__col" />)}
            </div>
            <div className="bd-wh__door">🏛️</div>
          </div>
        </div>
        {/* Budget document */}
        <div className="bd-doc bd-doc--float">
          <div className="bd-doc__header">📄 FY 2027 Budget</div>
          <div className="bd-doc__line" />
          <div className="bd-doc__line bd-doc__line--short" />
          <div className="bd-doc__amount">$7.3T</div>
        </div>
        {/* Ticker */}
        <div className="bd-ticker">
          <span>📺 White House submits $7.3 trillion budget proposal to Congress</span>
        </div>
      </div>

      <div className={`ci-story${phase >= 1 ? ' ci-story--visible' : ''}`}>
        <h2 className="ci-story__headline">The President's budget lands on Capitol Hill.</h2>
        <p className="ci-story__body">
          Every February, the President submits a budget proposal to Congress. This year's is $7.3 trillion —
          funding new domestic programs and a defense increase. As a senior senator on the Budget Committee,
          your response sets the tone for months of negotiations.
        </p>
      </div>

      <div className={`ci-lesson${phase >= 2 ? ' ci-lesson--visible' : ''}`}>
        <span className="ci-lesson__icon">⚡</span>
        <div><strong>Civic Lesson: </strong>{stage.civicLesson}</div>
      </div>

      <div className={`ci-choices${phase >= 3 ? ' ci-choices--visible' : ''}`}>
        <h3 className="ci-choices__prompt">The President's budget just arrived. <em>What's your opening move?</em></h3>
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
